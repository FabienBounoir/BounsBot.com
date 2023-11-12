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

// module.exports = {
//     sendMessage,
//     hasThisGuild,
//     best
// }