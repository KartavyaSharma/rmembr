import User from "../../rmembr/user/user";
import Subsection from "../../rmembr/planner/subsection/subsection";
import Section from "../../rmembr/planner/section";
import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";
import { Utils } from "../../utils/server_utils";
import { ISubSection } from "../../models/db/planner_models/subsections";
import { JCreateSubsectionRequest } from "../../models/request/request_validators";
import { ICreateSubsectionResponse } from "../../models/response/response_models";


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
                newUser = req.body.user;
                const associatedSection: Section = await Section.get(newUser.id, req.params.courseId, req.params.sectionId);
                subsectionObj = await Subsection.get(
                    req.params.subsectionId,
                    associatedSection.id,
                );
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<ISubSection>(res, subsectionObj.object as ISubSection);
        });
        /** ========== POST ========== */
        this._routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let subsection: Subsection;
            let response: ICreateSubsectionResponse;
            try {
                Utils.validateObjectDeep(req.body.payload, JCreateSubsectionRequest);
                newUser = req.body.user;
                const associatedSection: Section = await Section.get(newUser.id, req.params.courseId, req.params.sectionId);
                const subsectionObj: ISubSection = {
                    _id: null,
                    _sectionId: null,
                    name: req.body.payload.name,
                    inClass: null,
                    status: null,
                    revisionSchedule: null,
                    plannedRevisionSchedule: null,
                    state: null
                };
                subsection = new Subsection(subsectionObj, associatedSection.id);
                response = await subsection.create(associatedSection.subsectionGroupId);
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<ICreateSubsectionResponse>(res, response);
        });
        /** ========== DELETE ========== */
        this._routes.delete('/:subsectionId', async (req: Request, res: Response, next: NextFunction) => {

        });
        /** ========== PATCH ========== */
        this._routes.patch('/:subsectionId', async (req: Request, res: Response, next: NextFunction) => {

        });
    }
}