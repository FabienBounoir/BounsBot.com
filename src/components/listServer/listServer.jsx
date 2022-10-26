import Fetch from "../../utils/fetch.js"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import "./_listServer.css";

export const ListServer = () => {
    const { id, typeconfig } = useParams();
    const [guilds, setGuilds] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasguild, setHasguild] = useState([])
    const [activeGuild, setActiveGuild] = useState(id || "user")
    const [type, setType] = useState(typeconfig || "description")

    //get argument from url
    console.log(id, type)


    const getGuilds = async () => {
        const info = JSON.parse(window.localStorage.getItem("dataDiscord"))
        const guild = await Fetch.getGuilds(info.access_token)

        if (!guild) return document.location.href = "/login";

        setGuilds(guild)
        setLoading(false)
    }



    const renderProfil = () => {
        return (<>

            <div className={`list_item${activeGuild == "user" ? " active" : ""}`}>
                < div className={`list_balise`} >
                    <div className="balise active">
                        <span></span>
                    </div>
                </div >
                <div className="userAvatar">
                    <img src={`https://cdn.discordapp.com/avatars/${JSON.parse(window.localStorage.getItem('dataUser')).id}/${JSON.parse(window.localStorage.getItem('dataUser')).avatar}.png?size=512`} alt="Avatar" />
                </div>
            </div >
            <div className="guildSeparator">
                <span></span>
            </div>
        </>
        )

    }


    const renderGuilds = () => {
        let render = []

        for (let guild of guilds) {
            let random = Math.floor(Math.random() * 6)

            render.push(<div className={`list_item${activeGuild == guild.id ? " active" : ""}`}>
                < div className="list_balise" >
                    <div className="balise active">
                        <span></span>
                    </div>
                </div >
                <div className="guildAvatar">
                    <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={guild.name} onError={(e) => { e.target.outerHTML = `<img src='https://cdn.discordapp.com/embed/avatars/${random}.png'/>` }} />
                </div>
                <span>
                    <div className="name">
                        {guild.name}
                    </div>
                </span>
            </div >)

        }

        return render
    }


    //juste when the component is mounted
    useEffect(() => {
        getGuilds()
    }, [])


    return (
        <div className="servers">
            {renderProfil()}
            {renderGuilds()}
        </div>
    )
}