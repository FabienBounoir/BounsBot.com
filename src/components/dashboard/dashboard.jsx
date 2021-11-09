import "./_dashboard.css";
import React, { Component } from 'react'

class Dashboard extends Component {
    state = {
        user: {},
        guilds: [],
    }


    async getUser()
    {
        let info = JSON.parse(window.localStorage.getItem('dataDiscord'));

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+info.access_token
        }
        // let r = requests.post(API_ENDPOINT+'/oauth2/token', data=data, headers=headers)

        const body = await fetch('https://discord.com/api/users/@me', {
            headers: headers,
            method: "GET"
        });
        const result = await body.json();

        if(body.status !== 200)
        {
            this.refresh_token()
        }

        window.localStorage.setItem('dataUser',JSON.stringify(result))
        // console.log(`https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png?size=512`)
        // console.log(`https://cdn.discordapp.com/banners/${result.id}/${result.banner}.png?size=1280`)
        //https://cdn.discordapp.com/banners/266636247017979904/9faf7228f56379b4006a44f9457a9355.png?size=1280
        //https://cdn.discordapp.com/banners/266636247017979904/a_05403f6196307ceb2b639b1522e63e12.png
    }

    async getGuilds()
    {
        let info = JSON.parse(window.localStorage.getItem('dataDiscord'));

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+ info.access_token
        }
        // let r = requests.post(API_ENDPOINT+'/oauth2/token', data=data, headers=headers)

        const body = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: headers,
            method: "GET"
        });

        if(body.status === 200)
        {
            const result = await body.json();

            let guildAdmin = result.filter(guilds => guilds.permissions === 2147483647)

            this.setState({
                guilds: guildAdmin, 
            });
        }
        else
        {
            window.localStorage.removeItem('dataDiscord');
            document.location.href="/login"; 
        }
    }

    async refresh_token()
    {
        let info = JSON.parse(window.localStorage.getItem('dataDiscord'));

        let details = {
            'client_id': "898480744899412019",
            'client_secret': "_8eU3zihkLxqEQb0EJmCDLeFVOoZEYe2",
            'grant_type': 'refresh_token',
            'refresh_token': info.refresh_token
        }//'Content-Type': 'application/x-www-form-urlencoded',
        
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const body = await fetch('https://discord.com/api/oauth2/token', {
            method: "POST",
            body: formBody,
            headers:headers
        });

        if(body.status === 200)
        {
            const result = await body.json();

            // console.log(result)
            // console.log(window.localStorage.getItem('dataDiscord'))

            window.localStorage.setItem('dataDiscord', JSON.stringify(result));

            this.getUser()
            this.getGuilds()
        }
        else
        {
            window.localStorage.removeItem('dataDiscord');
            document.location.href="/login"; 
        }
    }

    async exchange_code(code){
        let details = {
            'client_id': "898480744899412019",
            'client_secret': "_8eU3zihkLxqEQb0EJmCDLeFVOoZEYe2",
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': "https://bounsbot.herokuapp.com/dashboard"
        } //'redirect_uri': "http://localhost:3000/dashboard" | 'redirect_uri': "https://bounsbot.herokuapp.com/dashboard"
        
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const body = await fetch('https://discord.com/api/oauth2/token', {
            headers: headers,
            method: "POST",
            body: formBody
        });

        if(body.status === 200)
        {

            const result = await body.json();

            window.localStorage.setItem('dataDiscord', JSON.stringify(result));
            
            this.getUser()
            document.location.href="/dashboard"; 
        }
        else
        {
            window.localStorage.removeItem('dataDiscord');
            document.location.href="/login"; 
        }
    }

    componentDidMount() {
        if(window.localStorage.getItem("dataDiscord"))
        {
            // this.refresh_token()
            this.getUser()
            this.getGuilds()
        }
        else if(new URLSearchParams(window.location.search).get('code'))
        {
            this.exchange_code(new URLSearchParams(window.location.search).get('code'));
        }
        else
        {
            document.location.href="/login"; 
        }
    }


    render() {
        return (
            <div className="Dashboard">
                <div className="top">
                    <h1>Sélectionner un serveur</h1> 
                    <div className="search search-bar" data-v-7085cbe2=""></div>
                </div>
                <div className='listGuild'>
                {(() => {
                var guildList = [];

                for (let guild of this.state.guilds) {
                    guildList.push(
                        <div className="Guild">
                            <div className="profilGuild">
                                <div className="banniere" style={{background: "url(\"https://cdn.discordapp.com/icons/"+guild.id+"/"+guild.icon+".jpg\")"}}></div>
                                <img className='imageGuild' size="80" radius="40" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.jpg`} onError={(e)=>{e.target.outerHTML=`<img class='imageGuild' size="80" radius="40" src='https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png'/>`}} alt="Logo de ----"></img>
                            </div>
                            <div className="info">
                                <div className="infoGuild">
                                    <h3 className="nameGuild">{guild.name}</h3>
                                    <div className="typeAccess">{guild.owner ? ("Proprietaire") : ("Bot Master") }</div>
                                </div>
                                <a href={`/dashboard/${guild.id}`}><button className="goGuild">GO</button></a>
                            </div>
                        </div>)
                }

                if(this.state.guilds.length === 0)
                {
                    for(let i = 0; i < 6; i++)
                    {
                        guildList.push(<div className="Guild">
                        <div className="profilGuildTemplate">
                            <div className="banniereTemplate"></div>
                        </div>
                        <div className="info">
                            <div className="infoGuildTemplate">
                                <h3 className="nameGuildTemplate"> </h3>
                                <div className="typeAccessTemplate"></div>
                            </div>
                            {/* <a href={`https://bounsbot.herokuapp.com/dashboard/${guild.id}`}><button className="goGuild">GO</button></a> */}
                            <div className="goGuildTemplate"></div>
                        </div>
                    </div>)
                    }
                }

                return guildList;
                })()}
                </div>
            </div>
        )
    }
}

export default Dashboard;
