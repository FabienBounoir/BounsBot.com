
import { useState, useEffect, useRef } from "react"
import Avatar from "../avatar/avatar";
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { Form } from 'react-bootstrap/'

export const Rename = ({ guildId, loading, configuration, setConfiguration }) => {

    // const [loading, setLoading] = useState(true)
    // const [loadingError, setLoadingError] = useState(false)
    // const [configurationeee, setConfiguration] = useState({})
    // const [initialConfiguration, setInitialConfiguration] = useState({})

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

    return (
        <>
            {["ERROR", "LOADING"].includes(loading) ? <LoadingComponent error={loading == "ERROR"} errorMessage="Une erreur est survenue lors du chargement des données." /> :
                <div className={"block automargin padding-1 heightMax" + (!configuration?.rename ? " disabled" : "")}>
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
        </>
    )
}


