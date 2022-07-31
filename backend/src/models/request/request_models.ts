import { ICourse } from "../db/planner_models/course";
import { ISection } from "../db/planner_models/sections";
import { ISubSection } from "../db/planner_models/subsections";

/**
 * Interface models for incoming requests across all routes
 * on the rmembr server.
 * 
 * Data based on these models will be returned from the
 * corresponding functions from inside ../rmembr directory.
 */

/** ========== Auth ========== */
export interface ICreateUserRequest {
    name: string;
    email: string;
    password: string;
}
export interface ILoginRequest {
    email: string;
    password: string;
}
/** ========================== */

/** ========== Course ========== */
export interface IUpdateCourseRequest {
    course: ICourse;
}
/** ============================ */

/** ========== Section ========== */
export interface ICreateSectionRequest {
    name: string;
}
export interface IUpdateSectionRequest {
    section: ISection;
}
/** ============================= */

/** ========== Subsection ========== */
export interface ICreateSubsectionRequest {
    name: string;
}
export interface IUpdateSubsectionRequest {
    subsection: ISubSection
}
/** ================================ */