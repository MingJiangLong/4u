export type DataTypeName = 'String' | 'Number' | 'Boolean' | 'Symbol' | 'Array' | 'Object' | 'Undefined' | 'Null'
export type BaseData = string | number | boolean | symbol | null | undefined
export type Nullish = undefined | null
export type KeyValue = { [key: string]: BaseData }

export type I_KeyValue<T> = {
    [key: string]: T
}