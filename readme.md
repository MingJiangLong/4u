### javascript 工具

* 1.0.7 
    * PromiseUtil 已过官方872测试用例
      - 新增 then
      - 新增 catch
      - 新增 resolve
      - 新增 reject
      - 新增 finally
      - 新增 all
      - 新增 race
      - 新增 allSettled
      - 新增 retry
    * TypeUtil
      - 新增isFunction 判断是否是函数
      - 新增isPromiseUtilLike 用于判断是否是包含then
    * FunctionUtil
      * retry
      * throttle
      * debounce
* 1.0.6 删除Location
* 1.0.5
    * Array
      - 新增 group 数组分组
      - 移除 foreach map
    * FunctionUtil
      - 新增 retry     重试
      - 新增 throttle  节流
      - 新增 debounce   防抖  
    * Cookie 
      - 新增 setCookie
      - 新增 getCookie
      - 新增 deleteCookie

#### 说明
* I_** 表示接口