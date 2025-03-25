#!/bin/bash

# Exit script on any error
set -e

# Define a marker file
MARKER_FILE="/var/www/.initialized"

# Check if the application has already been initialized
if [ ! -f "$MARKER_FILE" ]; then
    echo "Waiting for database connection at $DB_HOST:$DB_PORT..."

    # Wait for database to be ready
    until mysqladmin ping -h "$DB_HOST" -P "$DB_PORT" --silent; do
        echo "Waiting for database connection..."
        sleep 5
    done

    echo "Running database migrations..."
    php artisan migrate --force

    echo "Seeding the database..."
    php artisan db:seed --force

    echo "Caching configuration..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache

    echo "Linking storage..."
    php artisan storage:link || true # Prevents failure if symlink already exists

    echo "Setting correct permissions..."
    chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

    # Create a marker file to indicate initialization is complete
    touch "$MARKER_FILE"
else
    echo "Application has already been initialized. Skipping setup."
fi

echo "Starting PHP-FPM..."
exec php-fpm