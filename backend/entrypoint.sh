#!/bin/bash

set -e

MARKER_FILE="/var/www/.initialized"

if [ ! -f "$MARKER_FILE" ]; then
    echo "Waiting for database connection at ${DB_HOST:-mysql}:${DB_PORT:-3306}..."

    # Use a loop with a more robust check and backoff
    while ! mysqladmin ping -h "${DB_HOST:-mysql}" -P "${DB_PORT:-3306}" --silent; do
        echo "Waiting for database... sleeping 5s"
        sleep 5
    done

    # Ensure proper permissions before running commands
    chown -R www-www-data /var/www/storage /var/www/bootstrap/cache

    php artisan migrate --force
    php artisan db:seed --force
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    php artisan storage:link || true

    touch "$MARKER_FILE"
else
    echo "Application already initialized."
fi

exec php-fpm