import { useState, useEffect } from 'react'
import Dispatcher from './dispatcher'

let store = {
    logged: localStorage.getItem('user') ? true : false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}
const dispatcher = new Dispatcher()

function createStore(value) {
    store = value
}

function getStore(key) {
    return store[key]
}

function setStore(value) {
    store = value
    dispatcher.emit('data', store)
}

function useStore() {
    const [value, setData] = useState(store)

    useEffect(() => {
        const fn = dispatcher.on('data', (data) => {
            let value = data

            if (Array.isArray(value)) {
                setData(value)
            } else if (typeof (value) == 'object') {
                setData({ ...value })
            } else {
                setData(value)
            }
        })

        return () => {
            dispatcher.off('data', fn)
        }
    })

    return [value, (v) => { setStore(v) }]
}

export {
    getStore,
    useStore,
    setStore,
    createStore
}