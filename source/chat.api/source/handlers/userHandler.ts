import { User } from "../types/UserModel";
import mongoose, { Error, Mongoose } from 'mongoose';
import userSchema from '../database/models/user';
import user from "../database/models/user";
import { comparePassword, hashPassword } from "../infrastructure/passwordEncrypter";
import fs from "fs";
import path from "path";
import { LogOnError } from "./errorHandler";
import { response } from "express";

export const getUserById = async (id: string) => {
    const response = await userSchema
        .findById(id)
        .exec()
        .then(result => result)
        .catch((err: Error) => {
            LogOnError(err)
        })

    return response;
}

export const getUserByName = async (body: { username: string }) => {
    const response = await userSchema
        .findOne({ username: body.username })
        .exec()
        .then(result => result)
        .catch((err: Error) => {
            LogOnError(err)
        })

    return response === null ? false : response;
}

export const getContacts = async (id: string) => {
    const response = await userSchema
        .findById(id)
        .select("contacts")
        .exec()
        .then(result => result)
        .catch((err: Error) => {
            LogOnError(err)
        })

    if (response !== null && response instanceof mongoose.Document)
        return await userSchema.find({ _id: { $in: response.contacts } });

    return false;
}

export const validateUser = async (credentials: { login: string, password: string }) => {
    const userObj = await userSchema.findOne({
        $or: [
            { 'email': credentials.login },
            { 'username': credentials.login }
        ]
    })

    if (userObj === null)
        return false;

    const isPasswordEqual = await comparePassword(credentials.password, userObj.toJSON().password);

    if (isPasswordEqual)
        return userObj
}

export const addUser = async (user: User): Promise<any> => {
    const dbUser = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        username: user.username,
        email: user.email,
        createdAt: new Date(),
        password: await hashPassword(user.password),
        profilePicture: {
            data: fs.readFileSync(path.join(__dirname + '../../../uploads/placeholder/image-placeholder.png'), {
                encoding: 'base64'
            }),
            contentType: 'image/png'
        }
    })

    const reponse = userSchema
        .findOne({ username: user.username, email: user.email })
        .exec()
        .then(async (result: mongoose.MongooseDocument | null) => {
            if (result === null) {
                const document = await dbUser.save().catch((err: mongoose.Error) => err);
                return document;
            }
            else return `user with ID: ${result._id} exists`
        })
        .catch((err: Error) => {
            LogOnError(err)
        })

    return await reponse;
}

export const updateAvatar = async (img: Express.Multer.File, id: string) => {
    const data = fs.readFileSync(img.path, { encoding: 'base64' });

    const avatar = {
        data,
        contentType: 'image/png'
    };

    const response = await userSchema
        .updateOne({ _id: id }, { profilePicture: avatar })
        .exec()
        .then(result => result.n > 0)
        .catch((err: Error) => {
            LogOnError(err)
        })

    if (response)
        return await userSchema.findById(id).select('profilePicture').exec()
}

export const updateContacts = async (id: string, contact: any) => {
    if (id === contact._id)
        return false;

    const exists = await userSchema.exists({ "contacts": contact._id });

    if (!exists) {
        const response = await userSchema
            .updateOne({ _id: id }, { $push: { contacts: contact._id } })
            .exec()
            .then(result => result.n > 0)
            .catch((err: Error) => {
                LogOnError(err)
            })



        if (response !== false) {
            const updatedUser = await userSchema
                .findById(id)
                .select('contacts')
                .then(result => result)
                .catch((err: Error) => {
                    LogOnError(err)
                })

            if (updatedUser !== null && updatedUser instanceof mongoose.Document) {
                const users = await userSchema.find({ _id: { $in: updatedUser.contacts } })

                return users;
            }
        }

        else return false;
    }

    return false;
}


export const updateUser = async (user: User, id: string): Promise<any> => {
    const response = userSchema
        .updateOne({ _id: id }, { username: user.username, email: user.email })
        .exec()
        .then(result => result.n > 0)
        .catch((err: Error) => {
            LogOnError(err)
        })

    if (response)
        return await userSchema.findById(id).exec();
}

export const deleteUser = async (id: string): Promise<any> => {
    const reponse = await userSchema
        .findById(id)
        .exec()
        .then(result => {
            if (result !== null) {
                result.deleteOne();
                return `user with ID: ${result._id} deleted`
            }
            else
                return `cannot find user with ID: ${id}`
        })
        .catch((err: Error) => {
            LogOnError(err)
        })
}
