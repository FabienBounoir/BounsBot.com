
import { useState, useEffect } from "react"
import Avatar from "../avatar/avatar";
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { Form } from 'react-bootstrap/'
import { useTranslation } from "react-i18next";

export const LevelsConfig = ({ guildId, configuration, setConfiguration, channels, roles, loading }) => {
    const { t } = useTranslation();
    const [newElement, setNewElement] = useState({ level: "", role: { id: "" } })
    const [rolesFiltered, setRolesFiltered] = useState([])
    const [channelsFiltered, setChannelsFiltered] = useState([])
    const [channelXp, setChannelXp] = useState("0")
    const [roleXp, setRoleXp] = useState("0")

    useEffect(() => {
        if (channels) {
            setChannelsFiltered(channels?.filter(channel => channel.type === 0 || channel.type === 2));
        }
    }, [channels])

    useEffect(() => {
        if (roles) {
            setRolesFiltered(roles.filter(role => !role.tags?.botId && role.name !== "@everyone"))
        }
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

    let recompenseRole = () => {
        let rolesRewards = []

        if (configuration?.gainRolesLevels?.length !== 0) {
            configuration?.gainRolesLevels.sort((a, b) => a.level - b.level)

            for (let i = 0; i < configuration?.gainRolesLevels?.length; i++) {
                rolesRewards.push(
                    <div className="roleRewardElement" onClick={() => {
                        setConfiguration({ ...configuration, gainRolesLevels: configuration.gainRolesLevels.filter(r => r.level !== configuration.gainRolesLevels[i].level) })
                    }}>
                        <p>Level {configuration?.gainRolesLevels[i]?.level}</p>➜<p className="roleRenderXP"><span style={{ background: `${decimalToHex(rolesFiltered.find(r => r.id == configuration?.gainRolesLevels[i]?.role.id)?.color)}` }}></span>{rolesFiltered.find(r => r.id == configuration?.gainRolesLevels[i]?.role.id)?.name}</p>

                    </div>
                )
            }
        }

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

            <button className="addRoleReward" onClick={() => {
                let newRoles = JSON.parse(JSON.stringify(configuration.gainRolesLevels))
                if (newElement.level === "" || newElement.role.id === "") return

                if (newRoles.find(r => r.level === newElement.level)) {
                    newRoles = newRoles.filter(r => r.level !== newElement.level)
                }

                newRoles.push({ level: newElement.level, role: { id: newElement.role.id } })

                setConfiguration({ ...configuration, gainRolesLevels: newRoles })
                setNewElement({ level: "", role: { id: "" } })
            }}></button>
        </div>)

        return rolesRewards
    }

    let getRolesForSelector = (roles, id, filterRole) => {
        let rolesForSelector = []

        if (filterRole) {
            rolesForSelector.push(
                <option value={"0"} selected>{t("dashboard.levels.addRole")}</option>
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
                <option value={"0"} selected>{t("dashboard.levels.addChannel")}</option>
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
                    <div className="channelRenderDesign" onClick={() => {
                        let newChannels = configuration.xpConfig.channels
                        newChannels = newChannels.filter(c => c != channel)
                        setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, channels: newChannels } })
                    }}>
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
                    <div className="roleRenderXP" onClick={() => {
                        let newRoles = configuration.xpConfig.roles
                        newRoles = newRoles.filter(r => r != role)
                        setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, roles: newRoles } })
                    }
                    }>
                        <span style={{ background: `${decimalToHex(roleElement?.color)}` }}></span>
                        <div>{roleElement?.name}</div>
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
                            <h5>{t("dashboard.levels.category.roleRewards")}</h5>
                        </div>

                        <div className="separator"></div>

                        <div className={"informationConfig xpConfigType radioComponent"}>
                            <h6>{t("dashboard.levels.typeRewardRole")}</h6>
                            <div>
                                <div className="radioButton">

                                    <input
                                        type="radio"
                                        name="typeRole"
                                        value={false}
                                        checked={configuration.gainRolesLevelsOnlyActualRole == false}
                                        onChange={(e) => { setConfiguration({ ...configuration, gainRolesLevelsOnlyActualRole: false }) }}
                                    />
                                    <label>{t("dashboard.levels.cumulateRewards")}</label>
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
                                    <label>{t("dashboard.levels.removeOldRewars")}</label>
                                </div>
                            </div>
                        </div>

                        <div className={"informationConfig xpConfigType radioComponent"}>
                            <h6>{t("dashboard.levels.rewardsMessage")}</h6>
                            <div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="recompenseMessage"
                                        value={"GUILD"}
                                        checked={configuration.gainRolesLevelsSend == "GUILD"}
                                        onChange={(e) => { setConfiguration({ ...configuration, gainRolesLevelsSend: "GUILD" }) }}
                                    />
                                    <label>{t("dashboard.levels.sendOnGuild")}</label>
                                </div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="recompenseMessage"
                                        value={"DM"}
                                        checked={configuration.gainRolesLevelsSend == "DM"}
                                        onChange={(e) => { setConfiguration({ ...configuration, gainRolesLevelsSend: "DM" }) }}
                                    />
                                    <label>{t("dashboard.levels.sendInPrivateMessage")}</label>
                                </div>
                                <div className="radioButton">
                                    <input
                                        type="radio"
                                        name="recompenseMessage"
                                        value={"none"}
                                        checked={configuration.gainRolesLevelsSend == "none"}
                                        onChange={(e) => { setConfiguration({ ...configuration, gainRolesLevelsSend: "none" }) }}
                                    />
                                    <label>{t("dashboard.levels.dontSendMsg")}</label>
                                </div>
                            </div>
                        </div>

                        <div className={"informationConfig xpConfigType radioComponent"}>
                            <h6>{t("dashboard.levels.roleRewards")}</h6>
                            <div className="roleRewardsContainer">
                                {recompenseRole()}
                            </div>
                        </div>
                    </div>

                    <div className="block padding-1">
                        <div className="infoActive">
                            <h5>{t("dashboard.levels.category.xpRate")}</h5>
                        </div>

                        <div className="separator"></div>

                        <div className={"informationConfig xpConfigType"}>
                            <label>{t("dashboard.levels.multiplier")}: x{configuration.xpConfig.multiplicator}</label>
                            <div className="slidecontainer">
                                <input type="range" min={0.25} max={3} step={0.25} value={configuration.xpConfig.multiplicator} className="slider" onChange={(e) => { setConfiguration({ ...configuration, xpConfig: { ...configuration.xpConfig, multiplicator: e.target.value } }) }} />
                            </div>

                        </div>
                    </div>

                    <div className="block padding-1">
                        <div className="infoActive">
                            <h5>{t("dashboard.levels.category.channelWithoutXP")}</h5>
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
                                    <label>{t("dashboard.levels.channelAllWithout")}</label>
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
                                    <label>{t("dashboard.levels.channelWithoutExcept")}</label>
                                </div>

                                <div className="channelElements" style={{ display: configuration.xpConfig.channelType == "WITHOUT_EXCEPT" ? "flex" : "none" }}>
                                    {moduleChannel()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="block padding-1">
                        <div className="infoActive">
                            <h5>{t("dashboard.levels.category.roleWithoutXP")}</h5>
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
                                    <label>{t("dashboard.levels.roleAllWithout")}</label>
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
                                    <label>{t("dashboard.levels.roleWithoutExcept")}</label>
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


