const router = require('express').Router();
const Device = require('../models/device');
const utils = require('../utils');

router.get('/', async (req, res) => {
    const devices = await Device.find().exec();

    res.json(devices.map(deviceAdapter));
});

router.get('/:deviceId', async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await Device.findById(deviceId).exec();

    if (device) {
        res.json(deviceAdapter(device));
    } else {
        res.sendStatus(404);
    }
});

router.post('/', async (req, res) => {
    const deviceData = req.body;
    const device = new Device(deviceData);

    await device.save();

    res.sendStatus(201);
});

router.delete('/:deviceId', async (req, res) => {
    const deviceId = req.params.deviceId;

    await Device.findByIdAndDelete(deviceId);

    await utils.removeLog(deviceId, false);

    res.sendStatus(200);
});

router.put('/:deviceId', async (req, res) => {
    const deviceId = req.params.deviceId;
    const deviceData = req.body;

    try {
        const device = await Device.findById(deviceId).exec();
        const isStateChange = deviceData.state !== utils.getStateName(device.state);

        await device.updateOne({
            ...deviceData,
            state: isStateChange ? !device.state : device.state
        });

        if (isStateChange) {
            await utils.logAction(deviceId, deviceData.state, false);
            await utils.toggleRealDevice(device);
        }

        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
});

function deviceAdapter(device) {
    return {
        id: device._id,
        name: device.name,
        address: device.address,
        port: device.port,
        state: utils.getStateName(device.state),
        groupId: device.groupId
    };
}

module.exports = router;
