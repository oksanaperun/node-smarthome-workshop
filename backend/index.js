const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('./middlewares/cors');
const devicesRouter = require('./routes/devices');
const groupsRouter = require('./routes/groups');
const logsRouter = require('./routes/logs');
const app = express();

mongoose.connect('mongodb://localhost:27017/smart-home');

app.use(corsMiddleware);
app.use(express.json());

app.use('/devices', devicesRouter);
app.use('/groups', groupsRouter);
app.use('/logs', logsRouter);

app.get('/', (req, res) => {
    res.send('Server works!');
});

app.listen(3005);
