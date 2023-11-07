import { Products } from "../interfaces/Products";

const URL = 'http://localhost:8080/';

export const getProducts = (token: string): Promise<Products[]> => {
    return fetch(`${URL}products`, {
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
        throw new Error(`Unauthorized`);
    });
};
