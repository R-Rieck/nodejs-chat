import { User } from "../types/UserModel";
import mongoose from 'mongoose';
import userSchema from '../database/models/user';

export const addUser = (user: User): any => {

    const dbUser = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        username: user.username,
        email: user.email,
        createdAt: new Date(),
        password: user.password
    })

    userSchema.findOne({ username: user.username, email: user.email }).exec().then(result => {
        console.log(result)
        result === null ?
            dbUser.save() :
            console.log('user exists');
    });

    return "success"
}

export const deleteUser = (id: string): string => {

    return "User doesn't exist!"
}
