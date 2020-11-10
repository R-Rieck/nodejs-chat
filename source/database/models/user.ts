import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        id: {
            required: true,
            unique: true,
            type: String
        },
        username: {
            required: true,
            unique: true,
            type: String
        },
        password: {
            required: true,
            unique: true,
            type: String
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