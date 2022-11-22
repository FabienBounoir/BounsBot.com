export default class Fetch {
    static async getInfoUser(token) {
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
        }

        const body = await fetch('https://discord.com/api/users/@me', {
            headers: headers,
            method: "GET"
        });

        if (body.status === 200) {
            return body.json()
        }
        else {
            return null
        }
    };

    static async getGuilds(token) {
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
        }

        const body = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: headers,
            method: "GET"
        })


        if (body.status === 200) {
            const result = await body.json()
            let guildAdmin = await result.filter(guilds => guilds.permissions === 2147483647)

            return guildAdmin
        }
        else {
            await window.localStorage.removeItem('dataDiscord');
            return null
        }
    };

    static async getBounsBotHasGuild(guildList) {
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
            // const body = await fetch('https://backendbounsbot.herokuapp.com/bot/hasguilds?guilds='+guilds.join(","), requestOptions)
            const body = await fetch(process.env.REACT_APP_HOSTNAME_BACKEND + '/bot/hasguilds?guilds=' + guilds.join(","), requestOptions)
            const result = await body.json();

            return result.hasGuilds || null
        } catch (error) {
            console.error(error)
        }
    };
}