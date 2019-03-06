# node-smarthome-workshop

Pet project on Node.js and React

## How to run the app

1. Install [Node.js](https://nodejs.org) (version 10 or higher).
2. Install [Mongo DB Server](https://www.mongodb.com/download-center/community).
3. Run `npm install` under the `backend` and `frontend` folders.
4. Run `npm start` under the `backend` folder to start the server.
5. Run `npm start` under the `frontend` folder to start the client.
6. (Optional) Run `node fakeDevice.js 3011` under the `backend` folder to start the fake device at port `3011`
(you can use any other port and start as many fake devices as you want; just consider that server has logic
related to the fake devices state toggle and could return 404 error on device update in case corresponding
fake device is not running).
