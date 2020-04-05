import React, { useContext } from 'react';
import { Card } from 'semantic-ui-react';
// context
import { UserContext } from '../context/UserContext';

const UserCard = ({ user }) => {
    const { setUserToEdit } = useContext(UserContext);
    const { name, bio } = user;

    return (
        <Card onClick={() => setUserToEdit(user)}>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    {bio}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default UserCard;
