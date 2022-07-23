import { IRevisionSchedule, ISubSection } from "../../../models/db/planner_models/subsections";
import { IStatus } from "../../../models/db/planner_models/subsections";
import { defaultConf, IDefaultConf } from "../../../rmembr/config_store/default_conf";

/**
 * Class representing a subsection. Each course can have
 * multiple subsections.
 */

export default class Subsection {

    /** Subsection ID */
    private _id: string;

    /** Section ID */
    private _sectionId: string;

    /** Subsection name */
    private _name: string;

    /** Date completed in class. */
    private _inClass: Date;

    /** Status of revision schedule. */
    private _revisionSchedule: IRevisionSchedule;

    /** 
     * Planned revision schedule. Used for comparison
     * while determining the status of a subsection.
     */
    private _plannedRevisionSchedule: Date[];

    /** Overall status of the current subsection. */
    private _status: IStatus;

    /**
     * @returns id of subsection.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * @returns parent section of this subsection.
     */
    public get sectionId(): string {
        return this._sectionId;
    }

    /**
     * @returns name of this subsection.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * @returns date in class when this subsection was completed.
     */
    public get inClass(): Date {
        return this._inClass;
    }

    /**
     * @returns status of current subsection.
     */
    public get status(): IStatus {
        return this._status;
    }

    /**
     * @returns array of status objects for each revision timeline.
     */
    public get revisionSchedule(): IRevisionSchedule {
        return this._revisionSchedule;
    }

    /**
     * @returns planned revision schedule for this subsection.
     */
    public get plannedRevisionSchedule(): Date[] {
        return this._plannedRevisionSchedule;
    }

    /**
     * @returns an ISubSection object representing this subsection.
     */
    public get object(): ISubSection {
        return {
            _id: this._id,
            _sectionId: this._sectionId,
            name: this._name,
            inClass: this._inClass,
            revisionSchedule: this._revisionSchedule,
            plannedRevisionSchedule: this._plannedRevisionSchedule,
            status: this._status
        }
    }

    /** 
     * Initialize a new subsection ojbect. 
     * Initializes all class fields.
     * */
    constructor() {

    }


    /** Adds new subsection to database collection.
     * @returns Promise that resolves to an API response containing a new subsection object.
    */
    public async create(): Promise<ISubSection> {
        // TODO: Implement
        return {} as ISubSection;
    }

    /** 
     * Generates new revision schedule for revision dates based on config.
     * @param config Configuration object containing revision intervals.
    */
    private generatePlannedRevisionSchedule(config: IDefaultConf): void {
        // TODO: Implement
        return;
    }

    /**
     * Updates a subsection in the database.
     * @param newSubsection Updated subsection object.
     * @returns Promise that resolves to an API response containing an updated subsection object.
     */
    public async update(newSubsection: ISubSection): Promise<ISubSection> {
        // TODO: Implement
        return {} as ISubSection;
    }

    
    /**
     * Updates the status of a subsection. Based on the current revision schedule.
     */
    private refreshSubsection(): void {
        // TODO: Implement
        return;
    }

    /**
     * Gets the subsection with the given ID.
     * @param id Subsection ID.
     * @returns Subsection object with matching ID from the database.
     */
    public static get(subsectionId: String, sectionId: String): Subsection {
        // TODO: Implement
        return {} as Subsection;
    }

    /**
     * Refreshes the status of all subsections in the database.
     */
    public static refreshAll(): void {
        // TODO: Implement
        return;
    }

}