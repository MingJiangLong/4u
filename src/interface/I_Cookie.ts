import { KeyValue } from "../module";

export type CookieConfig = {
    domain?: string
    path?: string
    expires?: Date
}

export interface I_Cookie {
    getCookie(key?: string): string | KeyValue<string>
    setCookie(cookies: KeyValue<string | number>, config?: CookieConfig): void
    deleteCookie(keys: string[], config?: CookieConfig): void
}