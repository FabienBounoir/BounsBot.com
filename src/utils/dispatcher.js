let immediateEvents = {}
let eventUID = 0

export default class Dispatcher {
    static registerImmediate(event) {
        immediateEvents[event] = true
    }

    constructor() {
        this.__callbacks__ = {}
        this.__uids__ = {}
    }

    on(event, callback, generateUID = false) {
        let uid

        if (!this.__callbacks__[event]) {
            this.__callbacks__[event] = []
        }

        this.__callbacks__[event].push(callback)

        if (immediateEvents[event]) {
            delete (immediateEvents[event])
            this.emit(event)
        }

        if (generateUID) {
            uid = `event${eventUID++}`
            this.__uids__[uid] = callback
        }

        return callback
    }

    off(event, callback) {
        let index
        let arr = this.__callbacks__[event] || []
        let fn = this.__uids__[callback]

        delete (this.__uids__[callback])
        callback = fn || callback
        index = arr.findIndex(f => f == callback)

        if (index > -1) {
            arr.splice(index, 1)
        }

        return this
    }

    offAll(event) {
        if (event) {
            delete (this.__callbacks__[event])
        } else {
            this.__callbacks__ = {}
        }

        return this
    }

    emit(event, ...params) {
        setTimeout(() => {
            let arr = this.__callbacks__[event] || []

            arr.forEach(callback => {
                callback.apply(null, params)
            })
        }, 0);

        return this
    }
}