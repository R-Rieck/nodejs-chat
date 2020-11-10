import { User } from "../types/UserModel";
import mongoose from 'mongoose';
import userSchema from '../database/models/user';

export const addUser = (user: User): string => {
    console.log(new Date())

    const dbUser = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        username: user.username,
        email: user.email,
        createdAt: new Date(),
        password: user.password
    })

    dbUser.save().then((result: any) => console.log(result)).catch((err: Error) => console.log(err.message))

    return 'success'
}

export const deleteUser = (id: string): string => {

    return "User doesn't exist!"
}
