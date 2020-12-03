import { User } from "./user";

export type UserContext = {
    user: User,
    isValid: boolean | undefined,
    errorMessage: string | undefined
    functions: Partial<{
        setUser: (user: User) => Promise<boolean>;
        userRegistration: (user: User) => Promise<boolean>
    }>
}