/**
 * 异步处理
 * @param promise 
 * @returns 
 */
export default function to<S = any, E = Error>(promise: Promise<S>): Promise<[S, null] | [null, E]> {
    return promise.then(
        s => [s, null],
        (e: E) => [null, e]
    )
}