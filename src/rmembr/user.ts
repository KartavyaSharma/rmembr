import { Request, Response } from "express";
import { Exception } from "../utils/errors/exception";
import { ErrorCode } from "../utils/errors/error_codes";
import { nanoid } from "nanoid";
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
     * @param userObj JS Object with all the IUser properties.
     */
    constructor(userObj: IUser) {
        this._email = userObj.email;
        this._name = userObj.name;
        this._password = userObj.password;
        this._Id = nanoid();
    }

    /**
     * Create new user and hash password (done by the Auth module).
     */
    public async createUser() {
        // Check if user exists
        const userExists: IUser = await UserModel.findOne({ email: this._email });
        if (userExists) {
            throw new Exception(ErrorCode.UnknownError, "Duplicate user.");
        }
        const passwordHash: string = Auth.generateHash(this._password);
        const newUser: IUser = {
            _id: this._Id,
            email: this._email,
            name: this._name,
            password: passwordHash
        }
        const created = await UserModel.create(newUser);
        const newUserToken = Auth.generateToken(this);
        this._resObj.send({ token: newUserToken });
    }

    /**
     * Returns a user based on the email identifier.
     * @param email used as a unique identifier for the user.
     * @return new User instance with the given email.
     */
    public static async getUser(email: string): Promise<User> {
        const user: IUser = await UserModel.findOne({ email: email })
        if (user == null) {
            throw new Exception(ErrorCode.NotFound, "User not found.");
        }
        return new User(user);
    }

    /**
     * Extract Email, Name, and Password from the body of the request object.
     * @param req request object from the client side, with nothing changed.
     * @return { email, name, password } as an object.
     */
    public static extractUser(req: Request): IUser {
        try {
            const { email, name, password } = req.body;
            return { email, name, password };
        } catch (err) {
            throw new Exception(ErrorCode.NotFound, "Request didn't contain all User credentials.");
        }
    }

    /** 
     * Sets the response object for User functions.
     * @param res Response object from the route caller.
     * */
    public set resObj(res: Response) {
        this._resObj = res;
    }

    /**
     * Returns the User's email.
     * @return this User's email field.
     */
    public get email() {
        return this._email;
    }

    /**
     * Returns the User's ID.
     * @return this User's ID field.
     */
    public get id() {
        return this._Id;
    }

    /** 
     * Returns the password field for this User.
     * @return this User's password.
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