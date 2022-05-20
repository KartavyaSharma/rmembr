import { model, Model, Schema } from "mongoose";
import { ICourse } from "./course";
import { ISubSection, ISubSectionSchema } from "./subsections";

/**
 * Defines properties for a section.
 */
export interface ISection {
    _id: string;
    _courseId: ICourse['_id'];
    name: string;
    subsections: ISubSection[];
}

/**
 * Creates a mongoose schema for a 'sections' collection in
 * MongoDB Atlas.
 */
export const ISectionSchema = new Schema<ISection>(
    {
        _id: { type: String, required: true },
        _courseId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        subsections: {type: [ISubSectionSchema], required: false, default: null},
    }
)

// export const SectionModel: Model<ISection> = model(
//     'course-group',
//     ISectionSchema
// )