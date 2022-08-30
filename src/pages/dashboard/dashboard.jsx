import "./_dashboard.css";
import React, { Component } from 'react'
import Fetch from "../../utils/fetch.js"
import Loading from "../../components/loading/loading.jsx";
import { Link } from "react-router-dom"

class Dashboard extends Component {
    state = {
        user: {},
        guilds: [],
        hasguild: [],
        loading: true
    }

    async refresh_token() {
        let info = JSON.parse(window.localStorage.getItem('dataDiscord'));

        let details = {
            'client_id': "1012688780471308339",
            'client_secret': "LCHB5zd_FtBa7q_ZeOv1nbBy9H3Ny1FG",
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
            headers: headers
        }).catch(error => console.log(error));

        if (body.status === 200) {
            const result = await body.json();
            window.localStorage.setItem('dataDiscord', JSON.stringify(result));

            await this.getUser()
            await Fetch.getGuilds()
        }
        else {
            window.localStorage.removeItem('dataDiscord');
            document.location.href = "/login";
        }
    }

    async initDashboard() {
        const info = JSON.parse(window.localStorage.getItem("dataDiscord"))
        console.log(info)

        const guild = await Fetch.getGuilds(info.access_token)

        if (!guild) return document.location.href = "/login";

        const guilsHasBounsBot = await Fetch.getBounsBotHasGuild(guild)

        this.setState({
            guilds: guild,
            hasguild: guilsHasBounsBot,
            loading: false
        });
    }

    componentDidMount() {
        this.initDashboard()
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
                                        <div className="banniere" style={{ background: "url(\"https://cdn.discordapp.com/icons/" + guild.id + "/" + guild.icon + ".jpg\")" }}></div>
                                        <img className='imageGuild' size="80" radius="40" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.jpg`} onError={(e) => { e.target.outerHTML = `<img class='imageGuild' size="80" radius="40" src='https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png'/>` }} alt="Logo de ----"></img>
                                    </div>
                                    <div className="info">
                                        <div className="infoGuild">
                                            <h3 className="nameGuild">{guild.name}</h3>
                                            <div className="typeAccess">{guild.owner ? ("Proprietaire") : ("Bot Master")}</div>
                                        </div>
                                        {this.state.hasguild.length !== 0 && this.state.hasguild.includes(guild.id) ? (
                                            // <a href={`/dashboard/${guild.id}`}>
                                            <Link to={`/dashboard/${guild.id}`}><button className="goGuild">GO</button></Link>
                                            // </a>
                                        )
                                            :
                                            (
                                                <a href={"https://discord.com/oauth2/authorize?client_id=1012688780471308339&permissions=1945627743&scope=bot%20applications.commands&guild_id=" + guild.id}><button className="inviteGuild">Invite</button></a>
                                            )}
                                    </div>
                                </div>)
                        }

                        if (this.state.guilds.length === 0) {
                            for (let i = 0; i < 6; i++) {
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

                {(() => {
                    if (this.state.loading) return <Loading />
                })()}
            </div>
        )
    }
}

export default Dashboard;
