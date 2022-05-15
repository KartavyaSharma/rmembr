import { Request, Response } from "express";
import { IAuthRequest } from "../models/request/request_models";
import { ulid } from "ulid";
import { IUser, UserModel } from "../models/db/user";
import { Auth } from "./auth/auth_engine";

/**
 * Class representing a user.
 * 
 * A user has a:
 *  - Id (primary key)
 *  - Email
 *  - Name
 *  - Password
 */
export class User {

    /**
     * Initializes a new user with Id, Email, Name, and Password
     * @param req Request object from the client
     * @param res Response object to be sent to the client.
     */
    constructor(req: Request, res: Response) {
        const userDetails: IAuthRequest = this.extractUser(req);
        this._email = userDetails.email;
        this._name = userDetails.name;
        this._password = userDetails.password;
        this._resObj = res;
    }

    /**
     * Extract Email, Name, and Password from the body of the request object.
     * @param req request object from the client side, with nothing changed.
     * @returns { Email, Name, Password } as an object.
     */
    private extractUser(req: Request): IAuthRequest {
        const { email, name, password } = req.body;
        return { email, name, password };
    }

    /**
     * Create new user and hash password (done by the Auth module).
     */
    public async createUser() {
        // Check if user exists
        const userExists = await UserModel.findOne({ email: this._email });
        if (userExists) {
            this._resObj.status(500).send("Duplicate entry error");
            return;
        }
        const newAuth = new Auth();
        const passwordHash: string = await newAuth.generateHash(this._password);
        const newUser: IUser = {
            _id: ulid(),
            email: this._email,
            name: this._name,
            password: passwordHash
        }
        const created = await UserModel.create(newUser);
        this._resObj.send({ done: true });
    }

    /** User's Email */
    private _email: string;

    /** User's Name */
    private _name: string;

    /** User's Password */
    private _password: string;

    /** res object with which all user functions respond to. */
    private _resObj: Response;

}