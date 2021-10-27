import { BaseData } from "../module/DataType";
import { is, isNullish } from "../type_util";

/**
 * 是否是数组
 * * √
 * @param value 
 * @returns {Boolean} 判断结果
 */
export function Array_isArray<T = any>(value: any): value is Array<T> {
    return is(value, 'Array')
}

/**
 * 获取指定元素
 * @param arr   待查找数组
 * @param index 指定下标
 * @returns     查找结果
 */
export function Array_getItem<T = any>(arr: Array<T>, index: number): T | undefined {
    return arr[index];
}

/**
 * 获取第一个元素
 * @param arr 待查找数组
 * @returns   查找结果
 */
export function Array_getFirstItem<T = any>(arr: Array<T>): T | undefined {
    return arr[0]
}

/**
 * 获取最后一个元素
 * @param arr  待查找数组
 * @returns    查找结果
 */
export function Array_getLastItem<T = any>(arr: Array<T>): T | undefined {
    return arr.slice(-1)[0];
}

/**
 * 获取最后一个index
 * @param arr 待查找数组
 * @returns   下标
 */
export function Array_getLastIndex(arr: any[]): number {
    return arr.length - 1
}

/**
 * 获取范围元素
 * @param arr   待查找数组
 * @param scope 下标数组
 * @returns     查找数组结果
 */
export function Array_getItemBetween<T = any>(arr: Array<T>, scope: [number, number] | [number]): Array<T> {
    return arr.slice(...scope);
}

function findBase<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean, mode = 1) {
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i)) {
            if (mode === 1) return arr[i]
            return i;
        }
    }

    if (mode === 1) return void 0;
    return -1;
}

function findAllBase<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean, mode = 1) {
    let tempt: any[] = []
    Array_foreach(arr, (currentItem, index) => {
        if (mode === 1 && predicate(currentItem, index)) {
            tempt.push(currentItem)
        } else if (mode === 2 && predicate(currentItem, index)) {
            tempt.push(index)
        }
    })
    return tempt;
}

/**
 * 查找符合预期元素一个下标
 * @param arr       待查找数组
 * @param predicate 预期函数
 * @returns         下标
 */
export function Array_findIndex<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean): number {
    return findBase(arr, predicate, 2) as number
}

/**
 * 查找符合预期元素所有下标
 * @param arr       待查找数组
 * @param predicate 预期函数
 * @returns         下标数组
 */
export function Array_findAllIndex<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean) {
    return findAllBase(arr, predicate, 2) as number[]
}

/**
 * 查找符合预期元素一个元素
 * * 修改影响源数组
 * @param arr       待查找数组
 * @param predicate 预期函数
 * @returns         查找结果
 */
export function Array_find<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean): T {
    return findBase(arr, predicate, 1) as T;
}

/**
 * 查找符合预期元素所有元素
 * * 修改影响源数组
 * @param arr       待查找数组
 * @param predicate 预期函数
 * @returns         查找结果数组
 */
export function Array_findAll<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean): T[] {
    return findAllBase(arr, predicate, 1) as T[];
}

/**
 * 过滤掉null 和undefined
 * * 直接操作原数组
 * @param arr 待过滤数组
 */
export function Array_filterNullish<T>(arr: T[]) {
    Array_deleteItem(arr, v => isNullish(v));
}


/**
 * 不重复push
 * * 操作原数组
 * 当前元素加入 然后移除以往重复的元素
 * @param value 
 * @param valueArr 
 * @param getCompareValue 
 * @returns 
 */
export function Array_pushNonrepeat<T = any>(value: T, valueArr: T[], getCompareValue?: GetCompareValue<T>) {
    const point = getCompareValue ? getCompareValue(value) : value;

    Array_deleteItem(valueArr, (currentItem) => {
        return (getCompareValue ? getCompareValue(currentItem) : currentItem) === point;
    })

    valueArr.push(value);
    return valueArr
}

/**
 * 不重复unshift
 * * 操作原数组
 * @param value 
 * @param valueArr 
 * @param getCompareValue 
 * @returns 
 */
export function Array_unshiftNonrepeat<T = any>(value: T, valueArr: T[], getCompareValue?: GetCompareValue<T>) {
    const point = getCompareValue ? getCompareValue(value) : value;
    Array_deleteItem(valueArr, (currentItem) => {
        return (getCompareValue ? getCompareValue(currentItem) : currentItem) === point;
    })

    valueArr.unshift(value);
    return valueArr
}

