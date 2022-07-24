import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";
import User from "../../rmembr/user/user";
import { Utils } from "../../utils/server_utils";
import { ISubSection } from "../../models/db/planner_models/subsections";
import Subsection from "../../rmembr/planner/subsection/subsection";


export default class SubsectionRoutes extends Routes {

    /** Base URL for all subsection routes */
    protected static readonly BASE = "/subsections";

    constructor() {
        super();
    }

    protected createRoutes(): void {
        /** ========== GET ========== */
        this._routes.get('/:subsectionId', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let subsectionObj: Subsection;
            try {
                Utils.validateObject(req.params, 'subsectionId');
                Utils.validateObject(req.params, 'sectionId');
                newUser = req.body.user;
                subsectionObj = await Subsection.get(
                    req.params.subsectionId,
                    req.params.sectionId
                );
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<ISubSection>(res, subsectionObj.object as ISubSection);
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