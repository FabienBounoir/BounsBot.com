import "./_dashboard.css";
import React, { Component } from 'react'
import Fetch from "../../utils/fetch.js"
import { ListServer } from "../../components/listServer/listServer";
import { Configuration } from "../../components/configuration/configuration";

class Dashboard extends Component {
    state = {
        guilds: [],
        loading: true,
        close: true
    }


    getGuilds = async () => {
        const info = JSON.parse(window.localStorage.getItem("dataDiscord"))
        const guild = await Fetch.getGuilds(info.access_token)

        if (!guild) return document.location.href = "/login";
        const hasguild = await Fetch.getBounsBotHasGuild(guild) || []

        for (let i = 0; i < guild.length; i++) {
            guild[i].hasguild = hasguild.find(g => g === guild[i].id) ? true : false
        }

        guild.sort((a, b) => {
            if (a.hasguild && !b.hasguild) return -1;
            if (!a.hasguild && b.hasguild) return 1;
            return 0;
        })

        this.setState({ guilds: guild, loading: false })
    }

    componentDidMount() {
        this.onResize()
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        this.getGuilds();
        window.addEventListener("resize", () => {
            this.onResize()
        })

        //when rotate the phone
        window.addEventListener("orientationchange", () => {
            this.onResize()
        })

        //when nav element change size
        const nav = document.querySelector("nav")
        nav.addEventListener("transitionend", () => {
            this.onResize()
        })
    }

    //when width or height change we update the height of the dashboard
    onResize = () => {
        const doc = document.documentElement
        doc.style.setProperty('--doc-height', `${window.innerHeight}px`)

        //get the height of nav
        const nav = document.querySelector("nav")
        const navHeight = nav.offsetHeight
        //create a variable for the height of the dashboard
        doc.style.setProperty('--dashboard-height', `calc(var(--doc-height) - ${navHeight}px)`)
    }

    componentWillUnmount() {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
    }

    render() {
        return (<div className="dashboard" >
            <ListServer guilds={this.state.guilds} loading={this.state.loading} />
            <Configuration guilds={this.state.guilds} user={JSON.parse(window.localStorage.getItem("dataUser") || {})} loading={this.state.loading} />
        </div>)
    }
}

export default Dashboard;
