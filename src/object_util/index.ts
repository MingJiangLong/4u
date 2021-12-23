import { isArray, isObject } from "../type_util";

function deepClone(target: any, map = new WeakMap()) {

    if (map.get(target)) {
        return target;
    }
    // 获取当前值的构造函数：获取它的类型
    let constructor = target.constructor;

    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        // 创建一个新的特殊对象(正则类/日期类)的实例
        return new constructor(target);
    }

    if (isObject(target) || isArray(target)) {
        map.set(target, true);  // 为循环引用的对象做标记
        const cloneTarget: any = isArray(target) ? [] : {};

        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map);
            }
        }
        return cloneTarget;
    }
    return target;

}

const ObjectUtil = {
    deepClone
}
export default ObjectUtil