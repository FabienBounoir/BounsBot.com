const hostname = process.env.REACT_APP_HOSTNAME_BACKEND + "/shards"

const searchGuild = (guildId) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetch(`${hostname}/search/${guildId}`)
            .then(response => response.json())

            resolve(response)
        }
        catch(e){
            reject(e)
        }
    })
}

const getStatus = () =>{
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetch(`${hostname}`)
            .then(response => response.json())

            resolve(response)
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports = {
    searchGuild,
    getStatus
}