import axios from 'axios'

const baseURL = 'http://localhost:8080'

axios.defaults.withCredentials = true

const backend = axios.create({
        baseURL,
        timeout: 5000,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        withCredentials: true,
        validateStatus: () => true,
});

async function getAllExperts() {
    const response = await backend.get('/expert');
    return response;
}

async function getAllBrokers() {
    const response = await backend.get('/broker');
    return response;
}

async function getExpertDetail(id) {
    const response = await backend.get(`/expert/${id}`);
    return response;
}

async function createBroker(brokerData) {
    const response = await backend.post('/broker', brokerData);

    return response
}

async function getBroker(id) {
    return backend.get(`/broker/${id}`);
}

async function editBroker(brokerData) {
    return backend.patch(`/broker/${brokerData.id}`);
}

async function deleteBroker(id) {
    return backend.delete(`/broker/${id}`);
}

export {
    getAllExperts, 
    getExpertDetail, 
    createBroker,
    getAllBrokers,
    getBroker,
    editBroker,
    deleteBroker,
}