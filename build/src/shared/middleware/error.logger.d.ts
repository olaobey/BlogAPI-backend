import { Request, Response, NextFunction } from 'express';
declare const logEvents: (message: string, logFileName: string) => Promise<void>;
declare const logger: (req: Request, _res: Response, next: NextFunction) => void;
export { logEvents, logger };
