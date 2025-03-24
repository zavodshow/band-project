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
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    curl

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

# Create bootstrap/cache directory
RUN mkdir -p bootstrap/cache

# Run any post-install scripts
RUN composer dump-autoload --optimize

# Stage 2: Final production image
FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Install runtime dependencies
RUN apk add --no-cache \
    ffmpeg \
    oniguruma \
    libzip \
    libpng \
    libjpeg-turbo \
    freetype

# Copy PHP extensions from builder
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=builder /usr/local/lib/php/extensions/no-debug-non-zts-20220829/ /usr/local/lib/php/extensions/no-debug-non-zts-20220829/

# Set PHP upload limits and opcache settings
RUN echo "upload_max_filesize = 2048M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 2048M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "opcache.enable=1" > /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=128" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.interned_strings_buffer=8" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=4000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.revalidate_freq=60" >> /usr/local/etc/php/conf.d/opcache.ini

# Create non-root user
RUN addgroup -g 1000 www && \
    adduser -u 1000 -G www -h /var/www -D www

# Copy application files with correct permissions
COPY --chown=www:www . .
COPY --from=builder --chown=www:www /var/www/vendor ./vendor

# Set storage permissions
RUN mkdir -p storage/framework/{cache,sessions,testing,views} \
    && mkdir -p storage/logs \
    && chown -R www:www storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=1m \
    CMD php-fpm-healthcheck || exit 1

USER www

EXPOSE 9000

CMD ["php-fpm"]