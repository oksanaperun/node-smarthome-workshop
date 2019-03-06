const http = require('http');
const Log = require('./models/log');

function getStateName(state) {
    return state ? 'On' : 'Off';
}

async function logAction(id, action, isGroup) {
    const actionLog = new Log({
        date: Date.now(),
        action,
        ...(isGroup ? { groupId: id } : { deviceId: id })
    });

    await actionLog.save();
}

async function removeLog(id, isGroup) {
    await Log.remove({
        ...(isGroup ? { groupId: id } : { deviceId: id })
    });
}

async function toggleRealDevice(device) {
    const deviceUrl = `http://${device.address}:${device.port}`;
    const deviceCommand = device.state ? 'Power On' : 'Power off';

    await sendRequest(`${deviceUrl}/cm?cmnd=${deviceCommand}`);
}

function sendRequest(url) {
    return new Promise((resolve, reject) => {
        let req = http.request(url, (res) => {
            if (res.statusCode !== 200) {
                reject(res.statusCode);
            } else {
                resolve();
            }
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

module.exports = {
    getStateName,
    logAction,
    removeLog,
    toggleRealDevice
};
