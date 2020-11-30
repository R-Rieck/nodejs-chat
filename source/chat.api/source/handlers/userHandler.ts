import { User } from "../types/UserModel";
import mongoose from 'mongoose';
import userSchema from '../database/models/user';
import user from "../database/models/user";
import { comparePassword, hashPassword } from "../infrastructure/passwordEncrypter";
import { json } from "body-parser";

export const getUserById = async (id: string) => {
    const user = userSchema.findById(id).exec().then(result => result)

    return await user;
}

export const validateUser = async (credentials: { login: string, password: string }) => {
    const userObj = await userSchema.findOne({
        $or: [
            { 'email': credentials.login },
            { 'username': credentials.login }
        ]
    })

    if (userObj === null) return false;


    return await comparePassword(credentials.password, userObj && userObj.toJSON().password);
}

export const addUser = async (user: User): Promise<any> => {
    const dbUser = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        username: user.username,
        email: user.email,
        createdAt: new Date(),
        password: await hashPassword(user.password)
    })

    const reponse = userSchema.findOne({ username: user.username, email: user.email }).exec().then(async (result: mongoose.MongooseDocument | null) => {
        if (result === null) {
            const document = await dbUser.save().catch((err: mongoose.Error) => err);

            return document.toString().includes('email' || 'username') ? document : result;
        }
        else return `user with ID: ${result._id} exists`
    }).catch(err => console.log('CUSTOM ERROR: ', err)
    );


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
