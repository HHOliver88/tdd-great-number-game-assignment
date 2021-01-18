# FROM node:latest
FROM node:14.4.0-alpine3.12

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]