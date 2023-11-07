export interface AuthResponse {
    accessToken: string,
    user: {
        _id: string,
        email: string,
        password: string,
        role: string,
    }
    error?: string;
};