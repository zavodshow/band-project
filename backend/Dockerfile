# Stage 1: Build stage for PHP dependencies
FROM php:8.2-fpm-alpine AS builder

WORKDIR /var/www

# Install system dependencies
RUN apk add --no-cache \
    git \
    ffmpeg \
    unzip \
    oniguruma-dev \
    libzip-dev \
    zip \
    curl

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy only composer files first for better caching
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --ignore-platform-reqs --no-scripts

# Copy application files
COPY . .

# Run any post-install scripts
RUN composer dump-autoload --optimize

# Stage 2: Final production image
FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Install runtime dependencies
RUN apk add --no-cache \
    ffmpeg \
    oniguruma \
    libzip

# Install PHP extensions (without PostgreSQL)
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Set PHP upload limits
RUN echo "upload_max_filesize = 2048M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 2048M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/uploads.ini

# Create non-root user
RUN addgroup -g 1000 www && \
    adduser -u 1000 -G www -h /var/www -D www

# Copy application files with correct permissions
COPY --chown=www:www . . 
COPY --from=builder --chown=www:www /var/www/vendor ./vendor

# Set storage permissions
RUN mkdir -p storage/framework/{cache,sessions,testing,views} && \
    mkdir -p storage/logs && \
    chown -R www:www storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Generate Laravel application key if needed
RUN php artisan key:generate --force

USER www

EXPOSE 9000

CMD ["php-fpm"]