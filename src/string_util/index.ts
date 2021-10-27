import TypeUtil from "../type_util";


export function String_isString(value: any) {
    return TypeUtil.isString(value)
}
const StringUtil = {
    isString: String_isString
}
export default StringUtil;