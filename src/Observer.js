// Dep用于订阅者的存储和收集，将在下面实现
import Dep from './Dep'
// Observer类用于给data属性添加set&get方法
export default class Observer{
    constructor(value){
        this.value = value
        this.walk(value)
    }
    walk(value){
        Object.keys(value).forEach(key => this.convert(key, value[key]))
    }
    convert(key, val){
        defineReactive(this.value, key, val)
    }
}
export function defineReactive(obj, key, val){
    var dep = new Dep()
    // 给当前属性的值添加监听
    // console.log(key, val);
    var chlidOb = observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=> {
            console.log('get value')
            // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
            // target指向一个Watcher实例，每个Watcher都是一个订阅者
            // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
            // 此处的问题是：并不是每次Dep.target有值时都需要添加到订阅者管理员中去管理，需要对订阅者去重，不影响整体思路，不去管它
            if(Dep.target){
                dep.addSub(Dep.target)
            }
            return val
        },
        set: (newVal) => {
            console.log('new value seted')
            if(val === newVal) return
            val = newVal
            // 对新值进行监听
            chlidOb = observe(newVal)
            // 通知所有订阅者，数值被改变了
            dep.notify()
        }
    })
}
export function observe(value){
    // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
    if(!value || typeof value !== 'object'){
        return
    }
    return new Observer(value)
}
