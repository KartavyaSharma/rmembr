import { NextFunction, Request, Response } from "express";
import { Routes } from "../routes";
import User from "../../rmembr/user/user";
import { Utils } from "../../utils/server_utils";
import { ISection } from "../../models/db/planner_models/sections";
import { ICreateSectionResponse, IDeleteSectionResponse, IGetSectionResponse } from "../../models/response/response_models";
import { IUpdateSectionRequest } from "../../models/request/request_models";
import SubsectionGroup from "../../rmembr/planner/subsection/subsection_group";
import SubsectionRoutes from "./subsection_routes";
import Section from "../../rmembr/planner/section";
import { ISubsectionGroup } from "../../models/db/planner_models/subsection_group";

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
            let newUser: User;
            let sectionObj: Section;
            let subsectionGroupObj: ISubsectionGroup;
            try {
                Utils.validateObject(req.params, 'sectionId');
                Utils.validateObject(req.params, 'courseId');
                newUser = req.body.user;
                sectionObj = await Section.get(
                    newUser.id,
                    req.params.courseId,
                    req.params.sectionId
                );
                subsectionGroupObj = await new SubsectionGroup(sectionObj.object).initialize();
            } catch (err) {
                return next(err);
            }
            Utils.sendRes<IGetSectionResponse>(res,
                {
                    section: sectionObj.object,
                    subsections: subsectionGroupObj
                } as IGetSectionResponse
            );
        });

        /** ========== POST ========== */
        this._routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let newSection: Section;
            let resSection: ICreateSectionResponse;
            try {
                Utils.validateObjectDeep<ICreateSectionResponse>(req.body);
                Utils.validateObject(req.params, 'courseId');
                newUser = req.body.user;
                newSection = new Section({
                    _id: null,
                    _courseId: req.params.courseId,
                    name: req.body.name,
                    subsectionGroupId: null
                });
                resSection = await newSection.register(newUser.id);
            } catch (err) {
                next(err);
            }
            Utils.sendRes<ICreateSectionResponse>(res, resSection);
        })
        /** ========== DELETE ========== */
        this._routes.delete('/:sectionId', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let section: Section;
            let sectionList: IDeleteSectionResponse;
            try {
                Utils.validateObject(req.params, 'sectionId');
                Utils.validateObject(req.params, 'courseId');
                newUser = req.body.user;
                section = await Section.get(newUser.id, req.params.courseId, req.params.sectionId);
                sectionList = await section.delete(newUser.id);
            } catch (err) {
                next(err);
            }
            Utils.sendRes<IDeleteSectionResponse>(res, sectionList)
        })
        /** ========== PATCH ========== */
        this._routes.patch('/:sectionId', async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let section: Section;
            let newSection: Section;
            try {
                Utils.validateObject(req.params, "sectionId");
                Utils.validateObject(req.body, "section");
                Utils.validateObjectDeep<IUpdateSectionRequest>(req.body);
                newUser = req.body.user;
                section = await Section.get(newUser.id, req.body.section._courseId, req.params.sectionId);
                newSection = await section.update(new Section(req.body.section), newUser);
            } catch (err) {
                next(err);
            }
            Utils.sendRes<ISection>(res, newSection.object as ISection);
        })
    }
}