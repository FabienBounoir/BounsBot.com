import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import "./_listServer.css";

export const ListServer = (props) => {
    const { id, typeconfig } = useParams();
    const [guilds, setGuilds] = useState(props?.guilds || [])
    const [loading, setLoading] = useState(props?.loading || true)
    const [activeGuild, setActiveGuild] = useState(id || "user")

    useEffect(() => {
        setActiveGuild(id || "user")
    }, [id, typeconfig])

    useEffect(() => {
        setGuilds(props?.guilds)
        setLoading(props?.loading)
    }, [props])

    const renderProfil = () => {
        let random = Math.floor(Math.random() * 6)
        return (<>
            <Link className={`list_item${activeGuild === "user" ? " active" : ""}`} to={`/dashboard/user/description`}>
                < div className={`list_balise`} >
                    <div className="balise active">
                        <span></span>
                    </div>
                </div >
                <div className="userAvatar">
                    <img src={`https://cdn.discordapp.com/avatars/${JSON.parse(window.localStorage.getItem('user'))?.id}/${JSON.parse(window.localStorage.getItem('user'))?.avatar}.webp?size=256`} alt="Avatar" onError={(e) => { e.target.outerHTML = `<img src='https://cdn.discordapp.com/embed/avatars/${random}.png'/>` }} />
                </div>
            </Link>
            <div className="guildSeparator">
                <span></span>
            </div>
        </>
        )
    }

    const LoaderGuildEffect = () => {
        let renderLoading = []
        let random = Math.floor((Math.random() * 8) + 10)

        for (let i = 0; i < random; i++) {

            renderLoading.push(
                <div key={i} className={`list_item`}>
                    < div className="list_balise" >
                        <div>
                            <span></span>
                        </div>
                    </div >
                    <div className="guildAvatar loading">
                        <div></div>
                    </div>
                    <span>
                        <div className="name">

                        </div>
                    </span>
                </div>)
        }

        return renderLoading
    }

    const popUpCreate = (guildId) => {
        try {
            let modal = window.open("https://discord.com/oauth2/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID + "&permissions=1945627743&redirect_uri=" + process.env.REACT_APP_REDIRECT_URI + "&scope=bot%20applications.commands&guild_id=" + guildId, 'popup', 'height=700px,width=480px,toolbar=no,scrollbars=no,resizable=yes')

            if (!modal) {
                window.location.href = "https://discord.com/oauth2/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID + "&permissions=1945627743&redirect_uri=" + process.env.REACT_APP_REDIRECT_URI + "&scope=bot%20applications.commands&guild_id=" + guildId
            }
        }
        catch (e) {
            console.log("Pop up error", e)

            //ouvrir dans un nouvel onglet
            window.location.href = "https://discord.com/oauth2/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID + "&permissions=1945627743&redirect_uri=" + process.env.REACT_APP_REDIRECT_URI + "callback&scope=bot%20applications.commands&guild_id=" + guildId
        }

    }

    const renderGuilds = () => {
        let render = []
        for (let guild of guilds) {
            let random = Math.floor(Math.random() * 6)

            if (guild.bot) {
                render.push(
                    <Link data-tooltip-id={"guild-list"} data-tooltip-html={"<span style='font-weight: bold; color: white;'>" + guild.name + "</span>"} key={guild.id} className={`list_item${activeGuild === guild.id ? " active" : ""}${(props.changeNotSave && activeGuild !== guild.id) ? " cantChange" : ""}`} to={`/dashboard/${guild.id}/dashboard`}>
                        < div className="list_balise" >
                            <div className="balise active">
                                <span></span>
                            </div>
                        </div >
                        <div className="guildAvatar">
                            <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`} alt={guild.name} onError={(e) => { e.target.outerHTML = `<img src='https://cdn.discordapp.com/embed/avatars/${random}.png'/>` }} />
                        </div>
                        <span>
                            <div className="name">
                                {guild.name}
                            </div>
                        </span>
                    </Link>)
            }
            else {
                render.push(
                    <div data-tooltip-id={"guild-list"} data-tooltip-html={"<span style='font-weight: bold; color: white;'>" + guild.name + "</span>"} key={guild.id} className={`list_item${(props.changeNotSave && activeGuild !== guild.id) ? " cantChange" : ""}`} onClick={() => { popUpCreate(guild.id) }}>
                        < div className="list_balise" >
                            <div className="balise active">
                                <span></span>
                            </div>
                        </div >
                        <div className="guildAvatar inviteBot">
                            <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`} alt={guild.name} onError={(e) => { e.target.outerHTML = `<img src='https://cdn.discordapp.com/embed/avatars/${random}.png'/>` }} />
                        </div>
                        <span>
                            <div className="name">
                                {guild.name}
                            </div>
                        </span>
                    </div>
                )
            }
        }

        render.push(<Tooltip style={{ background: "rgba(var(--color-red), var(--color-green), var(--color-blue), 1)" }} delayHide={10} className="guildNameListing" effect="solid" place="right" closeOnScroll={true} opacity={1} id={"guild-list"} ></Tooltip>)

        return render
    }

    return (
        <div className="servers">
            {renderProfil()}
            {loading ? LoaderGuildEffect() : renderGuilds()}
        </div>
    )
}