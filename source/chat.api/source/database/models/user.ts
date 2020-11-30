import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        username: {
            required: true,
            unique: true,
            type: String
        },
        password: {
            required: true,
            unique: false,
            type: String
        },
        email: {
            required: true,
            unique: true,
            type: String
        },
        createdAt: {
            required: true,
            unique: false,
            type: Date
        }
    },
    {
        timestamps: true
    }
)

const user = mongoose.model('User', userSchema)

export default user;
