import "./_dashboard.css";
import React, { Component } from 'react'
import Fetch from "../../utils/fetch.js"
import Loading from "../../components/loading/loading.jsx";
import { Link } from "react-router-dom"
import { ListServer } from "../../components/listServer/listServer";
import { Configuration } from "../../components/configuration/configuration";

class Dashboard extends Component {
    // state = {}

    // async initDashboard() {
    //     const info = JSON.parse(window.localStorage.getItem("dataDiscord"))
    //     console.log(info)

    //     const guild = await Fetch.getGuilds(info.access_token)

    //     if (!guild) return document.location.href = "/login";

    //     const guilsHasBounsBot = await Fetch.getBounsBotHasGuild(guild)

    //     this.setState({
    //         guilds: guild,
    //         hasguild: guilsHasBounsBot,
    //         loading: false
    //     });
    // }

    componentDidMount() {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }

    componentWillUnmount() {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
    }

    render() {
        return (<div className="dashboard" >
            <ListServer />
            <Configuration />
        </div>)
    }
}

export default Dashboard;
