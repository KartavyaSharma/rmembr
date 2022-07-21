import { IRevisionSchedule, ISubSection } from "../../../models/db/planner_models/subsections";
import { IStatus } from "../../../models/db/planner_models/subsections";
import { defaultConf } from "../../../rmembr/config_store/default_conf";

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

    /** Initialize a new subsection ojbect. */
    constructor() {
        
    }

    public create(): ISubSection {
        // TODO: Implement
        return {} as ISubSection;
    }

    private generateRevisionSchedule(): IRevisionSchedule {
        // TODO: Implement
        return {} as IRevisionSchedule;
    }

    public update(): ISubSection {
        // TODO: Implement
        return {} as ISubSection;
    }
    
    public delete(): ISubSection {
        // TODO: Implement
        return {} as ISubSection;
    }
    
    public static get(id: String): ISubSection {
        // TODO: Implement
        return {} as ISubSection;
    }

    public static determineStatus(subsection: ISubSection): IStatus {
        // TODO: Implement
        return {} as IStatus;
    }

    public static refreshSubsection(section: ISubSection): ISubSection {
        // TODO: Implement
        return {} as ISubSection;
    }
}