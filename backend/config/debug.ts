import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    database: {
        uri: process.env.TEST_MONGO_URI,
    },
    token: {
        secret: process.env.TOKEN_SECRET,
        expiresIn: process.env.EXPIRE_IN
    },
    test: {
        log: console.log
    }
}