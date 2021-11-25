
export default class Cookie {

    value: { [key: string]: string } = {}

    constructor(cookie: string) {
        this.trans2Obj(cookie);
    }

    /**
     * cookie字符串转换成对象
     * @param cookie 
     */
    private trans2Obj(cookie: string) {
        cookie.split(';').forEach(v => {
            let [key, value] = v.split('=');
            this.value[key] = value
        })
    }

    /**
     * cookie对象转换成字符串
     * @returns 
     */
    transValue2Str() {
        let resultArr = []
        for (let key in this.value) {
            resultArr.push(
                `${key}=${this.value[key]}`
            )
        }

        return resultArr.join(';')
    }

    /**
     * 更新cookie
     * @param value 
     * @returns 
     */
    updateCookie(value: { [key: string]: string }) {
        this.value = {
            ...this.value,
            ...value
        }

        return this;
    }

    /**
     * 删除cookie key
     * @param keys 
     * @returns 
     */
    deleteCookie(keys: string[]) {
        keys.forEach(v => {
            delete this.value[v];
        })
        return this
    }

    /**
     * 获取cookie字符串
     * @returns 
     */
    getCookieStr() {
        return this.transValue2Str()
    }
}