import { ICourse } from "../../models/db/planner_models/course";
import { ISection } from "../../models/db/planner_models/sections";
import { nanoid } from "nanoid";
import { CourseGroupModel, ICourseGroup } from "../../models/db/planner_models/course_group";
import { Exception } from "../../utils/errors/exception";
import { ErrorCode } from "../../utils/errors/error_codes";
import CourseGroup from "./course_group";

/**
 * Class represents a course. Multiple courses can exist per user.
 * A course stores all the sections of the course.
 */

export default class Course {

    /**
     * Initializes a new Course object.
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
     */
    public async register(): Promise<{ courseId: string }> {
        const newCourse: ICourse = {
            _id: this._id,
            _courseGroupId: this._courseGroupId,
            name: this._name,
            sections: this._sections
        }
        await CourseGroup.updateCourse(newCourse, this._courseGroupId);
        return { courseId: this._id }
    }

    /**
     * @param courseId id of the course to search for.
     * @param userId id of the user requesting the course.
     * @return course object.
     */
    public static async getCourse(courseId: string, userId: string): Promise<ICourse> {
        const course: ICourseGroup = await CourseGroupModel.findOne({ _userId: userId });
        for (let i = 0; i < course.courses.length; i++) {
            if (course.courses[i]._id == courseId) {
                return course.courses[i];
            }
        }
        throw new Exception(ErrorCode.NotFound, `Cannot find course with id: ${courseId}`);
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