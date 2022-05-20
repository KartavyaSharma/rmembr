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