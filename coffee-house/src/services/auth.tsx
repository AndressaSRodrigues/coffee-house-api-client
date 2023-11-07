import { AuthResponse } from '../interfaces/AuthResponse';

const URL = 'http://localhost:8080/';

export const auth = (email: string, password: string): Promise<AuthResponse> => {
    return fetch(`${URL}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                  throw new Error(data.error);
                });
              }
            return response.json() as Promise<AuthResponse>;
        })
        .catch(() => {
            throw new Error(`Unauthorized`);
        });
};
