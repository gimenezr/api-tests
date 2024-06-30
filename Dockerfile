FROM node:16-alpine

WORKDIR /app
RUN mkdir reports

COPY package*.json ./

RUN npm i

COPY test ./test

ENTRYPOINT [ "npm", "run", "test-report" ]
