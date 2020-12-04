import { User } from "../types/UserModel";
import mongoose from 'mongoose';
import userSchema from '../database/models/user';
import user from "../database/models/user";
import { comparePassword, hashPassword } from "../infrastructure/passwordEncrypter";
import fs from "fs";
import path from "path";

export const getUserById = async (id: string) => {
    const user = await userSchema.findById(id).exec().then(result => result)

    return await user;
}

export const getUserByName = async (body: { username: string }) => {
    const user = await userSchema.findOne({ username: body.username }).exec().then(result => result)

    return await user === null ? false : user;
}

export const getContacts = async (id: string) => {
    const ids = await userSchema.findById(id).select("contacts").exec().then(result => result)

    if (ids !== null) {
        const contacts = await userSchema.find(ids)

        return await contacts;
    }

    return false;
}

export const validateUser = async (credentials: { login: string, password: string }) => {
    const userObj = await userSchema.findOne({
        $or: [
            { 'email': credentials.login },
            { 'username': credentials.login }
        ]
    })

    if (userObj === null) return false;
    if (await comparePassword(credentials.password, userObj && userObj.toJSON().password)) {
        
        return userObj
    }

    return false;
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

    const reponse = userSchema.findOne({ username: user.username, email: user.email }).exec().then(async (result: mongoose.MongooseDocument | null) => {
        if (result === null) {
            const document = await dbUser.save().catch((err: mongoose.Error) => err);
            return document;
        }
        else return `user with ID: ${result._id} exists`
    }).catch(err => console.log('CUSTOM ERROR: ', err)
    );

    console.log(await reponse);

    return await reponse;
}

export const updateAvatar = (img: Express.Multer.File, id: string) => {
    const data = fs.readFileSync(img.path, {encoding: 'base64'});

    const dbUser = {
        data,
        contentType: 'image/png'
    }
        ;

    console.log(dbUser);


    const response = userSchema.updateOne({ _id: id }, { profilePicture: dbUser }).exec().then(result => {
        if (result.n > 0) {
            return `user with ID: ${id} updated`
        }
        else
            return `cannot find user with ID: ${id}`
    })

    return response
}

export const updateContacts = async (id: string, contact: any) => {
    const user = await userSchema.findById({ _id: contact._id }).exec().then(result => {
        if (result !== null) {
            return result;
        }
        else return false;
    })

    if (user !== false) {
        const response = await userSchema.updateOne({ _id: id }, { $push: { contacts: user} }).exec().then(result => {
            if (result.n > 0)
                return true;
            else
                return false;
        })

        if (response !== false) {
            const updatedUser = await userSchema.findById(id).select('contacts').exec().then(result => result)

            if (updatedUser !== null)
                return updatedUser;
        }

        else return false;
    }

    return false;
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
