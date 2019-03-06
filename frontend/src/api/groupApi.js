import axios from 'axios';

const serverUrl = 'http://localhost:3005';
const groupsUrl = `${serverUrl}/groups`;
const logsUrl = `${serverUrl}/logs`;

export async function getGroups() {
    const response = await axios.get(groupsUrl);

    return response.data;
}

export async function getGroupById(groupId) {
    const response = await axios.get(`${groupsUrl}/${groupId}`);

    return response.data;
}

export async function getDevicesByGroupId(groupId) {
    const response = await axios.get(`${groupsUrl}/${groupId}/devices`);

    return response.data;
}

export async function addGroup(group) {
    return axios.post(groupsUrl, group);
}


export async function removeGroup(groupId) {
    return axios.delete(`${groupsUrl}/${groupId}`);
}

export async function updateGroup(groupId, data) {
    return axios.put(`${groupsUrl}/${groupId}`, data);
}

export async function switchOn(groupId) {
    await updateGroup(groupId, {
        state: 'On'
    });
}

export async function switchOff(groupId) {
    await updateGroup(groupId, {
        state: 'Off'
    });
}

export async function getGroupLog(groupId) {
    const response = await axios.get(`${logsUrl}/group/${groupId}`);

    return response.data;
}
