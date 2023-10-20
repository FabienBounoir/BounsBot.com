const hostname = process.env.REACT_APP_HOSTNAME_BACKEND + "/levels"

export const global = (page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/global?${new URLSearchParams({ page })}`)

            if (response.status !== 200) return reject(new Error("Error while fetching data"))

            resolve(response.json())
        }
        catch (e) {
            reject(e)
        }
    })
}

export const guild = (guildId, page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/guild/${guildId}?${new URLSearchParams({ page })}`)
            if (response.status !== 200) return reject(new Error("Error while fetching data"))

            resolve(response.json())
        }
        catch (e) {
            reject(e)
        }
    })
}

// module.exports = {
//     global,
//     guild
// }