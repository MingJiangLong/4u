import { TypeUtil } from "..";

enum PromiseStatus {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECT = 'rejected'
}
/**
  * promise:是一个拥有then方法的对象或函数，其行为符合本规范
  * thenable:是一个定义了 then 方法的对象或函数。
  * 这个主要是用来兼容一些老的Promise实现，只要一个Promise实现是thenable，也就是拥有then方法的，就可以跟Promises/A+兼容。
  * 
  * value:指reslove出来的值，可以是任何合法的JS值(包括 undefined , thenable 和 promise等)
  * exception:异常，在Promise里面用throw抛出来的值.
  * reason:拒绝原因，是reject里面传的参数，表示reject的原因
  * 个promise必须处于三种状态之一： 等待（pending）， 成功（fulfilled），拒绝（rejected）
  *
  * 当promise处于pending时：
  * promise可以转为fulfilled或rejected状态
  * 当promise处于成功时：
  * promise不能切换成别的状态
  * 必须拥有一个不可变的返回值
  * 当promise处于拒绝时：
  * promise不能切换成别的状态
  * 必须拥有一个不可变的返回原因
  * 这里的不可变指的是恒等（即可用 ===) 判断相等），而不是意味着更深层次的不可变（意思是说内存地址不可变，里面的属性可变）。
  * 已完成872个官方测试
  */
export default class PromiseUtil<EventualValue = any, Reason = any> {

    /**
     * Promise 状态
     * 等待（pending）
     * 成功（fulfilled）
     * 拒绝（rejected）
     */
    private status = PromiseStatus.PENDING;

    /**
     * 终值
     */
    private eventualValue: EventualValue | undefined;

    /**
     * reject reason
     */
    private reason: Reason | undefined;

    /**
     * then时 pending promise注册的回调
     */
    private onFulfilledArr: any[] = [];

    /**
     * then时 pending promise注册的回调
     */
    private onRejectedArr: any[] = [];

    /**
     * Promise的构造函数 用来创建Promise
     * @param executor 
     */
    constructor(
        executor: (resolve: (data?: EventualValue) => void,
            reject: (reason?: Reason) => void) => void
    ) {
        try {
            executor((value) => {
                this.onResolve(value)
            }, (reason) => {
                this.onReject(reason)
            });
        } catch (error: any) {
            this.onReject(error);
        }
    }



    /**
     * 修改Promise状态
     * 执行成功回调
     * @param data 
     */
    private onResolve(eventualValue?: EventualValue) {
        if (this.status === PromiseStatus.PENDING) {
            this.status = PromiseStatus.FULFILLED;
            this.eventualValue = eventualValue;

            this.onFulfilledArr.forEach(item => {
                item(this.eventualValue)
            })
        }
    }

    /**
     * 修改Promise 状态
     * 执行失败回调
     * @param reason 
     */
    private onReject(reason?: Reason) {
        if (this.status === PromiseStatus.PENDING) {
            this.status = PromiseStatus.REJECT;
            this.reason = reason;
            this.onRejectedArr.forEach(item => {
                item(this.reason)
            })
        }
    }


