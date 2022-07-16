import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import config from 'config';
import AuthRoutes from './routes/auth/auth_routes';
import PlannerRoutes from './routes/planner/planner_routes';
import { Exception } from './utils/errors/exception'
import { Utils } from './utils/server_utils'
import { Db } from './utils/database/db';
import { Auth } from './rmembr/auth/auth_engine';
import { User } from './rmembr/user/user';


class App {

    constructor() {
        this._server = express();
        this.setup().then(() => {
            this.routes();
            this.middleware();
        });
    }

    async setup() {
        // Sets up server to use process.env.[...]
        dotenv.config();
        // Connects to the database
        const newDb = new Db();
        await newDb.connect(config.get('database'));
        // Other middleware required to be setup before the routes
        this._server.use(express.json());
        this._server.use(helmet());
        this._server.use(bodyParser.json());
        
    }

    routes() {
        Utils.addRoute(this._server, new AuthRoutes());
        Utils.addRoute(this._server, new PlannerRoutes(), Auth.authMid, User.setUser);
    }

    middleware() {
        
        /** Standard middleware */
        this._server.use(morgan('combined'));
        this._server.use(express.urlencoded({ extended: true }))
        this._server.use(cors());

        /** Custom middlware */
        this._server.use(Exception.handler);
    }

    /**
     * @returns this._server object.
     */
    public get server(): Express {
        return this._server;
    }

    /**
     * Express server object.
     */
    private _server: Express;
}

export default new App();