import Section from "../section";
import { nanoid } from "nanoid";
import { ISubSection } from "../../../models/db/planner_models/subsections";

/**
 * Class represents a subsection group. Each section has a
 * subsection group associated with it. Each subsection group
 * contains all the subsections in a section
 */


export default class SubsectionGroup {

    /** Subsection group ID. */
    private _id: String;

    /** 
     * Section ID associated with this 
     * subsection group.
     * */
    private _sectionId: String;

    /** Set contianing IDs of all contained subsections. */
    private _subsections: Set<String>;

    /** 
     * Initializes new group with all relevent fields. 
     * @param sectionObj Section object associated with this group.
    */
    constructor(sectionObj: Section = null) {
        this._id = nanoid();
        this._sectionId = sectionObj.id;
    }

    /** 
     * Add to this subsection groups subsection set. 
     * @param subsectionObj subsection with all fields filled.
     * */
    public static add(subsectionObj: ISubSection) {

    }

}