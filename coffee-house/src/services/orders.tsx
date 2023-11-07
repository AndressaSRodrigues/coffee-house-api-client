import { Orders } from "../interfaces/Orders";

const URL = 'http://localhost:8080/';

export const getOrders = (token: string): Promise<Orders[]> => {
    return fetch(`${URL}orders`, {
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
}