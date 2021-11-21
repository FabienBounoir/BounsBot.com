import "./_musique.css";
import React, { Component } from 'react'

var timeout = ""

class Musique extends Component {

    state = {
        file: {},
        volume: 0.5,
        loadMusique: false,
        preview: "",
        actualMusique: "",
        pause: true,
        clear: false
    }

    componentDidMount() {
        this.getDataMusique()
        setInterval(() => {
            this.getDataMusique()
        }, 5000);
    }

    getDataMusique = () => {

        const token = "Bearer " + JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://bouns-bot.herokuapp.com/bot/getfile/" + this.props.guild,requestOptions)
        .then(response => response.text())
        .then(result => {

            if(JSON.parse(result).playlist.length === 0)
            {
                this.setState({
                    file: [],
                    loadMusique: true,
                    preview: "",
                    actualMusique: "",
                });
            }
            else //if(this.state.preview !== JSON.parse(result).playlist.image[0])
            {
                this.setState({
                    file: JSON.parse(result).playlist,
                    loadMusique: true,
                    preview: JSON.parse(result).playlist.image[0],
                    actualMusique: JSON.parse(result).playlist.name[0]
                });
            }
        })
        .catch(error => console.log('error', error));
    };

    togglePlay = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token);

        var raw = JSON.stringify({
            "guildId": this.props.guild
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://bouns-bot.herokuapp.com/bot/play", requestOptions)
        .then(response => response.text())
        .then(result => {this.setState({
            pause: !this.state.pause
        })}
        )
        .catch(error => console.log('error', error));
    }

    togglePause = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token);

        var raw = JSON.stringify({
            "guildId": this.props.guild
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

        clearTimeout(timeout)

        timeout = setTimeout(() => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token);
    
            var raw = JSON.stringify({
                "guildId": this.props.guild,
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
            .then(result => {this.setState({volume:JSON.parse(result).volume}); console.log(JSON.parse(result).volume)})
            .catch(error => console.log('error', error));
        }, 500);
    }

    clearQueue = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token);

        var raw = JSON.stringify({
            "guildId": this.props.guild
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://bouns-bot.herokuapp.com/bot/clearqueue", requestOptions)
        .then(response => response.text())
        .then((result) => {
            this.getDataMusique()
            this.setState({clear: false})
        })
        .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div>
        <div style={{justifyContent: "center"}} className="top">
            <h1>Player Musique</h1> 
        </div>
        <div className="musiqueRender">
        {(() => {
            var musiqueGestion = [];

            if(this.state.loadMusique)
            {
                musiqueGestion.push(<div>
                    <div style={{marginLeft: "auto",marginRight: "auto"}}>
                        <div className="previewMusic" style={{backgroundImage: "url(\""+ this.state.preview +"\")"}}></div>
                        <p style={{color: "white", marginBottom: "0px", marginTop: "5px"}}>{  this.state.actualMusique }</p>
                    </div>
                    <div className="playerMusic">
                        <div onClick={this.togglePlay}>
                        {this.state.pause
                            ? 
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="sc-1heco5p-1 bgoCaT">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path>
                            </svg>
                            :
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="sc-1heco5p-0 kxgjpq">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path>
                            </svg>
                        }
                        </div>
                    </div>
                </div>)

                musiqueGestion.push(<input type="range" min={0} max={2} step={0.1} value={this.state.volume}
                    onChange={event => {
                        this.setState({ volume: event.target.valueAsNumber })
                        this.volume(event.target.valueAsNumber)
                    }}/>)

                musiqueGestion.push(<div className="listFile" >
                    {(() => {
                        var renderFile = []

                        if(this.state.file.name)
                        {
                            for (let i = 1; i < this.state.file?.name.length; i++) {
                                renderFile.push(
                                    <p key={i}>{ this.state.file.name[i] }</p>
                                )
                            }

                            if(this.state.file?.name.length <= 1 )
                            {
                                renderFile.push(<p style={{alignSelf: "center", color: "#5a5e66"}}>Ajouter de la musique avec -play</p>)
                            }
                        }

                        return renderFile
                    })()}
                </div>)
            }

            return musiqueGestion;
        })()}
        <p onClick={()=> {this.setState({ clear: true })}} className="ClearQueue">Clear la queue</p>
        {this.state.clear ? (
            <div className="cardSuccess">
            <div className="cardInsideSuccess">
                <div>
                    <h2>Clear la queue ?</h2>
                </div>
                    <div className="zoneInterationPlaylist">
                        <button className="BoutonConfirm" onClick={this.clearQueue} >Valide</button>
                        <button className="BoutonDecline" onClick={()=> {this.setState({ clear: false })}}>Decline</button>
                    </div>
                </div>
            </div>
        ) : ("")}
        </div>
        </div>
        )
    }
}

export default Musique;
