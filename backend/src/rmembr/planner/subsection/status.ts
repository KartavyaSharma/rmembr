import { defaultConf } from "../../config_store/default_conf";
import { IStatus } from "../../../models/db/planner_models/subsections";
import { StatusType } from '../../../models/db/planner_models/subsections';

/**
 * Class represents a status. A status has a date
 * based on which the state of a status is determined.
 */
export default class Status {

    /** 
     * Initializes a Status object. 
     * @param date against which status is generated.
    */
    constructor(statusObj?: IStatus) {
        this._date = statusObj.date || null;
        this._state = StateDict[statusObj.state] || this._state;
    }

    /** Returns the state of this status. */
    public get state(): string {
        return this._state;
    }

    /** Returns the Status class as an object. */
    public get object(): IStatus {
        return {
            date: this._date,
            state: this._state
        }
    }

    /** State of the status object. */
    private _state: StatusType = StatusType.PENDING;

    /** Date used to determine status. */
    private _date: Date;
}

/**
 * Dictionary containing State types for each string state.
 */
export const StateDict: { [type: string]: StatusType } = {
    'pending': StatusType.PENDING,
    'wip': StatusType.WIP,
    'done': StatusType.DONE,
    'overdue': StatusType.OVERDUE
}