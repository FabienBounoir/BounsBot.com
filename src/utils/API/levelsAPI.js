const hostname = process.env.REACT_APP_HOSTNAME_BACKEND +"/levels"

const global = (page) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetch(`${hostname}/global/${new URLSearchParams({page})}`)
            .then(response => response.json())

            resolve(response)
        }
        catch(e){
            reject(e)
        }
    })
}

const guild = (guildId, page) =>{
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetch(`${hostname}/guild/${guildId}/${new URLSearchParams({page})}`)
            .then(response => response.json())

            resolve(response)
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports = {
    global,
    guild
}