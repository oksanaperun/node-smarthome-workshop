const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    state: Boolean
});

const groupModel = mongoose.model('group', groupSchema);

module.exports = groupModel;
