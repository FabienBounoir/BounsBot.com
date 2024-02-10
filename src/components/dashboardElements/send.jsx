
import { useState, useEffect, useRef } from "react"
import Avatar from "../../components/avatar/avatar";
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { Form } from 'react-bootstrap/'
import * as guildsAPI from "../../utils/API/guildsAPI";
import { useTranslation } from "react-i18next";

export const Send = ({ guildId, channels, loading }) => {
    const { t } = useTranslation();
    const textareaRef = useRef(null);
    const [loadingChargement, setLoadingChargement] = useState(false);
    const [channelAvailable, setChannelAvailable] = useState([])
    const [message, setMessage] = useState("")
    const [messageConfig, setMessageConfig] = useState({
        content: "",
        channelId: "",
        replyTo: "",
        guildId
    })

    useEffect(() => {
        setChannelAvailable(channels.filter(channel => channel.type === 0 || channel.type === 2 || channel.type === 5))
    }, [channels])


    useEffect(() => {
        setMessageConfig({
            ...messageConfig,
            guildId
        })
    }, [guildId])

    let resizeTextarea = () => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    let sendmessage = async () => {
        if (messageConfig.content.length === 0 || messageConfig.channelId === "" || loadingChargement) return;
        setLoadingChargement(true)


        try {
            await guildsAPI.sendMessage(guildId, messageConfig)
            setMessageConfig({
                ...messageConfig,
                content: ""
            })
            setMessage("✅ Message envoyé avec succès.")
            resizeTextarea()
        } catch (error) {
            setMessage("❌ une erreur est survenue...")
        }
        finally {
            setLoadingChargement(false)
        }
    }

    let getChannelForSelector = (allChannel, selectedchannel) => {
        let option = [];

        if (selectedchannel === "0") {
            option.push(<option value="0" selected>❌ {t("dashboard.send.selectChannel")}</option>)
        }
        else {
            option.push(<option value="0">❌ {t("dashboard.send.selectChannel")}</option>)
        }

        for (let value of allChannel) {
            if (value.id === selectedchannel) {
                option.push(<option key={value.id} value={value.id} selected>{value.name}</option>)
            }
            else {
                option.push(<option key={value.id} value={value.id}>{value.name}</option>)
            }
        }

        return option;
    }

    return (
        <>
            {["ERROR", "LOADING"].includes(loading) ? <LoadingComponent error={loading == "ERROR"} errorMessage="Un message ou ça ?" /> :
                <div className="block padding-1 heightMax">
                    <div className="infoActive">
                        <h5>{t("dashboard.send.sendMessage")}</h5>
                    </div>

                    <div className="separator"></div>

                    <div className="sendMessageContainer">
                        <div className="sendMessageComponent">
                            <div className="demo">
                                <div className="message">
                                    <div className="content">
                                        <Avatar classElement="avatar" />
                                        <div className="header_info">
                                            <span className="username">Bouns'bot</span>
                                            <span className="botCertified">
                                                <svg aria-label="Bot certifié" className="botTagVerified-2KCPMa" aria-hidden="false" role="img" width="16" height="16" viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg>
                                                BOT
                                            </span>
                                            <span className="timestamp">{new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div className="message_content">
                                            <pre>
                                                <p>{messageConfig.channelId === "" ? t("dashboard.send.selectChannel") : (message ? message : t("dashboard.send.helloword"))}</p>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"SendMessageInput" + (messageConfig.channelId === "" || messageConfig.channelId === "0" || loadingChargement ? " disable" : "")}>
                                <textarea ref={textareaRef} rows={1} disabled={messageConfig.channelId === "" || messageConfig.channelId === "0" || loadingChargement} placeholder={t("dashboard.send.sendMsg")} value={messageConfig.content} onChange={(e) => { setMessageConfig({ ...messageConfig, content: e.target.value }); setMessage(e.target.value.trim()); resizeTextarea() }} />

                                <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" onClick={() => sendmessage()}>
                                    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
                                        <g id="ic_fluent_send_28_filled" fill="var(--color-principal)" fillRule="nonzero">
                                            <path d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.15190935,15.9983421 C4.204709,15.8047375 4.36814355,15.6614577 4.56699265,15.634447 L14.7775879,14.2474874 C14.8655834,14.2349166 14.938494,14.177091 14.9721837,14.0981464 L14.9897199,14.0353553 C15.0064567,13.9181981 14.9390703,13.8084248 14.8334007,13.7671556 L14.7775879,13.7525126 L4.57894108,12.3655968 C4.38011873,12.3385589 4.21671819,12.1952832 4.16392965,12.0016992 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z" id="🎨-Color" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div className="configWelcomeCanvas">
                                <div style={{ marginBottom: "10px", color: "white", textAlign: "left" }}>
                                    <span>{t("dashboard.send.channel")}</span>
                                    <Form.Select defaultValue={messageConfig?.channel} onChange={(e) => { setMessageConfig({ ...messageConfig, channelId: e.target.value }) }}>
                                        {(() => {
                                            return getChannelForSelector(channelAvailable, messageConfig?.channel);
                                        })()}
                                    </Form.Select>
                                </div>

                                <div className="separator"></div>

                                <div style={{ marginBottom: "10px", color: "white", textAlign: "left" }}>
                                    <span>{t("dashboard.send.replyToMsg")}</span>
                                    <Form.Control type="text" placeholder={t("dashboard.send.messageId")} value={messageConfig.replyTo} onChange={(e) => { setMessageConfig({ ...messageConfig, replyTo: e.target.value }) }} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>}
        </>
    )
}


