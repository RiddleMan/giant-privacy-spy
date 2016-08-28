FROM node:6.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/
RUN npm install

ENV __API_URL__ gps-server

RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "run" ]
