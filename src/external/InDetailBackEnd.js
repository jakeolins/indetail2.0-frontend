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
    return backend.get('/expert');
}

async function getExpert(id) {
    return backend.get(`/expert/${id}`);
}

async function createExpert(expertData) {
    return backend.post(`/expert`, expertData);
}

async function editExpert(expertData) {
    return backend.patch(`/expert/${expertData.id}`, expertData);
}

async function deleteExpert(id) {
    return backend.delete(`/expert/${id}`);
}

async function getAllBrokers() {
    return backend.get('/broker');
}

async function createBroker(brokerData) {
    return backend.post('/broker', brokerData);
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
    createExpert,
    editExpert,
    getAllExperts, 
    getExpert, 
    deleteExpert,
    createBroker,
    getAllBrokers,
    getBroker,
    editBroker,
    deleteBroker,
}