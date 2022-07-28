import dotenv from 'dotenv';
import config from 'config';

dotenv.config();

global.console = {
    log: config.get("test.log"),
    debug: console.debug,
    trace: console.trace
}

jest.setTimeout(100000);