import "./_dashboard.css";
import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap/'

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

        console.log(result)
        console.log(`https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png?size=512`)
        console.log(`https://cdn.discordapp.com/banners/${result.id}/${result.banner}.png?size=1280`)
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
    
            // for(let i = 0; i < guildAdmin.length; i++)
            // {
            //     console.log(`https://cdn.discordapp.com/icons/${guildAdmin[i].id}/${guildAdmin[i].icon}.jpg`)
            // }
        }
        else
        {
            window.localStorage.removeItem('dataDiscord');
            // document.location.href="http://localhost:3000/login"; 
            document.location.href="https://backendbounsbot.herokuapp.com/login"; 
        }
    }

    async refresh_token()
    {
        let info = JSON.parse(window.localStorage.getItem('dataDiscord'));

        let details = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'client_id': "898480744899412019",
            'client_secret': "_8eU3zihkLxqEQb0EJmCDLeFVOoZEYe2",
            'grant_type': 'refresh_token',
            'refresh_token': info.refresh_token
        }
        
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

            // console.log(result)
            console.log(window.localStorage.getItem('dataDiscord'))

            window.localStorage.setItem('dataDiscord', JSON.stringify(result));

            console.log(window.localStorage.getItem('dataDiscord'))

            this.getUser()
            this.getGuilds()
        }
        else
        {
            window.localStorage.removeItem('dataDiscord');
            // document.location.href="http://localhost:3000/login"; 
            document.location.href="https://backendbounsbot.herokuapp.com/login"; 
        }
    }

    async exchange_code(code){
        let details = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'client_id': "898480744899412019",
            'client_secret': "_8eU3zihkLxqEQb0EJmCDLeFVOoZEYe2",
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': "https://backendbounsbot.herokuapp.com/dashboard"
        } //'redirect_uri': "http://localhost:3000/dashboard"
        
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

            console.log(body.status)

            // console.log(result)
            window.localStorage.setItem('dataDiscord', JSON.stringify(result));

            this.getUser()
            this.getGuilds()
        }
        else
        {
            window.localStorage.removeItem('dataDiscord');
            // document.location.href="http://localhost:3000/login"; 
            document.location.href="https://backendbounsbot.herokuapp.com/login"; 
        }
    }

    componentDidMount() {
        // console.log(new URLSearchParams(window.location.search).get('code'))
        // this.exchange_code(new URLSearchParams(window.location.search).get('code'));

        console.log(window.localStorage.getItem("dataDiscord"))
        console.log(new URLSearchParams(window.location.search).get('code'))


        if(window.localStorage.getItem("dataDiscord"))
        {
            this.refresh_token()
        }
        else if(new URLSearchParams(window.location.search).get('code'))
        {
            this.exchange_code(new URLSearchParams(window.location.search).get('code'));
        }
        else
        {
            console.log("non connecté")
            // document.location.href="http://localhost:3000/login"; 
            document.location.href="https://backendbounsbot.herokuapp.com/login"; 
        }
    }


    render() {
        return (
            <div className="Dashboard">
                <h1 className="titleDashboard">Choisi un serveur</h1>
                <div className='listGuild'>
                {(() => {
                var guildList = [];

                for (let guild of this.state.guilds) {
                    guildList.push(
                    // <div className='listGuild'>
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
                                <a href={`${document.location.href}${guild.id}`}><button className="goGuild">GO</button></a>
                            </div>
                        </div>)
                }

                if(this.state.guilds.length === 0)
                {
                    guildList.push(<div className='center'><Spinner animation="grow" variant="success" /></div>)
                    guildList.push(<div className='center'><Spinner animation="grow" variant="success" /></div>)
                    guildList.push(<div className='center'><Spinner animation="grow" variant="success" /></div>)
                }

                return guildList;
                })()}
                </div>
            </div>
        )
    }
}

export default Dashboard;

// https://discord.com/api/oauth2/authorize?client_id=898480744899412019&redire
