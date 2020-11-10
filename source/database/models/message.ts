import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Message', messageSchema)