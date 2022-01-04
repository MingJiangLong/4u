import PromiseUtil from "../promise_util";
class FunctionUtil {

    /**
     * 重试执行函数
     * ☆ 同步函数也会被转化成异步函数
     * @example
     *    // 同步函数
     *    FuntionUtil.retry(
     *      () => {
     *        console.log(2);
     *        throw '获取抛错'
     *      }, 4).catch(e => {
     *        console.log('错误值', e);
     *      }
     *    )
     *    
     *    function testPromise() {
     *        return new PromiseUtil((s, e) => {
     *            setTimeout(() => {
     *                // TODO s('成功执行')
     *                // TODO e('失败执行')  
     *            }, 2000)
     *        })
     *    }
     *    FunctionUtil.retry(testPromise, 3).catch(e => {
     *       // 获取到最后一次报错内容
     *       console.log('获取错误', e);
     *    }).then(s => {
     *       console.log('成功执行');
     *    })
     *
     * 
     */
    static retry(fn: any, retry = 1) {
        return PromiseUtil.retry(fn, retry)
    }

    /**
     * 
     * 节流
     * 输入之后不能输入
     * @param fn 
     * @param delay 
     * @returns 
     */
    static throttle(fn: (...args: any[]) => any, delay = 1000) {

        let timer: NodeJS.Timer;
        return (...arg: any[]) => {
            if (timer) return;
            fn(...arg);
            timer = setTimeout(() => {
                if (timer) {
                    clearTimeout(timer)
                }
            }, delay)
        }
    }

    /**
     * 防抖
     * 多次输入 最后生效
     * @param fn 
     * @param delay 
     * @returns 
     */
    static debounce(fn: (...args: any[]) => any, delay = 1000) {
        let timer: NodeJS.Timer;
        return (...args: any[]) => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                fn(...args)
                if (timer) {
                    clearTimeout(timer);
                }
            }, delay)
        }
    }


}


export default FunctionUtil;