import { Message } from "../types/UserModel";
import messageSchema from '../database/models/message'
import mongoose from 'mongoose';
import { resolveProjectReferencePath } from "typescript";

export const getMessagesFromUser = async (userId: string): Promise<any> => {

}

export const getSingleMessage = async (id: string): Promise<any> => {

}

export const addMessage = async (msg: Message): Promise<any> => {
    const message = new messageSchema({
        _id: new mongoose.Types.ObjectId(),
        text: msg.text,
        createdAt: new Date(),
        userId: msg.userId
    })

    const response = messageSchema
        .findOne({ _id: msg._id })
        .exec()
        .then((result: mongoose.MongooseDocument | null) => {
            if (result === null) {
                message.save();
                return 'message saved'
            }
            else {
                return 'message with the same ID Exist'
            }
        })

    return await response;
}

export const deleteMessage = async (id: string): Promise<any> => {
    const response = messageSchema.findById(id).exec().then((result: mongoose.Document | null) => {
        if (result !== null) {
            result.deleteOne()
            return `message with ID: ${result.id} deleted`
        }
        else return 'message not found'
    })

    return await response;
}

export const updateMessage = async (id: string): Promise<any> => {

}
