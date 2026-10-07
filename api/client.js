import axios from 'axios';

const appClient = axios.create({
    baseURL: 'http://localhost:5134',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})