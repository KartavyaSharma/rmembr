import { model, Model, Schema } from "mongoose";
import { ISubSection, ISubSectionSchema } from "./subsections";

/**
 * Defines the properties of a subsection group.
 */
export interface ISubsectionGroup { 
    _id: string;
    _sectionId: string;
    subsections: ISubSection[];
}

/**
 * Defines a mongoose schema to store subsection groups. The
 * collection will be named 'subsection-group'.
 */
const ISubsectionGroup = new Schema<ISubsectionGroup>(
    {
        _id: { type: String, required: true },
        _sectionId: { type: String, required: true },
        subsections: { type: [ISubSectionSchema], required: false, default: null }
    }
);

export const SubsectionGroupModel: Model<ISubsectionGroup> = model(
    "subsection-group",
    ISubsectionGroup
);