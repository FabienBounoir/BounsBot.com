
import { useState, useEffect, useRef } from "react"
import { Form } from 'react-bootstrap/'
import Avatar from "../../components/avatar/avatar";

import LoadingComponent from "../loading/LoadingComponent.jsx";
import { useTranslation } from "react-i18next";


export const Welcome = ({ guildId, configuration, setConfiguration, channels, rolesGuild, loading, iconLink, name, user }) => {
    const { t } = useTranslation();
    const [embedNumber] = useState(0) //setEmbedNumber
    const [timer, setTimer] = useState(null);
    const [roles, setRoles] = useState([])

    const [channel, setChannel] = useState([])
    const canvasRef = useRef(null)
    const [roleXp, setRoleXp] = useState("0")

    useEffect(() => {
        setChannel(channels?.filter(channel => channel.type === 0) || [])
    }, [channels])

    useEffect(() => {
        setRoles(rolesGuild?.filter(role => !role.tags?.botId && role.name !== "@everyone") || [])
    }, [rolesGuild])

    const renderCanvas = (guild) => {
        if (canvasRef.current === null) return

        let canvas = canvasRef.current
        /**
         * @type {CanvasRenderingContext2D}
        */
        let ctx = canvas.getContext("2d");
        ctx.reset()
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.save();

        // theme2(guild)
        switch (`${guild?.design}`) {
            case "0":
                theme1(guild, canvas)
                break;
            case "1":
                theme2(guild, canvas)
                break;

            case "2":
                theme3(guild, canvas)
                break;

            case "3":
                theme4(guild, canvas)
                break;

            default:
                themeDisable(guild, canvas)
                break;
        }
    }

    const themeDisable = (guild, canvas) => {
        if (canvasRef.current === null) return

        let ctx = canvas.getContext("2d");


        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, 1200, 500);

        ctx.textBaseline = 'middle';

        ctx.font = "bold 70px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(t("dashboard.welcome.render.cardDisable"), 600, 250); //450


    }

    const theme1 = (guild, canvas) => {
        if (canvasRef.current === null) return

        let ctx = canvas.getContext("2d");

        let colorText = guild?.colorText || "#FFFFF";
        let colorAmbient = guild?.colorAmbiance || '#fb0f32';

        let background = new Image();
        background.src = (guild.background || "https://i.imgur.com/0QIj93P.png")
        background.onload = function () {
            ctx.drawImage(background, -10, -10, 1240, 540);

            //--------- ADD Fill style -----------//

            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.moveTo(400, 0);
            ctx.lineTo(1200, 0);
            ctx.lineTo(1200, 500);
            ctx.lineTo(500, 500);
            ctx.closePath();
            ctx.fill();
            ctx.save();

            //---------- LINE ----------//

            ctx.fillStyle = colorAmbient
            ctx.beginPath();
            ctx.moveTo(390, 0);
            ctx.lineTo(410, 0);
            ctx.lineTo(510, 500);
            ctx.lineTo(490, 500);
            ctx.closePath();
            ctx.fill();

            //--------------------//

            ctx.textBaseline = 'middle';

            ctx.font = "bold 70px Arial";
            ctx.fillStyle = colorText
            ctx.textAlign = "left";
            ctx.fillText(t("dashboard.welcome.render.welcome"), 490, 120); //450

            ctx.font = "bold 70px Arial";
            // ctx.fillText("BadbounsTV#2000", 520, 270); //480

            const maxWidth = 630;
            let text = `${user?.username}${user?.discriminator && user?.discriminator != 0 ? `#${user?.discriminator}` : ""}`;
            let fontSize = 70;

            ctx.font = `bold ${fontSize}px Arial`;

            while (ctx.measureText(text).width > maxWidth) {
                fontSize--;
                ctx.font = `bold ${fontSize}px Arial`;
            }

            ctx.fillText(text, 520, 250);

            ctx.fillText(t("dashboard.welcome.render.ontheguild"), 540, 380); //500

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.moveTo(400, 0);
            ctx.lineTo(500, 500);
            ctx.lineTo(0, 500);
            ctx.lineTo(0, 0);
            ctx.closePath();

            ctx.clip();

            let avatar = new Image();
            avatar.src = (user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`)
            avatar.onload = function () {
                ctx.drawImage(avatar, 0, 0, 500, 500);
                ctx.restore();
            }
        }
    }

    const theme2 = (guild, canvas) => {
        if (canvasRef.current === null) return

        let ctx = canvas.getContext("2d");

        let colorText = guild?.colorText || "#FFFFF";
        let colorAmbient = guild?.colorAmbiance || '#fb0f32';

        let background = new Image();
        background.src = (guild.background || "https://i.imgur.com/0QIj93P.png")
        background.onload = function () {
            ctx.drawImage(background, 0, 0, 1200, 500);

            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, 1200, 500);

            //drawn rectangle with Border
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = colorAmbient;
            ctx.strokeStyle = colorAmbient;

            ctx.lineWidth = 20;
            ctx.lineJoin = 'round';

            ctx.strokeRect(150, 30, 920, 440);
            ctx.fillRect(160, 40, 900, 420);

            ctx.globalAlpha = 1;

            //Display Text
            ctx.textAlign = 'center';
            ctx.fillStyle = colorText;

            //resize text
            const maxWidth = 800;
            let text = t("dashboard.welcome.render.welcomeontheguild", { username: user?.username || "Wumpus" })  // `Bienvenue ${user?.username || "Wumpus"} sur le serveur !`
            let fontSize = 57;

            ctx.font = `${fontSize}px Arial`;

            while (ctx.measureText(text).width > maxWidth) {
                fontSize--;
                ctx.font = `${fontSize}px Arial`;
            }

            ctx.fillText(text, 610, 400);
            ctx.globalAlpha = 0.8;

            ctx.fillStyle = darkenColor(colorText, 20);
            //resize text
            const maxWidth2 = 900;
            let text2 = t("dashboard.welcome.render.youarethe", { number: Math.floor(Math.random() * 1000) }) + ", " + t("dashboard.welcome.render.readRules") //`Tu es le ${Math.floor(Math.random() * 1000)}ème membres, Assure toi de lire les règles !` || 'You’re 83848434 member, Make sure to read rules !';
            let fontSize2 = 45;

            ctx.font = `${fontSize2}px Arial`;

            while (ctx.measureText(text2).width > maxWidth2) {
                fontSize2--;
                ctx.font = `${fontSize2}px Arial`;
            }

            ctx.fillText(text2, 610, 450);

            ctx.globalAlpha = 1;

            //add avatar with border and clip
            ctx.beginPath();
            ctx.lineWidth = 15;
            ctx.arc(600, 200, 150, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            let avatar = new Image();
            avatar.src = user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`
            avatar.onload = function () {
                ctx.strokeStyle = colorText;
                ctx.drawImage(avatar, 450, 50, 300, 300);

                ctx.stroke();
                ctx.restore();

                ctx.save();
            }
        }
    }

    const theme3 = (guild, canvas) => {
        let ctx = canvas.getContext("2d");

        let colorText = guild?.colorText || "#FFFFF";
        let colorAmbient = guild?.colorAmbiance || '#fb0f32';

        let background = new Image();
        background.src = (guild.background || "https://i.imgur.com/0QIj93P.png")
        background.onload = function () {
            ctx.drawImage(background, 0, 0, 1200, 500);

            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, 1200, 500);


            //drawn rectangle with Border
            ctx.globalAlpha = 1;
            ctx.fillStyle = colorText;
            ctx.strokeStyle = colorText;

            ctx.lineWidth = 20;
            ctx.lineJoin = 'round';



            //Display Text
            ctx.textAlign = 'center';
            ctx.fillStyle = colorText;

            //resize text
            const maxWidth = 450;
            let text = t("dashboard.welcome.render.welcome").toUpperCase();
            let fontSize = 80;

            ctx.font = `bold ${fontSize}px Arial`;

            while (ctx.measureText(text).width > maxWidth) {
                fontSize--;
                ctx.font = `${fontSize}px Arial`;
            }

            ctx.fillText(text, 610, 400);

            ctx.globalAlpha = 0.8;

            ctx.fillStyle = darkenColor(colorText, 20);
            //resize text
            const maxWidth2 = 700;
            let text2 = (user?.username + (user?.discriminator && user?.discriminator != 0 ? `#${user?.discriminator}` : "") || "Wumpus#1234");
            let fontSize2 = 45;

            ctx.font = `${fontSize2}px Arial`;

            while (ctx.measureText(text2).width > maxWidth2) {
                fontSize2--;
                ctx.font = `${fontSize2}px Arial`;
            }

            ctx.fillText(text2, 610, 450);

            ctx.globalAlpha = 1;


            //utiliser cette forme pour ensuite masker le texte    
            ctx.fillStyle = darkenColor(colorAmbient, 50);
            ctx.globalAlpha = 0.5;

            ctx.translate(850, 0);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.moveTo(368.998, 98.2458);
            ctx.lineTo(368.998, 228.183);
            ctx.lineTo(368.998, 306.482);
            ctx.bezierCurveTo(315.63, 319.584, 276.831, 327.713, 220.802, 313.578);
            ctx.bezierCurveTo(199.099, 308.117, 177.184, 301.828, 158.122, 289.863);
            ctx.bezierCurveTo(139.06, 277.899, 123.138, 259.28, 120.121, 238.394);
            ctx.bezierCurveTo(116.882, 215.906, 126.975, 202.459, 104.322, 188.015);
            ctx.bezierCurveTo(82.3096, 173.971, 57.4627, 163.151, 37.4331, 146.302);
            ctx.bezierCurveTo(-11.4181, 105.154, -8.09407, 44.8246, 22.4084, 0);
            ctx.lineTo(97.6517, 0);
            ctx.lineTo(243.435, 0);
            ctx.lineTo(368.998, 0);
            ctx.lineTo(368.998, 84.1072);
            ctx.lineTo(368.998, 109.297);
            ctx.lineTo(368.998, 122.553);
            ctx.lineTo(368.998, 98.2458);
            ctx.closePath();
            ctx.fill();

            ctx.translate(-850, 0);

            ctx.beginPath();
            ctx.moveTo(-1.52698, 401.752);
            ctx.lineTo(-0.903813, 271.816);
            ctx.lineTo(-0.528289, 193.518);
            ctx.bezierCurveTo(52.9017, 180.672, 91.7396, 172.73, 147.7, 187.133);
            ctx.bezierCurveTo(169.377, 192.698, 191.261, 199.092, 210.265, 211.148);
            ctx.bezierCurveTo(229.27, 223.204, 245.102, 241.899, 248.019, 262.799);
            ctx.bezierCurveTo(251.15, 285.302, 240.993, 298.701, 263.577, 313.254);
            ctx.bezierCurveTo(285.521, 327.403, 310.316, 338.342, 330.265, 355.287);
            ctx.bezierCurveTo(378.918, 396.668, 375.305, 456.981, 344.587, 501.659);
            ctx.lineTo(269.345, 501.298);
            ctx.lineTo(123.561, 501.298);
            ctx.lineTo(-1.52698, 501.298);
            ctx.lineTo(-1.52698, 415.893);
            ctx.lineTo(-1.52698, 390.703);
            ctx.lineTo(-1.52698, 377.447);
            ctx.lineTo(-1.52698, 401.752);
            ctx.closePath();
            ctx.fill();

            ctx.globalAlpha = 1;

            let text3 = '#12';

            //Form generate

            ctx.fillStyle = colorText

            let maxWidth3 = 275;
            let fontSize3 = 70;

            ctx.font = `bold ${fontSize3}px Arial`;

            while (ctx.measureText(text3).width > maxWidth3) {
                fontSize3--;
                ctx.font = `bold ${fontSize3}px Arial`;
            }
            // ctx.fillStyle = colorText;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';

            ctx.fillText(text3, 1160, 70);

            //add avatar with border and clip
            ctx.beginPath();
            ctx.lineWidth = 15;
            ctx.arc(600, 175, 150, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();


            let avatar = new Image();
            avatar.src = user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`
            avatar.onload = function () {
                ctx.drawImage(avatar, 455, 30, 290, 290);

                ctx.stroke();
                ctx.restore();

                ctx.save();
            }

        }
    }

    const theme4 = (guild, canvas) => {
        let ctx = canvas.getContext("2d");

        let colorText = guild?.colorText || "#FFFFF";
        let colorAmbient = guild?.colorAmbiance || '#fb0f32';

        let background = new Image();
        background.src = (guild.background || "https://i.imgur.com/0QIj93P.png")
        background.onload = function () {
            ctx.drawImage(background, 0, 0, 1200, 500);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, 1200, 500);


            //drawn rectangle with Border
            ctx.globalAlpha = 1;
            ctx.fillStyle = colorAmbient;
            ctx.strokeStyle = colorAmbient;

            ctx.lineWidth = 20;
            ctx.lineJoin = 'round';



            //Display Text
            ctx.textAlign = 'center';
            ctx.fillStyle = colorText;

            //resize text
            const maxWidth = 900;
            let text = t("dashboard.welcome.render.welcomeUser", { username: user?.username });
            let fontSize = 80;

            ctx.font = `bold ${fontSize}px Arial`;

            while (ctx.measureText(text).width > maxWidth) {
                fontSize--;
                ctx.font = `${fontSize}px Arial`;
            }

            ctx.fillText(text, 610, 90);


            ctx.textAlign = 'center';
            ctx.fillStyle = colorText;

            //resize text
            const maxWidth2 = 600;
            let text2 = t("dashboard.welcome.render.onGuild", { guild: name });
            let fontSize2 = 85;

            ctx.font = `bold ${fontSize2}px Arial`;

            while (ctx.measureText(text2).width > maxWidth2) {
                fontSize2--;
                ctx.font = `${fontSize2}px Arial`;
            }

            ctx.fillText(text2, 850, 190);

            ctx.fillStyle = colorAmbient //darkenColor(colorAmbient, 20);

            const maxWidth3 = 500;
            let text3 = t("dashboard.welcome.render.youarethe", { number: Math.floor(Math.random() * 1000) }) + ` !`;
            let fontSize3 = 85;

            ctx.font = `bold ${fontSize3}px Arial`;

            while (ctx.measureText(text3).width > maxWidth3) {
                fontSize3--;
                ctx.font = `${fontSize3}px Arial`;
            }

            ctx.fillText(text3, 900, 320);

            const maxWidth4 = 500;
            let text4 = t("dashboard.welcome.render.readRules") + ' !';
            let fontSize4 = 85;

            ctx.font = `bold ${fontSize4}px Arial`;

            while (ctx.measureText(text4).width > maxWidth4) {
                fontSize4--;
                ctx.font = `${fontSize4}px Arial`;
            }

            ctx.fillText(text4, 900, 380);



            ctx.beginPath();
            ctx.lineWidth = 15;
            ctx.ellipse(320, 500, 300, 340, 0, 0, 2 * Math.PI);
            ctx.closePath();

            ctx.clip();


            let avatar = new Image();
            avatar.src = user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`
            avatar.onload = function () {
                ctx.drawImage(avatar, 20, 160, 600, 600);

                ctx.restore();
                ctx.save();
            }
        }
    }

    function darkenColor(color, amount) {
        // Convert the color to RGB values
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);

        // Decrease the value of each color component
        const newR = Math.max(r - amount, 0);
        const newG = Math.max(g - amount, 0);
        const newB = Math.max(b - amount, 0);

        // Convert the modified RGB values back to a hexadecimal code
        const newColor = '#' + newR.toString(16).padStart(2, '0') +
            newG.toString(16).padStart(2, '0') +
            newB.toString(16).padStart(2, '0');

        return newColor;
    }

    useEffect(() => {
        if (roleXp !== "0") {
            updateRoleConfig(roleXp)
        }
        setRoleXp("0")
    }, [roleXp])

    let updateRoleConfig = async (newRole) => {
        // let config = { ...configuration }

        // config.welcome.roles = [...config.ROLE.roles, newRole]

        setConfiguration({ ...configuration, welcomeRole: { ...configuration.welcomeRole, roles: [...configuration.welcomeRole.roles, newRole] } })
    }

    useEffect(() => {
        if (loading == "LOADED") {
            renderCanvas(configuration?.welcome?.guild)
        }
    }, [loading])

    useEffect(() => {
        if (loading == "LOADED") {
            setTimer(clearTimeout(timer))
            setTimer(setTimeout(() => {
                renderCanvas(configuration?.welcome?.guild)
            }, 100))
        }
    }, [configuration])

    const updateEtatDm = (e) => {
        setConfiguration({ ...configuration, welcome: { ...configuration.welcome, DM: { ...configuration.welcome.DM, active: e.target.checked } } })
    }

    const updateEtatROLE = (e) => {
        setConfiguration({ ...configuration, welcomeRole: { ...configuration.welcomeRole, active: e.target.checked } })
    }

    const updateEtatGuild = (e) => {
        setConfiguration({ ...configuration, welcome: { ...configuration.welcome, guild: { ...configuration.welcome.guild, active: e.target.checked } } })
    }

    const updateEmbedDm = (embedNumber, configElement) => {
        let embeds = JSON.parse(JSON.stringify(configuration.welcome.DM.embeds))

        embeds[embedNumber] = { ...embeds[embedNumber], ...configElement }

        setConfiguration({ ...configuration, welcome: { ...configuration.welcome, DM: { ...configuration.welcome.DM, embeds: embeds } } })
    }

    const updateColorGuild = (color) => {
        setConfiguration({ ...configuration, welcome: { ...configuration.welcome, guild: { ...configuration.welcome.guild, ...color } } })
    }

    const updateSelectMenu = (value) => {
        setConfiguration({ ...configuration, welcome: { ...configuration.welcome, guild: { ...configuration.welcome.guild, channel: value } } })
    }

    const updateTheme = (value) => {
        setConfiguration({ ...configuration, welcome: { ...configuration.welcome, guild: { ...configuration.welcome.guild, design: value } } })
    }

    let updateContent = (e) => {
        setConfiguration({ ...configuration, welcome: { ...configuration.welcome, guild: { ...configuration.welcome.guild, content: (e.target.value || null) } } })
    }

    let updateDefaultPseudo = (value) => {
        if (value == "") value = null

        setConfiguration({ ...configuration, welcome: { ...configuration.welcome, guild: { ...configuration.welcome.guild, defaultPseudo: value } } })
    }

    let getChannelForSelector = (allChannel, selectedchannel) => {
        let option = [];

        option.push(<option value={"0"}>⛔️ {t("dashboard.welcome.guild.none")}</option>)

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

    let optionsTheme = (design) => {
        let option = []

        for (let i = -1; i < 4; i++) {
            let theme = ""
            if (i === -1) {
                theme = "⛔️ " + t("dashboard.welcome.guild.dontsendcard")
            }
            else {
                theme = `🃏 ${t("dashboard.welcome.guild.theme")} ${i + 1}`
            }

            if (design === i) {
                option.push(<option value={i} selected>{theme}</option>)
            }
            else {
                option.push(<option value={i}>{theme}</option>)
            }
        }

        return option;
    }

    let fixRoleConfig = (roles) => {
        setConfiguration({ ...configuration, welcomeRole: { ...configuration.welcomeRole, roles: roles } })
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
        for (let role of (configuration?.welcomeRole?.roles || [])) {
            let roleElement = roles.find(r => r.id == role)

            if (roleElement != undefined) {
                rolesModule.push(
                    <div className="roleRenderXP">
                        <span style={{ background: `${decimalToHex(roleElement?.color)}` }}></span>
                        <div>{roleElement?.name}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" onClick={() => {
                            let newRoles = configuration?.welcomeRole.roles
                            newRoles = newRoles.filter(r => r != role)
                            fixRoleConfig(newRoles)
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
                {getRolesForSelector(roles, roleXp, configuration?.welcomeRole?.roles)}
            </Form.Select>
        )

        return rolesModule
    }

    let getRolesForSelector = (roles, id, filterRole = []) => {
        let rolesForSelector = []

        if (filterRole) {
            rolesForSelector.push(
                <option value={"0"} selected>{t("dashboard.welcome.guild.giveRole")}</option>
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

    return (<>
        {["ERROR", "LOADING"].includes(loading) ? <LoadingComponent error={loading == "ERROR"} errorMessage="Une erreur est survenue" /> :
            <>
                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>{t("dashboard.welcome.category.sendInDm")}</h5>
                        <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.welcome?.DM?.active} onChange={(e) => { updateEtatDm(e) }} />
                    </div>

                    <div className="separator"></div>

                    <div className={"informationConfig" + (configuration?.welcome?.DM?.active ? "" : " welcomeDisable")}>
                        <div className="WelcomeComponente" >
                            <div className="embed">
                                <div>
                                    <div className="embedAuthor">
                                        {iconLink ?
                                            //on error replace .gif to .webp
                                            <img className="iconEmbed" src={iconLink} alt="icon" onError={(e) => { e.target.src = iconLink.replace(".gif", ".webp") }} />
                                            : <span className="iconEmbed color"></span>}
                                        {name}
                                    </div>
                                    <textarea id="messageWelcome" disabled={!configuration?.welcome?.DM?.active} style={{ Background: "#313442", maxHeight: '300px', minHeight: "100px", resize: configuration?.welcome?.DM?.active ? "vertical" : "none" }} className="embedDescripton" rows="6" placeholder="Message to send" value={configuration?.welcome?.DM.embeds[embedNumber]?.description} onChange={event => { updateEmbedDm(embedNumber, { description: event.target.value }) }} />
                                </div>
                                <div>
                                    {iconLink ?
                                        <img className="thumbnailEmbed" src={iconLink} alt="icon" onError={(e) => { e.target.src = iconLink.replace(".gif", ".webp") }} />
                                        : <span className="thumbnailEmbed color"></span>}
                                </div>
                            </div>
                        </div>
                        <div className="info">
                            <ul>
                                <li><span className="tag">{`{server}`}</span>{t("dashboard.welcome.variable.guildName")}</li>
                                <li><span className="tag">{`{id}`}</span>{t("dashboard.welcome.variable.userId")}</li>
                                <li><span className="tag">{`{user}`}</span>{t("dashboard.welcome.variable.userMention")}</li>
                                <li><span className="tag">{`{membercount}`}</span>{t("dashboard.welcome.variable.memberCount")}</li>
                                <li><span className="tag">{`{bot}`}</span>{t("dashboard.welcome.variable.bot")}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={"block padding-1" + (configuration?.welcome?.guild?.active ? "" : " disabled")}>
                    <div className="infoActive">
                        <h5>{t("dashboard.welcome.category.sendInGuild")}</h5>
                        <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.welcome?.guild?.active} onChange={(e) => { updateEtatGuild(e) }} />
                    </div>

                    <div className="separator"></div>

                    <p className="categorie_config" >{t("dashboard.welcome.guild.channel")}</p>

                    <Form.Select style={{ "max-width": "530px" }} defaultValue={configuration?.welcome.guild?.channel} value={configuration?.welcome.guild?.channel} disabled={!configuration?.welcome?.guild?.active} onChange={(event) => { updateSelectMenu(event.target.value) }}>
                        {(() => {
                            return getChannelForSelector(channel, configuration?.welcome?.guild?.channel);
                        })()}
                    </Form.Select>

                    <div className="separator" style={{ "marginTop": "15px" }} ></div>

                    <p className="categorie_config" >{t("dashboard.welcome.guild.message")}</p>

                    <Form.Control
                        style={{ "max-width": "530px" }}
                        as="textarea"
                        rows={3}
                        placeholder={t("dashboard.welcome.guild.messageplaceholder")}
                        disabled={!configuration?.welcome?.guild?.active}
                        value={configuration?.welcome?.guild?.content}
                        onChange={(event) => { updateContent(event) }}
                    />


                    <div className="separator" style={{ "marginTop": "15px" }} ></div>

                    <div className={"informationWelcomeCanvas" + (configuration?.welcome?.guild?.active ? "" : " welcomeDisable")}>
                        <div className="WelcomeComponente" >
                            <canvas width="1200" height="500" ref={canvasRef} style={{ borderRadius: "10px" }} ></canvas>

                        </div>
                        <div className="configWelcomeCanvas">
                            <div style={{ marginBottom: "10px" }}>
                                <p>{t("dashboard.welcome.guild.themecard")}</p>
                                <Form.Select defaultValue={configuration?.welcome?.guild?.design} onChange={(event) => { updateTheme(event.target.value) }}>
                                    {(() => {
                                        return optionsTheme(configuration?.welcome?.guild?.design);
                                    })()}
                                </Form.Select>
                            </div>

                            <div className="separator"></div>

                            <div >
                                <p>{t("dashboard.welcome.guild.color")}</p>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div className="colorModule">
                                        <span>{t("dashboard.welcome.guild.ambient")}</span>
                                        <input type="color" defaultValue={"#000000"} value={configuration?.welcome?.guild?.colorAmbiance} onChange={(e) => { updateColorGuild({ colorAmbiance: e.target.value }) }} />
                                    </div>
                                    <div className="colorModule">
                                        <span>{t("dashboard.welcome.guild.text")}</span>
                                        <input type="color" defaultValue={"#FFFFFF"} value={configuration?.welcome?.guild?.colorText} onChange={(e) => { updateColorGuild({ colorText: e.target.value }) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={"block padding-1" + (configuration?.welcomeRole?.active ? "" : " disabled")}>
                    <div className="infoActive">
                        <h5>{t("dashboard.welcome.category.giveRole")}</h5>
                        <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.welcomeRole?.active} onChange={(e) => { updateEtatROLE(e) }} />
                    </div>

                    <div className="separator"></div>

                    <div className="roleElements" style={{ display: "flex", pointerEvents: (configuration?.welcomeRole?.active ? "auto" : "none") }}>
                        {moduleRole()}
                    </div>
                </div>

                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>{t("dashboard.welcome.category.renameOnJoin")}</h5>
                        <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.welcome?.guild?.defaultPseudo} onChange={(e) => { updateDefaultPseudo(null) }} />
                    </div>

                    <div className="separator"></div>
                    <Form.Control
                        style={{ "max-width": "530px" }}
                        placeholder={t("dashboard.welcome.guild.enterNickname")}
                        value={configuration?.welcome?.guild?.defaultPseudo || ""}
                        onChange={(event) => { updateDefaultPseudo(event.target.value) }}
                    />
                </div>
            </>
        }
    </>)
}


