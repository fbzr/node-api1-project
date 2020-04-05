const express = require('express');
const uuid = require('uuid');

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

    const newUser = { 
        id: uuid.v4(),
        name,
        bio
     };
    users.push(newUser);
    res.status(201).json(newUser);
});

// return the user object with the specified id
server.get('/api/users/:id', (req, res) => {
    try {
        const user = users.find(user => user.id === req.params.id);
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }

        res.json(user);
    } catch(err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    }
});

// removes the user with the specified id
// return the deleted user
server.delete('/api/users/:id', (req, res) => {
    try {
        const index = users.findIndex(e => e.id === req.params.id);
        if (index === -1) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
        const removed = users.splice(index, 1);
        res.json(removed[0]);
    } catch(err) {
        res.status(500).json({ errorMessage: "The user could not be removed" });
    }
});

// updates the user with the specified id using data from the req.body
// returns the modified user
server.put('/api/user/:id', (req, res) => {

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));