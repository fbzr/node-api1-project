import axios from 'axios';

export const getAllUsers = async () => {
    return await axios.get('http://localhost:5000/api/users/');
}

export const addUser = async ({ name, bio }) => {
    return await axios.post('http://localhost:5000/api/users/', {name, bio});
}

export const getUserById = async userId => {
    return await axios.get(`http://localhost:5000/api/users/${userId}`);
}

export const removeUser = async userId => {
    return await axios.delete(`http://localhost:5000/api/users/${userId}`);
}

export const editUser = async ({ id, name, bio }) => {
    return await axios.put(`http://localhost:5000/api/users/${id}`, { name, bio });
}

export default {
    getAllUsers,
    addUser,
    getUserById,
    removeUser,
    editUser
}