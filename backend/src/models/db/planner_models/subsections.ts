import { Schema } from "mongoose";
import Joi, { ObjectSchema } from "joi";

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
    state: IState
}

/** 
 * Properties a state field can contain based on the
 * date and the planned revision schedule.
*/
export enum StateType {
    NOT_STARTED = "not_started",
    WARNING = "warning",
    OVERDUE = "overdue",
    DONE = "done",
}

/**
 * Properties for a state object;
 */
export interface IState {
    color: string;
}

/** Properties a status field can contain. */
export enum StatusType {
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


export const JStatusSchema: ObjectSchema = Joi.object<IStatus>(
    {
        state: Joi.string().valid(StatusType.PENDING, StatusType.WIP, StatusType.DONE, StatusType.OVERDUE).required(),
        date: Joi.date().required(),
    }
);

export const JRevisionScheduleSchema: ObjectSchema = Joi.object<IRevisionSchedule>().keys(
    {
        revs: Joi.array().items(JStatusSchema).required(),
    }
);

export const JSubsectionSchema: ObjectSchema = Joi.object<ISubSection>().keys(
    {
        _id: Joi.string().required(),
        _sectionId: Joi.string().required(),
        name: Joi.string().required(),
        inClass: Joi.date().required(),
        status: JStatusSchema.required(),
        revisionSchedule: JRevisionScheduleSchema.required(),
        plannedRevisionSchedule: Joi.array().items(Joi.date()).required(),
    }
);

export const JQuestionsSchema: ObjectSchema = Joi.object<IQuestions>(
    {
        questions: Joi.array().items(Joi.string()).required(),
    }
);

export const JOfficeHoursSchema: ObjectSchema = Joi.object<IOfficeHours>().keys(
    {
        req: Joi.boolean().required(),
        questions: JQuestionsSchema.optional(),
    }
);

/** Reusable DB Status schema. */
export const IStatusSchema = new Schema<IStatus>(
    {
        state: { type: String, required: true },
        date: { type: Date, required: true },
    }
);

/** Reusable DB State schema */
export const IStateSchema = new Schema<IState>(
    {
        color: { type: String, required: true },
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
            default: { state: StatusType.PENDING, date: null }
        },
        revisionSchedule: {
            revs: { type: [IStatusSchema], required: false, default: null }
        },
        plannedRevisionSchedule: { type: [Date], required: true, default: null },
        state: { type: IStateSchema, required: true },
    }
);