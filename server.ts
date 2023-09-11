import http from 'http';
import app from './src/app';
import logger from './src/shared/utils/logger';
import { connectDB, disconnectDB } from './src/shared/utils/db';
import config from './config/index';

const server = http.createServer(app);

const startServer = async () => {
    try {
        // connect to database
        await connectDB();

        // listen for requests
        server.listen(config.PORT, () => {
            logger.info(`⚡️[server]: Server running on port at http://localhost:${config.PORT}`);
        });

       // attach a listener for the 'close' event of the server
       server.on('close', async () => {
        try {
            await disconnectDB();
            logger.info('Database disconnected');
        } catch (error) {
            logger.error('Error disconnecting database:', error);
        }
    });
    } catch (error) {
        logger.error(error);
    }
};
startServer();






















