import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        text: {
            required: true,
            type: String
        },
        createdAt: {
            required: true,
            type: Date
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const message = mongoose.model('Message', messageSchema)

export default message;