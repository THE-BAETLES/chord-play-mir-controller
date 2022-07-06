FROM node:12
LABEL maintainer "chobe1<chobe0719@gmail.com>"
LABEL serverType="MIR Controller Server"

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm i -g @nestjs/cli
RUN npm install

COPY . .

EXPOSE 3000

CMD ["nest", "start"]