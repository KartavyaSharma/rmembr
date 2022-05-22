import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";
import { User } from "../../rmembr/user/user";
import SectionRoutes from "./section_routes";
import CourseGroup from "../../rmembr/planner/course_group";
import { ICourse } from "../../models/db/planner_models/course";
import Course from "../../rmembr/planner/course";
import { Utils } from "../../utils/server_utils";
import { ICreateCourseResponse } from "../../models/response/response_models";

export default class CourseRoutes extends Routes {

    /** Base URL for all course routes. */
    protected static readonly BASE = "/courses";

    /**
     * Initializes the routes object from the routes abstract class.
     * New routes can be added using super().routes.[CRUD OP]();
     */
    constructor() {
        super();
        super.nestRoutes(new SectionRoutes(), ":courseId");
    }

    /**
     * GET:
     *  - course list
     *  - course
     * 
     * POST:
     *  - new course
     * 
     * DELETE:
     *  - existing course
     * 
     * PATCH:
     *  - edit existing course properties
     */
    protected createRoutes(): void {
        /** ========== GET ========== */
        this._routes.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let userCourseGroup: CourseGroup;
            let courseList: ICourse[];
            try {
                newUser = req.body.user;
                userCourseGroup = new CourseGroup(newUser);
                courseList = await userCourseGroup.courseList();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes(res, courseList as ICourse[]);
        });
        this._routes.get(`/:courseId`, async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let course: ICourse;
            try {
                Utils.validateObject(req.params, 'courseId');
                newUser = req.body.user;
                course = await Course.getCourse(req.params.courseId, newUser.id);
            } catch (err) {
                return next(err);
            }
            Utils.sendRes(res, course as ICourse);
        });

        /** ========== POST ========== */
        this._routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let newCourse: Course;
            try {
                Utils.validateObject(req.body, 'name');
                newUser = req.body.user;
                newCourse = new Course({
                    _id: null,
                    _courseGroupId: newUser.courseGroupId,
                    name: req.body.name,
                    sections: []
                });
            } catch (err) {
                return next(err);
            }
            Utils.sendRes(res, await newCourse.register() as ICreateCourseResponse);
        });

        /** ========== DELETE ========== */
        this._routes.delete('/:courseId', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            try {
                Utils.validateObject(req.params, 'courseId');
                newUser = req.body.user;
                await Course.deleteCourse(req.params.courseId, newUser.id);
            } catch (err) {
                return next(err);
            }
            Utils.sendRes(res, Utils.EMPTY_OBJECT.value);
        });

        /** ========== PATCH ========== */
        this._routes.patch('/:courseId', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let newCourse: ICourse
            try {
                Utils.validateObject(req.params, 'courseId');
                Utils.validateObject(req.body, 'course');
                newUser = req.body.params;
                newCourse = await Course.updateCourse(req.params.courseId, req.body.course, newUser);
            } catch (err) {
                return next(err);
            }
            Utils.sendRes(res, newCourse as ICourse);
        });
    }
}