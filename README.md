#### This is a realtime chat application intended to transfer messages in realtime without storing to any database.   
* Backend Server: Node.js, Socket.io
* Frontend: React

### Features
1. Direct one to one chat
2. Group chat
   1. User can create a room and share the room id with other people so that they can join the room.
   2. User can also join an existing room using the room id.
   3. Chat room host has the privilege to remove any participant
3. In case of direct chat, other person can see the typing status of other person.
4. In case of chat room, other participants can see the name of person who is typing currently.
5. When someone joins/leave the room or chat, other participants will get notified.

### Steps to run this project locally:

#### Inside project's root directory issue below commands:
1. ```npm install```
2. ```npm install --prefix client```
3. ```npm run build --prefix client```
4. ```npm start```

#### or use a single command:
```npm install && npm install --prefix client && npm run build --prefix client && npm start```

#### You can also deploy this app using docker. Inside project's root directory issue below commands:
1. ```docker build -t chat-app .``` to build docker image
2. ```docker run -p 80:80 --name chat-app chat-app``` to build & run the docker container
3. For subsequent runs, don't run command 1 & 2, just run ```docker start chat-app```

####  Then view your project running locally on: http://localhost:80

### View this project live:

https://quick-chat-r3ks.onrender.com

