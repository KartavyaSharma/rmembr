import { Routes } from "../routes";
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
        return;
    }
}