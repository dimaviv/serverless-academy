FROM node:18.18.0

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ]