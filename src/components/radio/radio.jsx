// import React from "react";
import "./_radio.css";
import React, { Component } from 'react'


class Radio extends Component {
    constructor(props) {
        super(props);
        this.radio = new Audio('https://streams.iloveradio.de/iloveradio5.mp3');
        this.radio.volume = 0.5;
    }

    state = {
        data: []
    }

    // componentDidMount() {
    //   this.getData();
    // }

    joinVocal = () => {
        console.log("join");
        var voiceuser = document.getElementById("discord-user-voiceuser");
        voiceuser.classList.remove("hidden");

        var botVoiceUser = document.getElementById("discord-bot-voiceuser");
        botVoiceUser.classList.add("speaking");

        var voicePanel = document.getElementById("discord-voice-panel");
        voicePanel.classList.remove("hidden");

        this.radio.play();
    };

    leaveVocal = () => {
        console.log("leave");

        var voiceuser = document.getElementById("discord-user-voiceuser");
        voiceuser.classList.add("hidden");

        var botVoiceUser = document.getElementById("discord-bot-voiceuser");
        botVoiceUser.classList.remove("speaking");

        var voicePanel = document.getElementById("discord-voice-panel");
        voicePanel.classList.add("hidden");
        this.radio.pause()
    };

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            this.setState({
                data: this.state.data.concat({name:"Discord User",picture:"user-0",text:document.getElementById('discord-inner-text-box-input').value})
            });
            document.getElementById('discord-inner-text-box-input').value = "";
        }
    };

    scrollToBottom = () => {
        console.log("scrool")
        var objDiv = document.getElementById("discord-inner-messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
      return (
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
      <div className="demo-env" id="discord-channel-join" onClick = {this.joinVocal}>
      <svg className="icon-1_QxNX" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z">
      </path>
      </svg>
      <p style={{marginBottom: "0px;"}}>&nbsp;&nbsp;Salon vocal</p>
      </div>
      <div className="demo-env member-list" role="group">
      <div className="voiceUser clickable userSmall" id="discord-bot-voiceuser" tabIndex="-1" role="button">
      <div className="content">
      <div className="avatarContainer avatar avatarSmall avatarSpeaking" style={{backgroundImage: "url('/static/media/logo5.a661761a.svg')"}}>
      </div>
      <div className="usernameFont username usernameSpeaking" style={{textAlign: "left;"}}>bouns'Bot</div>
      </div>
      </div>
      <div className="voiceUser hidden clickable userSmall" id="discord-user-voiceuser" tabIndex="-1" role="button">
      <div className="content">
      <div className="avatarContainer avatar avatarSmall user-0-avatar" style={{backgroundImage: "url('https://cdn.discordapp.com/embed/avatars/2.png')"}}>
      </div>
      <div className="usernameFont username">You</div>
      </div>
      </div>
      </div>
      
      <div id="discord-voice-panel" className="hidden flex horizontal panel horizontal directionRow justifyStart alignCenter noWrap- demo-env" style={{flex: "1 1 auto;"}}>
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
      <div className="demo-env flex horizontal directionRow justifyStart alignStretch noWrap buttons" style={{flex: "0 0 auto;"}}>
      <button onClick = {this.leaveVocal} aria-label="Disconnect" type="button" className="demo-env button enabled lookBlank colorBrand grow" id="discord-channel-disconnect">
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
              <div className="avatar user-1"></div>
              <div className="message-content">
                  <p className="name"><b>bouns'Bot</b></p>
                  Welcome to this demo of the bouns'bot radio feature.<br />There is only one radio available in this demo. <br />Leaving and joining the voice channel works like on Discord, <br />the bot pauses when you leave the voice and resumes when you are there.
              </div>
          </div>
          <div className="discord-inner-message">
              <div className="avatar user-1"></div>
              <div className="message-content">
                  <p className="name"><b>bouns'Bot</b></p>
                    Je joue déjà dans le canal vocal ici, cliquez dessus à droite pour commencer à écouter.
                    <i>Avertissement : cette démo ne représente pas entièrement la fonctionnalité du robot.</i>
              </div>
          </div>
          {(() => {
            var dataRender = [];

            for (let data of this.state.data) {
                dataRender.push(
                    <div className="discord-inner-message">
                    <div className={`avatar ${ data.picture }`}></div>
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
      )
    }
}

export default Radio;

