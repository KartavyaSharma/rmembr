import { Routes } from "../routes";
import { Request, Response, NextFunction } from "express";
import { Utils } from "../../utils/server_utils";
import path from "path";

export default class HomeRoutes extends Routes {
    
    /** Base URL for home routes. */
    protected static readonly BASE = "/";

    constructor() {
        super();
    }

    /** 
     * Supports a simple GET that redirects request to a
     * gatsby page.
     */
    protected createRoutes(): void {
        this._routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
            try {
                res.sendFile(path.join(__dirname, '../../../static/home/build/index.html'));
            } catch (err) {
                return next(err);
            }
        });
    }
}
