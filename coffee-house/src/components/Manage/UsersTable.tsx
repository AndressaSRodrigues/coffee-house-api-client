import { Users } from '../../interfaces/Users';
import { getUsers, deleteUsers } from '../../services/users';
import { useAuth } from '../../context/AuthContext';
import { CustomTable } from '../Shared/Table';
import DeleteDialog from '../Shared/Dialog';
import { useReducer, useEffect } from 'react';

export default function UsersTable() {

  interface State {
    usersData: Users[];
    isDeleteDialogOpen: boolean;
    selectedUserId: string;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }

  const initialState = {
    usersData: [],
    isDeleteDialogOpen: false,
    selectedUserId: '',
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'SET_USERS_DATA':
        return { ...state, usersData: action.payload };
      case 'OPEN_DELETE_DIALOG':
        return { ...state, isDeleteDialogOpen: true, selectedUserId: action.payload };
      case 'CLOSE_DELETE_DIALOG':
        return { ...state, isDeleteDialogOpen: false, selectedUserId: '' };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState );
  const { token } = useAuth();

  useEffect(() => {
    getUsers(token)
      .then((data) => {
        dispatch({ type: 'SET_USERS_DATA', payload: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const openDeleteDialog = (userId: string) => {
    dispatch({ type: 'OPEN_DELETE_DIALOG', payload: userId });
  };

  const deleteUser = (userId: string) => {
    deleteUsers(token, userId)
      .then(() => {
        dispatch({ type: 'SET_USERS_DATA', payload: state.usersData.filter((user: Users) => user._id !== userId) });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeDeleteDialog = () => {
    dispatch({ type: 'CLOSE_DELETE_DIALOG' });
  };

  const tableHeaders = ['email', 'role', 'options'];

  return (
    <>
      <CustomTable data={state.usersData} headers={tableHeaders} onDelete={openDeleteDialog}/>
      <DeleteDialog open={state.isDeleteDialogOpen} onCancel={closeDeleteDialog} onDelete={() => deleteUser(state.selectedUserId)} />
    </>
  );
};
