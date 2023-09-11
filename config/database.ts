import { cleanEnv, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const DB_CONFIG = cleanEnv(process.env, {
    DATABASE_URL: str({
        desc: 'Database URI to connect the application and save the data to',
        default: 'postgresql://postgres:QQ6UMi8h936zArAf@db.uofmuidgoffilmzlwgcu.supabase.co:5432/postgres',
    }),
});

export default DB_CONFIG;