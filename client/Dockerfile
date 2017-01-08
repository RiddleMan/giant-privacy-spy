FROM node:6.1

ARG API_URL="http://localhost:3001/"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install

RUN API_URL=${API_URL} npm run build

EXPOSE 8080
CMD [ "npm", "run", "run" ]
