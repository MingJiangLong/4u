import TypeUtil from "../type_util";


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


const StringUtil = {
    isString,
    generateStr
}
export default StringUtil;