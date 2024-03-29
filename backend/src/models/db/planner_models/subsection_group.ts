import { model, Model, Schema } from "mongoose";
import { ISubSection, ISubSectionSchema, JSubsectionSchema } from "./subsections";
import Joi, { ObjectSchema } from "joi";

/**
 * Defines the properties of a subsection group.
 */
export interface ISubsectionGroup { 
    _id: string;
    _sectionId: string;
    _userId?: string;
    subsections: ISubSection[];
}

export const JSubsectionGroupSchema: ObjectSchema = Joi.object<ISubsectionGroup>().keys(
    {
        _id: Joi.string().required(),
        _sectionId: Joi.string().required(),
        _userId: Joi.alternatives().try(Joi.string().required(), Joi.allow(null)),
        subsections: Joi.array().items(JSubsectionSchema).required(),
    }
);

/**
 * Defines a mongoose schema to store subsection groups. The
 * collection will be named 'subsection-group'.
 */
const ISubsectionGroup = new Schema<ISubsectionGroup>(
    {
        _id: { type: String, required: true },
        _sectionId: { type: String, required: true },
        _userId: { type: String, required: true, default: null },
        subsections: { type: [ISubSectionSchema], required: false, default: null }
    }
);

export const SubsectionGroupModel: Model<ISubsectionGroup> = model(
    "subsection-group",
    ISubsectionGroup
);