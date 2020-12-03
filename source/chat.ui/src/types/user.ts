export type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    contacts: User[] | undefined,
    profilePicture: Partial<ProfilePicture>;
}

export type ProfilePicture = {
    data: {
        type: string;
        data: number[];
        contentType: string
    }
}