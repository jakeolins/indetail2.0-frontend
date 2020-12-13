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
    return response
}

async function getExpertDetail(id) {
    const response = await backend.get(`/expert/${id}`);
    return response
}

async function createBroker({
    name, twilioNumber,
}) {
    const response = await backend.post('/broker', {
        name: name,
        twilioNumber: twilioNumber
    });
    return response
}

export {getAllExperts, getExpertDetail, createBroker}