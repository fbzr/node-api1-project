const express = require('express');

const server = express();
server.use(express.json());

const users = [];

server.get('/', (req, res) => {
    res.json({ msg: 'success' });
});

// return an array users
server.get('/api/users', (req, res) => {
    try {
        res.json(users);
    } catch(err) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
});

// creates an user using the information sent inside the request body
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;

    if(!name || !bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
    }

    const newUser = { name, bio };
    users.push(newUser);
    res.status(201).json(newUser);
});

// return the user object with the specified id
server.get('/api/users/:id', (req, res) => {

});

// removes the user with the specified id
// return the deleted user
server.delete('/api/users/:id', (req, res) => {

});

// updates the user with the specified id using data from the req.body
// returns the modified user
server.put('/api/user/:id', (req, res) => {

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));