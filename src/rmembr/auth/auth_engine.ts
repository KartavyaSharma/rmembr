import jwt = require('jsonwebtoken');
import { genSalt, hash } from 'bcryptjs';

/**
 * Class contains all the methods used to initiate new user creation
 * and authenticaiton of existing users. New user creation is handled
 * by the ../user.ts module.
 */
export class Auth {

    static readonly saltRounds: number = 10;
    
    /**
     * Returns the hash for a password using the bcrypt library.
     */
    public async generateHash(password: string): Promise<string> {
        const salt: string = await genSalt(Auth.saltRounds);
        const hashed: string = await hash(password, salt);
        return hashed;
    }
}