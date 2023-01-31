
import { useState, useEffect, useRef } from "react"
import Avatar from "../avatar/avatar";
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { Form } from 'react-bootstrap/'

export const LevelsConfig = (props) => {
    const textareaRef = useRef(null);
    const [loadingChargement, setLoadingChargement] = useState(false);
    const [loading, setLoading] = useState(true)
    const [xpConfig, setXpConfig] = useState([])
    const [initialConfig, setInitialConfig] = useState({})
    const [changeNotSave, setChangeNotSave] = useState(false);
    const [roles, setRoles] = useState([])

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            await Promise.all([
                getXpConfigGuild(),
                getRoleGuild()
            ])
            setLoading(false)
        }
        fetchData()
    }, [props.guildId])

    useEffect(() => {
        let key = Object.keys(xpConfig)

        for (let i = 0; i < key.length; i++) {
            if (key[i] == "gainRolesLevels") {
                if (xpConfig[key[i]].length !== initialConfig[key[i]].length) {
                    return setChangeNotSave(true)
                }

                for (let j = 0; j < xpConfig[key[i]].length; j++) {
                    if (xpConfig[key[i]][j].level !== initialConfig[key[i]][j].level) {
                        return setChangeNotSave(true)
                    }

                    if (xpConfig[key[i]][j].role.id !== initialConfig[key[i]][j].role.id) {
                        return setChangeNotSave(true)
                    }
                }
                continue
            }

            if (key[i] === "channels") {
                continue
            }

            if (key[i] === "roles") {
                continue
            }


            if (xpConfig[key[i]] != initialConfig[key[i]]) {
                return setChangeNotSave(true)
            }

        }
        setChangeNotSave(false)
    }, [xpConfig])

    let getRoleGuild = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(process.env.REACT_APP_HOSTNAME_BOT + "/bot/getroles/" + props.guildId, requestOptions)
            .then(response => response.json())
            .then((rolesResult) => {
                setRoles(rolesResult.filter(role => role.tags?.botId == null && role.name !== "@everyone"))
            })
            .catch(console.log)
    };

    const resetChange = () => {
        setXpConfig(JSON.parse(JSON.stringify(initialConfig)))
    }

    const checkBeforeUpdate = () => {
        return new Promise((resolve, reject) => {
            let gainRolesLevels = []
            for (let i = 0; i < xpConfig.gainRolesLevels.length; i++) {
                //remove element if level is empty
                if (xpConfig.gainRolesLevels[i].level === "") {
                    continue
                }

                //remove element if role is empty
                if (xpConfig.gainRolesLevels[i].role.id === "") {
                    continue
                }

                for (let j = 0; j < xpConfig.gainRolesLevels.length; j++) {
                    if (i === j) {
                        continue
                    }

                    if (xpConfig.gainRolesLevels[i].level === xpConfig.gainRolesLevels[j].level) {
                        return reject(alert("❌ Vous avez deux fois le même niveau de gain de rôle"))
                    }

                    if (xpConfig.gainRolesLevels[i].role.id === xpConfig.gainRolesLevels[j].role.id) {
                        return reject(alert("❌ Vous avez deux fois le même rôle de gain de rôle"))
                    }
                }

                gainRolesLevels.push(xpConfig.gainRolesLevels[i])
            }

            gainRolesLevels.sort((a, b) => a.level - b.level)

            setXpConfig({ ...xpConfig, gainRolesLevels })
            resolve()
        })
    }



    const updateConfig = async () => {
        setLoadingChargement(true)

        try {
            await checkBeforeUpdate()
        }
        catch (error) {
            return setLoadingChargement(false)
        }

        // await new Promise((resolve) => setTimeout(resolve, 5000));

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        let info = null

        try {
            info = await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${props.guildId}/xpconfig`, {
                method: "PUT",
                headers,
                body: JSON.stringify(xpConfig),
                redirect: 'follow'
            })
        } catch (error) {
            alert("❌ Une erreur est survenue")
            setLoadingChargement(false)
            return console.log("Save Configuration Error", error)
        }

        if (info.status === 200) {
            setInitialConfig(JSON.parse(JSON.stringify(xpConfig)))
            setChangeNotSave(false)
            setLoadingChargement(false)
        }
        else {
            alert("❌ Une erreur est survenue")
            setLoadingChargement(false)
        }
    }

    let getXpConfigGuild = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(process.env.REACT_APP_HOSTNAME_BOT + "/guild/" + props.guildId + "/xpconfig", requestOptions)
            .then(response => response.json())
            .then((result) => {
                setInitialConfig(JSON.parse(JSON.stringify(result)))
                setXpConfig(result);
            })
            .catch(console.log)
    };

    let recompenseRole = () => {
        // xpConfig.

        let rolesRewards = []


        if (xpConfig.gainRolesLevels.length == 0) {
            return (
                <div className="roleRewardElement noElement">
                    <p>Aucune récompense de rôle</p>
                </div>
            )

        }

        for (let i = 0; i < xpConfig.gainRolesLevels.length; i++) {
            rolesRewards.push(
                <div className="roleRewardElement">
                    <Form.Control min={"1"} max type="number" value={xpConfig?.gainRolesLevels[i]?.level} placeholder="Level"
                        onChange={(e) => {
                            let newRoles = xpConfig.gainRolesLevels
                            newRoles[i].level = parseInt(e.target.value)
                            setXpConfig({ ...xpConfig, gainRolesLevels: newRoles })
                        }}
                    />

                    <Form.Select defaultValue={xpConfig?.gainRolesLevels[i]?.role?.id} onChange={(e) => {
                        let newRoles = xpConfig.gainRolesLevels
                        newRoles[i].role.id = e.target.value
                        setXpConfig({ ...xpConfig, gainRolesLevels: newRoles })
                    }}>
                        {(() => {
                            return getRolesForSelector(roles, xpConfig.gainRolesLevels[i].role.id);
                        })()}
                    </Form.Select>

                    <svg xmlns="http://www.w3.org/2000/svg" width="65px" viewBox="0 0 24 24" fill="none" onClick={() => {
                        let newRoles = xpConfig.gainRolesLevels
                        newRoles.splice(i, 1)
                        setXpConfig({ ...xpConfig, gainRolesLevels: newRoles })
                    }}>
                        <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="var(--color-principal)" />
                        <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="var(--color-principal)" />
                    </svg>


                </div>
            )
        }

        return rolesRewards
    }

    let getRolesForSelector = (roles, id) => {
        let rolesForSelector = []

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].id == id) {
                rolesForSelector.push(
                    <option value={roles[i].id} selected>{roles[i].name}</option>
                )
            }
            else {
                rolesForSelector.push(
                    <option value={roles[i].id}>{roles[i].name}</option>
                )
            }
        }

        return rolesForSelector
    }

    useEffect(() => {
        console.log("multiplicator", xpConfig.multiplicator)

    }, [xpConfig])


    return (
        <>
            {loading ? <LoadingComponent /> :
                // JSON.stringify(xpConfig)
                <>
                    <div className="block padding-1">
                        <div className="infoActive">
                            <h5>Rôles récompenses configuration</h5>
                            {/* <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.DM?.active} onChange={(e) => { updateEtatDm(e) }} /> */}
                        </div>

                        <div className="separator"></div>

                        <div className={"informationConfig xpConfigType radioComponent"}>
                            <h6>Type de recompense de role</h6>
                            <div>
                                <div className="radioButton">

                                    <input
                                        type="radio"
                                        name="typeRole"
                                        value={false}
                                        checked={xpConfig.gainRolesLevelsOnlyActualRole == false}
                                        onChange={(e) => { setXpConfig({ ...xpConfig, gainRolesLevelsOnlyActualRole: false }) }}
                                    />
                                    <label>Cumuler les récompenses</label>
                                </div>
                                <div className="radioButton">

                                    <input
                                        type="radio"
                                        name="typeRole"
                                        value={true}
                                        checked={xpConfig.gainRolesLevelsOnlyActualRole == true}
                                        onChange={(e) => { setXpConfig({ ...xpConfig, gainRolesLevelsOnlyActualRole: true }) }}
                                    />
                                    <label>Enlever les récompenses précédentes</label>
                                </div>
                            </div>
                        </div>

                        <div className={"informationConfig xpConfigType radioComponent"}>
                            <h6>Message de récompense</h6>
                            <div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="recompenseMessage"
                                        value={"GUILD"}
                                        checked={xpConfig.gainRolesLevelsSend == "GUILD"}
                                        onChange={(e) => { setXpConfig({ ...xpConfig, gainRolesLevelsSend: "GUILD" }) }}
                                    />
                                    <label>Envoyer le message sur la guild</label>
                                </div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="recompenseMessage"
                                        value={"DM"}
                                        checked={xpConfig.gainRolesLevelsSend == "DM"}
                                        onChange={(e) => { setXpConfig({ ...xpConfig, gainRolesLevelsSend: "DM" }) }}
                                    />
                                    <label>Envoyer le message en privé</label>
                                </div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="recompenseMessage"
                                        value={"none"}
                                        checked={xpConfig.gainRolesLevelsSend == "none"}
                                        onChange={(e) => { setXpConfig({ ...xpConfig, gainRolesLevelsSend: "none" }) }}
                                    />
                                    <label>Ne pas envoyer de message</label>
                                </div>
                            </div>
                        </div>

                        <div className={"informationConfig xpConfigType radioComponent"}>
                            <h6>Rôle Récompense</h6>
                            <div className="roleRewardContainer">
                                {recompenseRole()}



                                <button className="addRoleReward" onClick={() => { setXpConfig({ ...xpConfig, gainRolesLevels: [...xpConfig.gainRolesLevels, { level: "", role: { id: "roles[0].id" } }] }) }}>Ajouter une récompense</button>
                            </div>
                        </div>
                    </div>

                    <div className="block padding-1">
                        <div className="infoActive">
                            <h5>Taux d'Xp</h5>
                            {/* <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.DM?.active} onChange={(e) => { updateEtatDm(e) }} /> */}
                        </div>

                        <div className="separator"></div>

                        <div className={"informationConfig xpConfigType"}>


                            <label>Multiplicateur: x{xpConfig.multiplicator}</label>
                            <div class="slidecontainer">
                                <input type="range" min={0.25} max={3} step={0.25} value={xpConfig.multiplicator} class="slider" onChange={(e) => { console.log("e", e); setXpConfig({ ...xpConfig, multiplicator: e.target.value }) }} />
                            </div>

                        </div>
                    </div>

                    <div className="block padding-1" style={{ display: "none" }}>
                        <div className="infoActive">
                            <h5>Salon sans Xp</h5>
                        </div>

                        <div className="separator"></div>

                        <div className={"informationConfig xpConfigType"}>
                            <div>
                                <div className="radioButton">

                                    <input
                                        type="radio"
                                        name="channelRestriction"
                                        value={"ALL_WITHOUT"}
                                        checked={xpConfig.channelType == "ALL_WITHOUT"}
                                        onChange={(e) => { setXpConfig({ ...xpConfig, channelType: "ALL_WITHOUT" }) }}
                                    />
                                    <label>Xp dans tous les channels sauf celui-ci</label>
                                </div>
                                <div className="radioButton">

                                    <input
                                        type="radio"
                                        name="channelRestriction"
                                        value={"WITHOUT_EXCEPT"}
                                        checked={xpConfig.channelType == "WITHOUT_EXCEPT"}
                                        onChange={(e) => { setXpConfig({ ...xpConfig, channelType: "WITHOUT_EXCEPT" }) }}
                                    />
                                    <label>Xp que dans ces channels</label>
                                </div>


                            </div>

                        </div>
                    </div>

                    <div className="block padding-1" style={{ display: "none" }}>
                        <div className="infoActive">
                            <h5>Rôles sans Xp</h5>
                        </div>

                        <div className="separator"></div>

                        <div className={"informationConfig xpConfigType"}>
                            <div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="roleRestriction"
                                        value={"ALL_WITHOUT"}
                                        checked={xpConfig.rolesType == "ALL_WITHOUT"}
                                        onChange={(e) => { setXpConfig({ ...xpConfig, rolesType: "ALL_WITHOUT" }) }}
                                    />
                                    <label>Autorisé tout les rôles sauf</label>
                                </div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="roleRestriction"
                                        value={"WITHOUT_EXCEPT"}
                                        checked={xpConfig.rolesType == "WITHOUT_EXCEPT"}
                                        onChange={(e) => { setXpConfig({ ...xpConfig, rolesType: "WITHOUT_EXCEPT" }) }}
                                    />
                                    <label>Empecher tout les rôles sauf</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

            <div id="card" className={"cardSave" + (changeNotSave ? " hidden" : "")} ><div className="saveConfig"><div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "0.3em" }}><Avatar classElement="logoChangement" width="30" height="28" /> Changements détectés ! Veuillez enregistrer ou annuler.</div><div className="buttonContainer"><button className="cancelButton" disabled={loadingChargement} type="button" onClick={resetChange}>Annuler</button><button className="saveButton" type="button" disabled={loadingChargement} onClick={updateConfig}>Enregistrer</button></div></div></div>
        </>
    )
}


