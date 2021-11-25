
/**
 * 防抖  适用于 搜索框
 * @param func 
 * @param wait 
 * @param repeatCallback 
 * @returns 
 */
export function debounce(func: (...args: any[]) => void, wait: number, repeatCallback?: () => void) {

    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer)
            repeatCallback && repeatCallback()
        };
        timer = setTimeout(() => {
            func(...args)
            clearTimeout(timer)
        }, wait)
    }
}

/**
 * 节流 适用防重复点击  
 * 防抖和节流的区别在于:防抖的时间轴会延长 节流不会
 * @param func 
 * @param wait 
 * @param repeatCallback 
 * @returns 
 */
export function throttle(func: (...args: any[]) => void, wait: number, repeatCallback?: () => void) {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timer) {
            repeatCallback && repeatCallback();
        } else {
            timer = setTimeout(() => {
                func(...args)
                clearTimeout(timer)
            }, wait)
        }
    }
}

