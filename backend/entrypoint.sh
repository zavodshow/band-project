#!/bin/bash

set -e

MARKER_FILE="/var/www/.initialized"

if [ ! -f "$MARKER_FILE" ]; then
    echo "Initializing application..."
    
    # Install timezone data if not present
    if [ ! -f "/usr/share/zoneinfo/zone1970.tab" ]; then
        echo "Installing timezone data..."
        apt-get update && apt-get install -y tzdata || apk add --no-cache tzdata
    fi

    echo "Waiting for database connection at ${DB_HOST:-mysql}:${DB_PORT:-3306}..."

    # Wait for database with timeout
    timeout=60
    while ! mysqladmin ping -h "${DB_HOST:-mysql}" -P "${DB_PORT:-3306}" --silent; do
        timeout=$((timeout - 5))
        if [ $timeout -le 0 ]; then
            echo "Database connection timeout"
            exit 1
        fi
        echo "Waiting for database... sleeping 5s"
        sleep 5
    done

    # Set proper permissions
    echo "Setting permissions..."
    chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache

    # Run Laravel setup
    echo "Running migrations..."
    php artisan migrate --force
    
    echo "Seeding database..."
    php artisan db:seed --force
    
    echo "Caching configurations..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    
    echo "Creating storage link..."
    php artisan storage:link || true

    touch "$MARKER_FILE"
    echo "Initialization complete."
else
    echo "Application already initialized."
fi

exec php-fpm