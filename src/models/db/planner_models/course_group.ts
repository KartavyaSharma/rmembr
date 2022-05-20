import { model, Model, Schema } from "mongoose";
import { ICourse, ICourseSchema } from "./course";

/**
 * Defines the properties of a course group.
 */
export interface ICourseGroup {
    _id: string;
    _userId: string;
    name: string;
    courses?: ICourse[];
}

/**
 * Creates a mongoose schema which creates
 * a 'course-group' collection in MongoDB Atlas.
 */
const ICourseGroupSchema = new Schema<ICourseGroup>(
    {
        _id: { type: String, required: true },
        _userId: { type: String, required: true },
        name: { type: String, required: true },
        courses: {type: [ICourseSchema], default: null}
    },
    { collection: 'course-group', timestamps: true }
)

export const CourseGroupModel: Model<ICourseGroup> = model(
    'course-group', 
    ICourseGroupSchema
);