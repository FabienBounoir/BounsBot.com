import React, { Component } from 'react'

import { Form } from 'react-bootstrap/'
// import Slider from '@mui/material/Slider';
import Musique from "../../components/musique/musique.jsx";
import WelcomeMessage from "../../components/welcomeConfig/welcomeConfig.jsx";
import SendMessage from "../../components/sendmessage/sendmessage"
import Loading from "../../components/loading/loading.jsx";
import logo from "../../assets/picture/Bounsbot.svg";

import "./_guild.css";

// let url = "http://localhost:3001/"
let url = "https://backendbounsbot.herokuapp.com/"

// let urlBot = "http://localhost:3001/"
let urlBot = process.env.URL_BOT || "https://bouns-bot.herokuapp.com"

class Guild extends Component {
    state = {
        configuration: {
            heyreaction: false,
            musique: true,
            playlist: true,
            radio: true,
            rename: true,
            sheesh: false,
            logChannel: 0,
            idChannelTwitchTchat: 0,
            chaineTwitch: "",
            fun: true,
            logs: {
                message: "0",
                vocal: "0",
                user: "0",
                ban_unban: "0",
                join_leave: "0",
                guild: "0",
                roles: "0",
                channels: "0",
                invites: "0",
                emotes_stickers: "0"
            },
        },
        // success: false,
        error: false,
        guild: this.props.match.params.id,
        channelTextuelGuild: [],
        loadingChargement: false
    }
    
    realValue = {}
    loading = true

    componentDidMount() {
        this.initGuildInfo()
    }

    initGuildInfo = async () => {
        await this.getChannelGuild();
        await this.getData();
        this.loading = false
    }

    componentDidUpdate() {
        this.testIfDifference(this.state.configuration)
    }

    testIfDifference = async (stateTest) => {
        const cardSave = document.getElementById("card")

        for (let key in this.realValue) {
            if (stateTest[key] !== this.realValue[key] && key !== "logs") {
                return cardSave.classList.add("hidden")
            }
            else if (typeof stateTest[key] === "object") {
                for (let key2 in this.realValue[key]) {
                    if (stateTest[key][key2] !== this.realValue[key][key2]) {
                        return cardSave.classList.add("hidden")
                    }
                }
            }
        }

        cardSave.classList.remove("hidden")
    }

    getData = async () => {
        let id = this.props.match.params.id
        //let url = "https://backendbounsbot.herokuapp.com/guild/"

        //dev
        // let url = "http://localhost:3001/guild/"
        // let url = "https://backendbounsbot.herokuapp.com/guild/"

        fetch(url + "guild/" + id)
            .then(response => response.json())
            .then((result) => {
                if(result.guild.length !== 0)
                {
                    this.realValue = {
                        guild: result.guild[0]?.guild,
                        heyreaction: result.guild[0]?.heyreaction,
                        musique: result.guild[0]?.musique,
                        playlist: result.guild[0]?.playlist,
                        radio: result.guild[0]?.radio,
                        rename: result.guild[0]?.rename,
                        sheesh: result.guild[0]?.sheesh,
                        logChannel: result.guild[0]?.logChannel,
                        game: result.guild[0]?.game,
                        idChannelTwitchTchat: result.guild[0]?.idChannelTwitchTchat,
                        chaineTwitch: result.guild[0]?.chaineTwitch === "0" ? ("") : (result.guild[0]?.chaineTwitch),
                        fun: result.guild[0]?.fun,
                        logs: result.guild[0]?.logs ? result.guild[0]?.logs : this.state.configuration.logs
                    }

                    this.setState({
                        configuration: {
                            guild: result.guild[0]?.guild,
                            heyreaction: result.guild[0]?.heyreaction,
                            musique: result.guild[0]?.musique,
                            playlist: result.guild[0]?.playlist,
                            radio: result.guild[0]?.radio,
                            rename: result.guild[0]?.rename,
                            sheesh: result.guild[0]?.sheesh,
                            logChannel: result.guild[0]?.logChannel,
                            game: result.guild[0]?.game,
                            idChannelTwitchTchat: result.guild[0]?.idChannelTwitchTchat,
                            chaineTwitch: result.guild[0]?.chaineTwitch === "0" ? ("") : (result.guild[0]?.chaineTwitch),
                            fun: result.guild[0]?.fun,
                            logs: result.guild[0]?.logs ? result.guild[0]?.logs : this.state.configuration.logs
                        }
                    });
                }
            })
            .catch(console.log)
    };

    getChannelGuild = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        // let url = "http://localhost:3001"
        // let url = "https://bouns-bot.herokuapp.com"

