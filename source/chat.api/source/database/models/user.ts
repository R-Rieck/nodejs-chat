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
            data: Buffer,
            contentType: String
        },
    },
    {
        timestamps: true
    }
)

const user = mongoose.model('User', userSchema)

export default user;
