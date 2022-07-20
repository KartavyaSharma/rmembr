import { model, Model, Schema } from "mongoose";

/**
 * Defines a subsection's properties.
 */
export interface ISubSection {
    _id: string,
    _sectionId: string,
    name: string;
    inClass: Date,
    status: IStatus,
    revisionSchedule: IRevisionSchedule;
    plannedRevisionSchedule: Date[];
}

/** Properties a state field can contain. */
export enum State {
    PENDING = 'pending',
    WIP = 'wip',
    DONE = 'done',
    OVERDUE = 'overdue'
}

/**
 * Properties for an arbitrary status indicator.
 */
export interface IStatus {
    state: string;
    date: Date;
    color: string;
}

/**
 * Properties for a revision schedule within a subsection.
 */
export interface IRevisionSchedule {
    revs: IStatus[];
}

/**
 * Properties for the Office Hours field.
 */
export interface IOfficeHours {
    req: boolean;
    questions?: IQuestions;
}

/**
 * Arbitrary questions container field.
 */
export interface IQuestions {
    questions: string[];
}

/** Reusable DB State schema. */
export const IStatusSchema = new Schema<IStatus>(
    {
        state: { type: String, required: true },
        date: { type: Date, required: true },
        color: { type: String, required: true }
    }
);

/**
 * Creates a new collection in the DB named 'subsections'.
 */
export const ISubSectionSchema = new Schema<ISubSection>(
    {
        _id: { type: String, required: true },
        _sectionId: { type: String, required: true },
        inClass: { type: Date, required: false, default: null },
        name: { type: String, required: true },
        status: {
            type: IStatusSchema,
            required: false,
            default: { state: "pending", date: null, color: null }
        },
        revisionSchedule: {
            revs: { type: [IStatusSchema], required: false, default: null }
        },
        plannedRevisionSchedule: { type: [Date], required: true, default: null }
    }
);

export const SubsectionModel: Model<ISubSection> = model(
    'subsections',
    ISubSectionSchema
);