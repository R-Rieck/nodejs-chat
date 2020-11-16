import mongoose from 'mongoose';

const connectionstring = 'mongodb+srv://Pl4typus:' + process.env.MONGO_DB_PW + '@node-chat.1c0h8.mongodb.net/<dbname>?retryWrites=true&w=majority'

export const InitializeDatabase = () =>
    mongoose.connect(connectionstring, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })