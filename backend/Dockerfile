# Stage 1: Builder - Use Debian-based image for better compatibility
FROM php:8.2-cli as builder

WORKDIR /var/www

# Install system dependencies with retry logic
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    unzip \
    libpq-dev \
    libonig-dev \
    libzip-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libsodium-dev && \
    rm -rf /var/lib/apt/lists/*

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) \
    gd \
    sodium \
    zip \
    pdo \
    pdo_mysql \
    mbstring \
    exif \
    pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --ignore-platform-reqs --no-dev --no-scripts --no-autoloader

# Copy application code
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize --no-scripts

# Stage 2: Production - Use Alpine with pre-installed extensions
FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Install runtime dependencies (no dev packages needed)
RUN apk add --no-cache --update \
    libpq \
    oniguruma \
    libzip \
    freetype \
    libjpeg-turbo \
    libpng \
    libsodium

# Create directory structure
RUN mkdir -p \
    /var/www/bootstrap/cache \
    /var/www/storage/framework/cache \
    /var/www/storage/framework/views \
    /var/www/storage/framework/sessions \
    /var/www/storage/logs

# Copy artifacts from builder
COPY --from=builder /usr/bin/composer /usr/bin/composer
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=builder /var/www /var/www

# Set permissions
RUN chown -R www-data:www-data \
    /var/www/storage \
    /var/www/bootstrap/cache \
    && chmod -R 775 \
    /var/www/storage \
    /var/www/bootstrap/cache

# PHP configuration
RUN echo "upload_max_filesize = 2048M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 2048M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/uploads.ini

# Set default command
CMD ["sh", "-c", "composer install --no-dev --optimize-autoloader && php-fpm"]

# Expose port for web server
EXPOSE 9000