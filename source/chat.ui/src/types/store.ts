import { User } from "./user";

export type UserContext = {
    user: User,
    isValid: boolean | undefined,
    errorMessage: string | undefined,
    suggestedUser: User | undefined,
    currentChatUser: User | undefined,
    functions: Partial<{
        setUser: (user: User) => Promise<boolean>;
        userRegistration: (user: User) => Promise<boolean>;
        getContactByName: (name: string) => void;
        addContact: (name: string) => void;
        getContacts: () => Promise<boolean>;
        setCurrentChatUser: (user: User) => void;
        updateUser: (user: Partial<User>) => void;
        updateAvatar: (file: File) => void
    }>
}
