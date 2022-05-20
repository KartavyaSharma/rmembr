import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";
import { User } from "../../rmembr/user";
import SectionRoutes from "./section_routes";
import CourseGroup from "../../rmembr/planner/course_group";
import { ICourse } from "../../models/db/planner_models/course";
import Course from "../../rmembr/planner/course";
import { validateObject } from "../../utils/server_utils";

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
            validateObject(req.body, 'user');
            const newUser = req.body.user;
            const userCourseGroup: CourseGroup = new CourseGroup(newUser);
            const courseList: ICourse[] = await userCourseGroup.courseList();
            res.send({ ...courseList });
        });
        this._routes.get(`/:courseId`, async (req: Request, res: Response, next: NextFunction) => {
            validateObject(req.params, 'courseId');
            validateObject(req.body, 'user');
            const newUser: User = req.body.user;
            const course: ICourse = await Course.getCourse(req.params.courseId, newUser.id);
            res.send(course);
        });

        /** ========== POST ========== */
        this._routes.post('/new', async (req: Request, res: Response, next: NextFunction) => {
            validateObject(req.body, 'name');
            validateObject(req.body, 'user');
            const newUser: User = req.body.user;
            const newCourse: Course = new Course({
                _id: null,
                _courseGroupId: newUser.courseGroupId,
                name: req.body.name,
                sections: []
            });
            res.send(await newCourse.register());
        });

        /** ========== DELETE ========== */
        this._routes.delete('/delete/:courseId', async (req: Request, res: Response, next: NextFunction) => {
            res.send({ "deleting...": `${req.params.courseId}` });
        });

        /** ========== PATCH ========== */
        this._routes.patch('/update/:courseId', async (req: Request, res: Response, next: NextFunction) => {
            res.send({ "updating...": `${req.params.courseId}` });
        });
    }
}