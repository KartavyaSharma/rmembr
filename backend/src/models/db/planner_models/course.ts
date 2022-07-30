import { Model, Schema } from "mongoose";
import { ISection, ISectionSchema, JSectionSchema } from "./sections";
import Joi, { ObjectSchema } from "joi";

/**
 * Defines properties of a course.
 */
export interface ICourse {
    _id: string;
    _courseGroupId: string;
    name: string;
    sections: ISection[];
}

export const JCourseSchema: ObjectSchema = Joi.object<ICourse>(
    {
        _id: Joi.string().required(),
        _courseGroupId: Joi.string().required(),
        name: Joi.string().required(),
        sections: Joi.array().items(JSectionSchema).required(),
    }
);

/**
 * Creates a mongoose schema which creates a
 * 'course' collection in MongoDB Atlas.
 */
export const ICourseSchema = new Schema<ICourse>(
    {
        _id: { type: String, required: true },
        _courseGroupId: { type: String, required: true },
        name: { type: String, required: true },
        sections: {type: [ISectionSchema], required: false, default: null}
    }
)