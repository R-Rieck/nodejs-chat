import { Message, User } from "../types/UserModel";
import { v4 as uuidv4 } from 'uuid'

const idFirstUser: string = uuidv4(),
    idSecondUser: string = uuidv4()

export let Users: User[] = [
    {
        id: idFirstUser,
        password: "CatLover123",
        username: "CatsAreSweet",
        createdAt: new Date(),
        email: 'cats@catmail.com'
    },
    {
        id: idSecondUser,
        password: "DogLover123",
        username: "DogsAreSweet",
        createdAt: new Date(),
        email: 'dogs@dogmail.com'
    }
]

export let Messages: Message[] = [
    {
        id: uuidv4(),
        text: "I like cats more than Dogs",
        userId: idFirstUser
    },
    {
        id: uuidv4(),
        text: "But Why?",
        userId: idSecondUser
    },
    {
        id: uuidv4(),
        text: "I don't have to go outside :D",
        userId: idFirstUser
    },
]