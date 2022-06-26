import { Schema } from "mongoose";

/**
 * Defines properties for a section.
 */
export interface ISection {
    _id: string;
    _courseId: string;
    name: string;
    subsections: string[];
}

/**
 * Creates a mongoose schema for a 'sections' collection in
 * MongoDB Atlas.
 */
export const ISectionSchema = new Schema<ISection>(
    {
        _id: { type: String, required: true },
        _courseId: { type: String, required: true },
        name: { type: String, required: true },
        subsections: { type: [String], required: false, default: null },
    }
);