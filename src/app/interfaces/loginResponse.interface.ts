export interface LoginResponse {
    token: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        team: string;
    };
}
