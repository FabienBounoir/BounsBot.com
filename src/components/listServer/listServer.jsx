import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
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
                    <img src={`https://cdn.discordapp.com/avatars/${JSON.parse(window.localStorage.getItem('user')).id}/${JSON.parse(window.localStorage.getItem('user')).avatar}.webp?size=256`} alt="Avatar" onError={(e) => { e.target.outerHTML = `<img src='https://cdn.discordapp.com/embed/avatars/${random}.png'/>` }} />
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
        //random entre 4 et 10
        let random = Math.floor(Math.random() * (12 - 4 + 1) + 7)

        for (let i = 0; i < random; i++) {

            renderLoading.push(
                <div key={i} className={`list_item`}>
                    < div className="list_balise" >
                        <div>
                            <span></span>
                        </div>
                    </div >
                    <div className="guildAvatar loader">
                        <div></div>
                        {/* <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`} alt={guild.name} onError={(e) => { e.target.outerHTML = `<img src='https://cdn.discordapp.com/embed/avatars/${random}.png'/>` }} /> */}
                    </div>
                    <span>
                        <div className="name">
                            {/* {guild.name} */}
                        </div>
                    </span>
                </div>)
        }

        return renderLoading
    }

    const popUpCreate = (guildId) => {
        let modal = window.open("https://discord.com/oauth2/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID + "&permissions=1945627743&redirect_uri=" + process.env.REACT_APP_REDIRECT_URI + "callback&scope=bot%20applications.commands&guild_id=" + guildId, 'popup', 'width=1040px,height=555px,toolbar=no,scrollbars=no,resizable=yes')

        modal.addEventListener('popstate', function (event) {

        });

        //https://discord.com/oauth2/authorize?scope=bot+applications.commands&response_type=code&redirect_uri=https%3A%2F%2Fmee6.xyz%2Fguild-oauth&permissions=296150887519&client_id=159985415099514880&guild_id=757024209447813130
    }

    const renderGuilds = () => {
        let render = []
        // let i = 0
        for (let guild of guilds) {
            let random = Math.floor(Math.random() * 6)

            if (guild.hasguild) {
                render.push(
                    <Link key={guild.id} className={`list_item${activeGuild === guild.id ? " active" : ""}`} to={`/dashboard/${guild.id}/dashboard`}>
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
                    <div key={guild.id} className={`list_item${activeGuild === guild.id ? " active" : ""}`} onClick={() => { popUpCreate(guild.id) }}>
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
                    </div>)
            }
            // i++

        }

        return render
    }

    return (
        <div className="servers">
            {renderProfil()}
            {loading ? LoaderGuildEffect() : renderGuilds()}

            {/* {loaderEffect()} */}
        </div>
    )
}