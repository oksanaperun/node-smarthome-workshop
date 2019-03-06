const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    deviceId: String,
    groupId: String,
    date: Date,
    action: String
});

const logModel = mongoose.model('log', logSchema);

module.exports = logModel;
