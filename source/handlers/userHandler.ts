import { User } from "../types/UserModel";
import mongoose from 'mongoose';
import userSchema from '../database/models/user';

export const addUser = async (user: User): Promise<any> => {
    const dbUser = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        username: user.username,
        email: user.email,
        createdAt: new Date(),
        password: user.password
    })

    const message = userSchema.findOne({ username: user.username, email: user.email }).exec().then(result => {
        if (result === null) {
            dbUser.save();
            return `user with ID: ${user._id} created`
        }
        else return `user with ID: ${result._id} exists`
    });

    return await message;
}

export const deleteUser = async (id: string): Promise<any> => {
    const message = userSchema.findById(id).exec().then(result => {
        if (result !== null) {
            result.deleteOne();
            return `user with ID: ${result._id} deleted`
        }
        else
            return `cannot find user with ID: ${id}`
    })
    return await message;
}
