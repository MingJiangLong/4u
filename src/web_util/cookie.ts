import { TypeUtil } from "..";
import { I_Cookie } from "../interface/I_Cookie";
import { KeyValue } from "../module";

/**
 * max size 4k
 */
export default class Cookie implements I_Cookie {

    constructor() {
        if (!!!document) throw '@longjiang/4u Cookie only can be used within browers!';
    }

    getCookie(key?: string) {
        const cookie = document.cookie;
        if (key === undefined) return this.parseCookieStr2Obj(cookie)
        return this.parseCookieStr2Obj(cookie)[key];
    }

    /**
     * 合并cookie设置
     * @param config 
     * @returns 
     */
    private mergeCookieConfig(config?: I_CookieConfig) {
        let defaultConfig: I_CookieConfig = {
            path: '/',
            domain: document.location.hostname,
            ...config
        }
        return {
            ...defaultConfig,
            ...config
        }
    }

    setCookie(cookies: KeyValue<string | number>, config?: I_CookieConfig) {
        let mergedConfig = this.mergeCookieConfig(config);
        for (let key in cookies) {

            let tempt = {
                [key]: cookies[key],
                ...mergedConfig
            }

            let str = this.parseCookieObj2Str(tempt)
            document.cookie = str;
        }
    }

    deleteCookie(keys: string[] | string, config?: I_CookieConfig) {
        let mergedConfig = this.mergeCookieConfig({
            ...config,
            expires: new Date(1)
        });

        if (TypeUtil.isString(keys)) {
            keys = [keys]
        }
        if (!TypeUtil.isArray(keys)) return;
        keys.forEach(key => {
            let str = this.parseCookieObj2Str({
                [key]: '',
                ...mergedConfig
            })
            document.cookie = str;
        })
    }

    /**
     * 解析cookie
     * @param cookie 
     * @returns 
     */
    private parseCookieStr2Obj(cookie: string): KeyValue<string> {
        const keyValueArr = cookie.split(';');
        return keyValueArr.reduce((result, current) => {
            const firstEqualStrIndex = current.indexOf('=');
            const key = current.substring(0, firstEqualStrIndex)
            const value = current.substring(firstEqualStrIndex + 1)

            return {
                ...result,
                [key]: value
            }
        }, {})
    }

    private parseCookieObj2Str(cookieObj: KeyValue<any>) {
        const cookieKeyArr = Object.keys(cookieObj);
        return cookieKeyArr.reduce((result, key, index) => {
            if (index === 0) return `${key}=${cookieObj[key]}`
            return result += `;${key}=${cookieObj[key]}`
        }, '')
    }
}


type I_CookieConfig = {
    domain?: string
    path?: string
    expires?: Date
}