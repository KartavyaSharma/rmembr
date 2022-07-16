import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";

export default class SubsectionRoutes extends Routes {

    /** Base URL for all subsection routes */
    protected static readonly BASE = "/subsections";

    constructor() {
        super();
    }

    protected createRoutes(): void {
        this._routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
            res.send({"this is": "subsections"})
        })

        this._routes.get('/:subsectionId', async (req: Request, res: Response, next: NextFunction) => {
            res.send({
                "course-id": req.params.courseId,
                "section-id": req.params.sectionId,
                "subsection-id": req.params.subsectionId
            });
        })
    }
}