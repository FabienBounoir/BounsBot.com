import "./_welcomeConfig.css";
import React, { Component, useState } from 'react'
import { Form } from 'react-bootstrap/'

class WelcomeConfig extends Component {
    state = {
        welcomeActive: false,
        welcomeMessage: "",
        status: "",
        color: {color: "#18c238"},
    }

    componentDidMount() {
        console.log("testttt", this.props.guild)

        this.getWelcomeConfig(this.props.guild)
    }

    getWelcomeConfig = async (guildId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        try
        {
            const welcomeConfig = await fetch("http://localhost:3001/guild/" + guildId + "/welcomemessage", {
                headers: myHeaders,
                method: "GET",
                redirect: "follow"
            })
    
            const welcomeConfigJson = await welcomeConfig.json()
    
            console.log(welcomeConfigJson.welcomeConfig)
    
            this.setState({
                welcomeActive: await welcomeConfigJson.welcomeConfig.welcomeActive,
                welcomeMessage: await welcomeConfigJson.welcomeConfig.welcomeMessage
            })
        }
        catch(error)
        {
            console.log(error)
        }
    }

    updateWelcomeConfig = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        console.log(this.state.welcomeMessage, this.state.welcomeActive)

        try{
            const welcomeConfig = await fetch("http://localhost:3001/guild/" + this.props.guild + "/welcomemessage", {
                headers: myHeaders,
                method: "PUT",
                body: JSON.stringify({
                    guildId: this.props.guild,
                    welcomeActive: this.state.welcomeActive,
                    welcomeMessage: this.state.welcomeMessage
                }),
                redirect: "follow"
            })
    
            const welcomeConfigJson = await welcomeConfig.json()

            if(welcomeConfigJson.success)
            {
                this.setState({
                    status: "Sauvegarde avec succès",
                    color: {color: "#18c238"}
                })
            }
            else
            {
                this.setState({
                    status: "Échec de la sauvegarde",
                    color: {color: "#de3b45"}
                })
                console.log(welcomeConfigJson.erreur)
            }

            setTimeout(() => {
                this.setState({
                    status: "",
                    color: {color: "#18c238"}
                })
            }, 5000)


            console.log(welcomeConfigJson)
        }
        catch(error){
            console.log(error)
        }
    }

    render() {
        return (
        <div style={{marginBottom: "60px"}} >
            <div style={{justifyContent: "center", marginBottom: "30px"}} className="top">
                <h1>Welcome Message</h1> 
                <p className="newModule">Nouveau</p>
            </div>   
            <div className={ this.state.welcomeActive ? "WelcomeComponente" : 'WelcomeComponente flou'} >
                <div className="embed">
                    <div>
                        <div className="embedAuthor">
                            <span className="iconEmbed"></span>
                            Nom du serveur
                        </div>
                        <textarea id="messageWelcome" disabled={!this.state.welcomeActive} style={{Background: "#313442"}} className="embedDescripton" rows="6" placeholder="Message to send" value={this.state.welcomeMessage} onChange={event => {console.log(event.target);this.setState({ welcomeMessage: event.target.value })}} />
                    </div>
                    <div>
                        <span className="thumbnailEmbed"></span>
                    </div>
                </div>
                {
                    this.state.status !== "" ?
                    (<div className="interactionEmbed">
                        <svg style={this.state.color} aria-hidden="false" width="20" height="20" viewBox="0 0 20 20"><path d="M10 0C4.486 0 0 4.486 0 10C0 15.515 4.486 20 10 20C15.514 20 20 15.515 20 10C20 4.486 15.514 0 10 0ZM9 4H11V11H9V4ZM10 15.25C9.31 15.25 8.75 14.691 8.75 14C8.75 13.31 9.31 12.75 10 12.75C10.69 12.75 11.25 13.31 11.25 14C11.25 14.691 10.69 15.25 10 15.25Z" fill-rule="evenodd" clipRule="evenodd" fill="currentColor"></path></svg>
                        <span style={this.state.color}>{this.state.status}</span>
                    </div>)
                    :
                    ("")

                }
            </div>
            <div className="configWelcomeEmbed" >
                <div style={{display: "flex", color: "white"}}>
                    <Form.Check className="picto" type="switch" id="custom-switch success" onChange={() => { this.setState({ welcomeActive: !this.state.welcomeActive }) }} checked={this.state.welcomeActive} />
                    { this.state.welcomeActive ? "Activé" : "Désactivé" }
                </div>
                <button className="sendButton" onClick={this.updateWelcomeConfig}>Enregistrer</button>
            </div>
        </div>
        )
    }
}

export default WelcomeConfig;

