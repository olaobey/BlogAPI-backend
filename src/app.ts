import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from '../src/shared/utils/logger';
import  morganLogger from './shared/middleware/morgan.logger';
import Router from '../src/routes/index'
import { generalError } from '../src/shared/middleware/error.middleware';
import { CORS_WHITELISTS } from '../config/index';

dotenv.config();

const app = express();

app.use(
    cors({
        origin: (origin, cb) => {
            logger.info(JSON.stringify({ origin, whitelists: CORS_WHITELISTS } ), 'Cors Info');
            return cb(null, true);
        },
        credentials: true,
    }),
);

app.use(morganLogger());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', Router)


app.use(generalError);

export default app;


  