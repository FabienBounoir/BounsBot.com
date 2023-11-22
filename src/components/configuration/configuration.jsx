import { useState, useEffect } from "react"
import Avatar from "../avatar/avatar";
import { useParams, Link } from 'react-router-dom';
import { Dashboard } from "../dashboardElements/dashboard.jsx";
import { Logs } from "../dashboardElements/logs.jsx";
import { Welcome } from "../dashboardElements/welcome.jsx";
import { Send } from "../dashboardElements/send.jsx";
import { Musique } from "../dashboardElements/musique.jsx";
import { InfoDashboard } from "../dashboardElements/infoDashboard.jsx";
import { LevelsConfig } from "../dashboardElements/levels.jsx";
import { Rename } from "../dashboardElements/rename";
import * as guildsAPI from "../../utils/API/guildsAPI";

import { useHistory } from 'react-router-dom';

import "./_configuration.css";
import "../dashboardElements/_dashboardElements.css";

import lodash from 'lodash';
import { Toaster, toast } from 'sonner'
import { useStore } from "../../utils/store";

export const Configuration = (props) => {
    const { id, typeconfig } = useParams();
    const [guild, setGuild] = useState({})
    const [activeGuild, setActiveGuild] = useState(id || "user")
    const [user, setUser] = useState({})
    const [type, setType] = useState(typeconfig.toLowerCase() || "description")
    const [menu, setMenu] = useState([])
    const [configGuildSelected, setConfigGuildSelected] = useState({})
    const [configGuildUpdateSelected, setConfigGuildUpdateSelected] = useState({})
    const [channels, setChannels] = useState([])
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState("LOADING")
    const history = useHistory();

    const [open, setOpen] = useState(true)
    // const [state, dispatch] = useStore();
    const [state, dispatch] = useStore();

    // const [changeNotSave, setChangeNotSave] = useState(false);
    const [loadingChargement, setLoadingChargement] = useState(false);

    let resetChange = () => {
        setConfigGuildUpdateSelected(configGuildSelected)
    }

    let updateConfig = async () => {
        setLoadingChargement(true)

        const diff = lodash.omitBy(configGuildUpdateSelected, (value, key) => lodash.isEqual(value, configGuildSelected[key]))

        try {
            await guildsAPI.updateConfiguration(activeGuild, diff)
        } catch (error) {
            toast.error("Une erreur est survenue lors de la sauvegarde de la configuration. Veuillez réessayer ultérieurement.")
            setLoadingChargement(false)
            return console.log("Save Configuration Error", error)
        }

        setConfigGuildSelected(configGuildUpdateSelected)
        setLoadingChargement(false)
        props.setChangeNotSave(false)
    }

    const updateMenu = () => {
        if (activeGuild !== "user") {
            setMenu([
                {
                    "name": "Global",
                    "elements": [
                        {
                            "name": "Tableau de bord",
                            "url": "dashboard"
                        }
                    ]
                },
                {
                    "name": "Gestion du serveur",
                    "elements": [
                        {
                            "name": "Bienvenue",
                            "url": "welcome"
                        },
                        {
                            "name": "Rename",
                            "url": "rename"
                        },
                        {
                            "name": "Niveaux",
                            "url": "levels"
                        },
                        {
                            "name": "Logs",
                            "url": "logs"
                        }
                    ]
                },
                {
                    "name": "Utilitaires",
                    "elements": [
                        {
                            "name": "Envoyer un message",
                            "url": "guild_message"
                        }
                    ]
                }
            ])
        }
        else {
            setMenu([
                {
                    "name": "Dashboard",
                    "elements": [{
                        "name": "Information",
                        "url": "description",
                    }]
                }
            ])
        }
    }

    const getConfig = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await guildsAPI.getConfiguration(activeGuild)

                setConfigGuildSelected(res)
                setConfigGuildUpdateSelected(res)
                resolve(res)
            }
            catch (error) {
                reject(error)
            }
        })
    }

    useEffect(() => {
        const diff = !lodash.isEqual(configGuildSelected, configGuildUpdateSelected)

        props.setChangeNotSave(diff)
    }, [configGuildUpdateSelected])

    const getElement = async () => {
        let res = await guildsAPI.getElement(activeGuild, 'all')

        setChannels(res.channels)
        setRoles(res.roles)
    }

    const getData = async () => {
        setLoading("LOADING")

        try {
            await Promise.all([
                getElement(),
                getConfig(),
            ])
            setLoading("LOADED")
        }
        catch (error) {
            setLoading("ERROR")

            dispatch({ logged: false, user: null })

            localStorage.removeItem('user')
            localStorage.removeItem('token')

            history.push('/login');
        }

    }


    useEffect(() => {
        updateMenu()
        if (activeGuild == "user") return

        getData()
        setLoadingChargement(false)

        return () => { }
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

        return () => { }

    }, [id, typeconfig, props.guilds])

    useEffect(() => {
        if (props.user) {
            setUser(props.user)
        }

        return () => { }
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
            <p>{user?.global_name || user?.username}</p>
        </header>
        )
    }

    const renderListingConfig = () => {
        let list = []
        for (let i = 0; i < menu.length; i++) {
            list.push(<li key={i} className="title">
                <div>
                    <p>{menu[i].name}</p>
                </div>
            </li>);

            for (let j = 0; j < menu[i].elements.length; j++) {
                list.push(<Link key={i + "-" + j} onClick={() => triggerListServer(false)} to={`/dashboard/${activeGuild}/` + menu[i].elements[j].url}><li className={"element " + (type === menu[i].elements[j].url ? "active" : "")}>
                    <div>
                        <p>{menu[i].elements[j].name}</p>
                    </div>
                </li></Link>)
            }
        }

        return list;
    }

    const renderConfigComponent = () => {
        //check if element url in config is equal to type
        let element = menu.find(element => element.elements.find(element => element.url === type))
        if (!element && activeGuild !== "user") {
            return <Dashboard guildId={id} configuration={configGuildUpdateSelected} updateConfiguration={setConfigGuildUpdateSelected} />
        }

        switch (type) {
            case "description":
                return <InfoDashboard />;
            case "dashboard":
                return <Dashboard guildId={id} configuration={configGuildUpdateSelected} updateConfiguration={setConfigGuildUpdateSelected} channels={channels} loading={loading} />;
            case "logs":
                return <Logs guildId={id} configuration={configGuildUpdateSelected} updateConfiguration={setConfigGuildUpdateSelected} channels={channels} loading={loading} />;
            case "welcome":
                return <Welcome guildId={id} configuration={configGuildUpdateSelected} setConfiguration={setConfigGuildUpdateSelected} channels={channels} rolesGuild={roles} loading={loading} user={props.user} name={guild?.name} iconLink={guild?.icon ? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.gif?size=256` : null} />;
            case "guild_message":
                return <Send guildId={id} channels={channels} loading={loading} />;
            case "levels":
                return <LevelsConfig guildId={id} configuration={configGuildUpdateSelected} setConfiguration={setConfigGuildUpdateSelected} channels={channels} roles={roles} loading={loading} />;
            case "rename":
                return <Rename guildId={id} configuration={configGuildUpdateSelected} setConfiguration={setConfigGuildUpdateSelected} loading={loading} />;
            case "musique":
                return <Musique guildId={id} />;
            default:
                return <h1 style={{ color: "red" }} >{type}</h1>;
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
            <div id="card" className={"cardSave" + (props.changeNotSave ? " hidden" : " closeCardSave")} ><div className="saveConfig"><div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "0.3em" }}><Avatar classElement="logoChangement" width="30" height="28" /> Changements détectés ! Veuillez enregistrer ou annuler.</div><div className="buttonContainer"><button className="cancelButton" disabled={loadingChargement} type="button" onClick={() => { resetChange() }}>Annuler</button><button className="saveButton" type="button" disabled={loadingChargement} onClick={updateConfig}>Enregistrer</button></div></div></div>
        </div>
        <Toaster richColors expand={false} position="top-center" />
    </>
    )
}



