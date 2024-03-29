const hostname = process.env.REACT_APP_HOSTNAME_BACKEND + "/commands"

export const get = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${hostname}`).then(response => response.json())

            resolve(response)
        }
        catch (e) {
            reject(e)
        }
    })
}