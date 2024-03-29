import { NextFunction, Request, Response } from "express";
import { Exception } from "../../utils/errors/exception";
import { ErrorCode } from "../../utils/errors/error_codes";
import { nanoid } from "nanoid";
import { IUser, UserModel } from "../../models/db/user/user";
import { Auth } from "../auth/auth_engine";
import { ICourseGroupResponse, IDeleteUserResponse, ILoginResponse } from "../../models/response/response_models";
import { Utils } from "../../utils/server_utils";
import { CourseGroupModel } from "../../models/db/planner_models/course_group";
import { defaultConf } from "../config_store/default_conf";
import { IUserClass, IUserClassStatic } from "../../models/server_models";
import { ISettings } from "../../models/db/user/settings";
import CourseGroup from "../planner/course_group";
import SubsectionGroup from "../planner/subsection/subsection_group";

/**
 * Class representing a user.
 * 
 * A user has a:
 *  - Id
 *  - Email
 *  - Name
 *  - Password
 *  - Course Group ID
 */

@Utils.staticImplements<IUserClassStatic>()
export default class User implements IUserClass {

    /** User's ID */
    private _Id: string;

    /** User's Email */
    private _email: string;

    /** User's Name */
    private _name: string;

    /** User's Password */
    private _password: string;

    /** ID associated with user's course group */
    private _courseGroupId: string;

    /** Settings object for user. */
    private _settings: ISettings;

    /**
     * Returns the User's email.
     * @return this User's email field.
     */
    public get email(): string {
        return this._email;
    }

    /**
     * Returns the User's ID.
     * @return this User's ID field.
     */
    public get id(): string {
        return this._Id;
    }

    /** 
     * Returns the password field for this User.
     * @return this User's password.
     * */
    public get password(): string {
        return this._password;
    }

    /**
     * Returns the name of the user.
     * @return name of the user.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Returns the course group ID associated with this user.
     * @return course group ID field
     */
    public get courseGroupId(): string {
        return this._courseGroupId;
    }

    /**
     * @returns user preferences. `defaultConf` by default.
     */
    public get settings(): ISettings {
        return this._settings;
    }

    /**
     * Initializes a new user with Id, Email, Name, and Password
     * @param userObj JS Object with all the IUser properties.
     */
    constructor(userObj: IUser) {
        this._email = userObj.email;
        this._name = userObj.name;
        this._password = userObj.password;
        this._Id = userObj._id == null ? nanoid() : userObj._id;
        this._courseGroupId = userObj.courseGroupId != null ? userObj.courseGroupId : null;
        this._settings = userObj.settings != null ? userObj.settings : defaultConf.settings;
    }

    /**
     * Create new user and hash password (done by the Auth module).
     */
    public async createUser(): Promise<ILoginResponse> {
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
            password: passwordHash,
            courseGroupId: this._courseGroupId,
            settings: this._settings,
        }
        const created = await UserModel.create(newUser);
        const newUserToken = Auth.generateToken(this);

        return { token: newUserToken }
    }

    public async createNewCourseGroup(): Promise<ICourseGroupResponse> {
        /** Creating a new course group for the user. */
        const newGroup: CourseGroup = new CourseGroup(this);
        this._courseGroupId = newGroup.id;
        const updated = await UserModel.findOneAndUpdate(
            { _id: this._Id },
            { $set: { courseGroupId: this._courseGroupId } },
            { new: true }
        );
        const courseGroupInfo: ICourseGroupResponse = await newGroup.initialize();
        return courseGroupInfo;
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
     * Deletes the user object from the database, along with the course group.
     * @param user object.
     * @returns true if deletion was successful, returns Error instance otherwise.
     */
    public static async delete(user: User): Promise<IDeleteUserResponse> {
        try {
            await UserModel.deleteOne({ _id: user.id });
            await CourseGroupModel.deleteOne({ _userId: user.id });
            const groups:SubsectionGroup[] = await SubsectionGroup.getAll(user.id);
            for (const group of groups) {
                await SubsectionGroup.destroy(group.id);
            }
        } catch (err) {
            return err;
        }
        return {
            user: `User ${user.name} deleted.`,
            courseGroup: `Course group ${user.name}'s courses deleted.`
        }
    }

    /**
     * Extract Email, Name, and Password from the body of the request object.
     * @param req request object from the client side, with nothing changed.
     * @return { email, name, password } as an object.
     */
    public static extractUser(req: Request): IUser {
        try {
            const { email, name, password } = req.body;
            if (!Utils.checkEmail(email)) {
                throw new Exception(ErrorCode.ValidationError, "Email not formatted correctly.");
            }
            return { email, name, password };
        } catch (err) {
            throw new Exception(ErrorCode.NotFound, "Request didn't contain all User credentials.");
        }
    }

    /**
     * Sets the user object in the request body. A middlware
     * function that goes on top of the router.
     * @param req object generated by express.
     */
    public static async setUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const newUser: User = await User.getUser(req.body.tokenData.email);
        req.body.user = newUser;
        next();
    }

}