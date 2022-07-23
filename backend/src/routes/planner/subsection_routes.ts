import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";

export default class SubsectionRoutes extends Routes {

    /** Base URL for all subsection routes */
    protected static readonly BASE = "/subsections";

    constructor() {
        super();
    }

    protected createRoutes(): void {
        /** ========== GET ========== */
        this._routes.get('/:subsectionId', async (req: Request, res: Response, next: NextFunction) => {

        });
        /** ========== POST ========== */
        this._routes.post('/', async (req: Request, res: Response, next: NextFunction) => {

        });
        /** ========== DELETE ========== */
        this._routes.delete('/:subsectionId', async (req: Request, res: Response, next: NextFunction) => {

        });
        /** ========== PATCH ========== */
        this._routes.patch('/:subsectionId', async (req: Request, res: Response, next: NextFunction) => {
            
        });
    }
}