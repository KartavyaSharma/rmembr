import jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
/**
 * Class contains all the methods used to create a new user and authenticating
 * existing ones.
 */

class Auth {

    /**
     * Creates a new JWT for a new user. Function does not generate new
     * user, just a session JWT.
     * @param username username with which to sign new token with.
     */
    public createToken(username: string) {
        return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    }

    /**
     * Authenticates jwt token given from the request.
     * @param req request from caller at route.
     * @param res response sent, only if error in script.
     * @param next next function to be called from this middleware.
     */
    public authenticate(req: Request, res: Response, next: any): void {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            res.sendStatus(401);
            return;
        }

        jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
            console.log(err);
            if (err) {
                res.sendStatus(403);
                return;
            }
            // req.user = user;
        });

        next();
    }

}