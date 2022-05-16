import { model, Model, Schema } from "mongoose";
import { IUser } from "../user";

/**
 * Defines the properties of a course group.
 */
export interface ICourseGroup {
    _id: string;
    _userId: IUser['_id'];
    name: string;
    courses: string[];
}

/**
 * Creates a mongoose schema which creates
 * a 'course-group' collection in MongoDB Atlas.
 */
const ICourseGroupSchema = new Schema<ICourseGroup>(
    {
        _id: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        courses: { type: [String], required: false }
    },
    { collection: 'course-group', timestamps: true }
)

export const CourseGroupModel: Model<ICourseGroup> = model(
    'course-group', 
    ICourseGroupSchema
);