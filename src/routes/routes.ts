import { NextFunction, Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

/**
 * Parent class representing routes for any service on the
 * rmember server.
 */

export abstract class Routes {

    /**
     * Property that contains the URL base for this route sublcass.
     */
    protected static BASE: string;

    /** 
     * Initializes _routes object, instance of Router. All routes
     * will be assigned to this object.
     */
    constructor() {
        this._routes = Router({ mergeParams: true });
        this.createRoutes();
    }

    /** 
     * Abstract function that adds routes to the Router
     * object.
     */
    protected abstract createRoutes(): void;

    /**
     * Returns the static BASE property for route subclass.
     */
    public get getBase() {
        return (this.constructor as typeof Routes).BASE;
    }

    /**
     * Returns the route object.
     */
    public get getRouter() {
        return this._routes;
    }

    /**
     * Adds cascading to routes. Allows routes like
     * /planner/course/:courseId/sections/:sectionId.
     */
    protected nestRoutes(nestRoutes: Routes, morePath = ""): void {
        this._routes.use(
            `${morePath != "" ? `/${morePath}` : ""}${nestRoutes.getBase}`,
            nestRoutes.getRouter
        );
    }

    /** Route object containing any added routes. */
    protected _routes;

    // Enables server to parse application/x-www-form-urlencoded
    protected urlencodedParser = bodyParser.urlencoded({ extended: true });
}