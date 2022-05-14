import { Request, Response } from 'express';
import { Routes } from '../routes';
/**
 * Class defining authentication routes and associated functions.
 * Client can create a new user (register), and client can log into
 * an existing user.
 * 
 * Calls methods from ../../rmembr/auth/
 */

export default class AuthRoutes extends Routes {

    /** Base URL for all authentication routes. */
    protected static BASE = "/auth";

    /**
     * Initializes routes object from Routes abstract class.
     * New routes can be added using super().routes.[CRUD OP]();
     */
    constructor() {
        super();
        this.createRoutes();
    }

    private createRoutes(): void {
        /**
         * Adds a route for creating a user. Route is at /create-user.
         */
        this._routes.post(`/create-user`, (req: Request, res: Response) => {
            /** Add functionality for creating user... */
            res.json({ 'createUser': 'is working' });
        });

        /**
        * Adds a route for loggin in an existing user. Route is at /login.
        */
        this._routes.post(`/login`, (req: Request, res: Response) => {
            /** Add functionality for logging in user... */
            res.json({ 'loginUser': 'is working' });
        });
    }

}