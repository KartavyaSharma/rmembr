import { JCourseSchema } from "../db/planner_models/course";
import { JSectionSchema } from "../db/planner_models/sections";
import { JSubsectionSchema } from "../db/planner_models/subsections";
import Joi, { ObjectSchema } from "joi";
import * as req_mods from './request_models';

/**
 * Interface models for incoming requests across all routes
 * on the rmembr server.
 * 
 * Data based on these models will be returned from the
 * corresponding functions from inside ../rmembr directory.
 */

/** ========== Auth ========== */
export const JCreateUserRequest: ObjectSchema = Joi.object<req_mods.ICreateUserRequest>(
    {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    }
);
export const JLoginRequest: ObjectSchema = Joi.object<req_mods.ILoginRequest>(
    {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }
);
/** ========================== */

/** ========== Course ========== */
export const JUpdateCourseRequest: ObjectSchema = Joi.object<req_mods.IUpdateCourseRequest>().keys(
    {
        course: JCourseSchema.required(),
    }
);
/** ============================ */

/** ========== Section ========== */
export const JCreateSectionRequest: ObjectSchema = Joi.object<req_mods.ICreateSectionRequest>(
    {
        name: Joi.string().required(),
    }
);
export const JUpdateSectionRequest: ObjectSchema = Joi.object<req_mods.IUpdateSectionRequest>().keys(
    {
        section: JSectionSchema.required(),
    }
);
/** ============================= */

/** ========== Subsection ========== */
export const JCreateSubsectionRequest: ObjectSchema = Joi.object<req_mods.ICreateSubsectionRequest>().keys(
    {
        name: Joi.string().required(),
    }
);
export const JUpdateSubsectionRequest: ObjectSchema = Joi.object<req_mods.IUpdateSubsectionRequest>().keys(
    {
        subsection: JSubsectionSchema.required(),
    }
);
/** ================================ */