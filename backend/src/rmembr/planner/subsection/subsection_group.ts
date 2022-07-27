import { ISection } from "../../../models/db/planner_models/sections";
import { nanoid } from "nanoid";
import { ISubSection } from "../../../models/db/planner_models/subsections";
import Subsection from "./subsection";
import { ISubsectionGroup, SubsectionGroupModel } from "../../../models/db/planner_models/subsection_group";
import { Exception } from "../../../utils/errors/exception";
import { ErrorCode } from "../../../utils/errors/error_codes";
import {
    IDeleteSubsectionResponse,
    ICreateSubsectionResponse,
    IUpdateSubsectionResponse
} from "../../../models/response/response_models";

/**
 * Class represents a subsection group. Each section has a
 * subsection group associated with it. Each subsection group
 * contains all the subsections in a section
 */

export default class SubsectionGroup {

    /** Subsection group ID. */
    private _id: string;

    /** 
     * Section ID associated with this 
     * subsection group.
     */
    private _sectionId: string;

    /** Set contianing IDs of all contained subsections. */
    private _subsections: ISubSection[];

    /**
     * @returns this subsection group's ID.
     */
    public get id() {
        return this._id;
    }

    /**
     * @returns this subsection group's section ID.
     */
    public get sectionId() {
        return this._sectionId;
    }

    /**
     * @returns a list of all subsections in this subsection group.
     */
    public get subsections(): ISubSection[] {
        return this._subsections;
    }

    /**
     * @return this instance of SubsectionGroup as a JSON object.
     */
    public get object(): ISubsectionGroup {
        return {
            _id: this._id,
            _sectionId: this._sectionId,
            subsections: this._subsections
        }
    }

    /** 
     * Initializes new group with all relevent fields. 
     * @param sectionObj Section object associated with this group.
     */
    constructor(sectionObj: ISection) {
        this._id = nanoid();
        this._sectionId = sectionObj._id;
        this._subsections = [];
    }

    /**
     * Initializes the subseciton schema from the database to create a new
     * collection of subsections for each section. This function is 
     * only called when a new section is created.
     */
    public async initialize(): Promise<void> {
        /** Creates a new subsection store for this section. */
        /** Check if another subsection group already exists for this section. */
        const groupExists: ISubsectionGroup = await SubsectionGroupModel.findOne({ _sectionId: this._sectionId });
        console.log(groupExists);
        if (groupExists) {
            throw new Exception(ErrorCode.UnknownError, "Only one subsection group per section is allowed.");
        }
        /** Subsection group object. */
        const newSubsectionGroup: ISubsectionGroup = {
            _id: this._id,
            _sectionId: this._sectionId,
            subsections: []
        }
        const created = await SubsectionGroupModel.create(newSubsectionGroup);
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
    public static async get(id: string, sectionId: string): Promise<SubsectionGroup> {
        // TODO : Implement
        return new SubsectionGroup({} as ISection);
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