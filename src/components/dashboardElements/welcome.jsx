
import { useState, useEffect, useRef } from "react"
import { Form } from 'react-bootstrap/'
import Avatar from "../../components/avatar/avatar";

import LoadingComponent from "../loading/LoadingComponent.jsx";


export const Welcome = (props) => {
    const [configuration, setConfiguration] = useState({})
    const [initialConfig, setInitialConfig] = useState({})
    const [embedNumber, setEmbedNumber] = useState(0)
    const [loading, setLoading] = useState(true)
    const [changeNotSave, setChangeNotSave] = useState(false);
    const [loadingChargement, setLoadingChargement] = useState(false);
    const [timer, setTimer] = useState(null);

    const [channel, setChannel] = useState([])
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null)


    const getConfiguration = async () => {
        let res = await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${props.guildId}/welcome`).then(res => res.json()) || {}
        console.log(res)
        await setInitialConfig(JSON.parse(JSON.stringify(res)));
        await setConfiguration(JSON.parse(JSON.stringify(res)))
    }

    const renderCanvas = (guild) => {
        let canvas = canvasRef.current

        let ctx = canvas.getContext("2d");

        let avatar = new Image();
        let random = Math.floor(Math.random() * 6);

        avatar.src = props?.user?.avatar ? `https://cdn.discordapp.com/avatars/${props?.user?.id}/${props?.user?.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${random}.png`
        avatar.onload = function () {
            ctx.drawImage(avatar, 0, 0, 500, 500);

            let background = new Image();

            const file = fileInputRef?.current?.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = event => {
                    background.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
            else {
                background.src = guild?.background || "https://media.discordapp.net/attachments/1014101467126304798/1055788116486660166/image.png";
            }
            background.onload = function () {

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(400, 0);
                ctx.lineTo(1200, 0);
                ctx.lineTo(1200, 500);
                ctx.lineTo(500, 500);
                ctx.closePath();

                ctx.clip();
                // ctx.filter = "blur(5px)";
                ctx.drawImage(background, -10, -10, 1240, 540);

                //--------- ADD Fill style -----------//


                ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                ctx.moveTo(400, 0);
                ctx.lineTo(1200, 0);
                ctx.lineTo(1200, 500);
                ctx.lineTo(500, 500);
                ctx.closePath();
                ctx.fill();
                // ctx.filter = "blur(0px)";
                ctx.save();

                //---------- LINE ----------//

                ctx.fillStyle = (guild?.colorAmbiance || '#fb0f32');
                ctx.beginPath();
                ctx.moveTo(390, 0);
                ctx.lineTo(410, 0);
                ctx.lineTo(510, 500);
                ctx.lineTo(390, 500);
                ctx.closePath();
                ctx.fill();

                //--------------------//

                ctx.font = "bold 70px Arial";
                ctx.fillStyle = guild?.colorText //|| "white");
                ctx.textAlign = "left";
                ctx.fillText("Welcome", 490, 150); //450

                ctx.font = "60px Arial";
                ctx.textAlign = "left";
                ctx.fillText((props?.user?.username + "#" + props?.user?.discriminator || "Wumpus#1234"), 520, 270); //480

                ctx.font = "bold 70px Arial";
                // ctx.textAlign = "center";
                ctx.fillText("To the server", 540, 390); //500

                ctx.save();
            }
        }
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

        setInitialConfig(JSON.parse(JSON.stringify(configuration)))
        setChangeNotSave(false)
        setLoadingChargement(false)
    }

    let getChannelGuild = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(process.env.REACT_APP_HOSTNAME_BOT + "/bot/getchannels/" + props.guildId, requestOptions)
            .then(response => response.json())
            .then((result) => {
                setChannel(result?.channels?.filter(channel => channel.type === 0) || []);
            })
            .catch(console.log)
    };

    const resetChange = () => {
        setConfiguration(JSON.parse(JSON.stringify(initialConfig)))
    }

    useEffect(async () => {
        setLoading(true)
        await getChannelGuild()
        await getConfiguration()
        setLoading(false)
        renderCanvas(configuration.GUILD)
    }, [props.guildId])

    useEffect(() => {
        let DM = configuration?.DM
        let DMInitial = initialConfig?.DM

        if (DM?.active !== DMInitial?.active) return setChangeNotSave(true)
        if (DM?.embeds?.length !== DMInitial?.embeds?.length) return setChangeNotSave(true)

        for (let i = 0; i < (DM?.embeds?.length || 0); i++) {
            const keys1 = Object.keys(DM.embeds[i]);
            const keys2 = Object.keys(DMInitial.embeds[i]);

            if (keys1.length !== keys2.length) return setChangeNotSave(true)

            for (let j = 0; j < keys1.length; j++) {
                if (DM.embeds[i][keys1[j]] !== DMInitial.embeds[i][keys2[j]]) return setChangeNotSave(true)
            }

        }

        let Guild = Object.keys(configuration?.GUILD || {})
        let GuildInitial = Object.keys(initialConfig?.GUILD || {})

        if (Guild.length !== GuildInitial.length) return setChangeNotSave(true)

        for (let i = 0; i < Guild.length; i++) {
            if (configuration.GUILD[Guild[i]] !== initialConfig.GUILD[GuildInitial[i]]) return setChangeNotSave(true)
        }

        setChangeNotSave(false)
    }, [configuration])

    useEffect(() => {
        if (loading === false) {
            setTimer(clearTimeout(timer))
            setTimer(setTimeout(() => {
                renderCanvas(configuration.GUILD)
            }, 100))
        }
    }, [configuration])

    const updateEtatDm = (e) => {
        let config = { ...configuration }

        config.DM.active = e.target.checked

        setConfiguration(config)
    }

    const updateEtatGuild = (e) => {
        let config = { ...configuration }

        config.GUILD.active = e.target.checked

        setConfiguration(config)
    }

    const updateEmbedDm = (embedNumber, configElement) => {
        let config = { ...configuration }

        config.DM.embeds[embedNumber] = { ...config.DM.embeds[embedNumber], ...configElement }

        setConfiguration(config)
    }

    const updateColorGuild = (color) => {
        let config = { ...configuration }

        config.GUILD = { ...config.GUILD, ...color }

        setConfiguration(config)
    }

    const updateSelectMenu = (value) => {
        let config = { ...configuration }

        config.GUILD.channel = value

        setConfiguration(config)
    }

    let getChannelForSelector = (allChannel, selectedchannel) => {
        var option = [];

        if (selectedchannel === "0") {
            option.push(<option value="0" selected>❌ Désactivé</option>)
        }
        else {
            option.push(<option value="0">❌ Désactivé</option>)
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

    return (<>
        {loading ? <LoadingComponent /> :
            <><div className="block padding-1">
                <div className="infoActive">
                    <h5>Envoyer un message privé aux nouveaux membres</h5>
                    <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.DM?.active} onChange={(e) => { updateEtatDm(e) }} />
                </div>

                <div className="separator"></div>

                <div className={"informationConfig" + (configuration?.DM?.active ? "" : " welcomeDisable")}>
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
                                <textarea id="messageWelcome" disabled={!configuration?.DM?.active} style={{ Background: "#313442", maxHeight: '300px', minHeight: "100px", resize: configuration?.DM?.active ? "vertical" : "none" }} className="embedDescripton" rows="6" placeholder="Message to send" value={configuration?.DM.embeds[embedNumber]?.description} onChange={event => { updateEmbedDm(embedNumber, { description: event.target.value }) }} />
                            </div>
                            <div>
                                {props.iconLink ?
                                    <img className="thumbnailEmbed" src={props.iconLink} alt="icon" onError={(e) => { e.target.src = props.iconLink.replace(".gif", ".webp") }} />
                                    : <span className="thumbnailEmbed color"></span>}
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <ul>
                            <li><span className="tag">{`{server}`}</span>Nom du serveur</li>
                            <li><span className="tag">{`{id}`}</span>Id du membre</li>
                            <li><span className="tag">{`{user}`}</span>Mention du membre</li>
                            <li><span className="tag">{`{membercount}`}</span>Nombre de membres</li>
                            <li><span className="tag">{`{bot}`}</span>Mention du bot</li>
                        </ul>
                    </div>
                </div>

            </div>
                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>Envoyer un message quand un membre rejoint votre serveur</h5>
                        <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.GUILD?.active} onChange={(e) => { updateEtatGuild(e) }} />
                    </div>

                    <div className="separator"></div>

                    <div className={"informationWelcomeCanvas" + (configuration?.GUILD?.active ? "" : " welcomeDisable")}>
                        <div className="WelcomeComponente" >
                            <canvas width="1200" height="500" ref={canvasRef} style={{ borderRadius: "10px" }} ></canvas>

                        </div>
                        <div className="configWelcomeCanvas">
                            <div style={{ marginBottom: "10px" }}>
                                <span>Salon de messages de bienvenue:</span>
                                <Form.Select defaultValue={configuration?.GUILD?.channel} onChange={(event) => { updateSelectMenu(event.target.value) }}>
                                    {(() => {
                                        return getChannelForSelector(channel, configuration?.GUILD?.channel);
                                    })()}
                                </Form.Select>
                            </div>

                            <div className="separator"></div>

                            <div >
                                <span>Couleur:</span>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div className="colorModule">
                                        <span>Ambiance</span>
                                        <input type="color" value={configuration?.GUILD?.colorAmbiance} onChange={(e) => { updateColorGuild({ colorAmbiance: e.target.value }) }} />
                                    </div>
                                    <div className="colorModule">
                                        <span>Texte</span>
                                        <input type="color" value={configuration?.GUILD?.colorText} onChange={(e) => { updateColorGuild({ colorText: e.target.value }) }} />
                                    </div>
                                </div>
                            </div>

                            {/* <div >

                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div className="colorModule">
                                        <span>Background</span>
                                        <input type="file" ref={fileInputRef} />
                                    </div>
                                </div>

                            </div> */}

                        </div>
                    </div>

                </div></>
        }

        <div id="card" className={"cardSave" + (changeNotSave ? " hidden" : "")} ><div className="saveConfig"><div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "0.3em" }}><Avatar classElement="logoChangement" width="30" height="28" /> Changements détectés ! Veuillez enregistrer ou annuler.</div><div className="buttonContainer"><button className="cancelButton" disabled={loadingChargement} type="button" onClick={resetChange}>Annuler</button><button className="saveButton" type="button" disabled={loadingChargement} onClick={updateConfig}>Enregistrer</button></div></div></div>
    </>)
}


