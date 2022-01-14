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

    /**
     * 
     * @param key 
     * @returns 
     */
    getCookie(key?: string | Array<string>) {
        const cookie = document.cookie;
        if (!cookie.length) return {}
        let all = this.parseCookieStr2Obj(cookie)
        if (Array.isArray(key)) {
            return key.reduce((count, current) => {
                return {
                    ...count,
                    [current]: all[current]
                }
            }, {})
        }
        if (TypeUtil.isString(key)) {
            return all[key]
        }
        return all;
    }

    /**
     * 合并cookie设置
     * @param config 
     * @returns 
     */
    private mergeCookieConfig(config?: I_CookieConfig) {
        let defaultConfig: I_CookieConfig = {
            path: '/',
            domain: document?.location?.hostname,
            ...config
        }
        return {
            ...defaultConfig,
            ...config
        }
    }

    setCookie(cookies: KeyValue<string | number>, config?: I_CookieConfig) {
        let mergedConfig = this.mergeCookieConfig(config);

        /**
         * 批量cookie 逐条设置
         */
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
                [`${key}`.trim()]: '',
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

            // 获取的cookie key 前缀可能有空格
            const key = current.substring(0, firstEqualStrIndex).trim()
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