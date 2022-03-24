import TypeUtil, { isObject } from "../type_util";


function isString(value: any) {
    return TypeUtil.isString(value)
}

/**
 * 生成随机字符串
 */
function generateStr(len?: number) {
    if (len === void 0) return Math.random().toString(36).split('.')[1];
    const str = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let result = '';
    const strArr = str.split('');
    while (len--) {
        const random = Math.round(Math.random() * (str.length - 1))
        result += strArr[random]
    }
    return result;
}

/**
 * 格式化字符串
 * @param str 
 * @param args 
 * @example
 * format('dd{0}')
 * format('dd{}')
 * format('dd{name(数字字母下划线$)}')
 * @returns 
 */
function format(str: string, dict: Object) {
    let pos = 0;

    if (dict instanceof Object) throw 'argument[1] must be an Object or Array!'
    return `${str}`.replace(/\{([\d\w_$]*)\}/gi, (match1, match2) => {

        return ''
    })
}

const StringUtil = {
    isString,
    generateStr
}
export default StringUtil;