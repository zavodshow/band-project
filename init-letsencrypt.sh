#!/bin/bash

domains=("zavodshow.ru" "www.zavodshow.ru")
rsa_key_size=4096
data_path="./nginx/certbot"
email="zavodshowdev@gmail.com"
staging=0 # Set to 1 if testing
max_retries=3
retry_delay=300 # 5 minutes between retries

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf >"$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem >"$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Creating dummy certificate for $domains ..."
path="/etc/letsencrypt/live/zavodshow.ru"
mkdir -p "$data_path/conf/live/zavodshow.ru"
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

echo "### Starting nginx ..."
docker compose up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate for $domains ..."
docker compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/zavodshow.ru && \
  rm -Rf /etc/letsencrypt/archive/zavodshow.ru && \
  rm -Rf /etc/letsencrypt/renewal/zavodshow.ru.conf" certbot
echo

echo "### Requesting Let's Encrypt certificate for $domains ..."
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

if [ $staging != "0" ]; then
  staging_arg="--staging"
else
  staging_arg=""
fi

# Retry logic for certificate issuance
for i in $(seq 1 $max_retries); do
  echo "Attempt $i of $max_retries..."
  if docker compose run --rm --entrypoint "\
      certbot certonly --webroot -w /var/www/certbot \
        $staging_arg \
        --email $email \
        $domain_args \
        --rsa-key-size $rsa_key_size \
        --agree-tos \
        --keep-until-expiring" certbot; then
    echo "Certificate successfully obtained!"
    break
  else
    if [ $i -eq $max_retries ]; then
      echo "Failed to obtain certificate after $max_retries attempts."
      if [ $staging -eq 0 ]; then
        echo "You might have hit Let's Encrypt's rate limits."
        echo "Try again later or use staging mode (set staging=1) for testing."
      fi
      exit 1
    fi
    echo "Retrying in $retry_delay seconds..."
    sleep $retry_delay
  fi
done

echo "### Reloading nginx ..."
docker compose exec nginx nginx -s reload
