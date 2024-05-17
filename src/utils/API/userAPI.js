const hostname = process.env.REACT_APP_HOSTNAME_BACKEND + "/user"

export const getUserInformations = (ids, guildId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}/getusers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    guildId,
                    Authorization: `${localStorage.getItem("tokenType")} ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ ids, guildId })
            })
                .then(response => response.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}