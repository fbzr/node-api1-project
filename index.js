const express = require('express');
const uuid = require('uuid');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

const users = [
    {
        "id": "39160451-056c-425a-bf48-e9238c88d2a2",
        "name": "Elliot Baker",
        "bio": "Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
    },
    {
        "id": "9374ec7e-fd75-4d35-b7c1-b66e909bd07f",
        "name": "Rick Sanchez",
        "bio": "Rick is a genius scientist whose alcoholism and reckless, nihilistic behavior are a source of concern for his family."
    },
    {
        "id": "826d861c-426f-4bf8-812b-d0e7b1efcc3c",
        "name": "Jenny Hess",
        "bio": "Jenny is a student studying Media Management at the New School."
    },
    {
        "id": "a67d0724-840f-41f4-a470-24d871cd30a0",
        "name": "Amy",
        "bio": "Amy is a violinist with 2 years experience in the wedding industry. She enjoys the outdoors and currently resides in upstate New York."
    }
];

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
server.put('/api/users/:id', (req, res) => {
    try {
        const index = users.findIndex(user => user.id === req.params.id);
        if (index === -1) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }

        const { name, bio } = req.body;

        if(!name || !bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        }

        users[index] = {
            ...users[index],
            name,
            bio
        }

        res.json(users[index]);
    } catch(err) {
        res.status(500).json({ errorMessage: "The user information could not be modified." });
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));