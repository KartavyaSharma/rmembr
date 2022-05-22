import { NextFunction, Request, Response } from 'express';
import { Routes } from '../routes';
import { User } from '../../rmembr/user';
import { Auth } from '../../rmembr/auth/auth_engine';
import { IAuthRequest } from '../../models/request/request_models';
import { Utils } from '../../utils/server_utils';
import { 
    ICreateUser, 
    ICourseGroupResponse, 
    ICreateUserResponse, 
    ILoginResponse
} from '../../models/response/response_models';

/**
 * Class defining authentication routes and associated functions.
 * Client can create a new user (register), and client can log into
 * an existing user.
 * 
 * Calls methods from ../../rmembr/auth/
 */
export default class AuthRoutes extends Routes {

    /** Base URL for all authentication routes. */
    protected static readonly BASE = "/auth";

    /**
     * Initializes routes object from Routes abstract class.
     * New routes can be added using super().routes.[CRUD OP]();
     */
    constructor() {
        super();
    }

    protected createRoutes(): void {
        /**
         * Adds a route for creating a user. Route is at /create-user.
         * Creates a new user in the DB.
         */
        this._routes.post(`/create-user`, async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let token: ILoginResponse;
            let courseGroup: ICourseGroupResponse;
            try {
                newUser = new User(User.extractUser(req));
                token = await newUser.createUser();
                courseGroup = await newUser.createNewCourseGroup();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes(res, { courseGroup: courseGroup, token: token.token } as ICreateUserResponse);
        });

        /**
        * Adds a route for loggin in an existing user. Route is at /login.
        */
        this._routes.post(`/login`, async (req: Request, res: Response, next: NextFunction) => {
            const loginReq: IAuthRequest = req.body;
            let user: User;
            try {
                user = await Auth.authUser(loginReq.email, loginReq.password)
            } catch (err) {
                return next(err);
            }
            Utils.sendRes(res, { token: Auth.generateToken(user) } as ILoginResponse);
        });
    }
}