import {request as requestHttp} from "http";
import {request as requestHttps, RequestOptions} from "https";
import {defaultsDeep} from 'lodash';
import { URL } from "url";

export class HttpHelper {
    static createQueryString(obj) {
        if (!obj) {
            return '';
        }
        return '?' + Object
            .keys(obj)
            .filter(key => obj[key] !== undefined)
            .map(key => `${key}=${typeof obj[key] === 'object' ? JSON.stringify(obj[key]) : obj[key]}`)
            .join("&");
    }
    static request<T>(url: URL, options?: RequestOptions & {json?: boolean}) {
        options = defaultsDeep(options, {json: true});
        return new Promise<T>((resolve, reject) => {
            const req = (url.protocol === 'http:' ? requestHttp : requestHttps)(url, options, (res) => {
                if (res.statusCode >= 400) {
                    reject(new Error(`statusCode=${res.statusCode}`));
                    return;
                }

                const data = [];
                res.on('data', chunk => {
                    data.push(chunk);
                });

                res.on('end', _ => {
                    const response: any = Buffer.concat(data).toString();
                    if (options.json) {
                        resolve(JSON.parse(response) as T);
                    } else {
                        resolve(response as T);
                    }
                });
            });
            req.on('error', reject);
            req.end();
        });
    }
}
