FROM node:6.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/
ENV NODE_ENV production
RUN npm install
VOLUME /tmp

EXPOSE 3001
CMD ["node", "./bin/www" ]
