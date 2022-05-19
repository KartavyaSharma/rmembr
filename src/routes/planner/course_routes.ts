import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";
import SectionRoutes from "./section_routes";

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
            res.send({ "this is": `courses of ${req.body.tokenData.email}` });
        });
        this._routes.get(`/:courseId`, async (req: Request, res: Response, next: NextFunction) => {
            res.send({ "course-id": req.params.courseId });
        });

        /** ========== POST ========== */
        this._routes.post('/new', async (req: Request, res: Response, next: NextFunction) => {
            res.send({ "this is": "adding a new course" });
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