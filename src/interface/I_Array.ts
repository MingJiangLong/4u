import { BaseData } from "../module";
export interface I_Array {

    /**
     * 判断是否是数组
     * @param value 待判断值
     * @example
     * ArrayUtil.isArray('');
     */
    isArray(value: any): value is Array<any>

    /**
     * 获取数组第一项
     * @param arr 
     * @param start 
     * @param end
     * @example
     * ArrayUtil.getFirst();
     */
    getFirst<T = any>(arr: T[]): T[]

    /**
     * 获取数组最后一项
     * @param arr 
     * @example
     * ArrayUtil.getLast();
     */
    getLast<T = any>(arr: T[]): T[]

    /**
     * 获取数组项
     * @param value 
     * @param start 
     * @param end 
     * @example
     * const test = [1,2,3]
     * ArrayUtil.getItems(test,0);
     * ArrayUtil.getItems(test,0,1);
     */
    getItems<T = any>(arr: T[], start: number, end?: number): T[]

    /**
     * 移除数组的一项
     * @param arr 
     * @param callback 
     */
    deleteOnce<T = any>(arr: T[], predicate: (currentValue: T, index: number) => boolean): T

    /**
     * 移除所有符合条件
     * @param arr 
     * @param callback 
     */
    delete<T = any>(arr: T[], predicate: (currentValue: T, index: number) => boolean): T[]

    /**
     * 数组分组
     * @param arr 数组
     * @param group 分组函数
     * @param identifier 已经分组的标识
     * @example
     * const testData = [{name:'john',age:18},{name:'anne',age:15},{name:'bill',age:18}]
     * Array.group(testData,(item)=>item.age);
     */
    group<Value = any>(
        arr: Value[],
        group: (currentValue: Value, index: number) => void,
        identifier: any[]
    ): [{
        key: string;
        grouped: Value[];
    }]
}


export type GroupedBaseData<T = any> = {
    key: BaseData
    grouped: T[]
} 