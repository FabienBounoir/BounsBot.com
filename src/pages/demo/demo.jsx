// import React from "react";
import "./_demo.css";
import React, { Component } from 'react'
import io from 'socket.io-client';

class Demo extends Component {
    constructor(props) {
        super(props);

        //lien de la radio en cour de lecture (cookie ou celle par defaut)
        this.radio = new Audio(this.getCookie("radio") || 'https://streams.iloveradio.de/iloveradio5.mp3');

        //definie le son de join et leave du channel vocal
        this.joinSound = new Audio("https://cdn.discordapp.com/attachments/825523344468082743/884722966523428874/discord-join-sound-effect-download.mp3");
        this.leaveSound = new Audio("https://cdn.discordapp.com/attachments/825523344468082743/884722968155013130/discord-leave-sound-effect-hd.mp3");

        //regler volume son
        this.radio.volume = this.getCookie("volume") || 0.1;
        this.joinSound.volume = 0.3;
        this.leaveSound.volume = 0.3;

        //si l'utilisateur est dans le voc
        this.inVocal = false;

        //si le bot est en pause ou non
        this.pause = true;

        //state
        this.state = {
            messageData: [],
            vocalData: [],
            user: this.getCookie("username") === null ? (this.setCookie("username", `Discord User ${Math.floor(Math.random() * 4000)}`), this.getCookie("username")) : (this.getCookie("username")),
            muet: true
        }

        //genere la PP du client
        this.picture = `${Math.floor(Math.random() * 6)}`

        //socket.io client connection
        // this.socket = io('http://localhost:3001/');


        //socket server link
        this.socket = io("https://socket.bounsbot.com/");
        // this.socket = io("ws://localhost:3001"); //en local test
    }

    //appeler lorsque l'utilisateur clique sur le bouton join (salon vocal)
    joinVocal = () => {
        var voiceuser = document.getElementById("discord-user-voiceuser");
        voiceuser.classList.remove("hidden");

        if (!this.inVocal) this.socket.emit('joinVocal', this.state.user, this.picture, this.state.muet)
        this.joinSound.play();

        var botVoiceUser = document.getElementById("discord-bot-voiceuser");
        botVoiceUser.classList.add("speaking");

        var voicePanel = document.getElementById("discord-voice-panel");
        voicePanel.classList.remove("hidden");

        setTimeout(() => {
            try {
                this.radio.play();
            } catch (error) {
                console.log(error)
            }
        }, 1000);

        this.inVocal = true;
        this.pause = false;
    };

    //appeler lorsque l'utilisateur clique sur le bouton deco
    leaveVocal = () => {
        var voiceuser = document.getElementById("discord-user-voiceuser");
        voiceuser.classList.add("hidden");

        if (this.inVocal) this.socket.emit('leaveVocal')

        var botVoiceUser = document.getElementById("discord-bot-voiceuser");
        botVoiceUser.classList.remove("speaking");

        var voicePanel = document.getElementById("discord-voice-panel");
        voicePanel.classList.add("hidden");

        this.radio.pause()
        this.leaveSound.play();

        this.inVocal = false;
        this.pause = false;
    };

    toggleMuet = () => {
        this.setState({
            muet: !this.state.muet
        });

        if (this.state.muet) {
            this.voix();
        }

        setTimeout(() => {
            this.socket.emit("muet", this.state.muet)
        }, 20);
    }

    //check les touches entre sur le clavier dans l'input
    _handleKeyDown = (e) => {
        let message = document.getElementById('discord-inner-text-box-input').value;
        if (e.key === 'Enter' && message !== "") {
            this.setState({
                messageData: this.state.messageData.concat({ name: this.state.user, picture: `user-${this.picture}`, text: message })
            });

            if (message.indexOf(`-`) !== 0) {
                this.socket.emit('tchat', { name: this.state.user, picture: `user-${this.picture}`, text: message })
            }

            setTimeout(() => {
                this.checkCommande(document.getElementById('discord-inner-text-box-input').value)
                document.getElementById('discord-inner-text-box-input').value = "";
            }, 30);
        }
    };

    //check si message entré est une commande
    checkCommande = (commande) => {
        if (commande.toLowerCase().indexOf(`-radio `) === 0) {
            this.radioCommandes(commande.split(' ')[1])
        }
        else if (commande.toLowerCase().indexOf(`-volume `) === 0) {
            this.volumeCommandes(commande.split(' ')[1] / 10)
        }
        else if (commande === "-resume") {
            this.playCommandes()
        }
        else if (commande === "-pause") {
            this.pauseCommandes();
        }
        else if (commande.toLowerCase().indexOf(`/nick `) === 0) {
            this.setNickname(commande.split(" ")[1])
        }
    };

