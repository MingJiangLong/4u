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

/**
 * 数据脱敏
 * @param value 
 * @param type 
 */
function masking(data: string, type: 'mail' | 'name') {
    switch (type) {
        case 'mail':
            const prefix = data.substring(0, data.indexOf('@'));
            if (prefix.length > 4) return data.replace(/(?<=.{2})[^@]+(?=.{2}@)/, '****')
            return data.replace(/(?<=.{1})[^@]+(?=@)/, '****')
        case 'name':
            if (data.length > 2) return data.replace(/(?<=.{1})[^@]+(?=.{1})/, (a, b) => {
                return '*'
            })
            if (data.length == 2) return `*${data.substring(1)}`
            return data;
        default:
            return data

    }
}
const StringUtil = {
    isString,
    generateStr
}
export default StringUtil;