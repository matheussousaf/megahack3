FROM node:12
WORKDIR /usr/app

COPY package*.json ./

RUN yarn

# Bundle app source
COPY . .

RUN yarn build
RUN yarn gcp

EXPOSE 4000
CMD [ "node", "dist/server.js" ]