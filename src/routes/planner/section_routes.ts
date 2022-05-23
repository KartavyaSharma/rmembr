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
        /** ========== GET ========== */
        this._routes.get('/:sectionId', async (req: Request, res: Response, next: NextFunction) => {

        });
        /** ========== POST ========== */
        this._routes.post('/', async (req: Request, res: Response, next: NextFunction) => {

        })
        /** ========== DELETE ========== */
        this._routes.delete('/:sectionId', async (req: Request, res: Response, next: NextFunction) => {

        })
        /** ========== PATCH ========== */
        this._routes.patch('/:sectionId', async (req: Request, res: Response, next: NextFunction) => {

        })
    }
}