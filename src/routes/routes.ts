import { Router } from 'express';
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
        this._routes = Router();
    }

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

    /** Route object containing any added routes. */
    protected _routes;

    // Enables server to parse application/x-www-form-urlencoded
    protected urlencodedParser = bodyParser.urlencoded({ extended: true });
}