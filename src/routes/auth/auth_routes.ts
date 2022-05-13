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
    static readonly BASE:string = "/auth";

    /**
     * Initializes routes object from Routes abstract class.
     * New routes can be added using super().routes.[CRUD OP]();
     */
    constructor() {
        super();
        this.addCreateUser();
        this.addLoginUser();
    }

    /**
     * Adds a route for creating a user. Route is at /create-user.
     */
    private addCreateUser():void {
        this.routes.post(`${AuthRoutes.BASE}/create-user`, (req:Request, res:Response) => {
            /** Add functionality for creating user... */
        });
    }

    /**
     * Adds a route for loggin in an existing user. Route is at /login.
     */
    private addLoginUser():void {
        this.routes.post(`${AuthRoutes.BASE}/login`, (req:Request, res:Response) => {
            /** Add functionality for logging in user... */
        });
    }

}