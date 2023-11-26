import { useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Orders } from '../../interfaces/Orders';
import { getOrders, deleteOrders } from '../../services/orders';
import { CustomTable } from '../Shared/Table';
import { Button } from '@mui/material';
import DeleteDialog from '../Shared/Dialog';

export default function OrdersTable() {

    interface State {
        ordersData: Orders[];
        isDeleteDialogOpen: boolean;
        orderId: string;
    }

    interface Action {
        type: string;
        payload?: any;
    }

    const initialState = {
        ordersData: [],
        isDeleteDialogOpen: false,
        orderId: '',
    };

    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case 'SET_ORDERS':
                return { ...state, ordersData: action.payload };
            case 'OPEN_DELETE_DIALOG':
                return { ...state, isDeleteDialogOpen: true, orderId: action.payload };
            case 'CLOSE_DELETE_DIALOG':
                return { ...state, isDeleteDialogOpen: false, orderId: '' };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getOrders(token)
            .then((data) => {
                dispatch({ type: 'SET_ORDERS', payload: data });
            })
            .catch((error) => {
                console.error(error);
            })
    }, [token])

    const tableHeaders = ['client', 'products', 'status', 'options', 'manage',];

    const productRenderer = (order: Orders) => (
        <ul>
            {order.products.map((productItem) => (
                <li key={productItem._id}>
                    {productItem.qty}x {productItem.product && productItem.product.name}
                </li>
            ))}
        </ul>
    );

    const openDeleteDialog = (id: string) => {
        dispatch({ type: 'OPEN_DELETE_DIALOG', payload: id });
    };

    const deleteOrder = (id: string) => {
        deleteOrders(token, id)
            .then(() => {
                dispatch({ type: 'SET_ORDERS', payload: state.ordersData.filter((order: Orders) => order._id !== id) });
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

    return (
        <>
            <Button><Link to={'/fronthouse'}>Front House</Link></Button>
            <Button><Link to={'/fronthouse/take-order'}>Take Order</Link></Button>
            <CustomTable
                data={state.ordersData}
                headers={tableHeaders}
                productRenderer={productRenderer}
                onDelete={openDeleteDialog}
                onEdit={openEditPage} />
            <DeleteDialog
                message={`Would you like to delete this order?`}
                open={state.isDeleteDialogOpen}
                onCancel={closeDeleteDialog}
                onDelete={() => deleteOrder(state.orderId)} />
        </>
    )
};