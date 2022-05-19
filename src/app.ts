import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors = require('cors');
import dotenv = require('dotenv');

import { Exception } from './utils/errors/exception'
import { addRoute } from './utils/server_utils'
import { Db } from './utils/database/db';

import routes from './routes/home';
import AuthRoutes from './routes/auth/auth_routes';
import PlannerRoutes from './routes/planner/planner_routes';


class App {
    public server: Express;

    constructor() {
        this.server = express();
        this.setup();
        this.routes();
        this.middleware();
    }

    setup() {
        // Sets up server to use process.env.[...]
        dotenv.config();
        // Connects to the database
        const newDb = new Db();
        newDb.connect();
        // Other middleware required to be setup before the routes
        this.server.use(express.json());
        this.server.use(helmet());
        this.server.use(bodyParser.json());
        this.server.use(express.urlencoded({ extended: true }))
    }

    routes() {
        this.server.use(routes);
        addRoute(this.server, new AuthRoutes());
        addRoute(this.server, new PlannerRoutes());
    }

    middleware() {
        this.server.use(cors());
        this.server.use(morgan('combined'));

        /** Custom middlware */

        this.server.use(Exception.handler);
    }
}

export default new App().server;