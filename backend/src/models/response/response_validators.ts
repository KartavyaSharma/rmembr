import Joi, { ObjectSchema } from "joi";
import { JCourseSchema } from "../db/planner_models/course";
import { JSectionSchema } from "../db/planner_models/sections";
import { JSubsectionGroupSchema } from "../db/planner_models/subsection_group";
import { JSubsectionSchema } from "../db/planner_models/subsections";
import * as res_mods from './response_models';

/**
 * Contains all response models for rmembr.
 */

/** ========== User ========== */
/** DELETE /planner */
export const JDeleteUserResponse: ObjectSchema = Joi.object<res_mods.IDeleteUserResponse>(
    {
        user: Joi.string().required(),
        courseGroup: Joi.string().required(),
    }
);
/** ========================== */

/** ========== Course Group ========== */
export const JCourseGroupCourseInfo: ObjectSchema = Joi.object<res_mods.ICourseGroupCourseInfo>(
    {
        _id: Joi.string().required(),
        name: Joi.string().required(),
    }
);

export const JCourseGroupResponse: ObjectSchema = Joi.object<res_mods.ICourseGroupResponse>(
    {
        name: Joi.string().required(),
        courses: Joi.array().items(JCourseGroupCourseInfo).required(),
    }
);
/** =================================== */

/** ========== Auth ========== */
/** GET /create-user */
export const JCreateUser: ObjectSchema = Joi.object<res_mods.ICreateUser>(
    { token: Joi.string().required(), }
);
export const JCreateUserResponse: ObjectSchema = Joi.object<res_mods.ICreateUserResponse>(
    {
        courseGroup: JCourseGroupResponse,
        token: Joi.string().required(),
    }
);
/** POST /login */
export const JLoginResponse: ObjectSchema = Joi.object<res_mods.ILoginResponse>(
    { token: Joi.string().required(), }
);
/** ========================== */

/** ========== Course ========== */
/** GET / */
export const JGetCourseListResponse: ObjectSchema = Joi.object<res_mods.IGetCourseListResponse>(
    {
        courseGroup: JCourseGroupResponse,
    }
);
/** POST / */
export const JCreateCourseResponse: ObjectSchema = Joi.object<res_mods.ICreateCourseResponse>(
    {
        course: Joi.object(JCourseSchema).required(),
    }
);
/** DELETE /courses/:courseId */
export const JDeleteCourseResponse: ObjectSchema = Joi.object<res_mods.IDeleteCourseResponse>(
    {
        courses: Joi.array().items(JCourseSchema).required(),
    }
);
/** PATCH /courses/:courseId */
export const JUpdateCourseResponse: ObjectSchema = Joi.object<res_mods.IUpdateCourseResponse>(
    {
        course: Joi.object(JCourseSchema).required(),
    }
);
/** ============================ */

/** ========== Section ========== */
/** GET /sections/:sectionId */
export const JGetSectionResponse: ObjectSchema = Joi.object<res_mods.IGetSectionResponse>(
    {
        section: Joi.object(JSectionSchema).required(),
        subsections: Joi.object(JSubsectionGroupSchema).required(),
    }
);
/** POST /sections/:sectionId */
export const JCreateSectionResponse: ObjectSchema = Joi.object<res_mods.ICreateSectionResponse>(
    {
        section: Joi.object(JSectionSchema).required(),
        subsections: Joi.object(JSubsectionGroupSchema).required(),
    }
);
/** DELETE /sections/:sectionId */
export const JDeleteSectionResponse: ObjectSchema = Joi.object<res_mods.IDeleteSectionResponse>(
    {
        sections: Joi.array().items(JSectionSchema).required(),
    }
);
/** PATCH /sections/:sectionId */
export const JUpdateSectionResponse: ObjectSchema = Joi.object<res_mods.IUpdateSectionResponse>(
    {
        section: Joi.object(JSectionSchema).required(),
    }
);
/** ============================= */

/** ========== Subsection ========== */
/** POST /subsections/:subsectionId */
export const JCreateSubsectionResponse: ObjectSchema = Joi.object<res_mods.ICreateSubsectionResponse>(
    {
        subsection: Joi.object(JSubsectionSchema).required(),
    }
);
/** DELETE /subsections/:subsectionId */
export const JDeleteSubsectionResponse: ObjectSchema = Joi.object<res_mods.IDeleteSubsectionResponse>(
    {
        subsections: Joi.array().items(JSubsectionSchema).required(),
    }
);
/** PATCH /subsecitons/:subsectionId */
export const JUpdateSubsectionResponse: ObjectSchema = Joi.object<res_mods.IUpdateSubsectionResponse>(
    {
        subsection: Joi.object(JSubsectionSchema).required(),
    }
);
/** ================================ */