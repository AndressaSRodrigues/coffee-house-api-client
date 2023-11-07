import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Orders } from '../../interfaces/Orders';
import { getOrders } from '../../services/orders';
import { CustomTable } from '../Shared/Table';

export default function OrdersTable() {
    const [orders, setOrders] = useState<Orders[]>([]);
    const { token } = useAuth();

    useEffect(() => {
        getOrders(token)
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [token])

    const tableHeaders = ['client', 'products', 'status', 'manage'];

    const productRenderer = (order: Orders) => (
        <ul>
            {order.products.map((productItem) => (
                <li key={productItem._id}>
                    {productItem.qty}x {productItem.product.name}
                </li>
            ))}
        </ul>
    );

    return (
        <CustomTable data={orders} headers={tableHeaders} productRenderer={productRenderer} />
    )
};