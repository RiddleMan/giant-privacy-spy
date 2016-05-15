FROM node:6.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
