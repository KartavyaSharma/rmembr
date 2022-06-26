/**
 * Class represents a status. A status has a date
 * based on which the state of a status is determined.
 */
export default class Status {

    /** 
     * Initializes a Status object. 
     * @param date against which status is generated.
    */
    constructor(date: Date) {
        this._date = date;
        this.determine();
    }

    /** Determines the state of this status. */
    private determine(): void {
        
    }

    /** State of the status object. */
    private _state: State = State.PENDING;

    /** Date used to determine status. */
    private _date: Date;
}

/** 
 * Enum representing the different states a Status object
 * can hold.
 */
 enum State {
    PENDING = 'pending',
    WIP = 'wip',
    DONE = 'done',
    OVERDUE = 'overdue'
}