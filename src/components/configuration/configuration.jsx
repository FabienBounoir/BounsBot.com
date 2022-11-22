import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import { Dashboard } from "../dashboardElements/dashboard.jsx";
import { Logs } from "../dashboardElements/logs.jsx";
import { Welcome } from "../dashboardElements/welcome.jsx";
import { Send } from "../dashboardElements/send.jsx";
import { Musique } from "../dashboardElements/musique.jsx";
import { InfoDashboard } from "../dashboardElements/infoDashboard.jsx";

import "./_configuration.css";
import "../dashboardElements/_dashboardElements.css";

export const Configuration = (props) => {
    const { id, typeconfig } = useParams();
    const [guild, setGuild] = useState({})
    const [activeGuild, setActiveGuild] = useState(id || "user")
    const [user, setUser] = useState({})
    const [type, setType] = useState(typeconfig.toLowerCase() || "description")
    const [config, setConfig] = useState([])
    const [open, setOpen] = useState(true)

    useEffect(async () => {
        if (activeGuild !== "user") {
            setConfig(await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${activeGuild}/features`).then(res => res.json()).then(res => {
                return res.configurationFeatures
            }))
        }
        else {
            setConfig([
                {
                    name: "Dashboard",
                    elements: [{
                        name: "Information",
                        url: "description",
                    }]
                }
            ])
        }

    }, [activeGuild])


    useEffect(() => {
        setActiveGuild(id || "user")
        setType(typeconfig.toLowerCase() || "description")
        if (props.guilds && props.guilds.length > 0) {
            setGuild(props.guilds.find(guild => guild.id === id))
        }

        if (props.user) {
            setUser(props.user)
        }

    }, [id, typeconfig, props.guilds])

    useEffect(() => {
        if (props.user) {
            setUser(props.user)
        }
    }, [props.user])

    const getHeaderType = () => {
        if ((guild && guild?.icon !== null) || (user && user?.avatar !== null)) {
            return 'withBanner'
        }

        return 'withoutBanner'
    }

    const renderListingGuildConfiguration = () => {
        return (<header className={getHeaderType()} style={{ backgroundImage: `url("https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.webp?size=1024")` }}>
            <p>{guild?.name}</p>
        </header>)
    }

    const renderListingUserConfiguration = () => {
        return (<header className={getHeaderType()} style={{ backgroundImage: `url("https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp?size=1024")` }}>
            <p>{user?.username}</p>
        </header>
        )
    }

    const renderListingConfig = () => {
        let list = []
        for (let i = 0; i < config.length; i++) {
            list.push(<li className="title">
                <div>
                    <p>{config[i].name}</p>
                </div>
            </li>);

            for (let j = 0; j < config[i].elements.length; j++) {
                list.push(<Link onClick={() => triggerListServer(false)} to={`/dashboard/${activeGuild}/` + config[i].elements[j].url}><li className={"element " + (type === config[i].elements[j].url ? "active" : "")}>
                    <div>
                        <p>{config[i].elements[j].name}</p>
                    </div>
                </li></Link>)
            }
        }

        return list;
    }

    const renderConfigComponent = () => {
        //check if element url in config is equal to type
        let element = config.find(element => element.elements.find(element => element.url === type))
        if (!element && activeGuild !== "user") {
            return <Dashboard guildId={id} />
        }

        if (type === "description") {
            return <InfoDashboard />
        }
        else if (type === "dashboard") {
            return (<Dashboard guildId={id} />)
        }
        else if (type === "logs") {
            return (<Logs guildId={id} />)
        }
        else if (type === "welcome") {
            return (<Welcome guildId={id} name={guild?.name} iconLink={guild?.icon ? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.gif?size=256` : null} />)
        }
        else if (type === "guild_message") {
            return (<Send guildId={id} />)
        }
        else if (type === "musique") {
            return (<Musique guildId={id} />)
        }
        else {
            return (<h1 style={{ color: "red" }} >{type}</h1>)
        }
    }

    const triggerListServer = (etat) => {
        if (!etat) {
            setOpen(!open)
        }
        else {
            setOpen(etat)
        }

        if (open) {
            document.getElementsByClassName("configuration_list")[0].classList.add("close")
            document.getElementsByClassName("servers")[0].classList.add("close")
            document.getElementsByClassName("config")[0].classList.add("disabledConfig")
        }
        else {
            document.getElementsByClassName("configuration_list")[0].classList.remove("close")
            document.getElementsByClassName("servers")[0].classList.remove("close")
            document.getElementsByClassName("config")[0].classList.remove("disabledConfig")
        }
    }

    return (<>
        <div className="configuration_list">
            {id !== "user" ? renderListingGuildConfiguration() : renderListingUserConfiguration()}
            <ul className="configList">
                {renderListingConfig()}
            </ul>

        </div>
        {/* <div> */}
        <div onClick={() => { triggerListServer() }} className="buttonMenu"><span>
            <svg className="arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 30.021 30.021"><path d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151 c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0 l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z" fill="var(--color-principal)" /></svg>
        </span> </div>
        <div className="config">
            {renderConfigComponent()}
        </div>
        {/* </div> */}
    </>
    )
}



