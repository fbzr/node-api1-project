import React, { useState, useEffect } from 'react';
// context
import { UserContext } from './context/UserContext';
// components
import Users from './components/Users';
// crud operations
import crudOperations from './crud/users';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await crudOperations.getAllUsers();
        setUsers(res.data);
      } catch(err) {
        alert(err.response.data.errorMessage);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      <Users />
    </UserContext.Provider>
  );
}

export default App;
