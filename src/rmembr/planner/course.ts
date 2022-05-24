import { ICourse } from "../../models/db/planner_models/course";
import { ISection } from "../../models/db/planner_models/sections";
import { nanoid } from "nanoid";
import { CourseGroupModel, ICourseGroup } from "../../models/db/planner_models/course_group";
import { Exception } from "../../utils/errors/exception";
import { ErrorCode } from "../../utils/errors/error_codes";
import { ICreateCourseResponse } from "../../models/response/response_models";
import { User } from "../user/user";
import CourseGroup from "./course_group";

/**
 * Class represents a course. Multiple courses can exist per user.
 * A course stores all the sections of the course.
 */

export default class Course {

    /**
     * Initializes a new Course object.
     * @param courseObj optional course object. Use existing fields if provided.
     */
    constructor(courseObj?: ICourse) {
        if (courseObj._id == null) {
            this._id = nanoid();
        } else {
            this._id = courseObj._id;
        }
        this._courseGroupId = courseObj._courseGroupId;
        this._name = courseObj.name;
        this._sections = courseObj.sections;
    }

    /**
     * Creates a new course entry document in Mongo DB.
     * @returns the Course object associated with the new entry.
     */
    public async register(): Promise<ICreateCourseResponse> {
        const newCourse: ICourse = {
            _id: this._id,
            _courseGroupId: this._courseGroupId,
            name: this._name,
            sections: this._sections
        }
        const updatedCourse: ICourse = await CourseGroup.addCourse(newCourse, this._courseGroupId);
        return { course: updatedCourse };
    }


    /**
     * Deletes a course object from the courses array in CourseGroup.
     * @return the deleted course as a Course object.
     */
    public async deleteCourse(): Promise<Course> {
        const deleted: ICourse = await CourseGroupModel.findOneAndUpdate(
            { _id: this._courseGroupId },
            { $pull: { courses: { _id: this._id } } },
            { new: true }
        );
        return new Course(deleted);
    }

    /**
     * Updates a course in the courses array. Deletes the existing course
     * in the array and adds the new course given by the request object.
     * @param courseobj new object which will replace the old one.
     * @param user user object to provide with the courseGroupId.
     * @return a new Course object which was just added.
     */
    public async updateCourse(courseObj: Course, user: User): Promise<Course> {
        await this.deleteCourse();
        const newCourse: ICourse = await CourseGroup.addCourse(courseObj.object, user.courseGroupId);
        return new Course(newCourse);
    }

    /**
     * Returns this course's fields as an ICourse object.
     * @return ICourse object type from this._[field].
     */
    public get object(): ICourse {
        return {
            _id: this._id, 
            _courseGroupId: this.courseGroupId, 
            name: this.name, 
            sections: this.sections
        }
    }

    /**
     * Returns a course object based on the course and user ID.
     * @param courseId id of the course to search for.
     * @param userId id of the user requesting the course.
     * @return course object.
     */
    public static async getCourse(courseId: string, userId: string): Promise<Course> {
        const course: ICourseGroup = await CourseGroupModel.findOne({ _userId: userId });
        const courseObj = course.courses.find((obj) => { return obj._id == courseId });
        if (courseObj == undefined) {
            throw new Exception(ErrorCode.NotFound, `Cannot find course with id: ${courseId}`);
        }
        return new Course(courseObj);
    }

    /**
     * @return the _id field.
     */
    public get id() {
        return this._id;
    }

    /**
     * @return the _courseGroupId field.
     */
    public get courseGroupId() {
        return this._courseGroupId;
    }

    /**
     * @return the _name field.
     */
    public get name() {
        return this._name;
    }

    /**
     * @return the _sections field.
     */
    public get sections() {
        return this._sections;
    }

    /** Course ID. */
    private _id: string;

    /** Course group ID associated with the course. */
    private _courseGroupId: string;

    /** Name of the course. */
    private _name: string;

    /** Sections stored under this course. */
    private _sections: ISection[] = [];

}