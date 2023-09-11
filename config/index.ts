import { cleanEnv, num, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

export default cleanEnv(process.env, {
    PORT: num({
        desc: 'Port number for the application',
        default: 5000,
    }),
    NODE_ENV: str({
        desc: 'Node environment',
        default: 'development',
    }),
    APP_LOG_LEVEL: str({
        desc: 'Log level message', 
        default: 'info'
    })

})
export const CORS_WHITELISTS = [`localhost:${process.env.PORT || 5000}`];