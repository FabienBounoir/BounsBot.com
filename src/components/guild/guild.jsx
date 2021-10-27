import "./_guild.css";
import React, { Component } from 'react'
import funPicto from "../picture/funPicto.png";
import musiquePicto from "../picture/musiquePicto.png";
import radioPicto from "../picture/radioPicto.png";
import sheeshPicto from "../picture/sheeshPicto.png";
import playlistPicto from "../picture/playlistPicto.png";
import renamePicto from "../picture/renamePicto.png";
import reactionPicto from "../picture/reactionPicto.png";
import { Form } from 'react-bootstrap/'
// import Slider from '@mui/material/Slider';

class Guild extends Component {
    state = {
        success: false,
        error: false,
        heyreaction: false,
        musique: true,
        playlist: true,
        radio: true,
        rename: true,
        sheesh: false,
        logChannel: false,
        fun: true,
        file: {},
        volume: 0.5,
        loadMusique: false,
        preview: "",
        actualMusique: "",
    }

    componentDidMount() {
        this.getData();
        this.getDataMusique();
    }

    getData = () => {
        let id = this.props.match.params.id
        //let url = "https://backendbounsbot.herokuapp.com/guild/"

        //dev
        // let url = "http://localhost:3001/guild/"
        let url = "https://backendbounsbot.herokuapp.com/guild/"

        fetch(url + id)
            .then(response => response.json())
            .then((result) => {
                // console.log(result)
                this.setState({
                    guildInfo: result.guild,
                    heyreaction: result.guild[0].heyreaction,
                    musique: result.guild[0].musique,
                    playlist: result.guild[0].playlist,
                    radio: result.guild[0].radio,
                    rename: result.guild[0].rename,
                    sheesh: result.guild[0].sheesh,
                    logChannel: result.guild[0].logChannel,
                    fun: result.guild[0].fun
                });
            })
            .catch(console.log)
    };

    getDataMusique = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "accesstoken": JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token,
            "guildId": this.props.match.params.id
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://bouns-bot.herokuapp.com/bot/getfile",requestOptions)
        .then(response => response.text())
        .then(result => {
            if(JSON.parse(result).playlist.length === 0)
            {
                this.setState({
                    file: [],
                    loadMusique: true,
                    preview: "",
                    actualMusique: "",
                    volume: 0
                });
            }
            else if(this.state.preview !== JSON.parse(result).playlist.image[0])
            {
                this.setState({
                    file: JSON.parse(result).playlist,
                    loadMusique: true,
                    preview: JSON.parse(result).playlist.image[0],
                    actualMusique: JSON.parse(result).playlist.name[0],
                    volume: 0.5
                });
            }
        })
        .catch(error => console.log('error', error));


