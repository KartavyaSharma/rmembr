import { ISection } from "../../../models/db/planner_models/sections";
import { nanoid } from "nanoid";
import { ISubSection } from "../../../models/db/planner_models/subsections";
import { ISubsectionGroup, SubsectionGroupModel } from "../../../models/db/planner_models/subsection_group";
import { Exception } from "../../../utils/errors/exception";
import { ErrorCode } from "../../../utils/errors/error_codes";
import {
    IDeleteSubsectionResponse,
    ICreateSubsectionResponse,
    IUpdateSubsectionResponse
} from "../../../models/response/response_models";
import Subsection from "./subsection";

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

    /** User ID associated with subsection group */
    private _userId: string;

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
    constructor(sectionObj: ISection, subsectionGroupObj: ISubsectionGroup = null, userId: string = null) {
        if (subsectionGroupObj) {
            this._id = subsectionGroupObj._id;
            this._sectionId = subsectionGroupObj._sectionId;
            this._subsections = subsectionGroupObj.subsections;
            this._userId = subsectionGroupObj._userId;
        } else {
            this._id = nanoid();
            this._sectionId = sectionObj._id;
            this._subsections = [];
            this._userId = userId;
        }
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
        if (groupExists) {
            throw new Exception(ErrorCode.UnknownError, "Only one subsection group per section is allowed.");
        }
        /** Subsection group object. */
        const newSubsectionGroup: ISubsectionGroup = {
            _id: this._id,
            _sectionId: this._sectionId,
            _userId: this._userId,
            subsections: []
        }
        const created = await SubsectionGroupModel.create(newSubsectionGroup);
    }

    /** 
     * Add to this subsection groups subsection set. Calls the create
     * method from the subsection class
     * @param subsectionObj subsection with all fields filled.
     * @param sectionObj section object associated with this subsection.
     */
    public async add(subsectionObj: ISubSection): Promise<ICreateSubsectionResponse> {
        const created: ISubsectionGroup = await SubsectionGroupModel.findOneAndUpdate(
            { _id: this.id },
            { $push: { subsections: subsectionObj } },
            { new: true }
        );
        return {
            subsection: created.subsections.find((obj) => {
                return obj._id == subsectionObj._id;
            })
        };
    }

    /** 
     * Returns the subsection group associated with a section.
     * @param sectionId Section ID.
     * @returns Promise that resolves to a subsection group object.
     */
    public static async get(subsectionGroupId: string): Promise<SubsectionGroup> {
        const found: ISubsectionGroup = await SubsectionGroupModel.findOne({ _id: subsectionGroupId });
        if (!found) {
            throw new Exception(ErrorCode.UnknownError, "Subsection group not found.");
        }
        return new SubsectionGroup(null, found);
    }

    /** 
     * Returns all subsection groups associated with a user.
     * @param userId User ID.
     * @returns Promise that resolves to a list of subsection groups.
     */
    public static async getAll(userId: string): Promise<SubsectionGroup[]> {
        const found: ISubsectionGroup[] = await SubsectionGroupModel.find({ _userId: userId });
        if (!found) {
            throw new Exception(ErrorCode.UnknownError, "No subsection groups associated with user.");
        }
        return found.map((obj) => {
            return new SubsectionGroup(null, obj);
        });
    }

    /**
     * Deletes a subsection from the database.
     * @returns Promise that resolves to an API response containing a deleted subsection object.
     */
    public async delete(subsectionObj: ISubSection): Promise<IDeleteSubsectionResponse> {
        const deleted: ISubsectionGroup = await SubsectionGroupModel.findOneAndUpdate(
            { _sectionId: subsectionObj._sectionId },
            { $pull: { subsections: { _id: subsectionObj._id } } },
            { new: true }
        );
        return { subsections: deleted.subsections }
    }

    /**
     * Updates a subsection in the database.
     * @param subsectionObj subsection with all fields filled.
     */
    public async update(subsectionObj: ISubSection): Promise<IUpdateSubsectionResponse> {
        this.delete(subsectionObj);
        return {subsection: (await this.add(subsectionObj)).subsection};
    }

    /** Refreshes all subsections inside this group. */
    public async refresh(): Promise<void> {
        await Subsection.refreshAll(this._id);
    }

    /**
     * Destroys this subsection group.
     * @param subsectionGroupId ID for subsection group being destroyed.
     */
    public static async destroy(subsectionGroupId: string): Promise<void> {
        await SubsectionGroupModel.deleteOne({ _id: subsectionGroupId });
    }
}