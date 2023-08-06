FROM node:16.20.1-alpine

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 80

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

# will execute npm install in /home/app because of WORKDIR
RUN npm install

RUN npm install --prefix client

RUN npm run build --prefix client

# no need for /home/app/server.js because of WORKDIR
#CMD ["node", "server.js"]
CMD ["npm", "start"]