/**
 * 正序遍历每一个元素
 * @param arr      待遍历数组
 * @param callback 循环回调
 */
export function Array_foreach<T = any>(arr: T[], callback: (currentValue: T, index: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i)
    }
}

/**
 * 倒叙遍历每一个元素
 * * 倒叙
 * @param arr      待遍历数组
 * @param callback 循环回调
 */
export function Array_forOppsiteEach<T = any>(arr: T[], callback: (currentItem: T, index: number) => void) {
    for (let i = arr.length - 1; i >= 0; i--) {
        callback(arr[i], i)
    }
}
/**
 * 移除元素
 * * 原数组上直接进行移除
 * * 返回移除的元素新集合
 * @param arr       待移除数组
 * @param predicate 断言函数
 * @returns         符合断言结果数组
 */
export function Array_deleteItem<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean): T[] {
    return deleteItemBase(arr, predicate) as T[]
}
/**
 * 移除元素
 * * 原数组上直接进行移除
 * @param arr       待移除数组
 * @param indexArr  移除下标集合
 */
export function Array_deleteItemByIndex<T = any>(arr: T[], indexArr: number[]) {
    Array_deleteItem(arr, (item, index) => indexArr.includes(index))
}
/**
 * 移除元素
 * * 原数组上直接进行移除
 * * 返回移除的元素新集合
 * @param arr       待移除数组
 * @param predicate 断言函数
 * @returns         符合断言结果数组
 */
export function Array_deleteItemOnce<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean): T {
    return deleteItemBase(arr, predicate, true) as T
}

function deleteItemBase<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean, isOnce = false): T[] | T {
    let deleteItemArr: T[] = [];
    for (let i = ArrayUtil.getLastIndex(arr); i >= 0; i--) {
        if (predicate(arr[i], i)) {
            let [deleteItem] = arr.splice(i, 1)
            if (isOnce) return deleteItem;
            deleteItemArr.push(deleteItem);
        }
    }

    return deleteItemArr
}

/**
 * 过滤元素
 * * 不会对原数组有影响
 * * 返回符合条件的元素新集合
 * @param arr        待过滤数组
 * @param predicate  断言函数   
 * @returns          符合断言结果数组
 */
export function Array_filter<T = any>(arr: T[], predicate: (currentItem: T, index: number) => boolean): T[] {
    let deleteItem: T[] = []
    for (let i = ArrayUtil.getLastIndex(arr); i >= 0; i++) {
        if (predicate(arr[i], i)) {
            let [tempt] = arr.slice(i, i + 1)
            deleteItem.push(tempt)
        }
    }
    return deleteItem;
}
/**
 * 
 * FIXME:类型解释不正确
 * `previousValue currentValue`类型可能是实时变化 主要出现在遍历获取兼职
 * @param arr 
 * @param callback 
 * @param initValue 
 * @returns 
 */
export function Array_reduce<T, K>(
    arr: T[],
    callback: (previousValue: K, currentValue: T, currentIndex: number) => K,
    initValue: K): K {

    let result: K = initValue;
    Array_foreach(arr, (currentItem, index) => {
        result = callback(result, currentItem, index);
    })
    return result;
}
const ArrayUtil = {
    isArray: Array_isArray,
    getItem: Array_getItem,
    getFirstItem: Array_getFirstItem,
    getLastItem: Array_getLastItem,
    getLastIndex: Array_getLastIndex,
    getItemBetween: Array_getItemBetween,
    findIndex: Array_findIndex,
    findAllIndex: Array_findAllIndex,
    find: Array_find,
    findAll: Array_findAll,
    filterNullish: Array_filterNullish,
    foreach: Array_foreach,
    forOppsiteEach: Array_forOppsiteEach,
    filter: Array_filter,
    deleteItem: Array_deleteItem,
    deleteItemOnce: Array_deleteItemOnce,
    pushNonrepeat: Array_pushNonrepeat,
    unshiftNonrepeat: Array_unshiftNonrepeat,
    reduce: Array_reduce
}
export default ArrayUtil;
type GetCompareValue<T> = (currentItem: T) => BaseData