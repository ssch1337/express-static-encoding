import { IOptions } from ".";
import { Request } from 'express';

export function parseOptions(options?: IOptions) {
    return {
        enable: {
            brotli: typeof options?.enable?.brotli !== "undefined" ? !!options.enable.brotli : true,
            gzip: typeof options?.enable?.gzip !== "undefined" ? !!options.enable.gzip : true
        },
        serveStatic: options?.serveStatic || null
    } as Required<IOptions>;
}

export function enableEncodings(req: Readonly<Request>, { enable }: Required<IOptions>) {
    if(req.headers["accept-encoding"] === undefined) return ['gz'];
    const acceptEncodings = (req.headers["accept-encoding"] as string).split(', ') as string[];
    let encodings = [];
    if(enable.brotli && !!~acceptEncodings.indexOf('br')) {
        encodings.push('br');
    }
    if(enable.gzip && !!~acceptEncodings.indexOf('gzip')) {
        encodings.push('gz');
    }
    return encodings;
}