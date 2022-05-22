/**
 * Contains all response models for rmembr.
 */

import { ICourse } from "../db/planner_models/course";

export interface ICourseGroupResponse {
    name: string;
    courses: ICourseGroupCourseInfo[];
}

export interface ICourseGroupCourseInfo {
    _id: string;
    name: string;
}

/** ========== Auth ========== */
/** GET /create-user */
export interface ICreateUser {
    /** JWT token after creating the user. */
    token: string;
}

export interface ICreateUserResponse {
    courseGroup: ICourseGroupResponse;
    token: string;
}

/** POST /login */
export interface ILoginResponse {
    token: string;
}
/** ========================== */

/** ========== Course ========== */
/** POST / */
export interface ICreateCourseResponse {
    /** Returns created course object. */
    course: ICourse;
}
/** PATCH /courses/:courseId */
export interface IUpdateCourseResponse {
    /** Returns created course object. */
    course: ICourse;
}
/** ============================ */