FROM nginx
WORKDIR /var/www/html
COPY . .
RUN composer install
RUN npm install
CMD php artisan serve