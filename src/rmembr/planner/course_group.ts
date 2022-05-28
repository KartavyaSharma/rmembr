import { ICourse } from "../../models/db/planner_models/course";
import { User } from "../user/user";
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
        this._id = userObj.courseGroupId == null ? nanoid(10) : userObj.courseGroupId;
        this.name = `${userObj.name}'s Courses`
    }

    /**
     * Creates a new entry in Mongo DB for a course group. This function
     * should only be called when a new user is created. There can only be
     * one course group per user.
     * @returns an ICourseGroupResponse object with the course group details.
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
     * @returns list of courses in this course group.
     */
    public async courseList(): Promise<ICourseGroupResponse> {
        await this.refreshCourses();
        const resObj: ICourseGroupResponse = {
            name: this.name,
            courses: this.courses.sort((a: ICourse, b: ICourse) => {
                if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                    return -1;
                }
                if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                    return 1;
                }
                return 0;
            })
        }
        return resObj; 
    }

    /**
     * Updates the this.courses array with the latest
     * courses from mongo.
     */
    public async refreshCourses(): Promise<void> {
        const group: ICourseGroup = await CourseGroupModel.findOne({ _userId: this._userId });
        this.courses = group.courses;
    }

    /**
     * Updates the courses array in this course group with
     * a new course object.
     * @param courseObj object representing course to be added to Mongo.
     * @param courseGroupId id for the course group where the new course will up put.
     * @returns the course that was just added to the course group with the id courseObj._id.
     */
    public static async addCourse(courseObj: ICourse, courseGroupId: string): Promise<ICourse> {
        const created: ICourseGroup = await CourseGroupModel.findOneAndUpdate(
            { _id: courseGroupId }, 
            { $push: { courses: courseObj } },
            { new: true }
        );
        return created.courses.find((obj) => { return obj._id == courseObj._id });
    }

    /**
     * Return the course group ID.
     * @returns this course group's ID
     */
    public get id() {
        return this._id;
    }

    /** Course group user's ID. */
    private _userId: string;

    /** Course group's ID. */
    private _id: string;

    /** List of courses in course group. */
    private courses: ICourse[] = [];

    /** Name of course group. */
    private name: string;
}