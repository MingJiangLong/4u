
/**
  *  promise:是一个拥有then方法的对象或函数，其行为符合本规范
  *  thenable:是一个定义了 then 方法的对象或函数。这个主要是用来兼容一些老的Promise实现，只要一个Promise实现是thenable，也就是拥有then方法的，就可以跟Promises/A+兼容。
  *  value:指reslove出来的值，可以是任何合法的JS值(包括 undefined , thenable 和 promise等)
  *  exception:异常，在Promise里面用throw抛出来的值.
  *  reason:拒绝原因，是reject里面传的参数，表示reject的原因
  */
// export interface I_PromiseUtil {
//   new <T>(executor: (resolve: (value: T | PromiseUtilLike<T>) => void, reject: (reason?: any) => void) => void): PromiseUtilLike<T>;
//   catch(): any
//   then(): any
//   finally(): any
// }

export interface PromiseUtilLike<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2>;
}
