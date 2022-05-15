import { Request, Response } from "express";
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
    constructor(userObj: IUser) {
        this._email = userObj.email;
        this._name = userObj.name;
        this._password = userObj.password;
        this._Id = ulid();
    }

    /**
     * Create new user and hash password (done by the Auth module).
     */
    public async createUser() {
        // Check if user exists
        const userExists: IUser = await UserModel.findOne({ email: this._email });
        if (userExists) {
            this._resObj.status(500).send("Duplicate entry error");
            return;
        }
        const newAuth = new Auth();
        const passwordHash: string = newAuth.generateHash(this._password);
        const newUser: IUser = {
            _id: this._Id,
            email: this._email,
            name: this._name,
            password: passwordHash
        }
        const created = await UserModel.create(newUser);
        this._resObj.send({ done: created.name });
    }

    /**
     * Returns a user based on the email identifier.
     * @param email used as a unique identifier for the user.
     */
    public static async getUser(email: string): Promise<User> {
        const user: IUser = await UserModel.findOne({ email: email })
        if (user == null) return null;
        return new User(user);
    }

    /**
     * Extract Email, Name, and Password from the body of the request object.
     * @param req request object from the client side, with nothing changed.
     * @returns { email, name, password } as an object.
     */
     public static extractUser(req: Request): IUser {
        const { email, name, password } = req.body;
        return { email, name, password };
    }

    /** Sets the response object for User functions. */
    public set resObj(res: Response) {
        this._resObj = res;
    }

    /**
     * Returns the User's email.
     */
    public get email() {
        return this._email;
    }

    /**
     * Returns the User's ID.
     */
    public get id() {
        return this._Id;
    }
    
    /** 
     * Returns the password field for this User. 
     * */
    public get password() {
        return this._password;
    }

    /** User's ID */
    private _Id: string;

    /** User's Email */
    private _email: string;

    /** User's Name */
    private _name: string;

    /** User's Password */
    private _password: string;

    /** res object with which all user functions respond to. */
    private _resObj: Response;

}