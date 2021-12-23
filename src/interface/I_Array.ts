import { BaseData } from "../module";

export interface I_Array {
    isArray(value: any): value is boolean
    group<Value = any>(arr: Value[], group: (currentValue: Value, index: number) => void): void
}


export type GroupedBaseData<T = any> = {
    key: BaseData
    grouped: T[]
} 