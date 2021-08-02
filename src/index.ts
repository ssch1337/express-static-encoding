import * as serveStatic from 'serve-static';
import { Request, Response, NextFunction } from 'express';
import { enableEncodings, parseOptions } from './parse';

export interface IOptions {
    enable?: {
        brotli?: boolean,
        gzip?: boolean
    },
    serveStatic?: serveStatic.ServeStaticOptions
}

export function serveStaticEncoding(path: Readonly<string>, options?: IOptions) {
    const parsedOptions: Required<IOptions> = parseOptions(options);

    return (req: Readonly<Request>, res: Response, next: NextFunction) => {
        if(req.method !== "GET") next();
        const enableEncoding = enableEncodings(req, parsedOptions);
        console.log(enableEncoding); 
        next()
    } 
}
