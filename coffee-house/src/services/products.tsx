import { Products } from "../interfaces/Products";

const URL = 'http://localhost:8080/products';

export const getProducts = (token: string): Promise<Products[]> => {
    return fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error);
            });
          }
        return response.json() as Promise<Products[]>;
    })
    .catch(() => {
        throw new Error();
    });
};

export const deleteProduct = (token: string, id: string): Promise<Products[]> => {
    const url = `${URL}/${id}`;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then((response) => {
        return response.json();
    })
    .catch(() => {
        throw new Error();
    });
};
