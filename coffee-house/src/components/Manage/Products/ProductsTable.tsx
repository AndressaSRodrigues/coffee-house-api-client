import { useEffect, useReducer } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Products } from '../../../interfaces/Products';
import { deleteProduct, getProducts } from '../../../services/products';
import { useAuth } from '../../../context/AuthContext';
import { CustomTable } from '../../Shared/Table';
import DeleteDialog from '../../Shared/Dialog';

export default function ProductsTable() {
  interface State {
    products: Products[];
    isDeleteDialogOpen: boolean;
    productId: string;
  };

  interface Action {
    type: string;
    payload?: any;
  };

  const initialState = {
    products: [],
    isDeleteDialogOpen: false,
    productId: '',
  };

  const reducer = (state: State, action: Action) => {
    switch(action.type) {
      case 'SET_PRODUCTS':
        return { ...state, products: action.payload };
      case 'OPEN_DELETE_DIALOG':
        return { ...state, isDeleteDialogOpen: true, productId: action.payload };
      case 'CLOSE_DELETE_DIALOG':
        return { ...state, isDeleteDialogOpen: false, productId: '' };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(token)
      .then((data) => {
        dispatch({ type: 'SET_PRODUCTS', payload: data})
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const openDeleteDialog = (id: string) => {
    dispatch({ type: 'OPEN_DELETE_DIALOG', payload: id });
  };

  const deleteUser = (id: string) => {
    deleteProduct(token, id)
      .then(() => {
        dispatch({ type: 'SET_PRODUCTS', payload: state.products.filter((product: Products) => product._id !== id) });
      })
      .catch((error) => {
        console.error(error, 'Failed to delete product.')
      })
  };

  const closeDeleteDialog = () => {
    dispatch({ type: 'CLOSE_DELETE_DIALOG' });
  };

  const openEditPage = (id: string) => {
    navigate(`edit/${id}`);
  };

  const tableHeaders = ['name', 'price', 'image', 'type', 'options'];

  return (
    <>
      <Button><Link to={'/manage'}>Manage</Link></Button>
      <Button><Link to={'/manage/products/new'}>Add Product</Link></Button>
      <CustomTable
        data={state.products}
        headers={tableHeaders}
        onDelete={openDeleteDialog}
        onEdit={openEditPage} />
      <DeleteDialog
        message={`Would you like to delete this product?`}
        open={state.isDeleteDialogOpen}
        onCancel={closeDeleteDialog}
        onDelete={() => deleteUser(state.productId)} />
    </>
  );
};
