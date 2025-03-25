# Stage 1: Build stage for PHP dependencies
FROM php:8.2-fpm-alpine AS builder

WORKDIR /var/www

# Install system dependencies
RUN apk add --no-cache \
    bash \
    nodejs \
    npm \
    git \
    unzip \
    mysql-client \
    oniguruma-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    mbstring \
    zip \
    exif \
    pcntl \
    gd \
    opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy only composer files first for better caching
COPY composer.json composer.lock ./

# Install PHP dependencies (no-dev for production)
RUN composer install --ignore-platform-reqs --no-scripts --no-dev --prefer-dist --optimize-autoloader

# Copy application files
COPY . .

# Create necessary directories
RUN mkdir -p bootstrap/cache storage/framework/views

# Stage 2: Final production image
FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Install runtime dependencies
RUN apk add --no-cache \
    mysql-client \
    bash \
    oniguruma \
    libzip \
    libpng \
    libjpeg-turbo \
    freetype \
    tzdata

# Copy PHP extensions from builder
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=builder /usr/local/lib/php/extensions/no-debug-non-zts-20220829/ /usr/local/lib/php/extensions/no-debug-non-zts-20220829/

# Set PHP settings
RUN echo "upload_max_filesize = 2048M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 2048M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_execution_time = 120" >> /usr/local/etc/php/conf.d/uploads.ini

# Use existing www-data user instead of creating new one
RUN chown -R www-data:www-data /var/www

# Create directories with correct permissions
RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Copy application files with correct permissions
COPY --from=builder --chown=www-data:www-data /var/www .

# Switch to non-root user
USER www-data

EXPOSE 9000

CMD ["php-fpm"]