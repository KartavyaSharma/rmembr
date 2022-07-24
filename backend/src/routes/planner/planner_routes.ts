import { Request, Response, NextFunction } from 'express';
import { Routes } from "../routes";
import User from '../../rmembr/user/user';
import { Utils } from '../../utils/server_utils';
import { IDeleteUserResponse } from '../../models/response/response_models';
import CourseRoutes from "./course_routes";

/**
 * Class defining routes for the planner api. User can:
 * GET:
 *  - courses (from course-group)
 *  - sections
 *  - subsections
 * 
 * POST:
 *  - add new courses
 *  - add new sections
 *  - add new subsections
 */
export default class PlannerRoutes extends Routes {
    
    /** Base URL for all planner routes */
    protected static readonly BASE = "/planner";

    /**
     * Initializes the routes object from the routes abstract class.
     * New routes can be added using super().routes.[CRUD OP]();
     */
    constructor() {
        super();
        super.nestRoutes(new CourseRoutes());
    }

    protected createRoutes(): void {
        /**
         * Deletes a user, and the corresponding course group.
         */
         this._routes.delete(`/`, async (req: Request, res: Response, next: NextFunction) => {
            let newUser: User;
            let deleteRes: IDeleteUserResponse;
            try {
                newUser = req.body.user;
                deleteRes = await User.delete(newUser);
            } catch (err) {
                next(err);
            }
            Utils.sendRes<IDeleteUserResponse>(res, deleteRes)
        });
    }
}