
import { useState, useEffect, useRef } from "react"
import { Form } from 'react-bootstrap/'
import Avatar from "../../components/avatar/avatar";

import LoadingComponent from "../loading/LoadingComponent.jsx";


export const Welcome = (props) => {
    const [configuration, setConfiguration] = useState({})
    const [initialConfig, setInitialConfig] = useState({})
    const [embedNumber] = useState(0) //setEmbedNumber
    const [loading, setLoading] = useState(true)
    const [changeNotSave, setChangeNotSave] = useState(false);
    const [loadingChargement, setLoadingChargement] = useState(false);
    const [timer, setTimer] = useState(null);
    const [loadingError, setLoadingError] = useState(false);
    const [roles, setRoles] = useState([])

    const [channel, setChannel] = useState([])
    const canvasRef = useRef(null)
    const [roleXp, setRoleXp] = useState("0")


    const getConfiguration = async () => {
        let res = await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${props.guildId}/welcome`).then(res => res.json()) || {}

        await setChannel(res?.channels?.filter(channel => channel.type === 0) || [])
        await setRoles(res?.roles?.filter(role => !role.tags?.botId && role.name !== "@everyone") || [])
        await setInitialConfig(JSON.parse(JSON.stringify(res.config)));
        await setConfiguration(JSON.parse(JSON.stringify(res.config)))
    }

    const renderCanvas = (guild) => {
        if (canvasRef.current === null) return

        let canvas = canvasRef.current
        /**
         * @type {CanvasRenderingContext2D}
         */
        let ctx = canvas.getContext("2d");
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
        ctx.fillText("Carte de bienvenue désactivée", 600, 250); //450


    }

    const theme1 = (guild, canvas) => {
        if (canvasRef.current === null) return

        let ctx = canvas.getContext("2d");

        let colorText = guild?.colorText || "#FFFFF";
        let colorAmbient = guild?.colorAmbiance || '#fb0f32';

        let background = new Image();
        background.src = (guild.background || "https://media.discordapp.net/attachments/1014101467126304798/1055788116486660166/image.png")
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
            ctx.fillText("Welcome", 490, 120); //450

            ctx.font = "bold 70px Arial";
            // ctx.fillText("BadbounsTV#2000", 520, 270); //480

            const maxWidth = 630;
            let text = `${props?.user?.username}#${props?.user?.discriminator}`;
            let fontSize = 70;

            ctx.font = `bold ${fontSize}px Arial`;

            while (ctx.measureText(text).width > maxWidth) {
                fontSize--;
                ctx.font = `bold ${fontSize}px Arial`;
            }

            ctx.fillText(text, 520, 250);

            ctx.fillText("Sur le serveur", 540, 380); //500

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.moveTo(400, 0);
            ctx.lineTo(500, 500);
            ctx.lineTo(0, 500);
            ctx.lineTo(0, 0);
            ctx.closePath();

            ctx.clip();

            let avatar = new Image();
            avatar.src = (props?.user?.avatar ? `https://cdn.discordapp.com/avatars/${props?.user?.id}/${props?.user?.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`)
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
        background.src = (guild.background || "https://media.discordapp.net/attachments/1014101467126304798/1055788116486660166/image.png")
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
            let text = `Bienvenue ${props?.user?.username || "Wumpus"} sur le serveur !`
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
            let text2 = `Tu es le ${Math.floor(Math.random() * 1000)}ème membres, Assure toi de lire les règles !` || 'You’re 83848434 member, Make sure to read rules !';
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
            avatar.src = props?.user?.avatar ? `https://cdn.discordapp.com/avatars/${props?.user?.id}/${props?.user?.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`
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
        background.src = (guild.background || "https://media.discordapp.net/attachments/1014101467126304798/1055788116486660166/image.png")
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
            let text = 'BIENVENUE';
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
            let text2 = (props?.user?.username + "#" + props?.user?.discriminator || "Wumpus#1234");
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
            avatar.src = props?.user?.avatar ? `https://cdn.discordapp.com/avatars/${props?.user?.id}/${props?.user?.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`
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
        background.src = (guild.background || "https://media.discordapp.net/attachments/1014101467126304798/1055788116486660166/image.png")
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
            let text = `Welcome ${props?.user?.username}`;
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
            let text2 = `To ${props?.name}`;
            let fontSize2 = 85;

            ctx.font = `bold ${fontSize2}px Arial`;

            while (ctx.measureText(text2).width > maxWidth2) {
                fontSize2--;
                ctx.font = `${fontSize2}px Arial`;
            }

            ctx.fillText(text2, 850, 190);

            ctx.fillStyle = colorAmbient //darkenColor(colorAmbient, 20);

            const maxWidth3 = 500;
            let text3 = `Tu es le ${Math.floor(Math.random() * 1000) + 1}ème membre !`;
            let fontSize3 = 85;

            ctx.font = `bold ${fontSize3}px Arial`;

            while (ctx.measureText(text3).width > maxWidth3) {
                fontSize3--;
                ctx.font = `${fontSize3}px Arial`;
            }

            ctx.fillText(text3, 900, 320);

            const maxWidth4 = 500;
            let text4 = 'Assure toi de lire les règles !';
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
            avatar.src = props?.user?.avatar ? `https://cdn.discordapp.com/avatars/${props?.user?.id}/${props?.user?.avatar}.webp?size=1024` : `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`
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

    const updateConfig = async () => {
        setLoadingChargement(true)

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        let info = null

        try {
            info = await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${props.guildId}/welcome`, {
                method: "PUT",
                headers,
                body: JSON.stringify(configuration),
                redirect: 'follow'
            })
        } catch (error) {
            return console.log("Save Configuration Error", error)
        }

        if (info.status === 200) {
            setInitialConfig(JSON.parse(JSON.stringify(configuration)))
            setChangeNotSave(false)
            setLoadingChargement(false)
        }
        else {
            alert("Une erreur est survenue lors de la sauvegarde de la configuration")
            console.log("Update Welcome Error")
        }
    }

    const resetChange = () => {
        setConfiguration(JSON.parse(JSON.stringify(initialConfig)))
    }

    useEffect(() => {
        if (roleXp !== "0") {
            updateRoleConfig(roleXp)
        }
        setRoleXp("0")
    }, [roleXp])

    let updateRoleConfig = async (newRole) => {
        let config = { ...configuration }

        config.ROLE.roles = [...config.ROLE.roles, newRole]

        setConfiguration(config)
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                await getConfiguration()
            }
            catch (error) {
                console.log("Error", error)
                return setLoadingError(true)
            }

            setLoading(false)
        }
        fetchData();
    }, [props.guildId])

    useEffect(() => {
        if (!loading) {
            renderCanvas(configuration.GUILD)
        }
    }, [loading])

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

        if (configuration?.ROLE?.active !== initialConfig?.ROLE?.active) return setChangeNotSave(true)

        if (configuration?.ROLE?.roles?.length !== initialConfig?.ROLE?.roles?.length) return setChangeNotSave(true)

        console.log(configuration)

        for (let i = 0; i < configuration?.ROLE?.roles?.length; i++) {
            if (configuration?.ROLE?.roles[i] !== initialConfig?.ROLE?.roles[i]) return setChangeNotSave(true)
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

    const updateEtatROLE = (e) => {
        let config = { ...configuration }

        config.ROLE.active = e.target.checked

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

    const updateTheme = (value) => {
        let config = { ...configuration }

        config.GUILD.design = value

        setConfiguration(config)
    }

    let updateContent = (e) => {
        let config = { ...configuration }

        config.GUILD.content = e.target.value

        setConfiguration(config)
    }

    let updateDefaultPseudo = (e) => {
        let config = { ...configuration }

        config.GUILD.defaultPseudo = e.target.value

        setConfiguration(config)
    }

    let getChannelForSelector = (allChannel, selectedchannel) => {
        let option = [];

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
                theme = "⛔️ Ne pas envoyer de carte"
            }
            else {
                theme = `🃏 Theme ${i + 1}`
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

    let fixInitialRoleConfig = (roles) => {
        let newConfig = { ...initialConfig }

        newConfig.ROLE.roles = roles

        setInitialConfig(newConfig)
    }

    let fixRoleConfig = (roles) => {
        let newConfig = { ...configuration }

        newConfig.ROLE.roles = roles

        setConfiguration(newConfig)
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
        for (let role of configuration.ROLE.roles) {
            let roleElement = roles.find(r => r.id == role)

            console.log(roleElement)

            if (roleElement == undefined) {
                fixInitialRoleConfig(initialConfig.ROLE.roles.filter(r => r != role))
                fixRoleConfig(configuration.ROLE.roles.filter(r => r != role))
            }
            else {
                rolesModule.push(
                    <div className="roleRenderXP">
                        <span style={{ background: `${decimalToHex(roleElement?.color)}` }}></span>
                        <div>{roleElement?.name}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" onClick={() => {
                            let newRoles = configuration.ROLE.roles
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
                {getRolesForSelector(roles, roleXp, configuration.ROLE.roles)}
            </Form.Select>
        )

        return rolesModule
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

    return (<>
        {loading ? <LoadingComponent error={loadingError} errorMessage="Une erreur est survenue" /> :
            <>
                <div className="block padding-1">
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

                    <p className="categorie_config" >Salon pour les Messages de Bienvenue</p>

                    <Form.Select style={{ "max-width": "530px" }} defaultValue={configuration?.GUILD?.channel} disabled={!configuration?.GUILD?.active} onChange={(event) => { updateSelectMenu(event.target.value) }}>
                        {(() => {
                            return getChannelForSelector(channel, configuration?.GUILD?.channel);
                        })()}
                    </Form.Select>

                    <div className="separator" style={{ "marginTop": "15px" }} ></div>

                    <p className="categorie_config" >Message de bienvenue</p>

                    <Form.Control
                        style={{ "max-width": "530px" }}
                        as="textarea"
                        rows={3}
                        placeholder="Entrer le message de bienvenue"
                        disabled={!configuration?.GUILD?.active}
                        value={configuration?.GUILD?.content}
                        onChange={(event) => { updateContent(event) }}
                    />


                    <div className="separator" style={{ "marginTop": "15px" }} ></div>

                    <div className={"informationWelcomeCanvas" + (configuration?.GUILD?.active ? "" : " welcomeDisable")}>
                        <div className="WelcomeComponente" >
                            <canvas width="1200" height="500" ref={canvasRef} style={{ borderRadius: "10px" }} ></canvas>

                        </div>
                        <div className="configWelcomeCanvas">
                            {/* <div style={{ marginBottom: "10px" }}>
                                <span>Salon de messages de bienvenue:</span>
                            
                            </div>

                            <div className="separator"></div> */}

                            <div style={{ marginBottom: "10px" }}>
                                <p>Theme de la carte:</p>
                                <Form.Select defaultValue={configuration?.GUILD?.design} onChange={(event) => { updateTheme(event.target.value) }}>
                                    {(() => {
                                        return optionsTheme(configuration?.GUILD?.design);
                                    })()}
                                </Form.Select>
                            </div>

                            <div className="separator"></div>

                            <div >
                                <p>Couleur:</p>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div className="colorModule">
                                        <span>Ambiance</span>
                                        <input type="color" defaultValue={"#000000"} value={configuration?.GUILD?.colorAmbiance} onChange={(e) => { updateColorGuild({ colorAmbiance: e.target.value }) }} />
                                    </div>
                                    <div className="colorModule">
                                        <span>Texte</span>
                                        <input type="color" defaultValue={"#FFFFFF"} value={configuration?.GUILD?.colorText} onChange={(e) => { updateColorGuild({ colorText: e.target.value }) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>Donner un rôle aux nouveaux membres</h5>
                        <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.ROLE?.active} onChange={(e) => { updateEtatROLE(e) }} />
                    </div>

                    <div className="separator"></div>

                    <div className="roleElements" style={{ display: "flex" }}>
                        {moduleRole()}
                    </div>
                </div>

                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>Renommer les membres lorsqu'ils rejoignent le serveur</h5>
                        {/* <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration?.ROLE?.active} onChange={(e) => { updateEtatROLE(e) }} /> */}
                    </div>

                    <div className="separator"></div>
                    <Form.Control
                        style={{ "max-width": "530px" }}
                        placeholder="Entrer le pseudo"
                        value={configuration?.GUILD?.defaultPseudo}
                        onChange={(event) => { updateDefaultPseudo(event) }}
                    />

                </div>


            </>
        }

        <div id="card" className={"cardSave" + (changeNotSave ? " hidden" : "")} ><div className="saveConfig"><div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "0.3em" }}><Avatar classElement="logoChangement" width="30" height="28" /> Changements détectés ! Veuillez enregistrer ou annuler.</div><div className="buttonContainer"><button className="cancelButton" disabled={loadingChargement} type="button" onClick={resetChange}>Annuler</button><button className="saveButton" type="button" disabled={loadingChargement} onClick={updateConfig}>Enregistrer</button></div></div></div>
    </>)
}


