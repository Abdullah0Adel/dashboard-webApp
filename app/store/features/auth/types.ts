export interface User {
    id: number;
    userName: string;
    email: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface LogingPayload {
    identifier: string; //username OR email
    password: string;
}

export interface StrapiAuthResponse {
    jwt: string;
    user: User
} 