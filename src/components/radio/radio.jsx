// import React from "react";
import "./_radio.css";
import React, { Component } from 'react'
import io from 'socket.io-client';
class Radio extends Component {
    constructor(props) {
        super(props);
        this.radio = new Audio(this.getCookie("radio") || 'https://streams.iloveradio.de/iloveradio5.mp3');
        this.joinSound = new Audio("https://cdn.discordapp.com/attachments/825523344468082743/884722966523428874/discord-join-sound-effect-download.mp3");
        this.leaveSound = new Audio("https://cdn.discordapp.com/attachments/825523344468082743/884722968155013130/discord-leave-sound-effect-hd.mp3");
        this.radio.volume = this.getCookie("volume") ||  0.4;
        this.joinSound.volume = 0.5;
        this.leaveSound.volume = 0.5;
        this.inVocal = false;
        this.pause = true;

        this.state = {
            messageData: [],
            vocalData: [],
            user: this.getCookie("username") === null ? (this.setCookie("username",`Discord User ${Math.floor(Math.random() * 4000)}`), this.getCookie("username")) : (this.getCookie("username"))
        }
        this.picture = `${Math.floor(Math.random() * 5)}`
        this.socket = io("https://socketbounsbot.herokuapp.com/");
        // this.socket = io("http://192.168.1.164:3001/");
    }

    joinVocal = () => {
        var voiceuser = document.getElementById("discord-user-voiceuser");
        voiceuser.classList.remove("hidden");

        if(!this.inVocal) this.socket.emit('joinVocal',this.state.user,`${this.picture}`)
        this.joinSound.play();

        var botVoiceUser = document.getElementById("discord-bot-voiceuser");
        botVoiceUser.classList.add("speaking");

        var voicePanel = document.getElementById("discord-voice-panel");
        voicePanel.classList.remove("hidden");

        setTimeout(() => {
            this.radio.play();
        }, 1000);
        this.inVocal = true;
        this.pause = false;
    };

    leaveVocal = () => {
        var voiceuser = document.getElementById("discord-user-voiceuser");
        voiceuser.classList.add("hidden");

        if(this.inVocal) this.socket.emit('leaveVocal')

        var botVoiceUser = document.getElementById("discord-bot-voiceuser");
        botVoiceUser.classList.remove("speaking");

        var voicePanel = document.getElementById("discord-voice-panel");
        voicePanel.classList.add("hidden");
        this.radio.pause()
        this.leaveSound.play();
        this.inVocal = false;
        this.pause = false;
    };

    _handleKeyDown = (e) => {
        let message = document.getElementById('discord-inner-text-box-input').value;
        if (e.key === 'Enter' && message !== "") {
            this.setState({
                messageData: this.state.messageData.concat({name:this.state.user,picture:`user-${this.picture}`,text:message})
            });

            if(message.indexOf(`-`) !== 0)
            {
                this.socket.emit('tchat',{name:this.state.user,picture:`user-${this.picture}`,text:message})
            }

            setTimeout(() => {
                this.checkCommande(document.getElementById('discord-inner-text-box-input').value)
                document.getElementById('discord-inner-text-box-input').value = "";
            }, 30);
        }
    };

    checkCommande = (commande) =>
    {
        if(commande.toLowerCase().indexOf(`-radio `) === 0)
        {
            this.radioCommandes(commande.split(' ')[1])
        }
        else if(commande.toLowerCase().indexOf(`-volume `) === 0)
        {
            this.volumeCommandes(commande.split(' ')[1])
        }
        else if(commande === "-resume")
        {   
            this.playCommandes()
        }
        else if(commande === "-pause")
        {
            this.pauseCommandes();
        }
        else if(commande.toLowerCase().indexOf(`/nick `) === 0)
        {
            this.setState({
                user: commande.split(" ")[1]
            });
            this.setCookie("username",commande.split(" ")[1])
        }
    };

