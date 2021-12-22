import { BaseData } from "../module/DataType";
import { is, isNullish } from "../type_util";

/**
 * 是否是数组
 * * √
 * @param value 
 * @returns {Boolean} 判断结果
 */
function isArray<T = any>(value: any): value is Array<T> {
    return is(value, 'Array');
}
/**
 * 正序遍历每一个元素
 * @param arr      待遍历数组
 * @param callback 循环回调 返回为true 则中断遍历
 */
function foreach<T = any>(arr: T[], callback: (currentValue: T, index: number) => boolean | void) {

    let tempt = [...arr];
    for (let i = 0; i < tempt.length; i++) {
        let result = callback(tempt[i], i);
        if (!!result) return;
    }
}

/**
 * 倒叙遍历每一个元素
 * * 倒叙
 * @param arr      待遍历数组
 * @param callback 循环回调
 */
function reverseForeach<T = any>(arr: T[], callback: (currentItem: T, index: number) => boolean | void) {
    let tempt = [...arr].reverse();
    foreach(tempt, callback)
}

function map<T = any>(arr: T[], callback: (currentValue: T, index: number) => any) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = callback(arr[i], i);
    }
}

function reverseMap<T = any>(arr: T[], callback: (currentValue: T, index: number) => any) {
    for (let i = getLastIndex(arr); i >= 0; i--) {
        arr[i] = callback(arr[i], i);
    }
}

function deleteOne<T = any>(arr: T[], callback: (currentValue: T, index: number) => boolean) {
    let index = findOneIndex(arr, callback);
    if (index === -1) return;
    return arr.splice(index, 1)[0]
}

function deleteAll<T = any>(arr: T[], callback: (currentValue: T, index: number) => boolean) {
    let removeItem: T[] = [];
    for (let i = getLastIndex(arr); i >= 0; i--) {
        if (callback(arr[i], i)) {
            removeItem.push(...arr.splice(i, 1))
        }
    }
    return removeItem
}

/**
 * 获取最后一个index
 * @param arr 待查找数组
 * @returns   下标
 */
function getLastIndex(arr: any[]): number {
    return arr.length - 1
}

/**
 * 获取最后一个元素
 * @param arr  待查找数组
 * @returns    查找结果
 */
function getLastItem<T = any>(arr: Array<T>): T | undefined {
    return arr[getLastIndex(arr)];
}

/**
 * 获取范围元素
 * @param arr   待查找数组
 * @param scope 下标数组
 * @returns     查找数组结果
 */
function getItemBetween<T = any>(arr: Array<T>, scope: [number, number] | [number]): Array<T> {
    return arr.slice(...scope);
}

function find<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean, onlyFindOne = true) {
    let result: { item: T, index: number }[] = [];
    for (let i = 0; i < arr.length; i++) {
        let tempt = {
            index: i,
            item: arr[i]
        }
        if (onlyFindOne === true && predicate(arr[i], i)) return [tempt];
        result.push(tempt)
    }

    return result;
}

/**
 * 找一个元素
 * 包括index item
 * @param arr 
 * @param predicate 
 * @returns 
 */
function findOne<T = any>(arr: Array<T>, predicate: (currentItem: T, index: number) => boolean) {
    return find(arr, predicate, true)
}

/**
 * 找一个元素下标
 * @param arr 
 * @param predicate 
 * @returns 
 */
function findOneIndex<T = any>(arr: Array<T>, predicate: (currentItem: T, index: number) => boolean) {
    let result = find(arr, predicate, true).map(v => v.index);
    if (result.length === 0) return -1
    return result[0]
}

/**
 * 找一个元素下标
 * @param arr 
 * @param predicate 
 * @returns 
 */
function findOneItem<T = any>(arr: Array<T>, predicate: (currentItem: T, index: number) => boolean) {
    let result = find(arr, predicate, true).map(v => v.item)
    return result[0]
}

/**
 * 找所有元素
 * @param arr 
 * @param predicate 
 * @returns 
 */
function findAll<T = any>(arr: Array<T>, predicate: (currentItem: T, index: number) => boolean) {
    return find(arr, predicate)
}

/**
 * 找到所有元素index
 * @param arr 
 * @param predicate 
 * @returns 
 */
function findAllIndex<T = any>(arr: Array<T>, predicate: (currentItem: T, index: number) => boolean) {
    return find(arr, predicate).map(v => v.index)
}

/**
 * 找到所有元素item
 * @param arr 
 * @param predicate 
 * @returns 
 */
function findAllItem<T = any>(arr: Array<T>, predicate: (currentItem: T, index: number) => boolean) {
    return find(arr, predicate).map(v => v.item)
}

function deleteNullish(arr: any[]) {
    deleteAll(arr, v => isNullish(v))
}
// [{name:hello,age:2}]
function groupBy<T = any>(
    arr: Array<T>, groupKey: string,
    format: (
        currentValue: T,
        index: number,
        existGroupKeys: string[]) => void) {

    let existKey: string[] = []
    for (let i = 0; i < arr.length; i++) {
        format(arr[i], i, [...existKey])
    }
}

const ArrayUtil = {
    isArray,
    foreach,
    reverseForeach,
    map,
    reverseMap,
    findOneIndex,
    findOneItem,
    findOne,
    findAll,
    findAllIndex,
    findAllItem,
    getLastIndex,
    getLastItem,
    getItemBetween,
    deleteNullish,
    deleteAll,
    deleteOne
}
export default ArrayUtil;
type GetCompareValue<T> = (currentItem: T) => BaseData