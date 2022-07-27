import { nanoid } from "nanoid";
import { Exception } from "../../utils/errors/exception";
import { ErrorCode } from "../../utils/errors/error_codes";
import { ISection } from "../../models/db/planner_models/sections";
import { IDeleteSectionResponse } from "../../models/response/response_models";
import { CourseGroupModel } from "../../models/db/planner_models/course_group";
import { ICourseGroup } from "../../models/db/planner_models/course_group";
import { ICourse } from "../../models/db/planner_models/course";
import User from "../user/user";
import Course from "./course";
import SubsectionGroup from "./subsection/subsection_group";

/**
 * Class represents a section. Multiple sections can exist
 * for one user. A user can add, read, update and delete any
 * particular section. Sections are stored within courses.
 */

export default class Section {

    /** Section ID. */
    private _id: string;

    /** Course ID corresponding to section. */
    private _courseId: string;

    /** Name of section. */
    private _name: string;

    /** List of subsections stored inside the course. */
    private _subsectionGroupId: string;

    /**
     * Returns this sections fields as an ISection object.
     * @returns ISection object type from this._[field].
     */
    public get object(): ISection {
        return {
            _id: this._id,
            _courseId: this._courseId,
            name: this._name,
            subsectionGroupId: this._subsectionGroupId,
        }
    }

    /**
     * @returns this sections's ID.
     */
    public get id() {
        return this._id;
    }

    /**
     * @returns this section's course ID.
     */
    public get courseId() {
        return this._courseId;
    }

    /**
     * @returns this section's name.
     */
    public get name() {
        return this._name;
    }

    /** Returns subsection group ID associated with this section. */
    public get subsectionGroupId(): string {
        return this._subsectionGroupId;
    }

    /**
     * Initializes a new Section object. Can create a new section
     * either through the ISection interface (with filled fields),
     * or an empty one through the constructor.
     * @param sectionObj ISection object with all fields filled.
     */
    constructor(sectionObj?: ISection) {
        if (sectionObj._id == null) {
            this._id = nanoid();
        } else {
            this._id = sectionObj._id;
        }
        this._courseId = sectionObj._courseId;
        this._name = sectionObj.name;
        this._subsectionGroupId = sectionObj.subsectionGroupId == null ? nanoid() : sectionObj.subsectionGroupId;
    }

    /**
     * Adds new section entry to a course in database.
     * @param userId for user associated with this section.
     * @returns Section object wrapped in a ICreateSectionResponse object.
     */
    public async register(userId: string): Promise<ISection> {
        const newSubsectionGroup: SubsectionGroup = new SubsectionGroup(this.object);
        const newSection: ISection = {
            _id: this._id,
            _courseId: this._courseId,
            name: this._name,
            subsectionGroupId: newSubsectionGroup.id,
        }
        newSubsectionGroup.initialize();
        const updateSection: ISection = await Course.addSection(newSection, userId);
        return updateSection;
    }

    /** 
     * Removes Section from database.
     * @param userId reference to user associated with section.
     * @returns a refreshed list of all sections w/o the deleted one.
    */
    public async delete(userId: string): Promise<IDeleteSectionResponse> {
        const deleted: ICourseGroup = await CourseGroupModel.findOneAndUpdate(
            { _userId: userId },
            { $pull: { 'courses.$[element].sections': { _id: this._id } } },
            {
                arrayFilters: [
                    { 'element._id': this._courseId }
                ],
                new: true
            }
        );
        return {
            sections: deleted.courses.find(
                (course: ICourse) => { return course._id == this._courseId }
            ).sections
        }
    }

    /**
     * Updates a section in the sections array. Deletes the existing section
     * in the array and adds the new section given by the request object.
     * @param sectionObj new object which will replace the old one.
     * @param user user object to provide with the courseGroupId.
     * @returns a new Section object which was just added.
     */
    public async update(sectionObj: Section, user: User): Promise<Section> {
        await this.delete(user.id);
        const newSection: ISection = await Course.addSection(sectionObj.object, user.id);
        return new Section(newSection);
    }

    /**
     * Returns a Section object based on the user, 
     * course, and section ID.
     * @param userId associated with the section.
     * @param courseId in which section resides.
     * @param sectionId of the section.
     * @returns a section object associated with the input parameters.
     */
    public static async get(userId: string, courseId: string, sectionId: string): Promise<Section> {
        const course: Course = await Course.get(courseId, userId);
        const sectionObj: ISection = course.sections.find((obj) => { return obj._id == sectionId });
        if (sectionObj == undefined) {
            throw new Exception(ErrorCode.NotFound, `Cannot find section with id: ${sectionId}`);
        }
        return new Section(sectionObj);
    }
}