const router = require('express').Router();
const Log = require('../models/log');

router.get('/device/:deviceId', async (req, res) => {
    const deviceId = req.params.deviceId;
    const logs = await Log.find({ deviceId }).exec();

    res.json(logs.map(logAdapter));
});

router.get('/group/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const logs = await Log.find({ groupId }).exec();

    res.json(logs.map(logAdapter));
});

function logAdapter(itemLog) {
    return {
        date: itemLog.date.toLocaleString('en-GB'),
        action: itemLog.action
    };
}

module.exports = router;
