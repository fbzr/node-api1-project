import React, { useContext } from 'react'
// context
import { UserContext } from '../context/UserContext';
import UserCard from './UserCard';

const Users = () => {
    const { users } = useContext(UserContext);
    return (
        <div>
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    )
}

export default Users
