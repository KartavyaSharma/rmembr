import jwt = require('jsonwebtoken');
import { hashSync, compareSync } from 'bcryptjs';
import { User } from '../user';
import { IUser } from '../../models/db/user';
import { Exception } from '../../utils/errors/exception';
import { ErrorCode } from '../../utils/errors/error_codes';

/**
 * Class contains all the methods used to initiate new user creation
 * and authenticaiton of existing users. New user creation is handled
 * by the ../user.ts module.
 */
export class Auth {

    static readonly saltRounds: number = 10;
    
    /**
     * Returns the hash for a password using the bcrypt library.
     * @param password input password for hash.
     * @return the hash for the password the user has enetered.
     */
    public generateHash(password: string): string {
        const hashed: string = hashSync(password, Auth.saltRounds);
        return hashed;
    }

    /**
     * Authenticates user based on their email ID. Compares hash
     * of input password with that of stored in the DB.
     * @param email user identifier to retrieve hash.
     * @param password from login form input field.
     * @return a Promise containing a boolean value for if the password is correct.
     */
    public async authUser(email: string, password: string): Promise<User> {
        const user: User = await User.getUser(email);
        if (!compareSync(password, user.password)) {
            throw new Exception(ErrorCode.Unauthenticated, "Incorrect Password.");
        }
        return user;
    }

    /**
     * Generates and returns a JWT authentication token that is formed usin
     * a User's id, and email.
     * @param user for which this token is being generated.
     * @return JWT token to pass with each request to the API.
     */
    public generateToken(user: User): string {
        const token = jwt.sign({_id: user.id, email: user.email}, process.env.TOKEN_SECRET, {
            expiresIn: "24h"
        });
        return token;
    }

    /**
     * Verifies an existing JWT authentication token. 
     */
    public verifyToken(token: string): IUser {
        try {
            const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
            return tokenData as {_id: string, email: string};
        } catch (error) {
            return null;
        }
    }

}