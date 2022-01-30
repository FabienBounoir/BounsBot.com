async function getInfoUser(token)
{
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
    }

    const body = await fetch('https://discord.com/api/users/@me', {
        headers: headers,
        method: "GET"
    });

    if(body.status === 200)
    {
        return body.json()
    }
    else
    {
        return null
    }

    // console.log(`https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png?size=512`)
    // console.log(`https://cdn.discordapp.com/banners/${result.id}/${result.banner}.png?size=1280`)
    //https://cdn.discordapp.com/banners/266636247017979904/9faf7228f56379b4006a44f9457a9355.png?size=1280
    //https://cdn.discordapp.com/banners/266636247017979904/a_05403f6196307ceb2b639b1522e63e12.png
}

async function getGuilds(token)
{
    console.log(token)
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+ token
    }

    const body = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: headers,
        method: "GET"
    });

    if(body.status === 200)
    {
        const result = await body.json();
        console.log("Nombre de serveur: ",result.length)
        let guildAdmin = await result.filter(guilds => guilds.permissions === 2147483647)

        return guildAdmin
    }
    else
    {
        await window.localStorage.removeItem('dataDiscord');
        return null
    }
}

async function getBounsBotHasGuild(guildList)
{
    //get id guild
    let guilds = await guildList.map(guild => guild.id)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {            
        const body = await fetch('https://backendbounsbot.herokuapp.com/bot/hasguilds?guilds='+guilds.join(","), requestOptions)
        const result = await body.json();

        return result.hasGuilds || null
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getInfoUser,
    getGuilds,
    getBounsBotHasGuild
}