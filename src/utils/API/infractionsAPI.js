const hostname = process.env.REACT_APP_HOSTNAME_BACKEND + "/infractions"

export const stats = (guildId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/stats`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    guildId,
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                },
                redirect: 'follow'
            }).then(res => res.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const moderatorStats = (guildId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/modstats`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    guildId,
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                },
                redirect: 'follow'
            }).then(res => res.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}


export const list = (guildId, page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/list?page=${page || 0}&limit=${limit || 100}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    guildId,
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                },
                redirect: 'follow'
            }).then(res => res.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}
