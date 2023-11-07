import { Users } from "../interfaces/Users";

const URL = 'http://localhost:8080/users';

export const getUsers = (token: string): Promise<Users[]> => {
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
        return response.json() as Promise<Users[]>;
    })
    .catch(() => {
        throw new Error(`Unauthorized`);
    });
};

export const deleteUsers = (token: string, _id: string): Promise<Users[]> => {
    const url = `${URL}/${_id}`;
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
        throw new Error(`Unauthorized`);
    });
};

