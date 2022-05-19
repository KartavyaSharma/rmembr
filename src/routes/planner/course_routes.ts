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

    protected createRoutes(): void {
        /** ============ GET Routes ============ */
        this._routes.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
            res.send({"this is": "courses"});
        });

        this._routes.get(`/:courseId`, async (req: Request, res: Response, next: NextFunction) => {
            res.send({"course-id": req.params.courseId})
        })
    }
}