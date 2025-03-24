#!/bin/bash

# Exit script on any error
set -e

# Define marker file
MARKER_FILE="/var/www/.initialized"

# Database connection check with credentials
check_db_connection() {
  echo "Checking database connection..."
  until php artisan db:monitor --timeout=3 --retries=3 > /dev/null 2>&1; do
    echo "Waiting for database to be ready..."
    sleep 5
  done
}

# Check if initialization is needed
if [ ! -f "$MARKER_FILE" ]; then
  echo "Starting application initialization..."
  
  # Set directory permissions
  chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
  find /var/www/storage -type d -exec chmod 775 {} \;
  find /var/www/storage -type f -exec chmod 664 {} \;

  # Verify database connection
  check_db_connection

  # Run database operations
  echo "Running database migrations..."
  php artisan migrate --force

  echo "Seeding database..."
  php artisan db:seed --force

  # Cache configuration
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache

  # Create storage link (ignore if already exists)
  php artisan storage:link || true

  # Mark initialization complete
  touch "$MARKER_FILE"
  echo "Initialization completed."
else
  echo "Application already initialized. Skipping setup."
fi

# Start PHP-FPM
exec php-fpm