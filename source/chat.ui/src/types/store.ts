import { User } from "./user";

export type UserContext = {
    user: User,
    isValid: boolean | undefined,
    setUser: (user: User) => Promise<boolean>;
    userRegistration: (user: User) => Promise<boolean>
}