    private resolvePromise(newPromise: PromiseUtil, resultOfLastPromise: any, resolve: any, reject: any) {
        try {

            if (newPromise === resultOfLastPromise) throw new TypeError('循环Promise调用!')

            /**
             * 2.3.3: Otherwise, if `x` is an object or function,
             */
            if (
                resultOfLastPromise !== null &&
                (typeof resultOfLastPromise === 'object' || typeof resultOfLastPromise === 'function')
            ) {

                let haveInvoked = false;
                /**
                 *  2.3.3: Otherwise, if `x` is an object or function,
                 *  2.3.3.1: Let `then` be`x.then` `x` is a function via return from a fulfilled promise
                 *  2.3.3.1: Let `then` be `x.then` `x` is a function via return from a rejected promise
                 *  2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise` 2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)` `y` is a thenable for a thenable `y` is a thenable that fulfills but 
                 *  then throws for an asynchronously-fulfilled custom thenable `then` calls `resolvePromise` synchronously via return from a fulfilled promise:
                 */
                const then = resultOfLastPromise.then;

                if (typeof then === 'function') {

                    // 2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument`resolvePromise`, and second argument`rejectPromise`
                    // Calls with `x` as `this` and two function arguments

                    /**
                     * 这里是then可能throw 错误
                     */
                    try {

                        /**
                         *  If `then` is a function, 
                         *  call it with `x` as `this`,
                         *  first argument `resolvePromise`, and second argument `rejectPromise`
                         */
                        then.call(
                            resultOfLastPromise,
                            (s: any) => {

                                /**
                                 *  2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it.
                                 */
                                if (haveInvoked) return;
                                haveInvoked = true
                                this.resolvePromise(newPromise, s, resolve, reject);
                            },
                            (e: any) => {
                                if (haveInvoked) return;
                                haveInvoked = true
                                reject(e)
                            }
                        )

                    } catch (error) {
                        if (haveInvoked) return;
                        haveInvoked = true
                        reject(error)
                    }
                } else {
                    resolve(resultOfLastPromise)
                }
            } else {
                resolve(resultOfLastPromise);
            }
        } catch (error) {
            reject(error)
        }
    }
    /**
     * then
     * promise必须提供一个 then 方法去访问当前或者最终成功的结果或者失败的原因 ✔
     * Promise的then 方法接收两个参数 ✔
     * onFulfilled 和 onRejected 都为可选的参数时: 
     * 如果onFulfilled 如果不是函数，它将会被忽略。✔
     * 如果onRejected 如果不是函数，它将会被忽略。✔
     * 如果onFulfilled 是一个函数时:
     * 此函数在 promise 成功后(fulfilled)被调用,并把 promise 的成功值（value）作为它的第一个参数 ✔
     * 在promise 成功（fulfilled）之前一定不能提前被调用 ✔
     * 该函数只执行一次
     * 
     * 如果onRejected 是一个函数时,
     * 此函数在 promise 失败（rejected）时被调用, 并且把 promise的失败原因（reason）当成第一个参数 ✔
     * 在 promise 失败（rejected）之前一定不能提前被调用 ✔
     * 该函数只执行一次
     * 
     * onFulfilled 和 onRejected 只有在 执行上下文 堆栈仅包含平台代码时才可被调用 [3.1]
     * onFulfilled 和 onRejected 必须被作为函数调用 (尽管没有 this 值). [3.2]
     * 
     * then 方法可以被同一个promise多次调用
     * 当 promise 成功时, 所有 onFulfilled 回调函数需按照最原始的then顺序来调用
     * 当 promise 失败时，所有各自的onRejected回调都必须按照其对then的原始调用顺序执行
     * then 必须返回一个promise [3.3].
     * 如果 onFulfilled 或者 onRejected 返回一个值 x , 则运行下面的 Promise 解决过程： [[Resolve]](promise2, x).
     * 如果 onFulfilled或 onRejected抛出一个异常e,promise2 必须被拒绝（rejected）并把e当作失败的原因（reason）
     * 如果onFulfilled不是一个函数且promise1成功执行（fulfilled）,则 promise2将会接收promise1传递下来的成功（fulfilled）的值
     * 如果onRejected不是一个函数，并且promise1已经失败了（rejected）,则必须以同promise1相同的失败（rejected）的原因（reason）传递到promise2
     * 
     * @param onFulfilled 
     * @param onRejected 
     */
    then(onFulfilled?: (eventualValue?: EventualValue) => any, onRejected?: (reason?: Reason) => void) {

        let onFulfilledFn = (value?: any) => {
            if (typeof onFulfilled !== 'function') {
                return value
            }
            return onFulfilled(value);
        }

        let onRejectedFn = (reason?: any) => {
            if (typeof onRejected !== 'function') {
                throw reason;
            }
            return onRejected(reason);
        }


        let newPromise = new PromiseUtil((resolve, reject) => {
            if (PromiseStatus.FULFILLED === this.status) {
                setTimeout(() => {
                    try {
                        let fulfilledResult = onFulfilledFn(this.eventualValue);
                        this.resolvePromise(newPromise, fulfilledResult, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (PromiseStatus.REJECT === this.status) {
                setTimeout(() => {
                    try {
                        let rejectedResult = onRejectedFn(this.reason);
                        this.resolvePromise(newPromise, rejectedResult, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            } else {

                // Pending 注册完成回调
                this.onRejectedArr.push((reason: Reason) => {
                    setTimeout(() => {
                        try {
                            let rejectedResult = onRejectedFn(reason);
                            this.resolvePromise(newPromise, rejectedResult, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                this.onFulfilledArr.push((value: EventualValue) => {
                    setTimeout(() => {
                        try {
                            let fulfilledResult = onFulfilledFn(value);
                            this.resolvePromise(newPromise, fulfilledResult, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
        })

        return newPromise;
    }

    /**
     * 捕获异常
     * @param onRejected 
     * @returns 
     */
    catch(onRejected?: (reason?: Reason) => void) {
        return this.then(undefined, onRejected)
    }

    /**
     * 最终调用
     * 在原来promise then 返回一个新的Promise
     * 返回了一个新的Promise
     * @param fn 
     * @returns 
     */
    finally(fn: () => void) {
        if (typeof fn !== 'function') {
            fn = () => { }
        }
        return this.then(
            (value) => {
                return PromiseUtil.resolve(fn()).then(() => {
                    return value;
                });
            },
            (error) => {
                return PromiseUtil.reject(fn()).then(() => {
                    throw error;
                });
            }
        )
    }

    /**
     * resolve
     * 返回一个新的Promise
     * @param value 
     * @returns 
     */
    static resolve<EventualValue = any, Reason = any>(value?: any) {
        return new PromiseUtil<EventualValue, Reason>(resolve => {
            resolve(value);
        });
    }

    /**
     * reject
     * 返回一个新的Promise
     * @param reason 
     * @returns 
     */
    static reject<EventualValue = any, Reason = any>(reason: any) {
        return new PromiseUtil<EventualValue, Reason>((resolve, reject) => {
            reject(reason);
        });
    }

    /**
     * 返回一个新的Promise
     * @param promises 
     * @returns 
     */
    static all<Reason = any>(promises: any[]) {
        return new PromiseUtil<any[], Reason>((resolve, reject) => {
            let doneCount = 0;
            let doneResult: any[] = []
            try {
                promises.forEach(promise => {
                    promise.then((value: any) => {
                        doneCount++;
                        doneResult.push(value);
                        if (doneCount === promises.length) resolve(doneResult);
                    }, reject)
                })
            } catch (error: any) {
                reject(error)
            }
        })
    }

    /**
     * 只获取最快成功的那个结果
     * 返回一个新的Promise
     * @param promises 
     * @returns 
     */
    static race<T = any, K = any>(promises: PromiseUtil<T, K>[]) {
        return new PromiseUtil((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve, reject);
            });
        });
    }

    /**
     * 全部Promise完成 不论成功与否
     * @param promises 
     * @returns 
     */
    static allSettled<T = any, K = any>(promises: PromiseUtil<T, K>[]) {

        return new PromiseUtil((resolve) => {

            let doneCount = 0;
            let doneResult: { status: boolean, value: T | K | undefined }[] = []

            for (let value of promises) {
                value.then((success) => {
                    doneCount++;
                    doneResult.push({
                        status: true,
                        value: success
                    })

                    if (doneCount === promises.length) resolve(doneResult);
                }, (error) => {
                    doneCount++;
                    doneResult.push({
                        status: true,
                        value: error
                    })
                    if (doneCount === promises.length) resolve(doneResult);
                })
            }
        })

    }


    /**
     * 
     * @param promise 
     * @param max 
     * @returns 
     */
    static retry(promise: any, max = 1,) {

        return new PromiseUtil((resolve, reject) => {
            let tempt: PromiseUtil;
            try {
                if (TypeUtil.isFunction(promise)) {
                    let fnResult = promise();
                    if (TypeUtil.isPromiseUtilLike(fnResult)) {
                        tempt = fnResult
                    } else {
                        tempt = PromiseUtil.resolve(fnResult);
                    }
                } else if (TypeUtil.isPromiseUtilLike(promise)) {
                    tempt = promise
                } else {
                    tempt = PromiseUtil.resolve(promise);
                }

                tempt.then(resolve, (error) => {
                    max--;
                    if (max) {
                        // 每次调用会创建新Promise
                        PromiseUtil.retry(promise, max,).then(s => resolve(s), e => reject(e))
                    } else {
                        reject(error)
                    }
                })
            } catch (error) {
                max--;
                if (max) {
                    PromiseUtil.retry(promise, max,).then(s => resolve(s), e => reject(e))
                } else {
                    reject(error)
                }
            }
        })
    }
    static deferred() {
        let result: any = {};
        result.promise = new PromiseUtil(function (resolve, reject) {
            result.resolve = resolve;
            result.reject = reject;
        });
        return result;
    }


}

module.exports = PromiseUtil