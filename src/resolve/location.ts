/**
 * 解析路由参数
 * @param url 
 * @returns 
 */
function resolvePathParam(url: string) {
    let result: { [key: string]: string } = {};
    try {
        const mathchItemArr = url.match(/(?<=\?).+/);
        if (!!!mathchItemArr) return result;
        const [matchItem] = mathchItemArr;

        matchItem.split('&').forEach(v => {
            let [key, value] = v.split('=')
            result[key] = value
        })
        return result
    } catch (error) {
        return result
    }
}

const Location = {
    resolvePathParam
}

export default Location