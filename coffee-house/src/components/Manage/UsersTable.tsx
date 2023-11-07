import { Users } from '../../interfaces/Users';
import { getUsers, deleteUsers } from '../../services/users';
import { useAuth } from '../../context/AuthContext';
import { CustomTable } from '../Shared/Table';
import DeleteDialog from '../Shared/Dialog';
import { useState, useEffect } from 'react';

export default function UsersTable() {
  const [usersData, setUsersData] = useState<Users[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    getUsers(token)
      .then((data) => {
        console.log(data)
        setUsersData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const deleteUser = (userId: string) => {
    deleteUsers(token, userId)
      .then(() => {
        console.log('User deleted');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const openDeleteDialog = (userId: string) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedUserId('');
    setDeleteDialogOpen(false);
  };

  const tableHeaders = ['email', 'role', 'options'];

  return (
    <>
      <CustomTable data={usersData} headers={tableHeaders} onDelete={openDeleteDialog} />
      <DeleteDialog open={isDeleteDialogOpen} onCancel={closeDeleteDialog} onDelete={() => deleteUser(selectedUserId)} />
    </>
  );
}
