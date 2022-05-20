import { Express, RequestHandler } from "express";
import { Routes } from '../routes/routes'
import { Exception } from "./errors/exception";
import { ErrorCode } from "./errors/error_codes";

/**
 * Utils containing frequently used methods.
 */

/**
 * Adds a new Router middleware for given server instance with a
 * route class BASE property.
 * @param expressApp instance of the current server.
 * @param routerClass instance of the particular router being used.
 */
export function addRoute(expressApp: Express, routerClass: Routes, ...middleware: RequestHandler[]): void {
    expressApp.use(routerClass.getBase, ...middleware, routerClass.getRouter);
}

/**
 * Validates object by verifying that it contains field FIELD, and that
 * it is not null of undefined. Throws an ValidationError if the field does
 * not exist.
 * @param targetObj object that is to be validated
 * @param field that the object must contain.
 */
export function validateObject(targetObj: Object, field: string): void {
    if (!targetObj.hasOwnProperty(field)) {
        throw new Exception(ErrorCode.ValidationError, `Object ${targetObj.constructor.name} does not contain ${field}`);
    }
}