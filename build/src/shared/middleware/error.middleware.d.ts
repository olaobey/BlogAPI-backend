import { NextFunction, Request, Response } from 'express';
export declare const notFound: (req: Request, res: Response) => void;
export declare const generalError: (err: Error, _req: Request, res: Response, _next: NextFunction) => void;
