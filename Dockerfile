FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3232

CMD ["node", "server.js"]