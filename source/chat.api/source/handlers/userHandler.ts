import { User } from "../types/UserModel";
import mongoose from 'mongoose';
import userSchema from '../database/models/user';

export const getUserById = async (id: string) => {
    const user = userSchema.findById(id).exec().then(result => result)

    return await user;
}

export const addUser = async (user: User): Promise<any> => {
    const dbUser = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        username: user.username,
        email: user.email,
        createdAt: new Date(),
        password: user.password
    })

    const reponse = userSchema.findOne({ username: user.username, email: user.email }).exec().then((result: mongoose.MongooseDocument | null) => {
        if (result === null) {
            dbUser.save();
            return `user with ID: ${user._id} created`
        }
        else return `user with ID: ${result._id} exists`
    });

    return await reponse;
}

export const deleteUser = async (id: string): Promise<any> => {
    const reponse = userSchema.findById(id).exec().then(result => {
        if (result !== null) {
            result.deleteOne();
            return `user with ID: ${result._id} deleted`
        }
        else
            return `cannot find user with ID: ${id}`
    })
    return await reponse;
}

export const updateUser = async (user: User, id: string): Promise<any> => {
    const response = userSchema.updateOne({ _id: id }, { ...user }).exec().then(result => {
        if (result.n > 0) {
            return `user with ID: ${id} updated`
        }
        else
            return `cannot find user with ID: ${id}`
    })

    return await response;
}