        await fetch(urlBot + "/bot/getchannels/" + this.props.match.params.id,requestOptions)
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    channelTextuelGuild: result.channels.filter(channel => channel.type === 0)
                });
            })
            .catch(console.log)
    };

    resetUpdate = () => {
        this.setState({
            configuration: {
                guild: this.realValue.guild,
                heyreaction: this.realValue.heyreaction,
                musique: this.realValue.musique,
                playlist: this.realValue.playlist,
                radio: this.realValue.radio,
                rename: this.realValue.rename,
                sheesh: this.realValue.sheesh,
                logChannel: this.realValue.logChannel,
                game: this.realValue.game,
                idChannelTwitchTchat: this.realValue.idChannelTwitchTchat,
                chaineTwitch: this.realValue.chaineTwitch,
                fun: this.realValue.fun,
                logs: this.realValue.logs
            }
        });
    }

    updateGuildConfig = async () => {
        this.setState({loadingChargement: true})

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        var raw = await JSON.stringify({
            "guildId": this.state.configuration.guild,
            "logChannel": this.state.configuration.logChannel,
            "sheesh": this.state.configuration.sheesh,
            "heyreaction": this.state.configuration.heyreaction,
            "rename": this.state.configuration.rename,
            "musique": this.state.configuration.musique,
            "radio": this.state.configuration.radio,
            "playlist": this.state.configuration.playlist,
            "fun": this.state.configuration.fun,
            "idChannelTwitchTchat": this.state.configuration.idChannelTwitchTchat,
            "chaineTwitch": this.state.configuration.chaineTwitch === "" ? ("0") : (this.state.configuration.chaineTwitch),
            "logs": this.state.configuration.logs
        });

        const body = await fetch(url + 'guild/'+this.props.match.params.id, {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            mode: 'cors'
        }).catch(console.log)

        if(body && body.status === 200)
        {
            let cardSave = document.getElementById("card")
            this.setState({ loadingChargement: false })
            
            this.realValue = this.state.configuration
            cardSave.classList.add("animationRemove")

            setTimeout(() => {
                cardSave.classList.remove("hidden")
                cardSave.classList.remove("animationRemove")
            }, 700);
        }
        else
        {
            this.setState({ error: true })
            this.setState({loadingChargement: false})
        }
    }

    getChannelForSelector = (allChannel, selectedchannel) => {
        var option = [];

        if(selectedchannel === "0")
        {
            option.push(<option value="0" selected>❌ Désactivé</option>)
        }
        else
        {
            option.push(<option value="0">❌ Désactivé</option>)
        }
            
        for(let value of allChannel)
        {
            if(value.id === selectedchannel)
            {
                option.push(<option value={value.id} selected>{ value.name }</option>)
            }
            else
            {
                option.push(<option value={value.id}>{ value.name }</option>)
            }
        }

        return option;
    }

    render() {
        return (
            <div className="GuildInformation">
                <div className="top" style={{justifyContent: "center"}}>
                    <h1>Informations du serveur</h1> 
                </div>
                {/* <button className="save" onClick={this.updateGuildConfig}>Enregistrer</button> */}
                    <div className='componentGuild'>
                        <div className="guildModule">
                            <div className="top">
                            {/* <img className="picto" alt='logo' width="48" height="48" src={reactionPicto} ></img> */}
                            <svg className="pictoLog" width="45" height="45" viewBox="0 0 384 384" >
                            <path fillRule="evenodd" clipRule="evenodd" d="M191.996 2.69141C295.816 2.69141 379.976 86.8513 379.976 190.667C379.976 294.482 295.816 378.642 191.996 378.642C88.1806 378.642 4.021 294.482 4.021 190.667C4.021 86.8513 88.1806 2.69141 191.996 2.69141Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M196.217 272.51C110.936 274.869 82.197 203.44 97.3483 167.982C104.077 152.226 129.93 151.933 159.033 150.192C182.308 148.796 257.106 141.993 276.119 154.241C308.795 175.288 286.286 270.02 196.217 272.51Z" fill="#656565"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M193.586 273.404C174.516 274.191 138.206 267.499 159.063 244.6C165.931 237.053 176.578 231.11 190.91 230.52C204.749 229.947 215.68 234.586 223.702 240.631C252.985 262.706 213.195 272.595 193.586 273.404Z" fill="url(#paint0_linear_110_216)"/>
                            <path d="M196.357 277.151C176.119 277.709 158.911 274.243 144.593 268.128C125.998 260.185 112.271 247.765 103.094 233.852C93.8951 219.906 89.2696 204.415 88.8833 190.376C88.6413 181.53 90.0699 173.215 93.0809 166.156C100.47 148.868 124.551 147.495 152.629 145.899L158.772 145.546L168.102 144.927C198.232 142.856 260.423 138.584 278.646 150.325C286.194 155.187 291.177 163.261 293.494 173.089C296.193 184.527 295.258 198.473 290.502 212.358C285.789 226.118 277.31 239.906 264.886 251.204C248.776 265.848 226.054 276.327 196.357 277.151ZM148.237 259.571C161.406 265.197 177.311 268.38 196.101 267.863C223.304 267.109 244.011 257.603 258.622 244.322C269.818 234.14 277.455 221.735 281.689 209.371C285.882 197.137 286.742 185.011 284.425 175.201C282.657 167.691 279.022 161.632 273.625 158.156C257.989 148.082 197.855 152.209 168.721 154.21C165.216 154.452 162.155 154.662 159.321 154.834L153.141 155.187C128.172 156.607 106.757 157.826 101.638 169.799C99.1439 175.644 97.9618 182.624 98.1714 190.12C98.511 202.544 102.639 216.304 110.852 228.756C119.088 241.241 131.447 252.4 148.237 259.571Z" fill="black"/>
                            <path d="M92.0236 56.9297C96.4067 42.5325 102.14 34.5939 116.309 31.6344C131.954 28.3631 147.063 37.2836 150.041 51.5412C153.382 67.5068 146.626 86.1993 134.28 104.827C115.741 132.797 104.369 139.512 73.0568 118.135C54.3643 105.371 40.0785 91.3597 36.7095 75.2313C33.7267 60.9738 44.0012 46.7484 59.6413 43.4771C73.8104 40.5176 82.2422 45.492 92.0236 56.9297ZM290.376 54.7705C300.92 44.0308 309.673 39.6474 323.605 43.5748C338.989 47.9117 348.258 62.8068 344.308 76.8228C339.882 92.5279 325.248 105.976 305.69 116.781C276.318 133.007 263.126 133.7 245.253 100.266C234.582 80.3033 228.394 61.2759 232.866 45.4175C236.816 31.3971 252.502 23.533 267.882 27.8652C281.813 31.7973 286.993 40.1081 290.376 54.7705Z" fill="url(#paint1_linear_110_216)"/>
                            <defs>
                            <linearGradient id="paint0_linear_110_216" x1="193.478" y1="232.935" x2="199.36" y2="318.797" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white"/>
                            <stop offset="1" stop-color="#65221D"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_110_216" x1="93.6567" y1="132.039" x2="101.67" y2="35.7759" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white"/>
                            <stop offset="1" stop-color="white"/>
                            </linearGradient>
                            </defs>
                            </svg>



                            <Form.Check className="picto" type="switch" id="custom-switch success" onChange={() => { this.setState({ configuration: {...this.state.configuration,heyreaction: !this.state.configuration.heyreaction } }) }} checked={this.state.configuration.heyreaction} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Réactions</h5>
                            <div>Laissez le bot réagir avec 👋 / 💤 suivant le message</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <svg className="pictoLog" width="45" height="45" viewBox="0 0 514 514" >
                                    <path d="M331.895 421.526V237.344L440.37 219.756C423.093 128.184 342.73 58.9062 246.136 58.9062C136.935 58.9062 48.415 147.426 48.415 256.627C48.415 365.829 136.935 454.349 246.136 454.349C256.728 454.349 267.114 453.492 277.251 451.89C285.189 438.714 299.428 428.14 317.509 423.619C322.285 422.437 327.108 421.727 331.895 421.526ZM282.463 75.0432L261.279 167.854H240.094L224.962 75.0432C247.159 63.9422 282.463 75.0432 282.463 75.0432ZM246.136 330.033C205.594 330.033 172.73 297.169 172.73 256.627C172.73 216.085 205.594 183.222 246.136 183.222C286.678 183.222 319.542 216.086 319.542 256.627C319.542 297.169 286.678 330.033 246.136 330.033ZM246.136 200.658C215.267 200.658 190.167 225.758 190.167 256.627C190.167 287.493 215.267 312.597 246.136 312.597C277.003 312.597 302.105 287.493 302.105 256.627C302.105 225.758 277.002 200.658 246.136 200.658ZM246.136 296.607C224.092 296.607 206.159 278.674 206.159 256.627C206.159 234.583 224.098 216.65 246.136 216.65C268.183 216.65 286.104 234.583 286.104 256.627C286.104 278.675 268.183 296.607 246.136 296.607ZM271.458 486.001C272.416 491.309 274.52 496.25 277.558 500.689C267.262 502.007 256.788 502.764 246.143 502.764C110.419 502.764 0 392.345 0 256.627C0 120.91 110.419 10.4912 246.136 10.4912C366.609 10.4912 467.081 97.5272 488.146 212.007L464.25 215.887C445.057 112.913 354.586 34.7022 246.136 34.7022C123.765 34.7022 24.211 134.257 24.211 256.627C24.211 378.998 123.766 478.553 246.136 478.553C254.331 478.553 262.415 478.074 270.382 477.205C270.453 480.125 270.772 483.062 271.458 486.001ZM513.255 225.279V438.684C513.255 456.358 500.08 470.455 479.528 475.644C456.966 481.236 435.185 471.79 430.858 454.496C426.532 437.172 441.308 418.594 463.864 412.949C474.06 410.431 484.091 410.945 492.49 413.901V285.336L377.119 306.42L376.587 466.364H376.564C376.463 481.514 362.803 496.38 343.156 501.244C320.873 506.853 297.513 496.243 295.008 480.367C290.723 463.238 305.328 444.849 327.671 439.252C337.725 436.752 347.549 437.255 355.806 440.145V250.817L513.255 225.279Z" />
                                </svg>

                            <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ configuration: {...this.state.configuration,musique: !this.state.configuration.musique } }) }} checked={this.state.configuration.musique} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Musique</h5>
                            <div>Laissez vos membres écouter leurs meilleures musiques</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <svg className="pictoLog" width="45" height="45" viewBox="0 0 512 512" >
                                <path d="M48 64H208C225.672 64 240 49.672 240 32C240 14.326 225.672 0 208 0H48C30.328 0 16 14.326 16 32C16 49.672 30.328 64 48 64Z" />
                                <path d="M48 160H208C225.672 160 240 145.672 240 128C240 110.326 225.672 96 208 96H48C30.328 96 16 110.326 16 128C16 145.672 30.328 160 48 160Z" />
                                <path d="M240 224C240 206.326 225.672 192 208 192H48C30.328 192 16 206.326 16 224C16 241.672 30.328 256 48 256H208C225.672 256 240 241.672 240 224Z" />
                                <path d="M411.328 75.914C393.043 61.805 368 42.477 368 32C368 14.328 353.672 0 336 0C318.328 0 304 14.328 304 32V325.58C293.977 322.031 283.238 320 272 320C218.98 320 176 362.98 176 416C176 469.02 218.98 512 272 512C325.02 512 368 469.02 368 416V123.293C369.414 124.387 370.82 125.496 372.23 126.586C408.335 154.438 432 174.664 432 200.891C432 241.657 410.316 264.407 409.695 265.055C397.023 277.375 396.734 297.633 409.054 310.305C415.327 316.758 423.659 320 432.003 320C440.038 320 448.085 316.992 454.304 310.945C458.574 306.797 495.999 268.461 495.999 200.89C496 141.25 449.051 105.023 411.328 75.914Z" />
                                </svg>

                            <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ configuration: {...this.state.configuration,playlist: !this.state.configuration.playlist } }) }} checked={this.state.configuration.playlist} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Playlist</h5>
                            <div>Laissez vos membres réaliser / modifier / écouter leurs playlists</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <svg className="pictoLog" width="45" height="45" viewBox="0 0 60 60">
                                <path d="M31.938 36.8369C31.938 42.8609 27.038 47.7609 21.013 47.7609C14.988 47.7609 10.088 42.8609 10.088 36.8369C10.088 30.8129 14.988 25.9119 21.013 25.9119C27.038 25.9119 31.938 30.8129 31.938 36.8369ZM59.5 21.8339V51.8389C59.5 55.8429 56.254 59.0889 52.25 59.0889H7.25C3.246 59.0889 0 55.8429 0 51.8389V21.8339C0 17.8299 3.246 14.5839 7.25 14.5839H42.873L6.186 3.34589C5.394 3.10289 4.948 2.26389 5.19 1.47189C5.434 0.679885 6.271 0.233885 7.064 0.477885L53.48 14.6959C56.897 15.2819 59.5 18.2509 59.5 21.8339ZM34.938 36.8369C34.938 29.1589 28.691 22.9119 21.013 22.9119C13.335 22.9119 7.089 29.1579 7.089 36.8369C7.089 44.5149 13.336 50.7609 21.014 50.7609C28.692 50.7609 34.938 44.5139 34.938 36.8369ZM50.625 37.6849C50.625 36.8559 49.953 36.1849 49.125 36.1849C48.297 36.1849 47.625 36.8559 47.625 37.6849V49.2609C47.625 50.0899 48.297 50.7609 49.125 50.7609C49.953 50.7609 50.625 50.0899 50.625 49.2609V37.6849ZM52.352 27.5499C52.352 25.7679 50.907 24.3229 49.125 24.3229C47.343 24.3229 45.898 25.7679 45.898 27.5499C45.898 29.3319 47.343 30.7769 49.125 30.7769C50.907 30.7769 52.352 29.3319 52.352 27.5499Z" />
                                </svg>

                            <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ configuration: {...this.state.configuration,radio: !this.state.configuration.radio } }) }} checked={this.state.configuration.radio} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Radio</h5>
                            <div>Laissez vos membres écouter une des 41 radios disponibles sur le Bot</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <svg className="pictoLog" width="45" height="45" viewBox="0 0 24 24">
                                <path d="M20.0049 5.99512H19.0049V7.99512H20.0049V15.9951H19.0049V17.9951H20.0049C21.1079 17.9951 22.0049 17.0981 22.0049 15.9951V7.99512C22.0049 6.89312 21.1069 5.99512 20.0049 5.99512V5.99512ZM6.00488 9.99512H14.9999V13.9951H6.00488V9.99512Z" />
                                <path d="M17.0049 17.995V4H19.9999V2H11.9999V4H15.0049V5.995H4.00488C2.90188 5.995 2.00488 6.892 2.00488 7.995V15.995C2.00488 17.098 2.90188 17.995 4.00488 17.995H15.0049V20H11.9999V22H19.9999V20H17.0049V17.995ZM4.00488 15.995V7.995H15.0049V15.995H4.00488Z"/>
                                </svg>

                            <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ configuration: {...this.state.configuration,rename: !this.state.configuration.rename } }) }} checked={this.state.configuration.rename} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Rename</h5>
                            <div>Laissez le bot rename les membres lorsque leurs pseudos ne sont pas identifiables par la modération</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <svg  className="pictoLog" width="55" height="55" viewBox="0 0 400 400" >
                                <path d="M64.8851 93.8035L59.9606 121.467C55.0858 115.891 49.7633 113.104 43.9932 113.104C38.223 113.104 33.5472 115.355 29.9657 119.859C26.4837 124.362 24.7427 131.439 24.7427 141.089C24.7427 152.883 29.3191 166.286 38.4717 181.297C42.2522 187.516 46.0326 193.95 49.8131 200.598C53.5935 207.031 56.8268 214.537 59.5129 223.114C62.199 231.478 63.5421 239.412 63.5421 246.918C63.5421 254.423 62.9451 261.286 61.7513 267.505C60.657 273.509 58.7667 279.728 56.0806 286.161C53.3945 292.595 49.2161 297.849 43.5455 301.923C37.8748 305.998 31.5077 308.035 24.4443 308.035C17.3808 308.035 11.1132 306.212 5.64151 302.567C4.54717 298.921 4 295.704 4 292.917C4 290.129 4.04974 288.735 4.14923 288.735C4.3482 288.735 5.09434 289.164 6.38765 290.022C10.4666 292.38 14.5455 293.56 18.6244 293.56C26.9811 293.56 33.7462 289.914 38.9194 282.623C44.1921 275.332 46.8285 266.004 46.8285 254.638C46.8285 241.771 42.5506 227.939 33.9949 213.143C30.4134 206.924 26.8319 200.705 23.2504 194.486C14.6947 179.689 10.4168 165.214 10.4168 151.061C10.4168 142.054 12.1578 133.262 15.6398 124.684C23.3002 105.598 38.8697 92.5168 62.3482 85.4401L64.8851 93.8035Z" />
                                <path d="M122.111 305.14C123.503 276.19 124.2 253.244 124.2 236.303C124.2 202.635 121.265 185.801 115.395 185.801C111.018 185.801 106.442 193.628 101.666 209.283C96.9905 224.937 93.1106 247.025 90.0266 275.546H89.8773C89.3799 280.908 88.4348 290.236 87.042 303.532C86.4451 305.033 85.4502 306.319 84.0574 307.392C82.7641 308.464 81.6698 309 80.7744 309C79.9785 309 79.5806 308.464 79.5806 307.392C84.0574 262.572 86.2959 219.79 86.2959 179.046C86.2959 138.087 84.3559 103.454 80.476 75.1467L84.2067 70L96.1449 82.2234C97.1398 96.5913 97.6372 113.747 97.6372 133.69C97.6372 153.419 96.8413 176.794 95.2495 203.814C99.4279 186.659 104.004 172.934 108.979 162.641C114.052 152.347 118.828 147.201 123.304 147.201C131.263 147.201 135.243 159.317 135.243 183.549C135.243 203.493 134.397 226.653 132.706 253.03C131.015 279.192 130.02 295.383 129.721 301.602C128.328 304.604 126.14 306.105 123.155 306.105C122.459 306.105 122.111 305.783 122.111 305.14Z" />
                                <path d="M200.029 180.654C198.934 190.519 196.746 199.418 193.463 207.353C190.18 215.287 186.449 221.613 182.271 226.331C174.61 234.909 167.895 240.377 162.125 242.736C162.523 253.458 163.816 261.393 166.005 266.54C168.193 271.686 170.83 274.26 173.914 274.26C182.669 274.26 190.578 258.391 197.641 226.653C197.741 225.366 198.238 224.723 199.133 224.723C200.029 224.723 201.372 226.224 203.163 229.226C198.885 251.528 193.612 269.971 187.344 284.553C181.176 298.921 175.008 306.105 168.84 306.105C162.672 306.105 157.847 301.28 154.365 291.63C150.982 281.98 149.291 269.006 149.291 252.708C149.291 230.191 152.126 209.39 157.797 190.304C160.881 180.011 165.209 171.004 170.78 163.284C176.451 155.349 183.166 149.452 190.926 145.592C196.994 150.096 200.029 161.783 200.029 180.654ZM182.569 171.004C178.391 171.004 174.063 176.258 169.586 186.766C165.109 197.059 162.622 211.427 162.125 229.869C170.382 225.152 176.699 218.289 181.077 209.283C185.554 200.061 187.792 191.055 187.792 182.262C187.792 179.046 187.344 176.365 186.449 174.221C185.554 172.076 184.26 171.004 182.569 171.004Z" />
                                <path d="M263.567 180.654C262.473 190.519 260.284 199.418 257.001 207.353C253.718 215.287 249.988 221.613 245.809 226.331C238.149 234.909 231.433 240.377 225.663 242.736C226.061 253.458 227.355 261.393 229.543 266.54C231.732 271.686 234.368 274.26 237.452 274.26C246.207 274.26 254.116 258.391 261.18 226.653C261.279 225.366 261.777 224.723 262.672 224.723C263.567 224.723 264.91 226.224 266.701 229.226C262.423 251.528 257.15 269.971 250.883 284.553C244.715 298.921 238.547 306.105 232.379 306.105C226.211 306.105 221.385 301.28 217.903 291.63C214.521 281.98 212.83 269.006 212.83 252.708C212.83 230.191 215.665 209.39 221.336 190.304C224.42 180.011 228.747 171.004 234.319 163.284C239.989 155.349 246.705 149.452 254.464 145.592C260.533 150.096 263.567 161.783 263.567 180.654ZM246.108 171.004C241.929 171.004 237.602 176.258 233.125 186.766C228.648 197.059 226.161 211.427 225.663 229.869C233.921 225.152 240.238 218.289 244.615 209.283C249.092 200.061 251.331 191.055 251.331 182.262C251.331 179.046 250.883 176.365 249.988 174.221C249.092 172.076 247.799 171.004 246.108 171.004Z" />
                                <path d="M321.734 147.201L316.958 175.829C312.382 169.396 307.855 166.179 303.379 166.179C296.017 166.179 292.336 172.291 292.336 184.514C292.336 192.878 295.42 202.635 301.588 213.786C304.274 218.504 306.91 223.436 309.497 228.583C315.665 240.806 318.749 253.137 318.749 265.575C318.749 275.225 317.058 284.446 313.675 293.238C311.785 297.956 308.701 301.709 304.423 304.497C300.245 307.499 295.42 309 289.948 309C284.476 309 279.552 307.499 275.174 304.497C274.677 303.639 274.08 301.709 273.384 298.707C272.787 295.49 272.488 293.238 272.488 291.952C272.488 290.665 272.588 290.022 272.787 290.022C273.085 290.022 273.831 290.343 275.025 290.987C278.01 292.702 281.79 293.56 286.367 293.56C290.943 293.56 294.773 291.415 297.857 287.127C301.041 282.838 302.632 277.369 302.632 270.721C302.632 264.074 301.339 257.533 298.752 251.1C296.265 244.666 293.48 238.876 290.396 233.729C287.411 228.583 284.626 222.257 282.039 214.751C279.552 207.031 278.308 199.311 278.308 191.591C278.308 184.729 279.353 178.617 281.442 173.256C283.631 167.68 286.118 163.07 288.903 159.424C295.668 150.846 305.518 144.734 318.451 141.089L321.734 147.201Z" />
                                <path d="M377.868 305.14C379.261 276.19 379.957 253.244 379.957 236.303C379.957 202.635 377.022 185.801 371.153 185.801C366.775 185.801 362.199 193.628 357.424 209.283C352.748 224.937 348.868 247.025 345.784 275.546H345.635C345.137 280.908 344.192 290.236 342.799 303.532C342.202 305.033 341.208 306.319 339.815 307.392C338.521 308.464 337.427 309 336.532 309C335.736 309 335.338 308.464 335.338 307.392C339.815 262.572 342.053 219.79 342.053 179.046C342.053 138.087 340.113 103.454 336.233 75.1467L339.964 70L351.902 82.2234C352.897 96.5913 353.395 113.747 353.395 133.69C353.395 153.419 352.599 176.794 351.007 203.814C355.185 186.659 359.762 172.934 364.736 162.641C369.81 152.347 374.585 147.201 379.062 147.201C387.021 147.201 391 159.317 391 183.549C391 203.493 390.154 226.653 388.463 253.03C386.772 279.192 385.777 295.383 385.479 301.602C384.086 304.604 381.897 306.105 378.913 306.105C378.216 306.105 377.868 305.783 377.868 305.14Z" />
                                </svg>

                            <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ configuration: {...this.state.configuration,sheesh: !this.state.configuration.sheesh } }) }} checked={this.state.configuration.sheesh} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Sheesh</h5>
                            <div>Laissez le bot réagir avec son meilleur "SHEEEESHHHH" si un membre dit "sheesh"</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <svg className="pictoLog" width="45" height="45" viewBox="0 0 490 490">
                                <path d="M69.086 490H420.915C459.001 490 490 459.001 490 420.914V69.086C490 30.991 459.001 0 420.914 0H69.086C30.999 0 0 30.991 0 69.086V420.915C0 459.001 30.999 490 69.086 490ZM332.349 132.647C355.9 132.647 374.991 151.738 374.991 175.288C374.991 198.839 355.9 217.93 332.349 217.93C308.799 217.93 289.708 198.839 289.708 175.288C289.708 151.738 308.799 132.647 332.349 132.647ZM352.292 300.927L370.595 325.481C328.919 356.57 287.109 366.933 249.904 366.933C176.018 366.933 120.211 326.08 119.374 325.467L137.707 300.928C142.104 304.186 246.436 379.882 352.292 300.927ZM157.651 132.647C181.201 132.647 200.292 151.738 200.292 175.288C200.292 198.839 181.201 217.93 157.651 217.93C134.1 217.93 115.009 198.839 115.009 175.288C115.009 151.738 134.1 132.647 157.651 132.647Z" />
                                </svg>
                            <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ configuration: {...this.state.configuration,fun: !this.state.configuration.fun } }) }} checked={this.state.configuration.fun} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Fun</h5>
                            <div>Laissez vos membres s'amuser avec des commandes funs et ludiques</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <svg className="pictoLog" width="48" height="48" viewBox="0 0 577 577" >
                                    <path d="M464.695 0H112.161C97.8711 0 86.2671 11.595 86.2671 25.896V550.963C86.2671 565.264 97.8721 576.859 112.161 576.859H370.678C436.907 576.859 490.593 523.171 490.593 456.953V25.896C490.593 11.595 478.987 0 464.695 0ZM135.085 80.745C135.085 69.001 144.608 59.49 156.344 59.49H420.512C432.248 59.49 441.769 69.001 441.769 80.745V230.126C441.769 241.871 432.248 251.381 420.512 251.381H156.345C144.609 251.381 135.086 241.871 135.086 230.126V80.745H135.085ZM264.431 430.222C264.431 434.879 260.655 438.655 256 438.655H224.77V469.883C224.77 474.541 220.996 478.316 216.338 478.316H175.518C170.861 478.316 167.085 474.542 167.085 469.883V438.655H135.861C131.203 438.655 127.427 434.879 127.427 430.222V389.4C127.427 384.743 131.203 380.967 135.861 380.967H167.087V349.738C167.087 345.081 170.863 341.306 175.52 341.306H216.343C221 341.306 224.774 345.079 224.774 349.738V380.967H256.004C260.659 380.967 264.435 384.741 264.435 389.4V430.221H264.431V430.222ZM353.756 490.33C336.499 490.33 322.511 476.342 322.511 459.084C322.511 441.827 336.499 427.837 353.756 427.837C371.014 427.837 385.002 441.825 385.002 459.084C385.004 476.342 371.014 490.33 353.756 490.33ZM411.442 394.188C394.184 394.188 380.198 380.201 380.198 362.942C380.198 345.684 394.184 331.695 411.442 331.695C428.701 331.695 442.689 345.682 442.689 362.942C442.689 380.2 428.701 394.188 411.442 394.188Z" />
                                </svg>

                            <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ configuration: {...this.state.configuration,game: !this.state.configuration.game } }) }} checked={this.state.configuration.game} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Game</h5>
                            <div>Plusieurs jeux sont disponibles pour vous amuser</div>
                    </div>
                    
                    <div className="guildModule">
                        <div className="top">
                            {/* <img className="pictoLog" alt='logo' width="48" height="48" src={twitch} ></img> */}
                            <svg className="pictoLog" width="50" height="50" viewBox="0 0 256 268">
                                <path d="M17.4579 0L0 46.5559V232.757H63.9826V267.691H98.9145L133.812 232.757H186.172L256 162.954V0H17.4579ZM40.7167 23.2632H232.731V151.292L191.992 192.033H128L93.1127 226.919V192.033H40.7167V23.2632ZM104.725 139.668H128V69.8439H104.725V139.668ZM168.722 139.668H191.992V69.8439H168.722V139.668Z" />
                            </svg>


                            {/* <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ logChannel: !this.state.logChannel }) }} checked={this.state.fun} /> */}
                            <div><Form.Control type="text" placeholder="Chaine" value={this.state.configuration.chaineTwitch} onChange={(event) => { this.setState({ configuration: {...this.state.configuration,chaineTwitch: event.target.value } }) }}/>
                                <Form.Select defaultValue={this.state.configuration.idChannelTwitchTchat} onChange={(event) => { this.setState({ configuration: {...this.state.configuration,idChannelTwitchTchat: event.target.value } }) }}>
                                    {(() => {
                                        console.log(this.state.configuration.idChannelTwitchTchat)
                                    return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.idChannelTwitchTchat);
                                })()}
                            </Form.Select></div>
                        </div>
                        <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Twitch</h5>
                        <div>Choisir la chaine Twitch et le channel pour afficher le tchat (Mise en place 1 fois par jour)</div>
                    </div>
                    </div>

                <h3 class="logstitle">Logs</h3>
                <div className='componentGuild'>
                        <div className="guildModule">
                            <div className="top">
                                <svg className="pictoLog" width="70" height="70" viewBox="0 0 1024 1024"> 
                                    <path d="M924.3 338.4a447.57 447.57 0 0 0-96.1-143.3 443.09 443.09 0 0 0-143-96.3A443.91 443.91 0 0 0 512 64h-2c-60.5.3-119 12.3-174.1 35.9a444.08 444.08 0 0 0-141.7 96.5 445 445 0 0 0-95 142.8A449.89 449.89 0 0 0 65 514.1c.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8a447.72 447.72 0 0 0 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3A443.2 443.2 0 0 0 827 830.5c41.2-40.9 73.6-88.7 96.3-142 23.5-55.2 35.5-113.9 35.8-174.5.2-60.9-11.6-120-34.8-175.6zM312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.4 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48z"/>
                                </svg>
                            <Form.Select defaultValue={this.state.configuration.logs.message} onChange={(event) => { this.setState({ configuration: {...this.state.configuration, logs: {...this.state.configuration.logs, message: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.message);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Messages</h5>
                            <div>Pouvoir modérer les différents messages sur le serveur</div>
                        </div>

                        <div className="guildModule">
                            <div className="top">
                            <svg className="pictoLog" width="54" height="54" viewBox="0 0 16 16">
                                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            <Form.Select defaultValue={this.state.configuration.logs.vocal} onChange={(event) => { this.setState({ configuration: {...this.state.configuration, logs: { ...this.state.configuration.logs,vocal: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.vocal);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Vocaux</h5>
                            <div>Pouvoir modérer les différents vocaux sur le serveur</div>
                        </div>
                    
                        <div className="guildModule">
                            <div className="top">
                            <svg  className="pictoLog" width="65" height="65"  viewBox="0 0 50 50" >
                                <path d="M16.1899 15.0818C16.1899 10.2169 20.133 6.271 24.9993 6.271C29.8683 6.271 33.8086 10.2169 33.8086 15.0818C33.8086 19.9494 29.8683 23.8925 24.9993 23.8925C20.133 23.8925 16.1899 19.9508 16.1899 15.0818ZM49.9607 31.6667L48.7295 24.2847C48.5081 22.9484 47.3833 21.8278 46.0736 21.5056C44.9026 22.5422 43.3674 23.1739 41.6809 23.1739C39.9958 23.1739 38.4591 22.5408 37.2895 21.5056C35.9756 21.8264 34.8536 22.9484 34.6323 24.2847L34.6028 24.4584C33.8716 23.7538 32.964 23.2244 31.9862 22.9848C30.1232 24.6321 27.6831 25.6407 25.0007 25.6407C22.3182 25.6407 19.8781 24.6321 18.0151 22.9848C17.0374 23.2244 16.1297 23.7538 15.3985 24.4584L15.3691 24.2847C15.1477 22.9484 14.0215 21.8278 12.7118 21.5056C11.5422 22.5422 10.0056 23.1739 8.32045 23.1739C6.63393 23.1739 5.09871 22.5408 3.92767 21.5056C2.61656 21.8264 1.49316 22.9484 1.27184 24.2847L0.0405737 31.6667C-0.224169 33.251 0.875425 34.5481 2.47929 34.5481H12.5956L11.8279 39.1468C11.4077 41.6667 13.1559 43.7286 15.7094 43.7286H34.2905C36.844 43.7286 38.5922 41.6625 38.172 39.1468L37.4044 34.5481H47.5206C49.1259 34.5453 50.2241 33.251 49.9607 31.6667ZM41.6795 22.0785C44.7387 22.0785 47.2181 19.5992 47.2181 16.5399C47.2181 13.4821 44.7373 11.0014 41.6795 11.0014C38.6216 11.0014 36.1423 13.4821 36.1423 16.5399C36.1423 19.5992 38.6244 22.0785 41.6795 22.0785ZM8.31764 22.0785C11.3755 22.0785 13.8548 19.5992 13.8548 16.5399C13.8548 13.4821 11.3741 11.0014 8.31764 11.0014C5.25839 11.0014 2.77905 13.4821 2.77905 16.5399C2.77905 19.5992 5.25979 22.0785 8.31764 22.0785Z"/>
                            </svg>

                            <Form.Select defaultValue={this.state.configuration.logs.user} onChange={(event) => { this.setState({ configuration: {...this.state.configuration,logs: { ...this.state.configuration.logs,user: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.user);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Users</h5>
                            <div>Voir en temps réel les changements effectués sur un utilisateur</div>
                        </div>

                        <div className="guildModule">
                            <div className="top">
                                <svg className="pictoLog" width="55" height="55"  viewBox="0 0 297 297">
                                <path d="M43.5041 293.985L183.892 153.597C186.225 151.264 186.224 147.446 183.889 145.115L153.775 115.04C151.44 112.708 147.62 112.709 145.287 115.043L4.92406 255.406C2.99406 257.337 1.90906 259.955 1.90906 262.685C1.90906 265.415 2.99406 268.034 4.92406 269.964L28.9451 293.984C30.9561 295.994 33.5891 296.999 36.2241 296.999C38.8591 297 41.4931 295.995 43.5041 293.985Z"/>
                                <path d="M210.546 150.962C216.944 157.36 225.475 160.883 234.567 160.883C243.659 160.883 252.191 157.359 258.588 150.962L285.157 124.394C298.402 111.148 298.402 89.597 285.157 76.351L223.831 15.024C222.701 13.894 221.323 13.043 219.807 12.537L183.775 0.526989C180.079 -0.703011 175.999 0.257989 173.241 3.01399L137.21 39.046C134.453 41.804 133.49 45.882 134.724 49.58L146.735 85.612C147.24 87.128 148.091 88.506 149.221 89.636L210.546 150.962Z"/>
                                </svg>


                            <Form.Select defaultValue={this.state.configuration.logs.ban_unban} onChange={(event) => { this.setState({ configuration: {...this.state.configuration,logs: { ...this.state.configuration.logs,ban_unban: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.ban_unban);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Ban / Unban</h5>
                            <div>Voir en temps réel les differents ban / unban sur le serveur</div>
                        </div>
                    
                        <div className="guildModule">
                            <div className="top">
                                <svg className="pictoLog" width="55" height="55"  viewBox="0 0 512 512" >
                                <path d="M501.084 295.982H483.622C483.622 287.584 483.622 282.068 483.622 273.856C483.622 268.286 479.107 263.77 473.536 263.77H467.572C468.281 255.053 462.658 246.832 453.9 244.581C446.94 242.792 403.049 231.511 396.28 229.771L414.841 181.16C420.215 167.084 413.168 151.308 399.08 145.929L356.59 129.489C348.447 126.338 339.699 125.533 331.111 127.109C297.395 133.294 241.982 143.461 235.58 144.631C231.347 145.405 227.524 147.645 224.778 150.958L187.059 196.481V59.3691C187.059 54.0111 183.524 49.2971 178.381 47.7961L97.2411 24.1161H307.618V113.141L331.73 109.991V12.0601C331.73 5.4021 326.332 0.00409956 319.674 0.00409956C317.965 0.00409956 12.8421 -0.0229004 11.9101 0.0540996C5.52609 0.5801 0.841094 5.9461 0.841094 12.0601C0.841094 15.0181 0.784094 452.85 0.945094 454.135C1.55809 459.007 5.04009 462.89 9.52009 464.199L171.627 511.508C179.35 513.765 187.06 507.947 187.06 499.935V250.25C189.854 249.157 192.427 247.386 194.476 244.911L248.719 179.444C255.322 178.237 301.738 169.747 309.198 168.383L268.434 275.145C268.434 275.145 269.887 271.473 242.722 364.463L211.108 424.556V481.49H211.109C220.414 483.76 230.379 479.513 235.017 470.695L281.455 382.422C282.118 381.163 282.652 379.84 283.052 378.474L308.741 290.536C310.609 291.249 309.689 290.898 314.53 292.746C320.999 302.906 352.84 352.914 359.281 363.032L327.112 453.636C323.172 464.732 328.973 476.922 340.07 480.862C351.106 484.781 363.349 479.021 367.296 467.904L402.947 367.493C405.09 361.455 404.45 354.576 400.84 348.908L369.554 299.771C374.113 287.83 378.557 276.191 383.138 264.193C400.509 268.658 411.945 271.598 411.945 271.598L411.682 295.984H394.22C391.951 295.984 389.865 296.743 388.181 298.006L414.894 339.961C421.221 349.898 422.589 361.965 418.648 373.067L414.211 385.565H501.086C506.655 385.565 511.169 381.05 511.169 375.482V306.068C511.169 300.497 506.654 295.982 501.084 295.982ZM152.698 316.97C152.698 323.628 147.3 329.026 140.642 329.026C133.984 329.026 128.586 323.628 128.586 316.97V247.374C128.586 240.716 133.984 235.318 140.642 235.318C147.3 235.318 152.698 240.716 152.698 247.374V316.97ZM463.453 295.982H463.452H431.853V283.941H463.453V295.982V295.982Z" />
                                <path d="M315.805 325.767L307.617 353.795V440.572H269.688L257.003 464.685H309.408C308.829 459.133 309.489 453.478 311.413 448.061L331.731 390.839V350.779L315.805 325.767Z" />
                                <path d="M416.914 50.6339C396.069 42.6749 372.719 53.1209 364.76 73.9659C356.731 94.9909 367.461 118.243 388.092 126.12C408.748 134.008 432.228 123.788 440.246 102.788C448.204 81.9429 437.759 58.5929 416.914 50.6339Z" />
                                </svg>

                            <Form.Select defaultValue={this.state.configuration.logs.join_leave} onChange={(event) => { this.setState({ configuration: {...this.state.configuration,logs: { ...this.state.configuration.logs,join_leave: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.join_leave);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Join / Leave</h5>
                            <div>Voir les arrivés & départs des différents utilisateurs</div>
                        </div>
                    
                        <div className="guildModule">
                            <div className="top">
                            <svg className="pictoLog" width="54" height="54" viewBox="0 0 188 160" >
                            <path d="M160.38 41.42L155.239 24.2133C139.836 35.1473 110.314 34.7253 93.6253 16.0991C76.9366 34.7253 47.4148 35.1665 32.0113 24.2133L26.8704 41.42C26.8704 41.42 30.4767 43.1656 32.7786 49.0162H31.6084C31.7235 67.5465 33.9103 95.0925 44.288 114.332C55.5481 135.145 79.5454 153.139 91.1316 158.318V159.757C91.7262 159.661 92.4743 159.45 93.28 159.162C94.0857 159.45 94.8338 159.661 95.4284 159.757V158.318C107.015 153.139 131.012 135.145 142.272 114.332C152.669 95.1116 154.836 67.5465 154.952 49.0162H154.434C156.755 43.1656 160.38 41.42 160.38 41.42ZM133.391 105.911C124.432 122.485 105.307 136.814 96.0998 140.939V142.089C95.6203 142.013 95.0256 141.84 94.3926 141.629C93.7404 141.859 93.1457 142.032 92.6853 142.089V140.939C83.4586 136.814 64.3529 122.485 55.3947 105.911C55.1645 105.489 54.9535 105.067 54.7425 104.645H64.3721C72.4287 116.865 86.24 127.05 93.2416 130.177V131.136C93.6445 131.079 94.1432 130.925 94.6803 130.753C95.2174 130.944 95.7162 131.079 96.119 131.136V130.177C103.121 127.05 116.932 116.865 124.989 104.645H134.081C133.813 105.067 133.621 105.489 133.391 105.911Z" />
                            <path d="M167.075 132.402C170.163 128.892 146.588 108.386 143.02 105.374L44.4992 20.8948L51.7886 12.5888C54.1288 9.92245 51.8077 4.1869 49.0838 1.885C46.3599 -0.41689 41.4492 -0.781356 39.109 1.885L26.5445 16.1951L14.7281 6.2586C11.1601 3.24696 6.26861 3.05513 3.18024 6.56552L1.68401 8.27276C-1.40437 11.7831 0.053497 15.869 3.64062 18.8807L15.6105 28.6253L3.92835 41.9188C1.58809 44.5851 2.68149 49.2848 5.4054 51.5867C8.12931 53.8886 14.2485 55.289 16.608 52.6226L22.6504 45.7361L110.142 120.778C115.455 116.308 120.922 110.726 124.931 104.626H134.024C133.813 105.048 133.602 105.489 133.372 105.892C129.286 113.45 123.09 120.509 116.683 126.379L119.752 129.007C123.32 132.019 149.657 152.18 152.727 148.688C152.727 148.688 174.192 158.606 177.472 154.865C180.791 151.163 167.075 132.402 167.075 132.402Z" />
                            <path d="M186.315 8.25335L184.819 6.54611C181.73 3.03572 176.858 3.22755 173.271 6.23919L161.474 16.1949L148.89 1.8656C146.55 -0.800765 141.639 -0.436299 138.915 1.8656C136.191 4.16749 133.87 9.90304 136.211 12.5694L143.5 20.8754L44.998 105.374C41.4108 108.386 17.8548 128.892 20.924 132.402C20.924 132.402 7.22772 151.163 10.5079 154.884C13.7881 158.605 35.2533 148.707 35.2533 148.707C38.3417 152.218 64.66 132.057 68.2279 129.026L71.6616 126.072C65.3889 120.279 59.3464 113.316 55.3373 105.911C55.1071 105.489 54.8961 105.067 54.6851 104.645H64.3147C68.1704 110.496 73.3496 115.867 78.4713 120.241L165.368 45.7359L171.41 52.6224C173.751 55.2887 179.889 53.8884 182.613 51.5865C185.337 49.2846 186.43 44.5849 184.09 41.9185L172.408 28.6251L184.378 18.8804C187.946 15.8496 189.403 11.7637 186.315 8.25335Z" />
                            </svg>


                                
                            <Form.Select defaultValue={this.state.configuration.logs.guild} onChange={(event) => { this.setState({ configuration: {...this.state.configuration, logs: { ...this.state.configuration.logs,guild: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.guild);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Guild</h5>
                            <div>Voir les differents changements opérés sur la guild</div>
                        </div>
                    
                        <div className="guildModule">
                            <div className="top">
                            <svg className="pictoLog" width="54" height="54" viewBox="0 0 310 320" >
                                <path d="M303.719 182.794L233.719 132.794C228.503 129.069 221.497 129.069 216.281 132.794L167.056 167.954C150.995 159.792 133.195 155.5 115 155.5C51.589 155.5 0 207.089 0 270.5C0 278.784 6.716 285.5 15 285.5H140V305C140 313.284 146.716 320 155 320H295C303.284 320 310 313.284 310 305V195C310 190.155 307.661 185.609 303.719 182.794ZM31.325 255.5C38.431 215.761 73.248 185.5 115 185.5C123.903 185.5 132.675 186.887 141.029 189.568C140.364 191.279 140 193.115 140 195V255.5H31.325ZM280 290H170V202.72L176.61 197.998C176.628 197.986 176.646 197.973 176.664 197.96L225 163.434L280 202.72V290Z" />
                                <path d="M115 125.5C149.601 125.5 177.751 97.351 177.751 62.75C177.751 28.149 149.601 0 115 0C80.399 0 52.249 28.149 52.249 62.75C52.249 97.351 80.399 125.5 115 125.5ZM115 30C133.059 30 147.751 44.691 147.751 62.75C147.751 80.809 133.059 95.5 115 95.5C96.941 95.5 82.249 80.809 82.249 62.75C82.249 44.691 96.941 30 115 30Z" />
                            </svg>


                            <Form.Select defaultValue={this.state.configuration.logs.roles} onChange={(event) => { this.setState({ configuration: {...this.state.configuration, logs: { ...this.state.configuration.logs,roles: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.roles);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Roles</h5>
                            <div>Voir lorsqu'un role est crée / modifié ou supprimé</div>
                        </div>
                    
                        <div className="guildModule">
                            <div className="top">
                            <svg className="pictoLog" width="54" height="54" viewBox="0 0 145 134">
                            <path d="M28.093 134C25.788 134 24.0426 131.907 24.4454 129.627L28.9335 104.222H3.70567C1.4042 104.222 -0.340242 102.136 0.056451 99.8583L1.35307 92.4138C1.6633 90.6331 3.20265 89.3333 5.00229 89.3333H31.5268L39.3806 44.6667H14.1527C11.8513 44.6667 10.1068 42.5805 10.5035 40.3028L11.8002 32.8584C12.1104 31.0773 13.6497 29.7778 15.4494 29.7778H41.9738L46.6918 3.07173C47.0057 1.29466 48.5431 0 50.3394 0H57.6328C59.9376 0 61.6832 2.09241 61.2801 4.37272L56.7924 29.7778H101.248L105.966 3.07173C106.28 1.29466 107.817 0 109.614 0H116.907C119.212 0 120.957 2.09241 120.554 4.37272L116.067 29.7778H141.294C143.596 29.7778 145.341 31.8639 144.943 34.1416L143.647 41.5861C143.337 43.3672 141.797 44.6667 139.998 44.6667H113.473L105.619 89.3333H130.847C133.149 89.3333 134.893 91.4193 134.496 93.6973L133.2 101.142C132.89 102.922 131.35 104.222 129.551 104.222H103.026L98.308 130.928C97.9946 132.705 96.4571 134 94.6604 134H87.3674C85.0624 134 83.3168 131.907 83.7199 129.627L88.2076 104.222H43.7521L39.0341 130.928C38.7202 132.705 37.1827 134 35.3865 134H28.093ZM54.2024 44.6667L46.3486 89.3333H90.8039L98.6577 44.6667H54.2024Z"/>
                            </svg>

                            
                            <Form.Select defaultValue={this.state.configuration.logs.channels} onChange={(event) => { this.setState({ configuration: {...this.state.configuration, logs: { ...this.state.configuration.logs,channels: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.channels);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Channels</h5>
                            <div>Voir lorsqu'un channel est crée / modifié ou supprimé</div>
                        </div>
                    
                        <div className="guildModule">
                            <div className="top">
                            <svg className="pictoLog" width="60" height="60" viewBox="0 0 295 295" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M294.048 56.386C294.048 48.102 287.332 41.386 279.048 41.386H15C6.716 41.386 0 48.102 0 56.386V237.662C0 245.946 6.716 252.662 15 252.662H279.048C287.332 252.662 294.048 245.946 294.048 237.662V56.386ZM264.048 86.936C264.048 91.351 262.111 95.543 258.75 98.405L201.23 147.381L258.805 196.404C262.132 199.236 264.048 203.386 264.048 207.755C264.048 215.988 257.374 222.663 249.14 222.663H249.012C245.369 222.663 241.844 221.366 239.07 219.004L178.091 167.082L156.748 185.254C153.945 187.64 150.484 188.833 147.023 188.833C143.562 188.833 140.101 187.64 137.298 185.254L115.955 167.082L55.075 218.92C52.238 221.336 48.633 222.662 44.907 222.662C36.674 222.662 29.999 215.988 29.999 207.754C29.999 203.385 31.916 199.236 35.242 196.403L92.818 147.38L36.094 99.082C32.228 95.79 30 90.967 30 85.889C30 77.879 36.493 71.385 44.504 71.385C47.95 71.385 51.283 72.612 53.907 74.846L142.283 150.094C145.016 152.421 149.034 152.421 151.768 150.094L240.143 74.846C242.767 72.612 246.1 71.385 249.545 71.385C257.555 71.385 264.048 77.878 264.048 85.888V86.936Z" />
                            </svg>

                            <Form.Select defaultValue={this.state.configuration.logs.invites} onChange={(event) => { this.setState({ configuration: {...this.state.configuration, logs: { ...this.state.configuration.logs,invites: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.invites);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Invites</h5>
                            <div>Pouvoir modérer les différents invites crée sur la guild</div>
                        </div>
                    
                        <div className="guildModule">
                            <div className="top">
                            {/* <svg className="pictoLog" width="54" height="54" viewBox="0 0 16 16">
                                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                            </svg> */}

                            <svg className="pictoLog" width="54" height="54" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M106.528 0C119.491 0 130 10.5089 130 23.4722V72.215L95.7028 72.2222L94.1636 72.2723C85.5137 72.8344 78.1411 78.0802 74.5593 85.506C71.5283 86.3248 68.3481 86.7353 65.0062 86.7353C57.4609 86.7353 50.71 84.644 44.6083 80.4237C42.148 78.722 38.7739 79.337 37.0722 81.7973C35.3704 84.2577 35.9854 87.6318 38.4458 89.3335C46.3651 94.811 55.267 97.5686 65.0062 97.5686C66.646 97.5686 68.2631 97.4905 69.8566 97.334L72.2291 97.0407L72.2222 130H23.4722C10.5089 130 0 119.491 0 106.528V23.4722C0 10.5089 10.5089 0 23.4722 0H106.528ZM125.24 84.6421L84.6421 125.24C84.145 125.738 83.6191 126.199 83.0682 126.623L83.0611 95.6953L83.1035 94.6588C83.604 88.5252 88.4835 83.6291 94.6107 83.1025L95.7043 83.0556L126.629 83.061C126.203 83.6145 125.74 84.1428 125.24 84.6421ZM43.3366 34.3139C38.3535 34.3139 34.3139 38.3535 34.3139 43.3366C34.3139 48.3196 38.3535 52.3592 43.3366 52.3592C48.3196 52.3592 52.3592 48.3196 52.3592 43.3366C52.3592 38.3535 48.3196 34.3139 43.3366 34.3139ZM86.6699 34.3139C81.6868 34.3139 77.6473 38.3535 77.6473 43.3366C77.6473 48.3196 81.6868 52.3592 86.6699 52.3592C91.653 52.3592 95.6925 48.3196 95.6925 43.3366C95.6925 38.3535 91.653 34.3139 86.6699 34.3139Z" />
                            </svg>

                            <Form.Select defaultValue={this.state.configuration.logs.emotes_stickers} onChange={(event) => { this.setState({ configuration: {...this.state.configuration, logs: { ...this.state.configuration.logs,emotes_stickers: event.target.value } } }) }}>
                                    {(() => {
                                        return this.getChannelForSelector(this.state.channelTextuelGuild, this.state.configuration.logs.emotes_stickers);
                                    })()}
                                </Form.Select>
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Emotes / Stickers</h5>
                            <div>Voir les differents changements opérés sur les Emotes et les stickers</div>
                        </div>


                    </div>
                    {(() => {
                        let etat = [];
                        if (this.state.success) {
                            etat.push(<div className="cardSuccess">
                                <div className="cardInsideSuccess">
                                    <div>
                                        <h2>Success</h2>
                                    </div>
                                    <div className="content">Mise à jour effectué<br/><br/></div>
                                    <div className="zoneInterationSucess">
                                        <div>
                                            <button className="BoutonClose" onClick={()=> {this.setState({ success: false })}} color="#ffffff">Fermer</button>
                                        </div>
                                    </div>
                                </div>
                            </div>);
                        }
                        else if(this.state.error)
                        {
                            etat.push(<div className="cardSuccess">
                                <div className="cardInsideError">
                                    <div>
                                        <h2>Erreur</h2>
                                    </div>
                                    <div className="content">La mise à jour des informations a échoué<br/><br/></div>
                                    <div className="zoneInterationError">
                                        <div>
                                            <button className="BoutonClose" onClick={()=> {this.setState({ error: false })}} color="#ffffff">Fermer</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }

                        return etat;
                })()}

                <div id="card" class="cardSave"><div class="saveConfig"><div style={{display: "flex", alignItems: "center", flexDirection: "row", gap: "0.3em"}}><img id="logoChangement" width="30px" src={logo} alt="LogoBounsBot" />Changements détectés ! Veuillez enregistrer ou annuler.</div><button class="cancelButton" type="button" onClick={this.resetUpdate}>Annuler</button><button class="saveButton" type="button" disabled={this.state.loadingChargement} onClick={this.updateGuildConfig}>Enregistrer</button></div></div>

        <WelcomeMessage guild={this.props.match.params.id}/>

        {this.state.channelTextuelGuild.length !== 0 ? (<SendMessage guild={this.props.match.params.id} channel={this.state.channelTextuelGuild}/>):("")}

        <Musique guild={this.props.match.params.id} />
                
        {(() => {
            if(this.loading) return <Loading />
        })()}
        </div>
        
        )
    }
}

export default Guild;
