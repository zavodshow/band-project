#!/bin/bash

# Exit script on any error
set -e

# Enable verbose output
set -x

# Define a marker file
MARKER_FILE="/var/www/.initialized"

# Print environment variables for debugging
echo "Database Connection Details:"
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_DATABASE: $DB_DATABASE"
echo "DB_USERNAME: $DB_USERNAME"

# Comprehensive database connection check
echo "Waiting for database connection at $DB_HOST:$DB_PORT..."

max_attempts=60
attempt=0
while ! nc -z -v -w30 "$DB_HOST" "$DB_PORT"; do
    attempt=$((attempt + 1))
    echo "Attempt $attempt: Trying to connect to $DB_HOST:$DB_PORT..."
    
    if [ $attempt -ge $max_attempts ]; then
        echo "ERROR: Could not connect to database after $max_attempts attempts"
        exit 1
    fi
    
    sleep 5
done

# Try to connect using MySQL client for additional debugging
echo "Attempting MySQL connection..."
mysql_command="mysql -h $DB_HOST -P $DB_PORT -u $DB_USERNAME -p$DB_PASSWORD $DB_DATABASE"
if $mysql_command -e "SELECT 1" ; then
    echo "MySQL connection successful"
else
    echo "ERROR: MySQL connection failed"
    exit 1
fi

# Rest of the script remains the same...
if [ ! -f "$MARKER_FILE" ]; then
    echo "Running database migrations..."
    php artisan config:clear
    php artisan migrate --force --no-interaction

    if [ $? -ne 0 ]; then
        echo "ERROR: Database migrations failed"
        exit 1
    fi

    # Create marker file
    touch "$MARKER_FILE"
fi

echo "Starting PHP-FPM..."
exec php-fpm