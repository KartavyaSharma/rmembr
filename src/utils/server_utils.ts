import { Express, RequestHandler, Response } from "express";
import { Routes } from '../routes/routes'
import { Exception } from "./errors/exception";
import { ErrorCode } from "./errors/error_codes";
import { Success } from "./success/success";
import { ISuccessModel } from "../models/server_models";

/**
 * Utils containing frequently used methods.
 */

export class Utils {

    /** 
     * Enum definitions. Enums are only being simulated in Utils since TypeScript does
     * not support object enum values.
     * */
    static readonly EMPTY_OBJECT = new Utils("EMPTY", {});

    /** Constructor used to make new enums for objects. */
    constructor(private readonly key: string, public readonly value: any) {}

    /**
     * Adds a new Router middleware for given server instance with a
     * route class BASE property.
     * @param expressApp instance of the current server.
     * @param routerClass instance of the particular router being used.
     */
    public static addRoute(expressApp: Express, routerClass: Routes, ...middleware: RequestHandler[]): void {
        expressApp.use(routerClass.getBase, ...middleware, routerClass.getRouter);
    }

    /**
     * Validates object by verifying that it contains field FIELD, and that
     * it is not null of undefined. Throws an ValidationError if the field does
     * not exist.
     * @param targetObj object that is to be validated
     * @param field that the object must contain.
     */
    public static validateObject(targetObj: any, field: string): void {
        if (!Object.prototype.hasOwnProperty.call(targetObj, field)) {
            throw new Exception(
                ErrorCode.ValidationError,
                `Object ${targetObj.constructor.name} does not contain ${field}`
            );
        }
    }

    /** 
     * Sends res object to the client.
     * @param resObj response object from api route sending the response.
     * @param payloadObj object requested by the client.
     */
    public static sendRes(resObj: Response, payloadObj: any): void {
        resObj.send({ code: Success.code, payload: payloadObj } as ISuccessModel);
    }
}