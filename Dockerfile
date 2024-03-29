FROM node:16
LABEL maintainer "chobe1<chobe0719@gmail.com>"
LABEL serverType="MIR Controller Service"

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm i -g pm2
RUN npm i -g @nestjs/cli
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:container:prod"]