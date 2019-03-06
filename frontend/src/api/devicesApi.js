import axios from 'axios';

const serverUrl = 'http://localhost:3005';
const devicesUrl = `${serverUrl}/devices`;
const logsUrl = `${serverUrl}/logs`;

export async function getDevices() {
    const response = await axios.get(devicesUrl);

    return response.data;
}

export async function getDeviceById(deviceId) {
    const response = await axios.get(`${devicesUrl}/${deviceId}`);

    return response.data;
}

export async function addDevice(device) {
    return axios.post(devicesUrl, device);
}

export async function removeDevice(deviceId) {
    return axios.delete(`${devicesUrl}/${deviceId}`);
}

export async function updateDevice(deviceId, data) {
    return axios.put(`${devicesUrl}/${deviceId}`, data);
}

export async function switchOn(deviceId) {
    await updateDevice(deviceId, {
        state: 'On'
    });
}

export async function switchOff(deviceId) {
    await updateDevice(deviceId, {
        state: 'Off'
    });
}

export async function getDeviceLog(deviceId) {
    const response = await axios.get(`${logsUrl}/device/${deviceId}`);

    return response.data;
}
