import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";
import { ICourse } from "../../models/db/planner_models/course";
import { Utils } from "../../utils/server_utils";
import { IUpdateCourseRequest } from "../../models/request/request_models";
import { JUpdateCourseRequest } from "../../models/request/request_validators";
import { 
    ICourseGroupResponse, 
    ICreateCourseResponse, 
    IDeleteCourseResponse 
} from "../../models/response/response_models";
import SectionRoutes from "./section_routes";
import CourseGroup from "../../rmembr/planner/course_group";
import Course from "../../rmembr/planner/course";
import User from "../../rmembr/user/user";

export default class CourseRoutes extends Routes {

    /** Base URL for all course routes. */
    protected static readonly BASE = "/courses";

    /**
     * Initializes the routes object from the routes abstract class.
     * New routes can be added using super().routes.[CRUD OP]().
     * Adds routers for all nested routes. For instance:
     * - /courses/:courseId/[...]
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
            let courseGroupObj: ICourseGroupResponse;
            try {
                newUser = req.body.user;
                userCourseGroup = new CourseGroup(newUser);
                courseGroupObj = await userCourseGroup.courseList();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<ICourseGroupResponse>(res, courseGroupObj as ICourseGroupResponse);
        });
        this._routes.get(`/:courseId`, async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let course: Course;
            try {
                Utils.validateObject(req.params, 'courseId');
                newUser = req.body.user;
                course = await Course.get(req.params.courseId, newUser.id);
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<ICourse>(res, course.object as ICourse);
        });

        /** ========== POST ========== */
        this._routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let newCourse: Course;
            let resCourse: ICreateCourseResponse;
            try {
                Utils.validateObject(req.body.payload, 'name');
                newUser = req.body.user;
                newCourse = new Course({
                    _id: null,
                    _courseGroupId: newUser.courseGroupId,
                    name: req.body.payload.name,
                    sections: []
                });
                resCourse = await newCourse.register();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<ICreateCourseResponse>(res, resCourse);
        });

        /** ========== DELETE ========== */
        this._routes.delete('/:courseId', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let course: Course;
            let newCourseList: IDeleteCourseResponse;
            try {
                Utils.validateObject(req.params, 'courseId');
                newUser = req.body.user;
                course = await Course.get(req.params.courseId, newUser.id);
                newCourseList = await course.delete();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<IDeleteCourseResponse>(res, newCourseList);
        });

        /** ========== PATCH ========== */
        this._routes.patch('/:courseId', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let course: Course;
            let newCourse: Course;
            try {
                Utils.validateObject(req.params, 'courseId');
                Utils.validateObject(req.body.payload, "course");
                await Utils.validateObjectDeep<IUpdateCourseRequest>(req.body.payload, JUpdateCourseRequest);
                newUser = req.body.user;
                req.body.payload.course._courseGroupId = newUser.courseGroupId;
                course = await Course.get(req.params.courseId, newUser.id);
                newCourse = await course.update(new Course(req.body.payload.course), newUser);
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<ICourse>(res, newCourse.object as ICourse);
        });
    }
}