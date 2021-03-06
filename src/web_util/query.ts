import { KeyValue } from "../module";

function getParam(key?: string[] | string, url?: string) {
    let search = '';

    if (url) {
        search = url.substring(url.indexOf('?'))
    } else {
        if (!!!document) throw 'both url and document are undefined!'
        search = document.location.search;
    }

    search = search.substring(1)

    if (!!!search.length) {
        if (key === undefined || Array.isArray(key)) return {}
        return ''
    };
    const paramsData = search.split('&').reduce((result, str) => {
        let [key, value] = str.split('=');

        return {
            ...result,
            [key]: value
        }
    }, <KeyValue<string>>{})

    if (!!!key) return paramsData
    if (typeof key === 'string') {
        return paramsData[key]
    }
    return key.reduce((result, current) => {
        return {
            ...result,
            [current]: paramsData[current]
        }
    }, {})

}

export default {
    getParam
}