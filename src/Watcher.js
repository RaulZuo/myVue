import Dep from './Dep'
export default class Watcher{
    constructor(vm, expOrFn, cb){
        this.vm = vm // 被订阅的数据一定来自于当前Vue实例
        this.cb = cb // 当数据更新时想要做的事情
        this.expOrFn = expOrFn // 被订阅的数据
        this.val = this.get() // 维护更新之前的数据
    }
    // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
    update(){
        this.run()
    }
    run(){
        const val = this.get()
        if(val !== this.val){
            this.val = val;
            this.cb.call(this.vm)
        }
    }
    get(){
        // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
        Dep.target = this
        const val = this.vm._data[this.expOrFn]
        // console.log(this.expOrFn, this.vm._data[this.expOrFn])
        // 置空，用于下一个Watcher使用
        Dep.target = null
        return val;
    }
}