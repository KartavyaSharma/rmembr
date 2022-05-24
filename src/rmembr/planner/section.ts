import { ISubSection } from "../../models/db/planner_models/subsections";

/**
 * Class represents a section. Multiple sections can exist
 * for one user. A user can add, read, update and delete any
 * particular section. Sections are stored within coureses.
 */

export default class Section {
    
    /** Section ID. */
    private _id: string;

    /** Course ID corresponding to section. */
    private _courseId: string;

    /** Name of section. */
    private _name: string;

    /** List of subsections stored inside the course. */
    private _subsections: ISubSection[] = [];
}