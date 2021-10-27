import { Array_reduce } from "../array_util";
import TypeUtil from "../type_util";

export function Object_get<T = any>(value: any, path: string, defaultValue?: T) {

    defaultValue = defaultValue ?? void 0;
    if (
        !TypeUtil.isObject(value) ||
        value === null ||
        path.startsWith('.') ||
        path.endsWith('.')) return defaultValue;

    const pathArr = path.split('.');

    try {
        let result = Array_reduce(pathArr, (previousValue, currentPath, index) => {
            //@ts-ignore
            return previousValue[currentPath];
        }, value)
        return result === undefined ? defaultValue : result;
    } catch (error) {
        return defaultValue;
    }
    // var result = object == null ? undefined : baseGet(object, path);
    //   return result === undefined ? defaultValue : result;
}
const ObjectUtil = {
    get: Object_get
}
export default ObjectUtil