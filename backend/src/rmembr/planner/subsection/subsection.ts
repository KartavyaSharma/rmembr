import { IUpdateSubsectionResponse } from "../../../models/response/response_models";
import { IDeleteSubsectionResponse } from "../../../models/response/response_models";
import { ICreateSubsectionResponse } from "../../../models/response/response_models";
import { IRevisionSchedule, ISubSection } from "../../../models/db/planner_models/subsections";
import { IStatus } from "../../../models/db/planner_models/subsections";

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

    public get id(): string {
        return this._id;
    }

    public get sectionId(): string {
        return this._sectionId;
    }

    public get name(): string {
        return this._name;
    }

    public get inClass(): Date {
        return this._inClass;
    }

    public get status(): IStatus {
        return this._status;
    }

    public get revisionSchedule(): IRevisionSchedule {
        return this._revisionSchedule;
    }

    public get plannedRevisionSchedule(): Date[] {
        return this._plannedRevisionSchedule;
    }

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

    /** Initialize a new subsection ojbect. */
    constructor() {

    }

    public async create(): Promise<ICreateSubsectionResponse> {
        // TODO: Implement
        return {} as ICreateSubsectionResponse;
    }

    private generateRevisionSchedule(): void {
        // TODO: Implement
        return;
    }

    public async update(newSubsection: ISubSection): Promise<IUpdateSubsectionResponse> {
        // TODO: Implement
        return {} as IUpdateSubsectionResponse;
    }

    public async delete(): Promise<IDeleteSubsectionResponse> {
        // TODO: Implement
        return {} as IDeleteSubsectionResponse;
    }

    private refreshSubsection(): void {
        // TODO: Implement
        return;
    }

    public static get(id: String): ISubSection {
        // TODO: Implement
        return {} as ISubSection;
    }

    public static refreshAll(): void {
        // TODO: Implement
        return;
    }

}