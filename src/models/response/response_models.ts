/**
 * Contains all response models for rmembr.
 */

export interface ICourseGroupResponse {
    name: string;
    courses: ICourseGroupCourseInfo[];
}

export interface ICourseGroupCourseInfo {
    _id: string;
    name: string;
}

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