# Stage 1: Builder
FROM php:8.2-cli as builder

WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libonig-dev \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Create complete Laravel directory structure with proper permissions
RUN mkdir -p /var/www/bootstrap/cache \
    && mkdir -p /var/www/storage/framework/cache/data \
    && mkdir -p /var/www/storage/framework/views \
    && mkdir -p /var/www/storage/framework/sessions \
    && mkdir -p /var/www/storage/logs \
    && chmod -R 777 /var/www/bootstrap/cache /var/www/storage

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy only what's needed for composer install
COPY composer.json composer.lock ./

# Install dependencies (no autoloader generation yet)
RUN composer install --ignore-platform-reqs --no-dev --no-scripts --no-autoloader

# Copy entire application
COPY . .

# Generate optimized autoloader (skip scripts to prevent artisan commands)
RUN composer dump-autoload --optimize --no-scripts

# Stage 2: Production
FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Install runtime dependencies
RUN apk add --no-cache \
    libpq \
    oniguruma \
    libzip \
    freetype \
    libjpeg-turbo \
    libpng

# Copy from builder
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=builder /var/www /var/www

# Set proper ownership and permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# PHP config
RUN echo "upload_max_filesize = 2048M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 2048M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/uploads.ini

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD php -r "echo file_exists('/var/www/storage/logs/laravel.log') ? 'OK' : 'Not OK';"

CMD ["php-fpm"]