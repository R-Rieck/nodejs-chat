export interface User {
    _id: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    profilePicture: {
        contentType: string;
        data: Buffer
    }
}

export interface Message {
    _id: string;
    text: string;
    userId: string;
}