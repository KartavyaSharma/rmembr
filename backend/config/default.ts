import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

export default {
    port: process.env.PORT,
    database: {
        uri: MONGO_URI,
    },
    token: {
        secret: process.env.TOKEN_SECRET,
        expiresIn: process.env.EXPIRE_IN
    }
}