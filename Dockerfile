# FROM node:latest
FROM node:14.4.0-alpine3.12

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY . .

# happens in container
RUN npm install -g nodemon