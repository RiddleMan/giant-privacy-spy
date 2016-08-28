FROM node:6.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install

RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "run" ]
