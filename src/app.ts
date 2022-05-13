import express, { Express } from 'express';

import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes/home';
import cors = require('cors');

class App {
    public server:Express;

    constructor() {
        this.server = express();
        this.routes();
        this.middleware();
    }

    routes() {
        this.server.use(routes);
    }

    middleware() {
        this.server.use(express.json());
        this.server.use(helmet());
        this.server.use(bodyParser.json());
        this.server.use(cors());
        this.server.use(morgan('combined'));
    }
}

export default new App().server;