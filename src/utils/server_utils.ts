import { Express } from "express";
import { Routes } from '../routes/routes'
/**
 * Utils containing frequently used methods.
 */

/**
 * Adds a new Router middleware for given server instance with a
 * route class BASE property.
 * @param expressApp instance of the current server.
 * @param routerClass instance of the particular router being used.
 */
export function addRoute(expressApp: Express, routerClass: Routes): void {
    expressApp.use(routerClass.getBase, routerClass.getRouter);
}