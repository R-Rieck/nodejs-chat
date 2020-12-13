import mongoose, { mongo } from 'mongoose';

const requiredUniqueString = {
    required: true,
    unique: true,
    type: String,
}

const requiredButNotUnique = {
    required: true,
    unique: false
}

export interface UserDoc extends mongoose.Document {
    _id: string,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    profilePicture: {
        data: String,
        contentType: String
    },
    contacts: [],
    timestamps: true
}

const userSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        username: requiredUniqueString,
        email: requiredUniqueString,
        password: {
            ...requiredButNotUnique,
            type: String
        },
        createdAt: {
            requiredButNotUnique,
            type: Date
        },
        profilePicture: {
            data: String,
            contentType: String
        },
        contacts: {
            type: Array
        }
    },
    {
        timestamps: true
    }
)

const user = mongoose.model<UserDoc>('User', userSchema)

export default user;
