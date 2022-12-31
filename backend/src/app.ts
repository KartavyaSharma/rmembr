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
import User from './rmembr/user/user';
import HomeRoutes from './routes/home/home_routes';
import path from 'path';


export default class App {

    /** 
     * Creats new express server and runs the setup, routes, 
     * and middeware functions on it. 
     * */
    constructor() {
        this._server = express();
    }

    async initialize(): Promise<void> {
        await this.setup();
        this.routes();
        this.middleware();
    }

    /**
     *  Setup middleware and establish database connection. 
    */
    async setup(): Promise<void> {
        // Sets up server to use process.env.[...]
        dotenv.config();
        // Sets up database connection
        await this.setupDb();
        // Other middleware required to be setup before the routes
        this._server.use(express.json());
        this._server.use(helmet());
        this._server.use(bodyParser.json());

    }

    async setupDb(): Promise<void> {
        // Connects to the database
        const newDb = new Db();
        await newDb.connect(config.get('database'));
        this._db = newDb;
    }

    /** Setup routes on this._server. */
    routes(): void {
        Utils.addRoute(this._server, new AuthRoutes());
        Utils.addRoute(this._server, new PlannerRoutes(), Auth.authMid, User.setUser);
        Utils.addRoute(this._server, new HomeRoutes());
    }

    /** Setup middlware functions on this._server. */
    middleware(): void {

        /** Standard middleware */
        this._server.use(morgan('combined'));
        this._server.use(express.urlencoded({ extended: true }))
        this._server.use(cors());

        /** For serving static builds. */
        this._server.use(express.static(path.join(__dirname, '../static/home', 'build')));
        this._server.use(express.static(path.join(__dirname, '../static/home', 'public')));

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
     * @returns this._db object.
     */
    public get db(): Db {
        return this._db;
    }

    /**
     * Express server object.
     */
    private _server: Express;

    /**
     * DB instance.
     */
    private _db: Db;
}
