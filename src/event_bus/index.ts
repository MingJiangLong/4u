import ArrayUtil from "../array_util";
/**
 * EVENT BUS
 * * 支持一个event 添加多个监听函数
 * * 支持 once操作
 */
class EventBus implements IEventBus {
    events: EventInfo[] = [];
    flag: number = 0;
    /**
     * 基础添加监听器
     * @param eventName 
     * @param callback 
     * @param once 
     * @returns 
     */
    private addBaseListener<T = any>(
        eventName: string,
        callback: (...args: T extends Array<infer E> ? E[] : T[]) => void,
        once = false,
    ) {
        let findResult = ArrayUtil.findOneItem(this.events, (item) => {
            return item.eventName === eventName
        })

        const key = new Date().getTime() + '' + this.flag;
        if (!!!findResult) {
            this.events.push({
                eventName,
                callbacks: [{ key, callback, once }]
            })
        } else {
            findResult.callbacks.push({
                key,
                callback,
                once
            })
        }
        this.flag++
        return {
            remove: () => {
                this.remove(eventName, key)
            }
        }
    }


    addListener<T = any>(eventName: string, callback: (...args: T extends Array<infer E> ? E[] : T[]) => void) {
        return this.addBaseListener(eventName, callback, false)

    };

    addListenerOnce<T = any>(eventName: string, callback: (...args: T extends Array<infer E> ? E[] : T[]) => void) {
        return this.addBaseListener(eventName, callback, true)
    };

    private remove(eventName: string, key: string) {
        let findItem = ArrayUtil.findOneItem(this.events, (event) => {
            return event.eventName === eventName
        });
        if (!!!findItem) return;
        ArrayUtil.deleteAll(findItem.callbacks, (callback) => callback.key === key)
    }

    emit(eventName: string, ...args: any[]) {
        const event = ArrayUtil.findOneItem(this.events, (event) => event.eventName === eventName);

        if (!!!event) return;
        if (!!!event.callbacks.length) return this.clearEvent(eventName);

        event.callbacks.forEach((callback, index) => {
            callback.callback(...args)
        })
        ArrayUtil.deleteAll(event.callbacks, (callback) => callback.once === true)
    };

    clearEvent(eventName: string) {
        ArrayUtil.deleteAll(this.events, (event) => event.eventName === eventName)
    }

    clear() {
        this.events = []
    }
}

export default new EventBus();

interface IEventBus {

    /**
     * 事件集合
     */
    events: EventInfo[]

    /**
     * 添加监听器
     */
    addListener: <T = any> (eventName: string, callback: (...args: T extends Array<infer E> ? E[] : T[]) => void) => { remove: () => void }

    /**
     * 添加一次性的监听器
     */
    addListenerOnce: <T = any>(eventName: string, callback: (...args: T extends Array<infer E> ? E[] : T[]) => void) => { remove: () => void }

    /**
     * 触发事件
     */
    emit: (eventName: string, ...args: any[]) => void

    /**
     * 清除事件
     */
    clearEvent: (eventName: string) => void

    /**
     * 清除所有事件
     */
    clear: () => void
}
type EventInfo = {
    eventName: string
    callbacks: Array<{ key: string, callback: any, once: boolean }>
}