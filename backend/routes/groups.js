const router = require('express').Router();
const Group = require('../models/group');
const Device = require('../models/device');
const utils = require('../utils');

router.get('/', async (req, res) => {
    const groups = await Group.find().exec();

    res.json(groups.map(groupAdapter));
});

router.get('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId).exec();

    if (group) {
        res.json(groupAdapter(group));
    } else {
        res.sendStatus(404);
    }
});

router.get('/:groupId/devices', async (req, res) => {
    const groupId = req.params.groupId;
    const devices = await Device.find({ groupId }).exec();

    res.json(devices.map(deviceAdapter));
});

router.post('/', async (req, res) => {
    const groupData = req.body;
    const group = new Group(groupData);

    await group.save();

    res.sendStatus(201);
});

router.delete('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const linkedDevices = await getLinkedDevices(groupId);

    if (linkedDevices.length) {
        res.status(500).send('Group has linked devices and can not be deleted');
    } else {
        await Group.findByIdAndDelete(groupId);

        await utils.removeLog(groupId, true);

        res.sendStatus(200);
    }
});

router.put('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const groupData = req.body;

    try {
        const group = await Group.findById(groupId).exec();
        const isStateChange = groupData.state !== utils.getStateName(group.state);

        await group.updateOne({
            ...groupData,
            state: isStateChange ? !group.state : group.state
        });

        if (isStateChange) {
            await utils.logAction(groupId, groupData.state, true);
        }

        await updateStateInLinkedDevices(groupId, groupData.state)

        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
});

function groupAdapter(group) {
    return {
        id: group._id,
        name: group.name,
        state: utils.getStateName(group.state)
    };
}

function deviceAdapter(device) {
    return {
        id: device._id,
        name: device.name,
        address: device.address,
        port: device.port,
    };
}

async function getLinkedDevices(groupId) {
    return Device.find({ groupId }).exec();
}

async function updateStateInLinkedDevices(groupId, newStateName) {
    const linkedDevices = await getLinkedDevices(groupId);

    linkedDevices.forEach(async device => {
        const isStateChange = utils.getStateName(device.state) !== newStateName;

        if (isStateChange) {
            await device.updateOne({ state: !device.state });
            await utils.logAction(device.id, newStateName, false);
            await utils.toggleRealDevice(device);
        }
    });
}

module.exports = router;
