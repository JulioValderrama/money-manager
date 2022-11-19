FROM node:latest

WORKDIR /

COPY package*.json ./
RUN npm install -g nodemon
RUN npm install
COPY . .
COPY database.json .
COPY .env .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]