FROM node:10
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD  npm run serve ;  nodemon server
