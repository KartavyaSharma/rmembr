import { Schema } from "mongoose";
import Joi, { ObjectSchema } from "joi";

/**
 * Defines properties for a section.
 */
export interface ISection {
    _id: string;
    _courseId: string;
    name: string;
    subsectionGroupId: string;
}

export const JSectionSchema: ObjectSchema = Joi.object<ISection>(
    {
        _id: Joi.string().required(),
        _courseId: Joi.string().required(),
        name: Joi.string().required(),
        subsectionGroupId: Joi.string().required(),
    }
);

/**
 * Creates a mongoose schema for a 'sections' collection in
 * MongoDB Atlas.
 */
export const ISectionSchema = new Schema<ISection>(
    {
        _id: { type: String, required: true },
        _courseId: { type: String, required: true },
        name: { type: String, required: true },
        subsectionGroupId: { type: String, required: false, default: null },
    }
);