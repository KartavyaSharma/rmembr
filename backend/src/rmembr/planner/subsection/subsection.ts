import { IRevisionSchedule, ISubSection, StateType, StatusType } from "../../../models/db/planner_models/subsections";
import { IStatus } from "../../../models/db/planner_models/subsections";
import { defaultConf, IDefaultConf } from "../../../rmembr/config_store/default_conf";
import { nanoid } from "nanoid";
import SubsectionGroup from "./subsection_group";
import Status from "./status";
import { IState } from "../../../models/db/planner_models/subsections";
import State from "./state";
import { IUpdateSubsectionResponse } from "../../../models/response/response_models";

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

    /** Current state of the subsection. */
    private _state: IState;

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
     * @returns the current state of the subsection.
     */
    public get state(): IState {
        return this._state;
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
            status: this._status,
            state: this._state
        }
    }

    /** 
     * Initialize a new subsection ojbect.
     */
    constructor(subsectionObj: ISubSection, sectionId: string) {
        this._id = subsectionObj._id || nanoid();
        this._sectionId = subsectionObj._sectionId || sectionId;
        this._name = subsectionObj.name;
        this._inClass = subsectionObj.inClass || new Date();
        this._revisionSchedule = subsectionObj.revisionSchedule || this.initRevisionSchedule();
        this._plannedRevisionSchedule = subsectionObj.plannedRevisionSchedule || this.generatePlannedRevisionSchedule();
        this._status = subsectionObj.status || new Status().object;
        this._state = subsectionObj.state || new State().object;
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
    private generatePlannedRevisionSchedule(config: IDefaultConf = defaultConf): Date[] {
        const revisionSchedule: Date[] = [];
        defaultConf.settings.intervals.number.forEach(num => {
            const tentativeDate = new Date();
            tentativeDate.setDate(tentativeDate.getDate() + num);
            revisionSchedule.push(tentativeDate);
        });
        return revisionSchedule;
    }

    /**
     * Initializes a revision schedule for a subsection.
     */
    private initRevisionSchedule(): IRevisionSchedule {
        const revisionSchedule: IRevisionSchedule = {
            revs: []
        };
        defaultConf.settings.intervals.number.forEach(num => {
            revisionSchedule.revs.push(new Status().object);
        });
        return revisionSchedule;
    }

    /**
     * Updates a subsection in the database.
     * @param newSubsection Updated subsection object.
     * @returns Promise that resolves to an API response containing an updated subsection object.
     */
    public async update(newSubsection: ISubSection, subsectionGroupId: string): Promise<IUpdateSubsectionResponse> {
        const group: SubsectionGroup = await SubsectionGroup.get(subsectionGroupId);
        return group.update(newSubsection);
    }

    /**
     * Updates the status of a subsection. Based on the current revision schedule.
     * @param subsection Subsection object to update.
     */
    private refreshSubsection(): void {
        if (this._status.state != StatusType.DONE) {
            const currDate: Date = new Date();
            this._plannedRevisionSchedule.forEach(date => {
                const diffDate: number = date.getTime() - currDate.getTime();
                const diffDays: number = Math.ceil(diffDate / (1000 * 3600 * 24));
                if (diffDays < defaultConf.settings.warning.daysTillDeadline) {
                    this._state = new State(StateType.WARNING).object;
                } else if (diffDays < 0) {
                    this._state = new State(StateType.OVERDUE).object;
                }
            });
        } else {
            this._state = new State(StateType.DONE).object;
        }
    }

    /**
     * Gets the subsection with the given ID.
     * @param id Subsection ID.
     * @returns Subsection object with matching ID from the database.
     */
    public static async get(subsectionId: string, subsectionGroupId: string): Promise<Subsection> {
        const found: SubsectionGroup = await SubsectionGroup.get(subsectionGroupId);
        const subFound: ISubSection = found.subsections.find(subsection => subsection._id === subsectionId);
        return new Subsection(subFound, found.sectionId);
    }

    /**
     * Refreshes the status of all subsections in the database.
     */
    public static async refreshAll(subsectionGroupId: string): Promise<void> {
        const found: SubsectionGroup = await SubsectionGroup.get(subsectionGroupId);
        found.subsections.forEach(subsection => {
            const subObject: Subsection = new Subsection(subsection, found.sectionId);
            subObject.refreshSubsection();
        });
    }
}