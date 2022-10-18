FROM postgres

LABEL version="1.0" description="postgres image"

WORKDIR /usr/app

COPY package*.json ./

COPY . .

CMD ["node", "src/index.js"]