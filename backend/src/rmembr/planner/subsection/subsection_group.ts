import Section from "../section";
import { nanoid } from "nanoid";
import { ISubSection } from "../../../models/db/planner_models/subsections";
import { IDeleteSubsectionResponse, ICreateSubsectionResponse, IUpdateSubsectionResponse } from "../../../models/response/response_models";
import Subsection from "./subsection";

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
     */
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
     * Initializes the subseciton schema from the database to create a new
     * collection of subsections for each section. This function is 
     * only called when a new section is created.
     */
     public async initialize(): Promise<void> {
        /** Creates a new subsection store for this section. */
        // TODO: Implement
    }

    /** 
     * Add to this subsection groups subsection set. Calls the create
     * method from the subsection class
     * @param subsectionObj subsection with all fields filled.
     */
    public static async add(subsectionObj: ISubSection): Promise<ICreateSubsectionResponse> {
        // TODO: Implement
        return {} as ICreateSubsectionResponse;
    }


    /** 
     * Returns a subsection with a given ID.
     * @param id Subsection ID.
     * @param sectionId Section ID.
     */
    public static async get(id: String, sectionId: String): Promise<ISubSection> {
        return Subsection.get(id, sectionId).object;
    }

    /** 
     * Updates Subsection, replacing it with new Subsection object. 
     * @param subsectionObj Subsection object with all fields filled.
     * */
    public async update(subsectionObj: ISubSection): Promise<IUpdateSubsectionResponse> {
        // TODO: Implement
        return {} as IUpdateSubsectionResponse;
    }

    /**
     * Deletes a subsection from the database.
     * @returns Promise that resolves to an API response containing a deleted subsection object.
     */
    public async delete(): Promise<IDeleteSubsectionResponse> {
        // TODO: Implement
        return {} as IDeleteSubsectionResponse;
    }

}