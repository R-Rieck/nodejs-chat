export type User = {
    username: string,
    email: string,
    password: string,
    profilePicture: Partial<ProfilePicture>;
}

export type ProfilePicture = {
    data: {
        type: string;
        data: number[];
        contentType: string
    }
}