export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
}

export interface Message {
    id: string;
    text: string;
    userId: string;
}