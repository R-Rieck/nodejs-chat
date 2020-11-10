import { Users } from "../database/sampleData";
import { User } from "../types/UserModel";
import { v4 as uuidv4 } from 'uuid'

export const addUser = (user: User): string => {
    const userExists = Users.some(element => element.username === user.username)

    if (!userExists) {
        Users.push({ ...user, id: uuidv4() })
        return "Added User to Database Successfully!"
    }
    else {
        return "User already exist!"
    }
}

export const deleteUser = (id: string): string => {
    const userExists = Users.some(element => element.id === id)

    if (userExists) {
        //Get new Copie of Array without the Deleted User
        const Cleanedlist = Users.filter((user: User) => user.id !== id)

        //Clear the old List
        Users.length = 0

        //push every User of the Copie into the Users List
        Cleanedlist.forEach((user: User) => Users.push(user));

        return "Deleted User from Database Successfully!"
    }
    else {
        return "User doesn't exist!"
    }
}
