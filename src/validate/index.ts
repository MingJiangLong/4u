import { isLikeNumber } from "../type_util";

/**
 * 检验是否是ipv4
 * .分割4段 [0-255]之间
 * @param ip 
 */
export function isIPV4(ip: string) {
    let singleArr = ip.split('.');
    if (singleArr.length != 4) return false;

    for (let i = 0; i <= 3; i++) {
        let likeNumber = isLikeNumber(singleArr[i]);
        if (!likeNumber) return false;
        if (`${+singleArr[i]}` !== singleArr[i]) return false;
    }
    return true;
}
const ValidateUtil = {
    isIPV4
}
export default ValidateUtil