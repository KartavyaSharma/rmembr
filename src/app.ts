import express, { Express } from 'express';
import bodyParser, { urlencoded } from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors = require('cors');
import dotenv = require('dotenv');

import { addRoute } from './utils/server_utils'
import { Db } from './utils/db';

import routes from './routes/home';
import AuthRoutes from './routes/auth/auth_routes';


class App {
    public server: Express;

    constructor() {
        this.server = express();
        this.middleware();
        this.routes();
        this.setup();
    }

    setup() {
        // Sets up server to use process.env.[...]
        dotenv.config();
        // Connects to the database
        const newDb = new Db();
        newDb.connect();
    }

    routes() {
        this.server.use(routes);
        addRoute(this.server, new AuthRoutes());
    }

    middleware() {
        this.server.use(express.json());
        this.server.use(helmet());
        this.server.use(bodyParser.json());
        this.server.use(express.urlencoded({ extended: true }))
        this.server.use(cors());
        this.server.use(morgan('combined'));
    }
}

export default new App().server;