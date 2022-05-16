import { model, Model, Schema } from "mongoose";
import { ICourse } from "./course";

/**
 * Defines properties for a section.
 */
export interface ISection {
    _id: string;
    _courseId: ICourse['_id'];
    name: string;
}

/**
 * Creates a mongoose schema for a 'sections' collection in
 * MongoDB Atlas.
 */
const ISectionSchema = new Schema<ISection>(
    {
        _id: { type: String, required: true },
        _courseId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
    },
    { collection: 'sections', timestamps: true }
)

export const SectionModel: Model<ISection> = model(
    'sections',
    ISectionSchema
)