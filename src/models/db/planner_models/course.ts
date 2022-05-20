import { model, Model, Schema } from "mongoose";
import { ICourseGroup } from "./course_group";
import { ISection, ISectionSchema } from "./sections";

/**
 * Defines properties of a course.
 */
export interface ICourse {
    _id: string;
    _courseGroupId: ICourseGroup['_id'];
    name: string;
    sections: ISection[];
}

/**
 * Creates a mongoose schema which creates a
 * 'course' collection in MongoDB Atlas.
 */
export const ICourseSchema = new Schema<ICourse>(
    {
        _id: { type: String, required: true },
        _courseGroupId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        sections: {type: [ISectionSchema], required: false, default: null}
    }
)

// export const CoursesModel: Model<ICourse> = model(
//     'course-group', 
//     ICourseSchema
// )