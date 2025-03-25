# Stage 1: Build stage for PHP dependencies
FROM php:8.2-fpm-alpine AS builder

WORKDIR /var/www

# Install system dependencies including bash
RUN apk add --no-cache \
    bash \
    nodejs \
    npm \
    git \
    ffmpeg \
    unzip \
    mysql-client \
    netcat-openbsd \
    oniguruma-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    curl \
    openssh-client

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

# Run any post-install scripts
RUN composer dump-autoload --optimize \
    && php artisan config:cache \
    && php artisan route:cache

# Stage 2: Final production image
FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Install runtime dependencies including bash
RUN apk add --no-cache \
    mysql-client \
    bash \
    ffmpeg \
    oniguruma \
    libzip \
    libpng \
    libjpeg-turbo \
    freetype \
    tzdata

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
    && echo "opcache.revalidate_freq=60" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.enable_cli=1" >> /usr/local/etc/php/conf.d/opcache.ini

# Create non-root user
RUN addgroup -g 1000 www && \
    adduser -u 1000 -G www -h /var/www -D www

# Create directories first
RUN mkdir -p bootstrap/cache storage/framework/{cache,sessions,testing,views} storage/logs

# Copy application files with correct permissions
COPY --chown=www:www . .
COPY --from=builder --chown=www:www /var/www/vendor ./vendor
COPY --from=builder --chown=www:www /var/www/bootstrap/cache ./bootstrap/cache

# Set storage permissions
RUN chown -R www:www storage bootstrap/cache

# Copy the entrypoint script
COPY --chown=www:www entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER www

EXPOSE 9000

# Use the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]
