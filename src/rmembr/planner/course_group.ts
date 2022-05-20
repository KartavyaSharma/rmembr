import { Response } from "express";
import { ICourse } from "../../models/db/planner_models/course";
import { User } from "../user";
import { nanoid } from "nanoid";
import { CourseGroupModel, ICourseGroup } from "../../models/db/planner_models/course_group";
import { Exception } from "../../utils/errors/exception";
import { ErrorCode } from "../../utils/errors/error_codes";
import { ICourseGroupResponse } from "../../models/response/response_models";

/**
 * Class represent a course group. Only one of these exist per user.
 * A course group stores all the active courses for a user. The course-group
 * screen will represent a list of courses.
 */

export default class CourseGroup {

    /**
     * Initializes a new course-group for a new user.
     * @param userObj object with IUser properties.
     */
    constructor(userObj: User) {
        this._userId = userObj.id;
        this._id = nanoid(10);
        this.name = `${userObj.name}'s Courses`
    }

    /**
     * Creates a new entry in Mongo DB for a course group. This function
     * should only be called when a new user is created. There can only be
     * one course group per user.
     */
    public async initialize(): Promise<ICourseGroupResponse> {
        // check if another course group already exists for this user.
        const groupExists: ICourseGroup = await CourseGroupModel.findOne({ _userId: this._userId });
        if (groupExists) {
            throw new Exception(ErrorCode.UnknownError, "Only one course group per user.");
        }
        const newCourseGroup: ICourseGroup = {
            _id: this._id,
            _userId: this._userId,
            name: this.name,
        }
        const created = await CourseGroupModel.create(newCourseGroup);
        return { name: this.name, courses: this.courses }
    }

    /**
     * Returns a list of all courses inside a course group.
     * @return list of courses in this course group.
     */
    public async courseList(): Promise<ICourse[]> {
        await this.updateCourses();
        return this.courses;
    }

    /**
     * Updates the this.courses array with the latest
     * courses from mongo.
     */
    public async updateCourses(): Promise<void> {
        const group: ICourseGroup = await CourseGroupModel.findOne({ _userId: this._userId });
        this.courses = group.courses;
    }

    /** 
     * Sets the response object for course group functions.
     * @param res Response object from the route caller.
     * */
     public set resObj(res: Response) {
        this._resObj = res;
    }

    /** res object with which all course group functions respond to. */
    private _resObj: Response;

    /** Course group user's ID. */
    private _userId: string;

    /** Course group's ID. */
    private _id: string;

    /** List of courses in course group. */
    private courses: ICourse[] = [];

    /** Name of course group. */
    private name: string;
}