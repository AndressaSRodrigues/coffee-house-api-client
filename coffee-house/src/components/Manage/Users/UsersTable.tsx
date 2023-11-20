import { Link, useNavigate } from 'react-router-dom';
import { Users } from '../../../interfaces/Users';
import { getUsers, deleteUsers } from '../../../services/users';
import { useAuth } from '../../../context/AuthContext';
import { CustomTable } from '../../Shared/Table';
import DeleteDialog from '../../Shared/Dialog';
import { useReducer, useEffect } from 'react';
import { Button } from '@mui/material';

export default function UsersTable() {

  interface State {
    usersData: Users[];
    isDeleteDialogOpen: boolean;
    selectedUserEmail: string;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }

  const initialState = {
    usersData: [],
    isDeleteDialogOpen: false,
    selectedUserEmail: '',
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'SET_USERS_DATA':
        return { ...state, usersData: action.payload };
      case 'OPEN_DELETE_DIALOG':
        return { ...state, isDeleteDialogOpen: true, selectedUserEmail: action.payload };
      case 'CLOSE_DELETE_DIALOG':
        return { ...state, isDeleteDialogOpen: false, selectedUserEmail: '' };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState );
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers(token)
      .then((data) => {
        dispatch({ type: 'SET_USERS_DATA', payload: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const openDeleteDialog = (email: string) => {
    dispatch({ type: 'OPEN_DELETE_DIALOG', payload: email });
  };

  const deleteUser = (email: string) => {
    deleteUsers(token, email)
      .then(() => {
        dispatch({ type: 'SET_USERS_DATA', payload: state.usersData.filter((user: Users) => user.email !== email) });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeDeleteDialog = () => {
    dispatch({ type: 'CLOSE_DELETE_DIALOG' });
  };

  const openEditPage = (id: string) => {
    navigate(`edit/${id}`)
  };

  const tableHeaders = ['email', 'role', 'options'];

  return (
    <>
      <Button><Link to={'/new-user'}>Add User</Link></Button>
      <CustomTable data={state.usersData} headers={tableHeaders} onDelete={openDeleteDialog} onEdit={openEditPage}/>
      <DeleteDialog message={`Would you like to delete ${state.selectedUserEmail}?`} open={state.isDeleteDialogOpen} onCancel={closeDeleteDialog} onDelete={() => deleteUser(state.selectedUserEmail)} />
    </>
  );
};
