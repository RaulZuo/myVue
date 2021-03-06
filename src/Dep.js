export default class Dep{
    constructor(){
        this.subs = []
    }
    addSub(sub){
        this.subs.push(sub)
    }
    notify(){
        // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
        this.subs.forEach((sub) => sub.update())
    }
}
