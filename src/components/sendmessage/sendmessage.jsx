import "./_sendmessage.css";
import React, { Component } from 'react'
import { Form } from 'react-bootstrap/'

class SendMessage extends Component {
    state = {
        channelTextuelGuild: this.props.channel,
        channelSelect: "0"
    }

    getChannelGuild = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let url = process.env.REACT_APP_HOSTNAME_BACKEND

        fetch(url + "/bot/getchannels/" + this.props.guild, requestOptions)
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    channelTextuelGuild: result.channels?.filter(channel => channel.type === "text")
                });
            })
            .catch(console.log)
    };

    sendMessage = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        var raw = await JSON.stringify({
            "guildId": this.props.guild,
            "channel": this.state.channelSelect,
            "message": document.getElementById('messageToSend').value
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let url = process.env.REACT_APP_HOSTNAME_BACKEND

        fetch(url + "/bot/sendto/", requestOptions)
            .then(response => response.json())
            .then((result) => {
                if (result.message) {
                    document.getElementById('messageToSend').value = ""
                }
            })
            .catch(console.log)
    }

    render() {
        return (
            <div style={{ marginBottom: "60px" }} >
                <div style={{ justifyContent: "center", marginBottom: "30px" }} className="top">
                    <h1>Envoyer un Message</h1>
                </div>

                <div className="embedMessage">
                    <Form.Control size="lg" id="messageToSend" type="text" placeholder="Code createur Bad-bouns" />
                    <Form.Select value={this.state.channelSelect} onChange={(event) => { this.setState({ channelSelect: event.target.value }) }}>
                        {(() => {
                            var option = [];

                            for (let value of this.state.channelTextuelGuild) {
                                option.push(<option value={value.id}>{value.name}</option>)
                            }

                            option.push(<option value="0" selected>Choisi un Channel</option>)

                            return option;
                        })()}
                    </Form.Select>
                    <button className="sendButton" onClick={this.sendMessage}>Envoyer</button>
                </div>
            </div>
        )
    }
}

export default SendMessage;
