const hostname = process.env.REACT_APP_HOSTNAME_BACKEND + "/guilds"

export const sendMessage = (messageComponent) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/send`, {
                body: JSON.stringify(messageComponent),
                method: "POST"
            })
                .then(response => response.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const hasThisGuild = (guildIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/has`, {
                body: JSON.stringify({ has: guildIds }),
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const best = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/best`)
                .then(response => response.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const getConfiguration = (guildId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/configuration?guildId=${guildId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                },
            })
                .then(response => response.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const updateConfiguration = (guildId, changement) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/configuration/${guildId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(changement),
                redirect: 'follow'
            }).then(res => res.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const getElement = (guildId, element) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/${guildId}/${element}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                },
            })
                .then(response => response.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}