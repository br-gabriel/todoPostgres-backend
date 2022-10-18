FROM postgres

LABEL version="1.0" description="postgres image"

WORKDIR /usr/app

COPY package*.json ./

COPY . .

EXPOSE 3232

CMD ["npm", "start"]