import app from './app';
import config from 'config';

app.server.listen(config.get('port'));