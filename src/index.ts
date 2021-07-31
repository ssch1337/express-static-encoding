import * as serveStatic from 'serve-static';
import { Request, Response, NextFunction } from 'express'


export function serve(path: string, files?: string[], options?: string) {
    return (req: Request, res: Response, next: NextFunction) => {
            console.log(req.headers["accept-encoding"]);
            next()
    } 
}