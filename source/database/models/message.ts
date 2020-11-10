import mongoose, { mongo } from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        id: {
            required: true,
            unique: true,
            type: String
        },
        text: {
            required: true,
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const message = mongoose.model('Message', messageSchema)

export default message;