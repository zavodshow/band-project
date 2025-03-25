# Stage 1: Builder
FROM php:8.2-cli as builder

WORKDIR /var/www

# Install system dependencies and Composer
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
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

# Copy composer files
COPY composer.json composer.lock ./

# Install dependencies
RUN composer install --ignore-platform-reqs --no-dev --no-scripts --no-autoloader

# Copy entire source
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize --no-scripts

# Stage 2: Production
FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Install runtime dependencies and Composer
RUN apk add --no-cache \
    libpq \
    oniguruma \
    libzip \
    freetype \
    libjpeg-turbo \
    libpng \
    git \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

# Copy from builder
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=builder /var/www /var/www

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# PHP config
RUN echo "upload_max_filesize = 2048M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 2048M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/uploads.ini

    CMD ["sh", "-c", "composer install --optimize-autoloader --no-dev && php-fpm"]