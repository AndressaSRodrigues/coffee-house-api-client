import { Orders } from "../interfaces/Orders";

const URL = 'http://localhost:8080/orders';

export const getOrders = (token: string): Promise<Orders[]> => {
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
        return response.json() as Promise<Orders[]>;
    })
    .catch(() => {
        throw new Error(`Unauthorized`);
    })
};

export const getOrderById = (token: string, id: string): Promise<Orders> => {
    const url = `${URL}/${id}`;
    return fetch(url, {
        method: 'GET',
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
    })
}

export const deleteOrders = (token: string, id: string): Promise<Orders[]> => {
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