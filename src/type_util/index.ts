import { PromiseUtilLike } from "../interface/I_PromiseUtil";
import { DataTypeName, BaseData, Nullish, LikeNumber } from "../module";
import PromiseUtil from "../promise_util";

/**
 * is
 * @param value 
 * @param type 
 * @returns 
 */
export function is(value: any, type: DataTypeName) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}

/**
 * 是否是boolean
 * @param value 
 * @returns 
 */
export function isBoolean(value: any): value is Boolean {
    return is(value, 'Boolean');
}

/**
 * 是否是字符串
 * @param value 
 * @returns 
 */
export function isString(value: any): value is String {
    return is(value, 'String');
}

/**
 * 是否是数字
 * except NaN, only Number
 * @param value 
 * @returns 
 */
export function isNumber(value: any): value is Number {
    // NaN
    return (
        is(value, 'Number') &&
        value instanceof Number
    )
}

/**
 * 是否是Symbol
 * @param value 
 * @returns 
 */
export function isSymbol(value: any): value is Symbol {
    return is(value, 'Symbol');
}

/**
 * 是否是Undefined
 * @param value 
 * @returns 
 */
export function isUndefined(value: any): value is undefined {
    return value === undefined
}

/**
 * 是否是null
 * @param value 
 * @returns 
 */
export function isNull(value: any): value is null {
    return value === null;
}

/**
 * 是否是数组
 * @param value 
 * @returns 
 */
export function isArray<T = any>(value: any): value is Array<T> {
    return is(value, 'Array')
}

/**
 * 是否是Object
 * @param value 
 * @returns 
 */
export function isObject(value: any): value is Object {
    return is(value, 'Object')
}
//------------------------------封装类型--------------------------------------------

/**
 * 是否是Null or Undefined
 * @param value 
 * @returns 
 */
export function isNullish(value: any): value is Nullish {
    return isNull(value) || isUndefined(value);
}

/**
 * 是否是数字或者能转化成数字的字符串
 * @param value 
 * @returns 
 */
export function isLikeNumber(value: any): value is LikeNumber {
    if (!isNumber(value) || !isString(value)) return false;
    if (isNumber(value)) return true;
    if (isNaN(+value)) return false;
    return true;
}

/**
 * 是否是基础数据
 * string number boolean symbol nullish 
 * @param value 
 * @returns 
 */
export function isBaseData(value: any): value is BaseData {
    return isString(value) || isNumber(value) || isNullish(value) || isSymbol(value) || isBoolean(value)
}


function isFunction(value: any): value is FunctionConstructor {
    return is(value, 'Function')
}

function isPromiseUtilLike(value: any): value is PromiseUtil {
    if (
        value !== null &&
        (isFunction(value) || isObject(value)) &&
        isFunction(value.then)
    ) {
        return true
    }
    return false;
}


const TypeUtil = {
    isBaseData,
    isLikeNumber,
    isNullish,
    is,
    isString,
    isNumber,
    isBoolean,
    isArray,
    isObject,
    isSymbol,
    isNull,
    isUndefined,
    isFunction,
    isPromiseUtilLike
}



export default TypeUtil