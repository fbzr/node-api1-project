import React from 'react';
import { Card } from 'semantic-ui-react';

const UserCard = ({ user }) => {
    const { name, bio } = user;
    return (
        <Card>
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
