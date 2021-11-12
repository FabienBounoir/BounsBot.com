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
        pause: true
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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }, 500);
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
                        {/* <svg style={{transform: "rotate(-180deg)"}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-forward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="sc-1heco5p-2 sc-1heco5p-3 zOEgw xJyPr">
                            <path fill="currentColor" d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path>
                        </svg> */}
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

                        {/* <div onClick={this.togglePause}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="sc-1heco5p-1 bgoCaT">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path>
                            </svg>
                        </div> */}
                        {/* <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="step-forward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="sc-1heco5p-2 zOEgw">
                            <path fill="currentColor" d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"></path>
                        </svg> */}
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
        </div>
        </div>
        )
    }
}

export default Musique;
