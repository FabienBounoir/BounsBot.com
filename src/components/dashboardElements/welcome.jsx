
import { useState, useEffect } from "react"
import { Form } from 'react-bootstrap/'
import Avatar from "../../components/avatar/avatar";

import LoadingComponent from "../loading/LoadingComponent.jsx";


export const Welcome = (props) => {
    const [configuration, setConfiguration] = useState({})
    const [initialConfig, setInitialConfig] = useState({})
    const [loading, setLoading] = useState(true)
    const [changeNotSave, setChangeNotSave] = useState(false);
    const [loadingChargement, setLoadingChargement] = useState(false);


    const getConfiguration = async () => {
        let res = await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${props.guildId}/welcome`).then(res => res.json()) || {}
        setInitialConfig(res)
        setConfiguration(res)
    }

    const updateConfig = async () => {
        setLoadingChargement(true)

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        try {
            await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${props.guildId}/welcome`, {
                method: "PUT",
                headers,
                body: JSON.stringify(configuration),
                redirect: 'follow'
            }).then(res => res.json())
        } catch (error) {
            return console.log("Save Configuration Error", error)
        }

        // setTimeout(() => {
        setInitialConfig(configuration)
        setChangeNotSave(false)
        setLoadingChargement(false)
        // }, 5000);
    }

    const resetChange = () => {
        setConfiguration(initialConfig)

    }

    useEffect(async () => {
        setLoading(true)
        await getConfiguration()
        setLoading(false)
    }, [props.guildId])

    useEffect(() => {
        const keys1 = Object.keys(configuration);
        const keys2 = Object.keys(initialConfig);

        if (keys1.length !== keys2.length) {
            return setChangeNotSave(true)
        }

        for (let key of keys1) {
            if (configuration[key] !== initialConfig[key]) {
                return setChangeNotSave(true)
            }
        }

        return setChangeNotSave(false)
    }, [configuration])

    return (<>
        {loading ? <LoadingComponent /> :
            <div className="block padding-1">
                <div className="infoActive">
                    <h5>Envoyer un message privé aux nouveaux membres</h5>
                    <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.welcomeActive} onChange={(e) => setConfiguration({ ...configuration, welcomeActive: e.target.checked })} />
                </div>

                <div className="separator"></div>

                <div className={"informationConfig" + (configuration?.welcomeActive ? "" : " welcomeDisable")}>
                    <div className="WelcomeComponente" >
                        <div className="embed">
                            <div>
                                <div className="embedAuthor">
                                    {props.iconLink ?
                                        //on error replace .gif to .webp
                                        <img className="iconEmbed" src={props.iconLink} alt="icon" onError={(e) => { e.target.src = props.iconLink.replace(".gif", ".webp") }} />
                                        : <span className="iconEmbed color"></span>}
                                    {props.name}
                                </div>
                                <textarea id="messageWelcome" disabled={!configuration?.welcomeActive} style={{ Background: "#313442", maxHeight: '300px', minHeight: "100px", resize: configuration?.welcomeActive ? "vertical" : "none" }} className="embedDescripton" rows="6" placeholder="Message to send" value={configuration?.welcomeMessage} onChange={event => { setConfiguration({ ...configuration, welcomeMessage: event.target.value }) }} />
                            </div>
                            <div>
                                {props.iconLink ?
                                    <img className="thumbnailEmbed" src={props.iconLink} alt="icon" onError={(e) => { e.target.src = props.iconLink.replace(".gif", ".webp") }} />
                                    : <span className="thumbnailEmbed color"></span>}
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        {/* <p>Ne laisse pas tes nouveaux membres dans le noir, envoie leur un message de bienvenue pour les accueillir dans ton serveur.</p> */}

                        {/* <p>Ne laisse pas tes nouveaux membres dans le noir, envoie leur un message de bienvenue pour les accueillir dans ton serveur.</p> */}

                        <ul>
                            <li><span className="tag">{`{server}`}</span>Nom du serveur</li>
                            <li><span className="tag">{`{id}`}</span>Id du membre</li>
                            <li><span className="tag">{`{user}`}</span>Mention du membre</li>
                            <li><span className="tag">{`{membercount}`}</span>Nombre de membres</li>
                            <li><span className="tag">{`{bot}`}</span>Mention du bot</li>
                        </ul>
                    </div>
                </div>

            </div>}

        <div id="card" className={"cardSave" + (changeNotSave ? " hidden" : "")} ><div className="saveConfig"><div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "0.3em" }}><Avatar classElement="logoChangement" width="30" height="28" /> Changements détectés ! Veuillez enregistrer ou annuler.</div><div className="buttonContainer"><button className="cancelButton" disabled={loadingChargement} type="button" onClick={resetChange}>Annuler</button><button className="saveButton" type="button" disabled={loadingChargement} onClick={updateConfig}>Enregistrer</button></div></div></div>
    </>)
}