        setTimeout(() => {
            this.getDataMusique()
        }, 5000);
    };

    clickMe = () => {
        // console.log(this.state)
    }

    updateGuildConfig = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = await JSON.stringify({
            "accesstoken": JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token,
            "guildId": this.state.guildInfo[0]?.guild,
            "logChannel": this.state.logChannel,
            "sheesh": this.state.sheesh,
            "heyreaction": this.state.heyreaction,
            "rename": this.state.rename,
            "musique": this.state.musique,
            "radio": this.state.radio,
            "playlist": this.state.playlist,
            "fun": this.state.fun
        });

        const body = await fetch('https://backendbounsbot.herokuapp.com/guild/'+this.props.match.params.id, {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            mode: 'cors'
        }).catch(console.log)

        if(body.status === 200)
        {
            this.setState({ success: true })
        }
        else
        {
            this.setState({ error: true })
        }
    }

    togglePlay = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "accesstoken": JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token,
            "guildId": this.props.match.params.id
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://bouns-bot.herokuapp.com/bot/play", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    togglePause = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "accesstoken": JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token,
            "guildId": this.props.match.params.id
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://bouns-bot.herokuapp.com/bot/pause", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    volume = async (soundVolume) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        console.log(soundVolume)

        var raw = JSON.stringify({
            "accesstoken": JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token,
            "guildId": this.props.match.params.id,
            "volume": soundVolume
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://bouns-bot.herokuapp.com/bot/volume", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div className="Dashboard">
                <div className="top">
                    <h1>Information de la guild</h1> 
                </div>
                <button className="save" onClick={this.updateGuildConfig}>Enregistrer</button>
                {(() => {
                    var rank = [];
                    rank.push(<div className='componentGuild'>
                        <div className="guildModule">
                            <div className="top">
                                <img className="picto" alt='logo' width="48" height="48" src={reactionPicto} ></img>
                                <Form.Check className="picto" type="switch" id="custom-switch success" onChange={() => { this.setState({ heyreaction: !this.state.heyreaction }) }} checked={this.state.heyreaction} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Réactions</h5>
                            <div>Laissez le bot reagir avec 👋 / 💤 suivant le message</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <img className="picto" alt='logo' width="48" height="48" src={musiquePicto} ></img>
                                <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ musique: !this.state.musique }) }} checked={this.state.musique} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Musique</h5>
                            <div>Laissez vos membres écouter leurs meilleurs musiques</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <img className="picto" alt='logo' width="48" height="48" src={playlistPicto} ></img>
                                <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ playlist: !this.state.playlist }) }} checked={this.state.playlist} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Playlist</h5>
                            <div>Laissez vos membres réalisés / modifier / écouté leurs playlists</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <img className="picto" alt='logo' width="48" height="48" src={radioPicto} ></img>
                                <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ radio: !this.state.radio }) }} checked={this.state.radio} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Radio</h5>
                            <div>Laissez vos membres écouter une des 41 radios disponibles sur le Bot</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <img className="picto" alt='logo' width="48" height="48" src={renamePicto} ></img>
                                <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ rename: !this.state.rename }) }} checked={this.state.rename} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Rename</h5>
                            <div>Laissez le bot rename les membres lorsque leur pseudo n'est pas identifiable par la moderation</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <img className="picto" alt='logo' width="80" height="80" src={sheeshPicto} ></img>
                                <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ sheesh: !this.state.sheesh }) }} checked={this.state.sheesh} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Sheesh</h5>
                            <div>Laissez le bot reagir avec son meilleur SHEEEESHHHH si un membre dit sheesh</div>
                        </div>
                        <div className="guildModule">
                            <div className="top">
                                <img className="picto" alt='logo' width="48" height="48" src={funPicto} ></img>
                                <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ fun: !this.state.fun }) }} checked={this.state.fun} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Fun</h5>
                            <div>Laissez vos membres s'amuser avec des commandes funs et ludiques</div>
                        </div>
                    </div>);

                    if (this.state.success) {
                        rank.push(<div className="cardSuccess">
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
                        rank.push(<div className="cardSuccess">
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
                                    </div>);
                    }
    
                return rank;
        })()}

        <div className="top">
            <h1>Player Musique</h1> 
        </div>
        <div className="musiqueRender">
        {(() => {
            var musiqueGestion = [];

            if(this.state.loadMusique)
            {
                // musiqueGestion.push(<p style={{color: "white"}}>musique OK</p>);

                musiqueGestion.push(<div>
                    <div style={{marginLeft: "auto",marginRight: "auto"}}>
                        <div className="previewMusic" style={{backgroundImage: "url(\""+ this.state.preview +"\")"}}></div>
                        <p style={{color: "white", marginBottom: "0px", marginTop: "5px"}}>{  this.state.actualMusique }</p>
                    </div>
                    <div class="playerMusic">
                        {/* <svg style={{transform: "rotate(-180deg)"}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-forward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="sc-1heco5p-2 sc-1heco5p-3 zOEgw xJyPr">
                            <path fill="currentColor" d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path>
                        </svg> */}
                        <div onClick={this.togglePlay}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="sc-1heco5p-0 kxgjpq">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path>
                            </svg>
                        </div>

                        <div onClick={this.togglePause}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="sc-1heco5p-1 bgoCaT">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path>
                            </svg>
                        </div>
                        {/* <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-forward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="sc-1heco5p-2 zOEgw">
                            <path fill="currentColor" d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path>
                        </svg> */}
                    </div>
                </div>)

                musiqueGestion.push(<input type="range" min={0} max={1.5} step={0.2} value={this.state.volume}
                    onChange={event => {
                        this.setState({ volume: event.target.valueAsNumber })
                        this.volume(event.target.valueAsNumber)
                    }}/>)

                musiqueGestion.push(<div className="listFile">
                    {(() => {
                        var renderFile = []

                        for (let i = 1; i < this.state.file?.name.length; i++) {
                            renderFile.push(
                                <p>{ this.state.file.name[i] }</p>
                            )
                        }

                        return renderFile
                    })()}
                
                </div>)
            }

            return musiqueGestion;
        })()}
        </div>




                            </div>
                            )
                        }
                    }

                    export default Guild;
