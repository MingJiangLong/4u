export type BaseData = string | number | boolean | symbol | null | undefined
export type DataTypeName = 'String' | 'Number' | 'Boolean' | 'Symbol' | 'Array' | 'Object' | 'Undefined' | 'Null'
export type Nullish = undefined | null
export type MapKey = string | number | symbol
/**
 * 键值对类型
 */
export type KeyValue<T> = {
    [key in MapKey]: T
}

// export type CookieConfig = {
//     domain?: string
//     path?: string
//     expires?: Date
// }