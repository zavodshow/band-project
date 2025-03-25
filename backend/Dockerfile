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
RUN echo "upload_max_filesize = 128M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 128M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "memory_limit = 256M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_execution_time = 120" >> /usr/local/etc/php/conf.d/uploads.ini

# Create non-root user (www-data is standard for PHP-FPM)
RUN addgroup -g 1000 www-data && \
    adduser -u 1000 -G www-data -h /var/www -D www-data

# Create directories with correct permissions
RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache

# Copy application files with correct permissions
COPY --from=builder --chown=www-data:www-data /var/www .

# Set proper permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Switch to non-root user
USER www-data

EXPOSE 9000

CMD ["php-fpm"]