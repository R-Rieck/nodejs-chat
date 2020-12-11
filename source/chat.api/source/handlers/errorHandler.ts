import { Error } from 'mongoose'

export const LogOnError = (err: Error) => {
    if (err.name === 'mongoose') {
        console.error(err.message);
        console.error(err.stack);

        throw new Error(err.name)
    }
}

