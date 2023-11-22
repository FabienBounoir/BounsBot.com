const hostname = process.env.REACT_APP_HOSTNAME_BACKEND + "/auth"

export const login = (code) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/login?code=` + code).then(response => response.json())
            if (!response.success) throw new Error(response.message)

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("tokenType", response.data.tokenType)
            localStorage.setItem("user", JSON.stringify(response.data.user))

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const logout = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/logout`, {
                method: "POST",
                headers: {
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                }
            }).then(response => response.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const getGuilds = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/guilds`, {
                headers: {
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                }
            })

            if (response.status < 200 || response.status >= 300) {
                return reject(response)
            }

            const json = await response.json()

            resolve(json)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const getUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/user`, {
                headers: {
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                }
            }).then(response => response.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}