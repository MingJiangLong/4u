export type BaseData = string | number | boolean | symbol | null | undefined
export type DataTypeName = 'String' | 'Number' | 'Boolean' | 'Symbol' | 'Array' | 'Object' | 'Undefined' | 'Null' | 'Function'
export type Nullish = undefined | null
export type MapKey = string | number | symbol
export type LikeNumber = number | string
/**
 * 键值对类型
 */
export type KeyValue<T> = {
    [key in MapKey]: T
}

/**
 * 函数参数类型
 */
export type ParamType<T> = T extends (...args: infer E) => any ? E : T