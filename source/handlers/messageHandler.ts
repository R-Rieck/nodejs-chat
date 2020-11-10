import { Messages } from "../database/sampleData";
import { Message } from "../types/UserModel";
import { v4 as uuidv4 } from 'uuid'

export const addMessage = (message: Message): string => {
    const messageExist = Messages.some(element => element.id === message.id)

    if (!messageExist) {
        Messages.push({ ...message, id: uuidv4() })
        return "Added Message to Database Successfully!"
    }
    else {
        return "User already exist!"
    }
}

export const deleteMessage = (id: string): string => {
    const messageExist = Messages.some(element => element.id === id)

    if (messageExist) {
        //Get new Copie of Array without the Deleted message
        const Cleanedlist = Messages.filter((message: Message) => message.id !== id)

        //Clear the old List
        Messages.length = 0

        //push every User of the Copie into the Users List
        Cleanedlist.forEach((message: Message) => Messages.push(message));

        return "Deleted Message from Database Successfully!"
    }
    else {
        return "Message doesn't exist!"
    }
}
