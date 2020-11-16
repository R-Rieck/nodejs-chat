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
            unique: true,
            type: String
        },
        email: {
            required: true,
            unique: true,
            type: String
        },
        createdAt: {
            required: true,
            unique: true,
            type: Date
        }
    },
    {
        timestamps: true
    }
)

userSchema.statics.findByLogin = async function (login: string) {
    let user = await this.findOne({
        username: login
    })

    if (!user) {
        user = await this.findOne({ email: login })
    }

    return user;
}

const user = mongoose.model('User', userSchema)

export default user;
