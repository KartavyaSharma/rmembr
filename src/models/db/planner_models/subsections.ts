import { model, Model, Schema } from "mongoose";
import { ISection } from "./sections";

/**
 * Defines a subsection's properties.
 */
export interface ISubSection {
    _id: string,
    _sectionId: ISection['_id'],
    name: string;
    inClass: Date,
    status: IStatus,
    revisionSchedule: IRevisionSchedule;
    officeHours: IOfficeHours;
    preReading: IStatus;
    reviewQuestions: IQuestions;
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

/**
 * Creates a new collection in the DB named 'subsections'.
 */
export const ISubSectionSchema = new Schema<ISubSection>(
    {
        _id: { type: String, required: true },
        _sectionId: { type: Schema.Types.ObjectId, required: true },
        inClass: { type: Date, required: true },
        name: { type: String, required: true },
        status: {
            state: { type: String, required: true },
            enum: ['pending', 'wip', 'done', 'overdue'],
            date: { type: Date, required: true }
        },
        revisionSchedule: {
            revs: [
                {
                    state: { type: String, required: true },
                    enum: ['pending', 'wip', 'done', 'overdue'],
                    date: { type: Date, required: true }
                }
            ]
        },
        officeHours: {
            req: { type: Boolean, required: true },
            questions: {
                questions: { type: [String], required: false },
                required: false
            }
        },
        preReading: {
            state: { type: String, required: true },
            enum: ['pending', 'wip', 'done', 'overdue'],
            date: { type: Date, required: true }
        },
        reviewQuestions: {
            questions: { type: [String], required: false },
            required: false
        }
    }
)

// export const subsectionModel: Model<ISubSection> = model(
//     'course-group',
//     ISubSectionSchema
// )