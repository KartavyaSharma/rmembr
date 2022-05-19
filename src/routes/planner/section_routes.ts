import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";
import SubsectionRoutes from "./subsection_routes";

export default class SectionRoutes extends Routes {
    
    /** Base URL for all section routes */
    protected static readonly BASE = "/sections";

    constructor() {
        super();
        super.nestRoutes(new SubsectionRoutes(), ":sectionId")
    }

    protected createRoutes(): void {

        this._routes.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
            res.send({"this is": "sections"});
        });

        this._routes.get(`/:sectionId`, async (req: Request, res: Response, next: NextFunction) => {
            res.send({"course-id": req.params.courseId, "section-id": req.params.sectionId});
        })
    }


}