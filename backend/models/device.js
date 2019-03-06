const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: String,
    address: String,
    port: Number,
    state: Boolean,
    groupId: String
});

const deviceModel = mongoose.model('device', deviceSchema);

module.exports = deviceModel;
