import React, { useState, useEffect } from 'react';
// context
import { UserContext } from './context/UserContext';
// components
import Users from './components/Users';
// crud operations
import crudOperations from './crud/users';
import UserForm from './components/UserForm';
import { Grid, Header, GridRow } from 'semantic-ui-react';

function App() {
  // const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    users: [],
    userToEdit: null
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await crudOperations.getAllUsers();
        setState({
          ...state,
          users: res.data
        });
        // setUsers(res.data);
      } catch(err) {
        alert(err.response.data.errorMessage);
      }
    })();
  }, []);

  const setUserToEdit = user => {
    setState({
      ...state,
      userToEdit: user
    });
  }

  const addUser = user => {
    setState({
      ...state,
      users: [
        ...state.users,
        user
      ]
    });
  }

  const updateUser = user => {
    setState({
      ...state,
      users: state.users.map(item => item.id === user.id ? user : item)
    });
  }

  const deleteUser = userId => {
    setState({
      ...state,
      users: state.users.filter(item => item.id !== userId)
    });
  }

  return (
    <UserContext.Provider value={{ 
      users: state.users,
      userToEdit: state.userToEdit,
      setUserToEdit,
      addUser,
      updateUser,
      deleteUser
      }}>
      <Grid centered>
        <GridRow>
          <Header as='h1'>Users List</Header>
        </GridRow>
        
        <Grid.Column width={4}>
          <Users />
        </Grid.Column>
        <Grid.Column width={4}>
          <UserForm />
        </Grid.Column>
      </Grid>
    </UserContext.Provider>
  );
}

export default App;
