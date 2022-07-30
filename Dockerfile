FROM node:12
LABEL maintainer "chobe1<chobe0719@gmail.com>"
LABEL serverType="MIR Controller Service"

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm i -g pm2
RUN npm i -g @nestjs/cli
RUN npm install

COPY . .
CMD ["npm", "run", "start:prod"]