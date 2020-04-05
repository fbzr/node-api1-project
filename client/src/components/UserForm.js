import React, { useState, useContext } from 'react';
// semantic-ui
import { Button, Form, Icon } from 'semantic-ui-react';
// crud operations
import usersCrud from '../crud/users';
// context
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';

const initialUser = {
    name: '',
    bio: ''
}

const UserForm = () => {
    const { userToEdit, addUser, updateUser, deleteUser } = useContext(UserContext);
    const [user, setUser] = useState(userToEdit || initialUser);

    useEffect(() => {
        setUser(userToEdit ? userToEdit : initialUser);
    }, [userToEdit]);

    const handleInput = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async () => {
        try {
            if (user.id) {
                const res = await usersCrud.updateUser(user);
                updateUser(res.data);
            } else {
                const res = await usersCrud.addUser(user);
                addUser(res.data);
            }

            setUser(initialUser);
        } catch(err) {
            console.dir(err);
        }
    }

    const handleDelete = async () => {
        try {
            await usersCrud.removeUser(user.id);
            deleteUser(user.id);
            setUser(initialUser);
        } catch(err) {
            console.dir(err);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Name</label>
                <input required value={user.name} onChange={handleInput} name='name' placeholder='Name' />
            </Form.Field>
            <Form.Field>
                <label>Bio</label>
                <textarea required rows='5' cols='30' value={user.bio} onChange={handleInput} name='bio' placeholder='Bio' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
            {user.id && 
            <Button icon onClick={handleDelete}>
                <Icon name='trash alternate' />
            </Button>}
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </Form>
    )
}

export default UserForm;
