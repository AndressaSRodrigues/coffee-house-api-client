import { useEffect, useState } from 'react';
import { Products } from '../../interfaces/Products';
import { getProducts } from '../../services/products';
import { useAuth } from '../../context/AuthContext';
import { CustomTable } from '../Shared/Table';

export default function ProductsTable() {
  const [products, setProducts] = useState<Products[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    getProducts(token)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const tableHeaders = ['name', 'price', 'type', 'options'];

  return (
    <CustomTable data={products} headers={tableHeaders} />
  );
};
