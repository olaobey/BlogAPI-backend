import prisma from '../../../config/db.prisma'
import logger from './logger';



export const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        logger.info('Database disconnected Successfully');
    } catch (e) {
        logger.error(e);
    }
};

export const connectDB = async () => {
    try {
        await prisma.$connect();
        logger.info('Database Connected Successfully');
    } catch (e) {
        logger.error(e);
    }
};