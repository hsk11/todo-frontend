import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const login = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/users/login`, { email, password });
    return response.data.token; 
}
const createUser = async (email, name, password) => {
    await axios.post(`${BASE_URL}/users/user`, { email, name, password });
};

const getTasks = async (search) => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${BASE_URL}/tasks`, { headers, params: { search }});
    return response.data;
};

const createTask = async (task) => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(`${BASE_URL}/tasks`, task, { headers });
    return response.data;
};

const updateTask = async (taskId, updates) => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, updates, { headers });
    return response.data;
};

const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axios.delete(`${BASE_URL}/tasks/${taskId}`, { headers });
};

const isUserAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export { login, createUser, getTasks, createTask, updateTask, deleteTask, BASE_URL,isUserAuthenticated };
