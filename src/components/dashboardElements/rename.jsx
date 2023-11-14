
import { useState, useEffect, useRef } from "react"
import Avatar from "../avatar/avatar";
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { Form } from 'react-bootstrap/'

export const Rename = ({ guildId, loading, configuration }) => {

    // const [loading, setLoading] = useState(true)
    // const [loadingError, setLoadingError] = useState(false)
    const [configurationeee, setConfiguration] = useState({})
    const [initialConfiguration, setInitialConfiguration] = useState({})

    const [loadingChargement, setLoadingChargement] = useState(false);
    const [changeNotSave, setChangeNotSave] = useState(false);

    useEffect(() => {
        async function fetchData() {
            // setLoading(true)
            // try {
            //     await Promise.all([
            //         getRenameConfig()
            //     ])
            // } catch (e) {
            //     // return setLoadingError(true)
            // }
            // setLoading(false)
        }
        fetchData()
    }, [guildId])

    // useEffect(() => {
    //     let initial = initialConfiguration
    //     let actual = configuration

    //     if (initial?.rename !== actual?.rename) {
    //         return setChangeNotSave(true)
    //     }

    //     if (initial?.renameConfig?.RemoveIntentionallyTopList !== actual?.renameConfig?.RemoveIntentionallyTopList) {
    //         return setChangeNotSave(true)
    //     }

    //     if (initial?.renameConfig?.wordsCheckType !== actual?.renameConfig?.wordsCheckType) {
    //         return setChangeNotSave(true)
    //     }

    //     if (initial?.renameConfig?.wordsList?.length !== actual?.renameConfig?.wordsList?.length) {
    //         return setChangeNotSave(true)
    //     }

    //     if (initial?.renameConfig?.wordsList?.length > 0) {
    //         for (let i = 0; i < initial?.renameConfig?.wordsList?.length; i++) {
    //             if (initial?.renameConfig?.wordsList[i] !== actual?.renameConfig?.wordsList[i]) {
    //                 return setChangeNotSave(true)
    //             }
    //         }
    //     }

    //     setChangeNotSave(false)
    // }, [configuration])

    const updateConfig = async () => {
        setLoadingChargement(true)

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        let info = null

        // setConfiguration(configuration => ({
        //     ...configuration, renameConfig: {
        //         ...configuration.renameConfig, wordsList: configuration.renameConfig.wordsList.filter(Boolean)
        //     }
        // }));

        try {
            info = await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${guildId}/rename`, {
                method: "PUT",
                headers,
                body: JSON.stringify(configuration),
                redirect: 'follow'
            })
        } catch (error) {
            return console.log("Save Configuration Error", error)
        }

        if (info.status === 200) {
            setInitialConfiguration(JSON.parse(JSON.stringify(configuration)))
            setChangeNotSave(false)
            setLoadingChargement(false)
        }
        else {
            alert("Une erreur est survenue lors de la sauvegarde de la configuration")
        }
    }

    const resetChange = () => {
        // setConfiguration(JSON.parse(JSON.stringify(initialConfiguration)))
    }

    let getRenameConfig = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(process.env.REACT_APP_HOSTNAME_BACKEND + "/guild/" + guildId + "/rename", requestOptions)
            .then(response => response.json())
            .then((result) => {
                setInitialConfiguration(result)
                // setConfiguration(result)
            })
    };

    return (
        <>
            {["ERROR", "LOADING"].includes(loading) ? <LoadingComponent error={loading == "ERROR"} errorMessage="Une erreur est survenue lors du chargement des données." /> :
                <div className="block padding-1 heightMax">
                    <div className="infoActive">
                        <h5>Renommer les pseudonymes non conformes des utilisateurs</h5>
                        <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration.rename} onChange={(e) => { setConfiguration({ ...configuration, rename: e.target.checked }) }} />
                    </div>

                    <div className="separator"></div>

                    <div className={"informationConfig xpConfigType radioComponent"}>
                        <h6>Accepter les pseudonymes non conformes</h6>
                        <div>
                            <div className="radioButton">

                                <input
                                    type="radio"
                                    name="IntentionallyTopList"
                                    value={true}
                                    checked={configuration?.renameConfig?.RemoveIntentionallyTopList == true}
                                    onChange={(e) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, RemoveIntentionallyTopList: true } }) }}
                                />
                                <label>Autoriser le passage au dessus des autres membres</label>
                            </div>
                            <div className="radioButton">

                                <input
                                    type="radio"
                                    name="IntentionallyTopList"
                                    value={false}
                                    checked={configuration?.renameConfig?.RemoveIntentionallyTopList == false}
                                    onChange={(e) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, RemoveIntentionallyTopList: false } }) }}
                                />
                                <label>Ne pas autoriser le passage au dessus des autres membres</label>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={"informationConfig xpConfigType radioComponent"}>
                        <h6>Système de vérification des pseudos</h6>
                        <div>
                            <div className="radioButton">

                                <input
                                    type="radio"
                                    name="verificationType"
                                    value={"EASY_CHECK"}
                                    checked={configuration?.renameConfig?.wordsCheckType == "EASY_CHECK"}
                                    onChange={(e) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, wordsCheckType: "EASY_CHECK" } }) }}
                                />
                                <label>Vérification légère</label>
                            </div>
                            <div className="radioButton">

                                <input
                                    type="radio"
                                    name="verificationType"
                                    value={"HARD_CHECK"}
                                    checked={configuration?.renameConfig?.wordsCheckType == "HARD_CHECK"}
                                    onChange={(e) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, wordsCheckType: "HARD_CHECK" } }) }}
                                />
                                <label>Vérification lourde</label>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={"informationConfig xpConfigType radioComponent"}>
                        <h6>Mots non autorisés dans les pseudos</h6>

                        <Form.Control
                            style={{ "max-width": "530px" }}
                            as="textarea"
                            rows={3}
                            placeholder="bot,discord,admin,moderateur,..."
                            disabled={!configuration?.rename}
                            value={configuration?.renameConfig?.wordsList}
                            onChange={(event) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, wordsList: event.target.value.split(",").map(str => str.trim()) } }) }}
                        />


                    </div>


                </div>}

            <div id="card" className={"cardSave" + (changeNotSave ? " hidden" : "")} ><div className="saveConfig"><div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "0.3em" }}><Avatar classElement="logoChangement" width="30" height="28" /> Changements détectés ! Veuillez enregistrer ou annuler.</div><div className="buttonContainer"><button className="cancelButton" disabled={loadingChargement} type="button" onClick={resetChange}>Annuler</button><button className="saveButton" type="button" disabled={loadingChargement} onClick={updateConfig}>Enregistrer</button></div></div></div>
        </>
    )
}


