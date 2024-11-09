export interface LoginResponse {
    token: string;
    user: {
        id: number;
        nombre: string;
        email: string;
        role: string;
    };
}
