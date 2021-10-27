/**
 * 数相加 解决精度问题
 * 1.分离整数和小数部分 各自相加\
 * 2. 化为整数 会出现部分精度问题 2.2*100,2.3*100,,4.1*100
 * @param args 
 */
export function Number_add(...args: number[]) {
    let [leftArr, rightArr] = [[] as string[], [] as string[]]
    const argsStrArr = args.map(v => `${v}`);
    let maxRightItemLength = 0;
    // 分离整数和小数部分
    argsStrArr.forEach(v => {
        const [leftItem, rightItem] = v.split('.');
        if (leftItem) leftArr.push(leftItem)
        if (rightItem) {
            rightArr.push(rightItem);
            if (rightItem.length > maxRightItemLength) maxRightItemLength = rightItem.length;
        }
    })

    // 小数部分 不够最长小数部分补0
    rightArr = rightArr.map(rightItem => {
        let zero = '';
        let needZeroFlag = maxRightItemLength - rightItem.length;
        while (needZeroFlag) {
            zero += '0';
            needZeroFlag--;
        }
        return rightItem += zero;
    })

    // 左边部分 count
    let leftTotal = leftArr.reduce((count, current) => {
        return count += (+current)
    }, 0)

    // 右边部分 count
    const rightTotal = rightArr.reduce((count, current) => {
        return count += (+current)
    }, 0)

    let rightTotalStr = `${rightTotal}`;

    let carray = rightTotalStr.length - maxRightItemLength;

    if (carray > 0) {

        // 左边+进位数
        leftTotal += +(rightTotalStr.substr(0, rightTotalStr.length - maxRightItemLength) ?? 0)

        // 右边剔除进位数
        rightTotalStr = rightTotalStr.substr(rightTotalStr.length - maxRightItemLength)
    }

    if (carray < 0) {
        while (carray) {
            rightTotalStr = `0${rightTotalStr}`
            carray++
        }
    }

    const tempt = `${leftTotal}.${rightTotalStr}`
    return +tempt;
}
const NumberUtil = {
    add: Number_add
}

export default NumberUtil;