    setNickname(nickname) {
        this.setState({
            user: nickname
        });
        this.setCookie("username", nickname)

        this.socket.emit('UpdateNickname', nickname)
    }

    //commande play (remet le son du bot)
    playCommandes() {
        if (this.inVocal || this.pause) {
            this.radio.play()
            this.setState({
                messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: "▶️" })
            });
            this.pause = false

            var botVoiceUser = document.getElementById("discord-bot-voiceuser");
            botVoiceUser.classList.add("speaking");
        }
        else {
            this.setState({
                messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: "Vous n'êtes pas dans le vocal" })
            });
        }
    }

    //commande radio (met a jour la radio en cour de diffusion)
    radioCommandes(commande) {
        if (!(isNaN(commande))) {
            let number = parseInt(commande)
            if (number >= 1 && number <= 41) {
                this.radio.pause()
                this.radio = new Audio(this.selectRadio(number))

                this.setState({
                    messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: `Radio N°${number} en cours de streaming` })
                });

                if (this.inVocal) {
                    this.radio.play()
                    this.pause = false;
                }
                this.setCookie("radio", this.selectRadio(number))
            }
            else {
                this.setState({
                    messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: "La radio n'existe pas !!" })
                });
            }
        }
        else {
            this.setState({
                messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: "Ce n'est pas un chiffre" })
            });
        }
    }

    //commande volume (met a jour le volume du bot)
    volumeCommandes(volume) {
        if (!(isNaN(volume))) {
            let number = volume;
            console.log(number)
            if (number >= 0 && number <= 1) {
                this.radio.volume = volume;
                this.setState({
                    messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: `Volume réglé sur ${volume * 10}` })
                });
                this.setCookie("volume", volume)
            }
            else {
                this.setState({
                    messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: "Volume non compris entre 0 et 10" })
                });
            }
        }
        else {
            this.setState({
                messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: "Ce n'est pas un chiffre" })
            });
        }
    }

    //commande pause (met en pause le son du bot)
    pauseCommandes() {
        if (this.inVocal || !this.pause) {
            this.radio.pause()
            this.setState({
                messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: "⏸" })
            });
            this.pause = true

            var botVoiceUser = document.getElementById("discord-bot-voiceuser");
            botVoiceUser.classList.remove("speaking");
        }
        else {
            this.setState({
                messageData: this.state.messageData.concat({ name: "Bouns'Bot", picture: "user-6", text: "Vous n'êtes pas dans le vocal" })
            });
        }
    }

    //scroll en bas de la div Message
    scrollToBottom = () => {
        var objDiv = document.getElementById("discord-inner-messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    //appeler des qu'il y a une update de la page
    componentDidUpdate() {
        //scroll to the bottom lors d'un nouveau message
        this.scrollToBottom();
    }

    //appeler lorsque la page est chargé
    componentDidMount = () => {

        //besoin du connexion securisé pour transmettre l'audio
        // if (window.location.protocol !== "https:") {
        //     window.location.protocol = "https:";
        // }

        //reception lorsque qu'un nouveau message est ecrit dans le tchat
        this.socket.on("receive", message => {
            this.setState({
                messageData: this.state.messageData.concat(message)
            });
        });

        //reception lorsque quelqu'un join un vocal
        this.socket.on("joinUpdate", data => {
            this.setState({
                vocalData: data
            });
            if (this.inVocal) {
                this.joinSound.play();
            }
        });

        //reception lorsqu'une personne leave le vocal
        this.socket.on("leaveUpdate", data => {
            this.setState({
                vocalData: data
            });
            if (this.inVocal) {
                this.leaveSound.play();
            }
        });

        //mettre à jour les utilisateur muet
        this.socket.on("vocalUpdate", data => {
            this.setState({
                vocalData: data
            });
        });

        //Recuperation de la voix en cour de diffusion dans le channel Vocal
        this.socket.on("getVoice", (data) => {
            if (this.inVocal) {
                let audio = new Audio(data);

                try {
                    audio.play();
                } catch (error) {
                    console.log(error)
                }
            }
        });

        //demander les données du vocal et du tchat
        this.socket.emit('init')
    }

    //Gestion du micro
    voix() {
        navigator?.mediaDevices?.getUserMedia({ audio: true }).then((stream) => {
            var madiaRecorder = new MediaRecorder(stream);
            madiaRecorder.start();

            var audioChunks = [];

            madiaRecorder.addEventListener("dataavailable", function (event) {
                audioChunks.push(event.data);
            });

            madiaRecorder.addEventListener("stop", () => {
                var audioBlob = new Blob(audioChunks);

                audioChunks = [];

                var fileReader = new FileReader();
                fileReader.readAsDataURL(audioBlob);
                fileReader.onloadend = () => {

                    var base64String = fileReader.result;
                    if (this.inVocal && !this.state.muet) {
                        this.socket?.emit("voice", base64String);
                    }

                };

                madiaRecorder.start();

                setTimeout(function () {
                    madiaRecorder.stop();
                }, 500);
            });

            setTimeout(function () {
                madiaRecorder.stop();
            }, 500);

        });
    }

    //modifier / crée cookies de navigation
    setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    //Recuperer les cookies de navigation
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }

        return null;
    }

    //Radio disponible pour le bot
    selectRadio(radio) {
        const Radiostations = {
            1: "http://stream.kissfm.de/kissfm-electro/mp3-128/internetradio/",
            2: "https://baseradiode.stream.laut.fm/baseradiode",
            3: "https://streams.ilovemusic.de/iloveradio17.mp3",
            4: "https://streams.ilovemusic.de/iloveradio2.mp3",
            5: "https://streams.ilovemusic.de/iloveradio6.mp3",
            6: "https://streams.ilovemusic.de/iloveradio16.mp3",
            7: "https://streams.ilovemusic.de/iloveradio3.mp3",
            8: "https://streams.ilovemusic.de/iloveradio14.mp3",
            9: "https://streams.ilovemusic.de/iloveradio13.mp3",
            10: "https://streams.ilovemusic.de/iloveradio8.mp3",

            11: "https://streams.ilovemusic.de/iloveradio21.mp3",
            12: "https://streams.ilovemusic.de/iloveradio109.mp3",
            13: "https://streams.ilovemusic.de/iloveradio24.mp3",
            14: "https://streams.ilovemusic.de/iloveradio18.mp3",
            15: "https://streams.ilovemusic.de/iloveradio4.mp3",

            16: "https://ice31.securenetsystems.net/BGFMRAD",
            17: "https://strw1.openstream.co/878?aw_0_1st.collectionid%3D3672%26stationId%3D3672%26publisherId%3D902%26k%3D1665680049",
            18: "https://scdn.nrjaudio.fm/fr/30617/mp3_128.mp3?cdn_path=adswizz_lbs12&adws_out_b1",
            19: "https://allzic08.ice.infomaniak.ch/allzic08.mp3",
            20: "https://allzic24.ice.infomaniak.ch/allzic24.mp3",
            21: "https://allzic49.ice.infomaniak.ch/allzic49.mp3",
            22: "https://str4uice.streamakaci.com/4uclassicrock320.mp3",

            23: "https://n05a-eu.rcs.revma.com/cpkhx08pq18uv?_=1449027306?retry=0&rj-tok=AAABfIXTSQ8A3gx2ubZXeVS17A&rj-ttl=5",

            24: "https://austria-kultradio.stream.laut.fm/austria-kultradio?t302=2022-10-13_18-49-01&uuid=daefd93f-2d76-49d9-83d2-c9f2fcb8db8e",
            25: "http://onair.krone.at/kronehit.mp3",

            26: "http://cdn.nrjaudio.fm/audio1/fr/30401/mp3_128.mp3?origine=fluxradios",
            27: "http://www.skyrock.fm/stream.php/tunein16_128mp3.mp3",
            28: "http://funradiobe.ice.infomaniak.ch/funradiobe-high.mp3",
            29: "http://cdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3",

            30: "http://icestreaming.rai.it:80/1.mp3",
            31: "http://icestreaming.rai.it:80/2.mp3",

            32: "http://icecast.err.ee:80/vikerraadio.mp3",
            33: "http://icecast.err.ee:80/raadiotallinn.mp3",

            34: "http://icecast8.play.cz/color128.mp3",
            35: "http://ice.abradio.cz:8000/helax128.mp3",

            36: "http://icecast6.play.cz/cro2-128.mp3",
            37: "http://icecast4.play.cz/spin128.mp3",

            38: "http://icecast.omroep.nl/radio1-bb-mp3",
            39: "http://21223.live.streamtheworld.com/RADIO538.mp3",

            40: "http://streams2.radio90.pl:8000/radio90_128kbps_stereo.mp3",
            41: "http://stream2.nadaje.com:8076/,stream.mp3"
        }

        return Radiostations[radio];
    }

    render() {
        return (
            <div className="BackgroundGreen" style={{ backgroundColor: "var(--color-principal);" }}>
                <div className="mainscreen" id="discord-main">
                    <div className="demo-env" id="discord-title">Discord bot</div>
                    <div className="demo-env" id="discord-server-avatar"></div>
                    <div className="demo-env" id="discord-channel-list">
                        <div className="demo-env containerDefault">
                            <div className="demo-env iconVisibility wrapper modeSelected" tabIndex="0" aria-label="Commands (text channel)" aria-setsize="94">
                                <div className="demo-env content"><svg width="24" height="24" viewBox="0 0 24 24" className="icon">
                                    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z">
                                    </path>
                                </svg>
                                    <div className="name">&nbsp;Commandes</div>
                                </div>
                            </div>
                        </div>
                        <div className="demo-env" id="discord-channel-join" onClick={this.joinVocal}>
                            <svg className="icon-1_QxNX" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z">
                                </path>
                            </svg>
                            <p>&nbsp;&nbsp;Salon vocal</p>
                        </div>
                        <div className="demo-env member-list" role="group">
                            <div className="voiceUser clickable userSmall" id="discord-bot-voiceuser" tabIndex="-1" role="button">
                                <div className="content">
                                    <div className="avatarContainer avatar avatarSmall avatarSpeaking" style={{ backgroundImage: "url('https://cdn.discordapp.com/attachments/806282416364585062/1010652379332497408/Bounsbot.svg')" }}>
                                    </div>
                                    <div className="usernameFont username usernameSpeaking" style={{ textAlign: "left;" }}>Bouns'Bot</div>
                                </div>
                            </div>
                            <div className="voiceUser hidden clickable userSmall" id="discord-user-voiceuser" tabIndex="-1" role="button">
                                <div className="content">
                                    <div className="avatarContainer avatar avatarSmall user-0-avatar" style={{ backgroundImage: `url(${this.state.user.toLowerCase() === 'badbounstv' ? ("https://cdn.discordapp.com/attachments/806282416364585062/886279506564907048/logo-cyan-rouge.png") : (`https://cdn.discordapp.com/embed/avatars/${this.picture}.png`)})` }}>
                                    </div>
                                    <div className="usernameFont username">{this.state.user}</div>
                                    {this.state.muet ? (
                                        <div className="muetLogo">
                                            <svg aria-hidden="false" width="15" height="15" viewBox="0 0 24 24"><path d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z" fill="#b9bbbe"></path><path d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z" fill="#b9bbbe"></path><path d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z" fill="#b9bbbe"></path><path d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z" fill="red"></path></svg>
                                        </div>
                                    ) : ("")}
                                </div>
                            </div>
                            {(() => {
                                var vocalRender = [];

                                for (let vocal of this.state.vocalData) {

                                    if (vocal.socketId !== this.socket.id) {
                                        vocalRender.push(
                                            <div className="voiceUser clickable userSmall" id="discord-user-voiceuser" tabIndex="-1" role="button">
                                                <div className="content">
                                                    <div className="avatarContainer avatar avatarSmall user-0-avatar" style={{ backgroundImage: `url(${vocal.name.toLowerCase() === 'badbounstv' ? ("https://cdn.discordapp.com/attachments/806282416364585062/886279506564907048/logo-cyan-rouge.png") : (`https://cdn.discordapp.com/embed/avatars/${vocal.picture}.png`)})` }}>
                                                    </div>
                                                    <div className="usernameFont username">{vocal.name}</div>
                                                    {vocal.muet ? (
                                                        <div className="muetLogo">
                                                            <svg aria-hidden="false" width="15" height="15" viewBox="0 0 24 24"><path d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z" fill="#b9bbbe"></path><path d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z" fill="#b9bbbe"></path><path d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z" fill="#b9bbbe"></path><path d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z" fill="red"></path></svg>
                                                        </div>
                                                    ) : ("")}
                                                </div>
                                            </div>
                                        );
                                    }
                                }

                                return vocalRender;
                            })()}
                        </div>

                        <div id="discord-voice-panel" className="hidden flex horizontal panel horizontal directionRow justifyStart alignCenter noWrap- demo-env" style={{ flex: "1 1 auto;" }}>
                            <div className="inner demo-env">
                                <div>
                                    <div className="rtcConnectionStatus rtcConnectionQualityFine">
                                        <div className="labelWrapper">
                                            <div type="button" className="rtcConnectionStatusConnected rtcConnectionStatusLabel button">
                                                <div className="contents">Voix connectée</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="demo-env flex horizontal directionRow justifyStart alignStretch noWrap buttons" style={{ flex: "0 0 auto;" }}>
                                <button onClick={this.toggleMuet} aria-label="Muet" type="button" className="demo-env button enabled lookBlank colorBrand grow" id="discord-channel-muet">
                                    {this.state.muet ? (
                                        <div className="demo-env contents">
                                            <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z" fill="currentColor"></path><path d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z" fill="currentColor"></path><path d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z" fill="currentColor"></path><path d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z" style={{ color: "hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)" }} fill="currentColor"></path></svg>
                                        </div>
                                    ) : (

                                        <div className="demo-env contents">
                                            <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path fill-rule="evenodd" clipRule="evenodd" d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z" fill="currentColor"></path><path fill-rule="evenodd" clipRule="evenodd" d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V22H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1Z" fill="currentColor"></path></svg>
                                        </div>
                                    )}
                                </button>

                                <button onClick={this.leaveVocal} aria-label="Disconnect" type="button" className="demo-env button enabled lookBlank colorBrand grow" id="discord-channel-disconnect">
                                    <div className="demo-env contents"><svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M21.1169 1.11603L22.8839 2.88403L19.7679 6.00003L22.8839 9.11603L21.1169 10.884L17.9999 7.76803L14.8839 10.884L13.1169 9.11603L16.2329 6.00003L13.1169 2.88403L14.8839 1.11603L17.9999 4.23203L21.1169 1.11603ZM18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22Z">
                                        </path>
                                    </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="demo-env" id="discord-inner">
                        <div className="demo-env" id="discord-inner-messages"><div className="discord-inner-message" >
                            <div className="avatar user-6"></div>
                            <div className="message-content">
                                <p className="name"><b>Bouns'Bot</b></p>
                                Bienvenue sur cette démo de la fonctionnalité radio du Bouns'Bot <br />Toutes les radios sont disponibles sur cette démo <br />Rejoindre / Quitter un channel vocal fonctionne comme sur Discord, <br />le bot fait une pause lorsque vous quittez le vocal et reprend lorsque vous y êtes.
                            </div>
                        </div>

                            <div className="discord-inner-message">
                                <div className="avatar user-6"></div>
                                <div className="message-content">
                                    <p className="name"><b>Bouns'Bot</b></p>

                                    <p>Cette démo dispose d'un nombre limité de commandes :<br />
                                    </p><ul>
                                        <li>-radio [number entre 1 et 41] --&gt; Choisir la radio</li>
                                        <li>-pause --&gt; Mettre en pause la radio</li>
                                        <li>-resume --&gt; Remettre la radio</li>
                                        <li>-volume [Number entre 0 et 1] --&gt; Choisir le volume</li>
                                    </ul>
                                    <ul>
                                        <li>/nick [username] --&gt; Changer de Pseudo</li>
                                    </ul>
                                    <span>Pour la liste complète des commandes, consultez <a target="_Blank" href="/commandes">notre page de commandes</a>.</span>
                                </div>
                            </div>
                            <div className="discord-inner-message">
                                <div className="avatar user-6"></div>
                                <div className="message-content">
                                    <p className="name"><b>Bouns'Bot</b></p>
                                    Je joue déjà dans le canal vocal #Salon vocal, cliquez dessus à droite pour commencer à écouter.
                                    <i>Avertissement : cette démo ne représente pas entièrement la fonctionnalité radio du Bouns'Bot.</i>
                                </div>
                            </div>
                            {(() => {
                                var dataRender = [];

                                for (let data of this.state.messageData) {
                                    dataRender.push(
                                        <div className="discord-inner-message">
                                            <div className={`avatar ${data.name.toLowerCase() === 'badbounstv' ? ("user-7") : (data.picture)}`}></div>
                                            <div className="message-content">
                                                <p className="name"><b id={data.name.toLowerCase() === 'badbounstv' ? ('badbounstv') : (`role-${data.picture[data.picture.length - 1]}`)}>{data.name}</b></p>
                                                {data.text}
                                            </div>
                                        </div>
                                    );
                                }

                                return dataRender;
                            })()}
                        </div>
                        <div className="demo-env" id="discord-inner-text-box">
                            <input className="demo-env" id="discord-inner-text-box-input" spellcheck="false" onKeyDown={this._handleKeyDown} placeholder="Envoyer un message dans #Commandes" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Demo;