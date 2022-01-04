import { ParamType } from "../module";

export interface I_Number {

    /**
     * 判断是否是数字类型
     * @param value 
     */
    isNumber(value: any): value is string

    /**
     * 判断是否是类数字类型
     * @param value 
     */
    isLikeNumber<T>(value: ParamType<T>): value is (ParamType<T>)

    /**
     * 数字相加
     * @param args 
     */
    add(...args: (string | number)[]): number
}