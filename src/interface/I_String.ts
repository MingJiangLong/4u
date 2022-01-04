export interface I_String {

    /**
     * 判断是否是字符串
     */
    isString: (value: any) => value is string

    /**
     * 生成随机字符串
     * @param len 
     */
    generateString(len?: number): string
}