import { KeyValue } from "../module";

export type CookieConfig = {
    domain?: string
    path?: string
    expires?: Date
}

export interface I_Cookie {

    /**
     * 获取cookie
     * @param [key]  cookie key
     * @example
     * const cookie = new Cookie()
     * cookie.getCookie()
     * cookie.getCookie('name')
     */
    getCookie(key?: string): string | KeyValue<string>

    /**
     * 设置cookie
     * @param cookies 待设置的cookie键值对
     * @param config  cookie配置 默认配置是当前domain path=/
     * @example
     * const cookie = new Cookie()
     * cookie.setCookie({hello:'world'})
     * cookie.setCookie({hello:'world'},{path='/',domain:'baidu.com'}) 
     */
    setCookie(cookies: KeyValue<string | number>, config?: CookieConfig): void

    /**
     * 删除cookie
     * @param keys 待删除的cookie
     * @param config 
     * @example
     * const cookie = new Cookie()
     * cookie.deleteCookie('name')
     */
    deleteCookie(keys: string | string[], config?: CookieConfig): void
}