    playCommandes()
    {
            if(this.inVocal || this.pause)
            {
                this.radio.play()
                this.setState({
                    messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:"▶️"})
                });
                this.pause = false
            }
            else
            {
                this.setState({
                    messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:"Vous n'êtes pas dans le vocal"})
                });
            }
    }

    radioCommandes(commande)
    {
        if(!(isNaN(commande)))
        {
            let number = parseInt(commande)
            if(number >= 1 && number <= 41)
            {
                this.radio.pause()
                this.radio = new Audio(this.selectRadio(number))
                
                this.setState({
                    messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:`Radio N°${number} en cours de streaming`})
                });

                if(this.inVocal)
                {
                    this.radio.play()
                    this.pause = false;
                }
                this.setCookie("radio",this.selectRadio(number))
                console.log(this.radio);
            }
            else
            {
                // sendTempsMessage(5000,"La radio n'existe pas !!",undefined)
                this.setState({
                    messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:"La radio n'existe pas !!"})
                });
            }
        }
        else
        {
            this.setState({
                messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:"Ce n'est pas un chiffre"})
            });
        }
    }

    volumeCommandes(volume)
    {
        if(!(isNaN(volume)))
        {
            let number = parseInt(volume)
            if(number >= 0 && number <= 1)
            {
                this.radio.volume = volume;
                this.setState({
                    messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:`Volume réglé sur ${volume}`})
                });
                this.setCookie("volume",volume)
            }
            else
            {
                this.setState({
                    messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:"Volume non compris entre 0 et 1"})
                });
            }
        }
        else
        {
            this.setState({
                messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:"Ce n'est pas un chiffre"})
            });
        }
    }

    pauseCommandes()
    {
        console.log(this.inVocal)
        console.log(this.pause)
        if(this.inVocal || !this.pause)
        {
            this.radio.pause()
            this.setState({
                messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:"⏸"})
            });
            this.pause = true
        }
        else
        {
            this.setState({
                messageData: this.state.messageData.concat({name:"Bouns'Bot",picture:"user-6",text:"Vous n'êtes pas dans le vocal"})
            });
        }
    }

    scrollToBottom = () => {
        var objDiv = document.getElementById("discord-inner-messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount = () => {

        this.socket.on("receive", message => {
            this.setState({
                messageData: this.state.messageData.concat(message)
            });
        });

        this.socket.on("joinUpdate", data => {
            this.setState({
                vocalData: data
            });
            if(this.inVocal)
            {
                this.joinSound.play();
            }
        });

        this.socket.on("leaveUpdate", data => {
            this.setState({
                vocalData: data
            });
            if(this.inVocal)
            {
                this.leaveSound.play();
            }
        });

        this.socket.on("getVoice", (data) => {
            if(this.inVocal)
            {
                var audio = new Audio(data);
                audio.play();
            }
        });

        this.socket.emit('init')
        this.voix()
    }

    voix()
    {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
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
                    if(this.inVocal) 
                    {
                        this.socket?.emit("voice", base64String);
                    }

                };
            
                madiaRecorder.start();

                setTimeout(function () {
                    madiaRecorder.stop();
                }, 1000);
            });
            
            setTimeout(function () {
                madiaRecorder.stop();
            }, 1000);

        });
    }

    
    setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    selectRadio(radio)
    {
        const Radiostations = {
            1: "https://streams.ilovemusic.de/iloveradio14.mp3",
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
            16: "https://stream-mz.planetradio.co.uk/net2national.mp3", 
            17: "http://icy-e-bab-02-gos.sharp-stream.com/absoluteradio.mp3",
            18: "http://ais.absoluteradio.co.uk/absolute70s.mp3",
            19: "http://ais.absoluteradio.co.uk/absolute80s.mp3",
            20: "http://ais.absoluteradio.co.uk/absolute90s.mp3",
            21: "http://ais.absoluteradio.co.uk/absolute00s.mp3",
            22: "http://icy-e-bab-04-cr.sharp-stream.com/absoluteclassicrock.mp3",
            23: "http://loadbalancing.topradio.be/topradio.mp3", 
            24: "http://radio886.fluidstream.eu/886_live.mp3",
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
            37:"http://icecast4.play.cz/spin128.mp3",
            38: "http://icecast.omroep.nl/radio1-bb-mp3",
            39: "http://21223.live.streamtheworld.com/RADIO538.mp3",
            40: "http://streams2.radio90.pl:8000/radio90_128kbps_stereo.mp3",
            41: "http://stream2.nadaje.com:8076/,stream.mp3"
        }

        return Radiostations[radio];

}

    render() {
      return (
          <div className="BackgroundGreen" style={{ backgroundColor: "#0cab34;" }}>
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
                                  <div className="avatarContainer avatar avatarSmall avatarSpeaking" style={{ backgroundImage: "url('/static/media/logo5.a661761a.svg')" }}>
                                  </div>
                                  <div className="usernameFont username usernameSpeaking" style={{ textAlign: "left;" }}>bouns'Bot</div>
                              </div>
                          </div>
                          <div className="voiceUser hidden clickable userSmall" id="discord-user-voiceuser" tabIndex="-1" role="button">
                              <div className="content">
                                  <div className="avatarContainer avatar avatarSmall user-0-avatar" style={{ backgroundImage: `url('https://cdn.discordapp.com/embed/avatars/${this.picture}.png')` }}>
                                  </div>
                                  <div className="usernameFont username">{this.state.user}</div>
                              </div>
                          </div>
                          {(() => {
                              var vocalRender = [];

                              for (let vocal of this.state.vocalData) {

                                if(vocal.socketId !== this.socket.id)
                                {
                                    console.log("rentrer")
                                    vocalRender.push(
                                        <div className="voiceUser clickable userSmall" id="discord-user-voiceuser" tabIndex="-1" role="button">
                                            <div className="content">
                                                <div className="avatarContainer avatar avatarSmall user-0-avatar" style={{ backgroundImage: `url('https://cdn.discordapp.com/embed/avatars/${vocal.picture}.png')` }}>
                                                </div>
                                                <div className="usernameFont username">{vocal.name}</div>
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
                                          <div className={`avatar ${data.picture}`}></div>
                                          <div className="message-content">
                                              <p className="name"><b>{data.name}</b></p>
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

export default Radio;