export interface User {
    _id: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
}

export interface Message {
    _id: string;
    text: string;
    userId: string;
}