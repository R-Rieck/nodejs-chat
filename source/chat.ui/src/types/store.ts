import { User } from "./user";

export type UserContext = {
    user: User,
    isValid: boolean,
    setUser: (user: User) => void;
}