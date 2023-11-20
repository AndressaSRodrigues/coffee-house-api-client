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

export const getUserById = (token: string, id: string | undefined): Promise<Users> => {
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

export const deleteUsers = (token: string, email: string): Promise<Users[]> => {
    const url = `${URL}/${email}`;
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
        throw new Error('Unauthorized');
    });
};

export const createUser = (token: string, data: object): Promise<Users> => {
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    .catch(() => {
        throw new Error('Failed to add new user.')
    });
};

export const editUser = (token: string, id: string | undefined, data: object | null): Promise<Users> => {
    const url = `${URL}/${id}`;
    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    .catch(() => {
        throw new Error();
    })
};