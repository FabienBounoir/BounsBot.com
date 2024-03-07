import { useState, useEffect } from "react"
import { Form } from 'react-bootstrap/'
import Avatar from "../avatar/avatar.jsx";
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { useTranslation } from "react-i18next";

export const Moderation = ({ guildId, configuration, updateConfiguration, confActual, loading }) => {
    const { t } = useTranslation();

    const [banAppealUrl, setBanAppealUrl] = useState(configuration?.banAppealUrl || "")
    const [valideUrl, setValideUrl] = useState(true)

    const [newAutoInfraction, setNewAutoInfraction] = useState({
        target: "infraction",
        target_count: 3,

        infInType: "MINUTE",
        infInTime: 30,

        action: "TEMPMUTE",
        applyType: "HOUR",
        applytime: 1
    })

    const isURL = (str) => {
        var urlRegex = /^(http|https):\/\/[^ "]+$/;

        return urlRegex.test(str);
    }

    const transformToHtml = (text) => {
        let element = []

        while (text.includes("{{") && text.includes("}}")) {
            let indexStart = text.indexOf("{{")
            let indexEnd = text.indexOf("}}")

            element.push(text.substring(0, indexStart))
            element.push(<b>{text.substring(indexStart + 2, indexEnd)}</b>)
            text = text.substring(indexEnd + 2)
        }

        if (element.length == 0) element.push(text)

        return element
    }

    useEffect(() => {
        if (configuration) {
            if (isURL(configuration.banAppealUrl) || !configuration.banAppealUrl) {
                setValideUrl(true)
            }
            else {
                setValideUrl(false)
            }
        }
    }, [configuration])

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        // Calcul du reste des secondes, minutes et heures
        const remainingSeconds = seconds % 60;
        const remainingMinutes = minutes % 60;
        const remainingHours = hours % 24;

        // Construction de la chaîne de format
        const formattedTime = `${days ? days + " " + (days > 1 ? t("moderation.days") : t("moderation.day")) + " " : ""}${remainingHours ? remainingHours + " " + (remainingHours > 1 ? t("moderation.hours") : t("moderation.hour")) + " " : ""}${remainingMinutes ? remainingMinutes + " " + (remainingMinutes > 1 ? t("moderation.minutes") : t("moderation.minute")) + " " : ""}${remainingSeconds ? remainingSeconds + " " + (remainingSeconds > 1 ? t("moderation.seconds") : t("moderation.second")) + " " : ""}`.trim();
        // "d " : ""}${remainingHours ? remainingHours + "h " : ""}${remainingMinutes ? remainingMinutes + "m " : ""}${remainingSeconds ? remainingSeconds + "s " : ""}`

        return formattedTime;
    }

    const formatAutomatedInfractions = (automatedInfractions) => {
        let formattedInfractions = []

        if (automatedInfractions.length == 0) {
            formattedInfractions.push(
                <p style={{ color: "white", margin: 0 }} >{"Aucune sanction automatique n'est encore activée..."}</p>

            )
        }

        formattedInfractions.push(
            <p style={{ color: "white", margin: "0 auto 0 0" }} >{"ℹ️ Trie les infractions de la moins sévère à la plus sévère"}</p>
        )

        for (let i = 0; i < automatedInfractions.length; i++) {
            formattedInfractions.push(
                <div className="infractionContainer">
                    <div className="automatedInfraction">
                        <span>{transformToHtml(t("moderation.infractionDetails").replace("{{INFRACTION}}", automatedInfractions[i].target_count).replace("{{INFRACTION_TEXT}}", automatedInfractions[i].target_count > 1 ? t("moderation.infractions") : t("moderation.infraction")).replace("{{TIME}}", formatTime(automatedInfractions[i].target_time)).replace("{{ACTION}}", automatedInfractions[i].action).replace("{{ACTION_TIME}}", formatTime(automatedInfractions[i].action_time)))}</span>
                        <button
                            onClick={() => {
                                let newConfig = JSON.parse(JSON.stringify(configuration.autoInfractions))
                                newConfig.splice(i, 1)
                                updateConfiguration({ ...configuration, autoInfractions: newConfig })
                            }
                            }
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-koXPp dXyftP inline-block" main="#9B9D9F" secondary="rgba(154,161,181,0.16)"><path d="M5 7.033h14v5.143c0 1.575-.222 3.142-.658 4.654a5.627 5.627 0 01-4.46 3.999l-.158.026a10.344 10.344 0 01-3.448 0l-.158-.026a5.627 5.627 0 01-4.46-3.999A16.783 16.783 0 015 12.176V7.033z" fill="none" data-fill="secondary"></path><path d="M3 6.283a.75.75 0 000 1.5v-1.5zm18 1.5a.75.75 0 000-1.5v1.5zm-16-.75v-.75h-.75v.75H5zm14 0h.75v-.75H19v.75zm-.658 9.797l.72.208-.72-.208zm-4.618 4.025l.125.74-.125-.74zm-3.448 0l.125-.74-.125.74zm-.158-.026l-.125.74.125-.74zm-4.46-3.999l-.72.208.72-.208zm8.224 3.999l-.125-.74.125.74zm-6.04-15.34l.681.315-.68-.315zm.976-1.308l-.5-.558.5.558zm1.46-.874l.26.703-.26-.703zm3.444 0l.261-.703-.26.703zm2.435 2.182l.681-.314-.68.314zM3 7.783h18v-1.5H3v1.5zm10.757 12.306l-.158.027.25 1.479.158-.027-.25-1.479zm-3.356.027l-.158-.027-.25 1.48.158.026.25-1.48zM18.25 7.033v5.143h1.5V7.033h-1.5zm-12.5 5.143V7.033h-1.5v5.143h1.5zm12.5 0c0 1.505-.212 3.002-.629 4.446l1.441.416c.456-1.58.688-3.217.688-4.862h-1.5zm-4.651 7.94a9.595 9.595 0 01-3.198 0l-.25 1.479c1.224.207 2.474.207 3.698 0l-.25-1.48zm-3.356-.027a4.877 4.877 0 01-3.864-3.467l-1.441.416a6.377 6.377 0 005.055 4.53l.25-1.479zM6.38 16.622a16.033 16.033 0 01-.629-4.446h-1.5c0 1.645.231 3.282.688 4.862l1.44-.416zm7.628 4.946a6.377 6.377 0 005.055-4.53l-1.44-.416a4.877 4.877 0 01-3.865 3.467l.25 1.48zM8.25 7.033c0-.42.092-.837.273-1.229l-1.361-.63a4.422 4.422 0 00-.412 1.859h1.5zm.273-1.229c.182-.393.45-.755.796-1.064L8.317 3.623c-.49.44-.884.966-1.155 1.552l1.361.63zM9.32 4.74c.345-.31.759-.559 1.22-.73l-.522-1.406c-.63.234-1.209.579-1.7 1.019L9.32 4.74zm1.22-.73c.461-.171.958-.26 1.461-.26v-1.5c-.679 0-1.352.12-1.983.354l.522 1.406zM12 3.75c.503 0 1 .089 1.461.26l.522-1.406A5.707 5.707 0 0012 2.25v1.5zm1.461.26c.461.171.875.42 1.22.73l1.002-1.117a5.317 5.317 0 00-1.7-1.02l-.522 1.407zm1.22.73c.345.309.614.671.796 1.064l1.361-.63a4.784 4.784 0 00-1.156-1.551l-1 1.117zm.796 1.064c.181.392.273.81.273 1.229h1.5c0-.64-.14-1.272-.412-1.858l-1.361.63zM5 7.783h14v-1.5H5v1.5z" fill="var(--color-principal)" data-fill="main"></path><path d="M10 12v4m4-4v4" stroke="var(--color-principal)" data-stroke="main" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        </button>
                    </div>

                    <div className="orderSelecter">
                        <button disabled={i == 0 ? true : false} onClick={() => moveInfraction(i, -1)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-koXPp jrAfX inline-block" main="#9B9D9F"><path d="M12 17.5v-11m0 0l-4 4.588M12 6.5l4 4.588" stroke="#9B9D9F" data-stroke="main" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </button>
                        <button disabled={i == automatedInfractions.length - 1} onClick={() => moveInfraction(i, 1)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-koXPp jrAfX inline-block" main="#9B9D9F"><path d="M12 6.5v11m0 0l4-4.588M12 17.5l-4-4.588" stroke="#9B9D9F" data-stroke="main" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </button>
                    </div>

                </div>
            )
        }

        return formattedInfractions
    }

    const moveInfraction = (index, direction) => {
        let newConfig = JSON.parse(JSON.stringify(configuration.autoInfractions))
        let temp = newConfig[index]
        newConfig[index] = newConfig[index + direction]
        newConfig[index + direction] = temp

        updateConfiguration({ ...configuration, autoInfractions: newConfig })
    }

    return (<>
        {["ERROR", "LOADING"].includes(loading) ?
            <LoadingComponent error={loading == "ERROR"} errorMessage="Une erreur est survenue" />
            : <>
                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>{t("moderation.linkSendWhenMemberBan")}</h5>
                    </div>
                    <div className="separator"></div>

                    <div style={{ "display": "flex", "flexDirection": "row-reverse", "gap": "10px", flexWrap: "wrap" }}>
                        <p className="categorie_config">
                            {t("moderation.linkUnbanInformation")}
                        </p>

                        <div style={{ "margin": "auto auto auto 0", "width": "-webkit-fill-available" }}>
                            <Form.Control
                                style={{ "max-width": "530px" }}
                                placeholder={"https://docs.google.com/forms/d/e/1FAIpQLSfqfAqCeVAlTRl6htdkhBawO3KO95gvNh_hZUq9WEHKXjSkSg/viewform"}
                                value={configuration?.banAppealUrl || null}
                                onChange={(event) => {
                                    // setBanAppealUrl(event.target.value)

                                    updateConfiguration({ ...configuration, banAppealUrl: event.target.value == "" ? null : event.target.value })
                                    //check if url is valid
                                    // let url = event.target.value
                                    if (isURL(event.target.value) || !event.target.value) {
                                        setValideUrl(true)
                                    }
                                    else {
                                        setValideUrl(false)
                                    }
                                }}
                            />
                            {!valideUrl && <span className="categorie_config" style={{ "color": "red" }}>
                                ❌ {t("moderation.invalidUrl")}
                            </span>}

                        </div>


                    </div>
                </div>

                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>{t("moderation.AutomatedSanctions")}</h5>
                    </div>
                    <div className="separator"></div>

                    <div style={{ "display": "flex", "flexDirection": "column", "gap": "10px", flexWrap: "wrap" }}>

                        {formatAutomatedInfractions(configuration?.autoInfractions)}

                    </div>

                    <div className="spacerInfraction">
                        <div></div>
                    </div>

                    <div className="automatedInfraction configInf" style={{ display: "flex", "gap": "10px", marginTop: "10px" }}>
                        <div className="groupInfractionElement">
                            <div className="elementContainer">
                                <p>{t("moderation.numberInfractions")}:</p>
                                <div className="inputContainer">
                                    <input type="text" list="actions" value={newAutoInfraction.target_count} onChange={(event) => {
                                        if (event.target.value.match(/^[0-9]+$/) && event.target.value.length <= 3) {
                                            setNewAutoInfraction({ ...newAutoInfraction, target_count: event.target.value })
                                        }
                                        else if (event.target.value == "") {
                                            setNewAutoInfraction({ ...newAutoInfraction, target_count: null })
                                        }
                                    }} />

                                    <p>{t(newAutoInfraction.target_count > 1 ? "moderation.infractions" : "moderation.infraction")}</p>
                                </div>
                            </div>
                            <div className="elementContainer">
                                <p>{t("moderation.intervalle")}:</p>
                                <div className="inputContainer">
                                    <input type="text" list="actions" value={newAutoInfraction.infInTime} onChange={(event) => {
                                        if (event.target.value.match(/^[0-9]+$/) && event.target.value.length <= 4) {
                                            setNewAutoInfraction({ ...newAutoInfraction, infInTime: event.target.value })
                                        }
                                        else if (event.target.value == "") {
                                            setNewAutoInfraction({ ...newAutoInfraction, infInTime: null })
                                        }
                                    }} />

                                    <select value={newAutoInfraction.infInType} onChange={(event) => {
                                        setNewAutoInfraction({ ...newAutoInfraction, infInType: event.target.value })
                                    }}
                                    >
                                        <option value="DAY">{t("moderation." + (newAutoInfraction.infInTime > 1 ? "days" : "day"))}</option>
                                        <option value="HOUR">{t("moderation." + (newAutoInfraction.infInTime > 1 ? "hours" : "hour"))}</option>
                                        <option value="MINUTE">{t("moderation." + (newAutoInfraction.infInTime > 1 ? "minutes" : "minute"))}</option>
                                        <option value="SECOND">{t("moderation." + (newAutoInfraction.infInTime > 1 ? "seconds" : "second"))}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="groupInfractionElement">
                            <div className="elementContainer">
                                <p>{t("moderation.sanction")}:</p>
                                <div className="inputContainer">

                                    <select value={newAutoInfraction.action} onChange={(event) => {
                                        setNewAutoInfraction({ ...newAutoInfraction, action: event.target.value })
                                    }}
                                    >
                                        <option value="WARN">Warn</option>
                                        <option value="MUTE">Mute</option>
                                        <option value="TEMPMUTE">TempMute</option>
                                        <option value="ban">Ban</option>
                                        <option value="TEMPBAN">TempBan</option>
                                    </select>
                                </div>
                            </div>

                            {["TEMPMUTE", "TEMPBAN"].includes(newAutoInfraction.action) ?
                                <div className="elementContainer">
                                    <p>{t("moderation.duration")}:</p>
                                    <div className="inputContainer">
                                        <input type="text" list="actions" value={newAutoInfraction.applytime} onChange={(event) => {
                                            if (event.target.value.match(/^[0-9]+$/) && event.target.value.length <= 4) {
                                                setNewAutoInfraction({ ...newAutoInfraction, applytime: event.target.value })
                                            }
                                            else if (event.target.value == "") {
                                                setNewAutoInfraction({ ...newAutoInfraction, applytime: null })
                                            }
                                        }} />

                                        <select value={newAutoInfraction.applyType} onChange={(event) => {
                                            setNewAutoInfraction({ ...newAutoInfraction, applyType: event.target.value })
                                        }}
                                        >
                                            <option value="DAY">{t("moderation." + (newAutoInfraction.applytime > 1 ? "days" : "day"))}</option>
                                            <option value="HOUR">{t("moderation." + (newAutoInfraction.applytime > 1 ? "hours" : "hour"))}</option>
                                            <option value="MINUTE">{t("moderation." + (newAutoInfraction.applytime > 1 ? "minutes" : "minute"))}</option>
                                            <option value="SECOND">{t("moderation." + (newAutoInfraction.applytime > 1 ? "seconds" : "second"))}</option>
                                        </select>
                                    </div>
                                </div>

                                : ""}
                        </div>

                        <button onClick={() => {
                            const newConfig = JSON.parse(JSON.stringify(configuration.autoInfractions))


                            const formatNewAutoInfraction = {
                                target: newAutoInfraction.target,
                                target_count: newAutoInfraction.target_count,
                                target_time: newAutoInfraction.infInTime * (newAutoInfraction.infInType == "DAY" ? 86400000 : newAutoInfraction.infInType == "HOUR" ? 3600000 : newAutoInfraction.infInType == "MINUTE" ? 60000 : 1000),
                                action: newAutoInfraction.action,
                                action_time: newAutoInfraction.applytime * (newAutoInfraction.applyType == "DAY" ? 86400000 : newAutoInfraction.applyType == "HOUR" ? 3600000 : newAutoInfraction.applyType == "MINUTE" ? 60000 : 1000)
                            }


                            newConfig.push(formatNewAutoInfraction)

                            updateConfiguration({ ...configuration, autoInfractions: newConfig })

                            setNewAutoInfraction({
                                target: "infraction",
                                target_count: newConfig.length + 1,

                                infInType: "MINUTE",
                                infInTime: 30,

                                action: "TEMPMUTE",
                                applyType: "HOUR",
                                applytime: 1
                            })
                        }}>
                            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-eldPxv kIKVos inline-block mr-1.5" main="#9B9D9F"><path d="M6 12h12m-6-6v12" stroke="var(--color-principal)" data-stroke="main" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        </button>

                    </div>

                </div>
            </>}
    </>)
}
