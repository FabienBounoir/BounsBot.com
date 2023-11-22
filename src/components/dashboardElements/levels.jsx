
import { useState, useEffect } from "react"
import Avatar from "../avatar/avatar";
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { Form } from 'react-bootstrap/'

export const LevelsConfig = ({ guildId, configuration, setConfiguration, channels, roles, loading }) => {
    // const [actualRoleRewards, setActualRoleRewards] = useState([])
    const [newElement, setNewElement] = useState({ level: "", role: { id: "" } })
    const [rolesFiltered, setRolesFiltered] = useState([])
    const [channelsFiltered, setChannelsFiltered] = useState([])
    const [channelXp, setChannelXp] = useState("0")
    const [roleXp, setRoleXp] = useState("0")

    useEffect(() => {
        setChannelsFiltered(channels?.filter(channel => channel.type === 0 || channel.type === 2));
    }, [channels])

    useEffect(() => {
        setRolesFiltered(roles.filter(role => !role.tags?.botId && role.name !== "@everyone"))
    }, [roles])

    useEffect(() => {
        if (channelXp !== "0") {
            setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, channels: [...configuration.xpConfig.channels, channelXp] } })
        }
        setChannelXp("0")
    }, [channelXp])

    useEffect(() => {
        if (roleXp !== "0") {
            setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, roles: [...configuration.xpConfig.roles, roleXp] } })
        }
        setRoleXp("0")
    }, [roleXp])

    // useEffect(() => {
    //     setActualRoleRewards(configuration?.gainRolesLevels || [])
    // }, [configuration])


    // const checkBeforeUpdate = () => {
    //     return new Promise((resolve, reject) => {
    //         let gainRolesLevels = []
    //         for (let i = 0; i < configuration.gainRolesLevels.length; i++) {
    //             //remove element if level is empty
    //             if (configuration.gainRolesLevels[i].level === "") {
    //                 continue
    //             }

    //             //remove element if role is empty
    //             if (configuration.gainRolesLevels[i].role.id === "") {
    //                 continue
    //             }

    //             for (let j = 0; j < configuration.gainRolesLevels.length; j++) {
    //                 if (i === j) {
    //                     continue
    //                 }

    //                 if (configuration.gainRolesLevels[i].level === configuration.gainRolesLevels[j].level) {
    //                     return reject(alert("❌ Vous avez deux fois le même niveau de gain de rôle"))
    //                 }

    //                 if (configuration.gainRolesLevels[i].role.id === configuration.gainRolesLevels[j].role.id) {
    //                     return reject(alert("❌ Vous avez deux fois le même rôle de gain de rôle"))
    //                 }
    //             }

    //             gainRolesLevels.push(configuration.gainRolesLevels[i])
    //         }

    //         gainRolesLevels.sort((a, b) => a.level - b.level)

    //         setConfiguration({ ...configuration, gainRolesLevels })
    //         resolve()
    //     })
    // }

    let recompenseRole = () => {
        let rolesRewards = []


        if (configuration?.gainRolesLevels?.length !== 0) {
            for (let i = 0; i < configuration?.gainRolesLevels?.length; i++) {
                rolesRewards.push(
                    <div className="roleRewardElement">
                        <Form.Control min={"1"} max type="number" value={configuration?.gainRolesLevels[i]?.level} placeholder="Level"
                            onChange={(e) => {
                                let newRoles = JSON.parse(JSON.stringify(configuration.gainRolesLevels))
                                newRoles[i].level = parseInt(e.target.value)
                                setConfiguration({ ...configuration, gainRolesLevels: newRoles })
                            }}
                        />

                        <Form.Select defaultValue={configuration?.gainRolesLevels[i]?.role?.id} onChange={(e) => {
                            let newRoles = JSON.parse(JSON.stringify(configuration.gainRolesLevels))
                            newRoles[i].role.id = e.target.value
                            setConfiguration({ ...configuration, gainRolesLevels: newRoles })
                        }}>
                            {(() => {
                                return getRolesForSelector(rolesFiltered, configuration.gainRolesLevels[i].role.id);
                            })()}
                        </Form.Select>

                        <svg xmlns="http://www.w3.org/2000/svg" width="65px" viewBox="0 0 24 24" fill="none" onClick={() => {
                            let newRoles = configuration.gainRolesLevels
                            newRoles.splice(i, 1)
                            setConfiguration({ ...configuration, gainRolesLevels: newRoles })
                        }}>
                            <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="var(--color-principal)" />
                            <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="var(--color-principal)" />
                        </svg>


                    </div>
                )
            }
        }
        // else {
        //     rolesRewards.push(
        //         <div className="roleRewardElement noElement">
        //             <p>Aucune récompense de rôle</p>
        //         </div>
        //     )
        // }

        rolesRewards.push(<div className="roleRewardElement template">
            <Form.Control min={"1"} max type="number" value={newElement.level} placeholder="Level"
                onChange={(e) => {
                    setNewElement({ ...newElement, level: parseInt(e.target.value) })
                }}
            />

            <Form.Select defaultValue={newElement.role.id} value={newElement.role.id} onChange={(e) => {
                setNewElement({ ...newElement, role: { id: e.target.value } })
            }}>
                {(() => {
                    return getRolesForSelector(rolesFiltered, newElement.role.id, configuration.gainRolesLevels.map(r => r.role.id));
                })()}
            </Form.Select>

            <svg className={(newElement.level === "" || newElement.role.id === "" || configuration.gainRolesLevels.map(r => r.role.id).includes(newElement.role.id) || configuration.gainRolesLevels.map(r => r.level).includes(newElement.level)) ? "disableSVGButton" : ""} width="110px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {
                if (newElement.level === "" || newElement.role.id === "" || configuration.gainRolesLevels.map(r => r.role.id).includes(newElement.role.id) || configuration.gainRolesLevels.map(r => r.level).includes(newElement.level)) {
                    return
                }

                let newRoles = JSON.parse(JSON.stringify(configuration.gainRolesLevels))
                newRoles.push(newElement)
                setConfiguration({ ...configuration, gainRolesLevels: newRoles })
                setNewElement({ level: "", role: { id: "" } })
            }}>

                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4004 21.8601C7.68634 21.8601 5.32932 21.8601 3.86486 20.3956C2.40039 18.9312 2.40039 16.5741 2.40039 11.8601C2.40039 7.14606 2.40039 4.78904 3.86486 3.32458C5.32932 1.86011 7.68634 1.86011 12.4004 1.86011C17.1144 1.86011 19.4715 1.86011 20.9359 3.32458C22.4004 4.78904 22.4004 7.14606 22.4004 11.8601C22.4004 16.5741 22.4004 18.9312 20.9359 20.3956C19.4715 21.8601 17.1144 21.8601 12.4004 21.8601ZM12.4004 8.11011C12.8146 8.11011 13.1504 8.4459 13.1504 8.86011V11.1101H15.4004C15.8146 11.1101 16.1504 11.4459 16.1504 11.8601C16.1504 12.2743 15.8146 12.6101 15.4004 12.6101H13.1504V14.8601C13.1504 15.2743 12.8146 15.6101 12.4004 15.6101C11.9862 15.6101 11.6504 15.2743 11.6504 14.8601V12.6101H9.40039C8.98618 12.6101 8.65039 12.2743 8.65039 11.8601C8.65039 11.4459 8.98618 11.1101 9.40039 11.1101H11.6504V8.86011C11.6504 8.4459 11.9862 8.11011 12.4004 8.11011Z" fill="var(--color-principal)" />
            </svg>
        </div>)

        return rolesRewards
    }

    let getRolesForSelector = (roles, id, filterRole) => {
        let rolesForSelector = []

        if (filterRole) {
            rolesForSelector.push(
                <option value={"0"} selected>Ajouter un rôle</option>
            )
        }

        for (let i = 0; i < roles.length; i++) {
            if (filterRole && filterRole.includes(roles[i].id)) {
                continue
            }


            if (roles[i].id === id) {
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

    let getChannelsForSelector = (channels, id, filterChannel) => {
        let channelsForSelector = []

        if (filterChannel) {
            channelsForSelector.push(
                <option value={"0"} selected>Ajouter un channel</option>
            )
        }

        for (let i = 0; i < channels.length; i++) {
            if (filterChannel && filterChannel.includes(channels[i].id)) {
                continue
            }

            if (channels[i].id === id) {
                channelsForSelector.push(
                    <option value={channels[i].id} selected>{channels[i].name}</option>
                )
            }
            else {
                channelsForSelector.push(
                    <option value={channels[i].id}>{channels[i].name}</option>
                )
            }
        }

        return channelsForSelector
    }

    let moduleChannel = () => {
        let channelsModule = []
        for (let channel of configuration.xpConfig.channels) {
            let channelElement = channelsFiltered.find(c => c.id === channel)

            if (channelElement !== undefined) {
                channelsModule.push(
                    <div className="channelRenderDesign">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" onClick={() => {
                            let newChannels = configuration.xpConfig.channels
                            newChannels = newChannels.filter(c => c != channel)
                            setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, channels: newChannels } })
                        }
                        }>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9498 8.46447C17.3404 8.07394 17.3404 7.44078 16.9498 7.05025C16.5593 6.65973 15.9261 6.65973 15.5356 7.05025L12.0001 10.5858L8.46455 7.05025C8.07402 6.65973 7.44086 6.65973 7.05033 7.05025C6.65981 7.44078 6.65981 8.07394 7.05033 8.46447L10.5859 12L7.05033 15.5355C6.65981 15.9261 6.65981 16.5592 7.05033 16.9497C7.44086 17.3403 8.07402 17.3403 8.46455 16.9497L12.0001 13.4142L15.5356 16.9497C15.9261 17.3403 16.5593 17.3403 16.9498 16.9497C17.3404 16.5592 17.3404 15.9261 16.9498 15.5355L13.4143 12L16.9498 8.46447Z" fill="#FFFFFF" />
                        </svg>
                        <div>{channelElement?.name}</div>
                    </div>
                )
            }
        }

        channelsModule.push(
            <Form.Select defaultValue={channelXp} onChange={(e) => { setChannelXp(e.target.value) }}>
                {getChannelsForSelector(channelsFiltered, channelXp, configuration.xpConfig.channels)}
            </Form.Select>
        )

        return channelsModule
    }

    function decimalToHex(decimal) {
        if (decimal == 0) return "#000000"

        var r = (decimal >> 16) & 255;
        var g = (decimal >> 8) & 255;
        var b = decimal & 255;

        var hexR = r.toString(16).padStart(2, '0');
        var hexG = g.toString(16).padStart(2, '0');
        var hexB = b.toString(16).padStart(2, '0');

        return "#" + hexR + hexG + hexB;
    }

    let moduleRole = () => {
        let rolesModule = []
        for (let role of configuration.xpConfig.roles) {
            let roleElement = rolesFiltered.find(r => r.id == role)

            if (roleElement != undefined) {
                rolesModule.push(
                    <div className="roleRenderXP">
                        <span style={{ background: `${decimalToHex(roleElement?.color)}` }}></span>
                        <div>{roleElement?.name}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" onClick={() => {
                            let newRoles = configuration.xpConfig.roles
                            newRoles = newRoles.filter(r => r != role)
                            setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, roles: newRoles } })
                        }
                        }>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9498 8.46447C17.3404 8.07394 17.3404 7.44078 16.9498 7.05025C16.5593 6.65973 15.9261 6.65973 15.5356 7.05025L12.0001 10.5858L8.46455 7.05025C8.07402 6.65973 7.44086 6.65973 7.05033 7.05025C6.65981 7.44078 6.65981 8.07394 7.05033 8.46447L10.5859 12L7.05033 15.5355C6.65981 15.9261 6.65981 16.5592 7.05033 16.9497C7.44086 17.3403 8.07402 17.3403 8.46455 16.9497L12.0001 13.4142L15.5356 16.9497C15.9261 17.3403 16.5593 17.3403 16.9498 16.9497C17.3404 16.5592 17.3404 15.9261 16.9498 15.5355L13.4143 12L16.9498 8.46447Z" fill="#FFFFFF" />
                        </svg>
                    </div>
                )
            }
        }

        rolesModule.push(
            <Form.Select defaultValue={roleXp} onChange={(e) => { setRoleXp(e.target.value) }}>
                {getRolesForSelector(rolesFiltered, roleXp, configuration.xpConfig.roles)}
            </Form.Select>
        )

        return rolesModule
    }

    return (
        <>
            {["ERROR", "LOADING"].includes(loading) ? <LoadingComponent error={loading == "ERROR"} errorMessage="Trop de Level 👀" /> :
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
                                        checked={configuration.gainRolesLevelsOnlyActualRole == false}
                                        onChange={(e) => { setConfiguration({ ...configuration, gainRolesLevelsOnlyActualRole: false }) }}
                                    />
                                    <label>Cumuler les récompenses</label>
                                </div>
                                <div className="radioButton">

                                    <input
                                        type="radio"
                                        name="typeRole"
                                        value={true}
                                        checked={configuration.gainRolesLevelsOnlyActualRole == true}
                                        onChange={(e) => {
                                            setConfiguration({ ...configuration, gainRolesLevelsOnlyActualRole: true })
                                        }}
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
                                        checked={configuration.gainRolesLevelsSend == "GUILD"}
                                        onChange={(e) => { setConfiguration({ ...configuration, gainRolesLevelsSend: "GUILD" }) }}
                                    />
                                    <label>Envoyer le message sur la guild</label>
                                </div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="recompenseMessage"
                                        value={"DM"}
                                        checked={configuration.gainRolesLevelsSend == "DM"}
                                        onChange={(e) => { setConfiguration({ ...configuration, gainRolesLevelsSend: "DM" }) }}
                                    />
                                    <label>Envoyer le message en privé</label>
                                </div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="recompenseMessage"
                                        value={"none"}
                                        checked={configuration.gainRolesLevelsSend == "none"}
                                        onChange={(e) => { setConfiguration({ ...configuration, gainRolesLevelsSend: "none" }) }}
                                    />
                                    <label>Ne pas envoyer de message</label>
                                </div>
                            </div>
                        </div>

                        <div className={"informationConfig xpConfigType radioComponent"}>
                            <h6>Rôle Récompense</h6>
                            <div className="roleRewardContainer">
                                {recompenseRole()}



                                {/* <button className="addRoleReward" onClick={() => { setConfiguration({ ...configuration, gainRolesLevels: [...configuration.gainRolesLevels, { level: "", role: { id: "roles[0].id" } }] }) }}>Ajouter une récompense</button> */}
                            </div>
                        </div>
                    </div>

                    <div className="block padding-1">
                        <div className="infoActive">
                            <h5>Taux d'Xp</h5>
                        </div>

                        <div className="separator"></div>

                        <div className={"informationConfig xpConfigType"}>
                            <label>Multiplicateur: x{configuration.xpConfig.multiplicator}</label>
                            <div className="slidecontainer">
                                <input type="range" min={0.25} max={3} step={0.25} value={configuration.xpConfig.multiplicator} className="slider" onChange={(e) => { setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, multiplicator: e.target.value } }) }} />
                            </div>

                        </div>
                    </div>

                    <div className="block padding-1">
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
                                        checked={configuration.xpConfig.channelType == "ALL_WITHOUT"}
                                        onChange={(e) => { setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, channelType: "ALL_WITHOUT" } }) }}
                                    />
                                    <label>Xp dans tous les channels sauf celui-ci</label>
                                </div>
                                <div className="channelElements" style={{ display: configuration.xpConfig.channelType == "ALL_WITHOUT" ? "flex" : "none" }}>

                                    {moduleChannel()}
                                </div>

                                <div className="radioButton">

                                    <input
                                        type="radio"
                                        name="channelRestriction"
                                        value={"WITHOUT_EXCEPT"}
                                        checked={configuration.xpConfig.channelType == "WITHOUT_EXCEPT"}
                                        onChange={(e) => { setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, channelType: "WITHOUT_EXCEPT" } }) }}
                                    />
                                    <label>Xp que dans ces channels</label>
                                </div>

                                <div className="channelElements" style={{ display: configuration.xpConfig.channelType == "WITHOUT_EXCEPT" ? "flex" : "none" }}>
                                    {moduleChannel()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="block padding-1">
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
                                        checked={configuration.xpConfig.rolesType == "ALL_WITHOUT"}
                                        onChange={(e) => { setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, rolesType: "ALL_WITHOUT" } }) }}
                                    />
                                    <label>Autorisé tout les rôles sauf</label>
                                </div>
                                <div className="roleElements" style={{ display: configuration.xpConfig.rolesType == "ALL_WITHOUT" ? "flex" : "none" }}>
                                    {moduleRole()}
                                </div>

                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="roleRestriction"
                                        value={"WITHOUT_EXCEPT"}
                                        checked={configuration.xpConfig.rolesType == "WITHOUT_EXCEPT"}
                                        onChange={(e) => { setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, rolesType: "WITHOUT_EXCEPT" } }) }}
                                    />
                                    <label>Empecher tout les rôles sauf</label>
                                </div>
                                <div className="roleElements" style={{ display: configuration.xpConfig.rolesType == "WITHOUT_EXCEPT" ? "flex" : "none" }}>
                                    {moduleRole()}
                                </div>


                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    )
}


