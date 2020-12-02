export type User = {
    username: string,
    email: string,
    password: string,
    profilePicture: {
        data: {
            type: string;
            data: number[];
            contentType: string
        }
    } | undefined;
}