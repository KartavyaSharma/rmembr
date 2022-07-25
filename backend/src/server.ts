import App from './app';
import config from 'config';

new App().server.listen(config.get('port'), () => {
    console.log(`Server is running on port ${config.get('port')}`);
});