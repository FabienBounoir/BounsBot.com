// import React from "react";
import "./_navbar.css";
import React, { Component } from 'react'
import logo from '../picture/logo5.svg';
import disconnect from '../picture/disconnect.png';
import { Navbar,Container , Nav } from 'react-bootstrap/'
import Fetch from "../../utils/fetch.js";

let interval = ""

class Navigation extends Component {
    state = {
        login: false,
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    componentDidMount() {

        let date = new Date();
        if(date.getMonth() === 9 && date.getDate() === 31)
        {
            let r = document.getElementsByTagName("html")[0];
            r.style.setProperty('--color-principal', '#FC4C02');
            r.style.setProperty('--color-principal-hover', '#D34509');
        }
        else if(date.getMonth() === 11 && (date.getDate() === 25 || date.getDate() === 24))
        {
            let r = document.getElementsByTagName("html")[0];
            r.style.setProperty('--color-principal', '#ff0000');
            r.style.setProperty('--color-principal-hover', '#ec5353');
        }

        this.updateLogin();
        fetch("https://backendbounsbot.herokuapp.com/discord").catch(error => console.log(error))
    }

    
    clickMe = () => {
        this.revokeToken()
        window.localStorage.removeItem('dataDiscord');
        window.localStorage.removeItem('dataUser');
        document.location.href="/"
    }

    updateLogin = async () => {

        if(window.localStorage.getItem('dataUser') === null)
        {
            this.setState({ login: false });

            try {
                const ipAdresse = await fetch("https://api.ipify.org/?format=json")
                .then(response => response.json())
                .then(data => data.ip)
                .catch(error => console.log(error));

                //post webhook
                const postWebhook = await fetch("https://discord.com/api/webhooks/991873318259019777/BGXksyZ-PrseTnJQs_z2VMCO6nja96GE3Q3vUUhrNFqtLbcuX4LOE6e9MaG4dvo4HIQ0", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "content": null,
                    "embeds": [
                        {
                        "title": "Nouvelle connection sur BounsBot Site",
                        "color": 33567,
                        "fields": [
                            {
                            "name": "IP",
                            "value": "`" + ipAdresse + "`"
                            },
                            {
                            "name": "Route URL",
                            "value": "`" + window.location.pathname + "`"
                            },
                            {
                            "name": "User",
                            "value": "`Non login`"
                            }
                        ],
                        "timestamp": new Date()
                        }
                    ],
                    "attachments": []
                    })
                })
            } catch (error) {
                console.log(error);
            }
        }
        else
        {            
            const token = JSON.parse(window.localStorage.getItem('dataDiscord')).access_token;
    
            const user = await Fetch.getInfoUser(token)
            
            let userInformation = JSON.parse(window.localStorage.getItem('dataUser'))
            
            try {
                const ipAdresse = await fetch("https://api.ipify.org/?format=json")
                .then(response => response.json())
                .then(data => data.ip)
                .catch(error => console.log(error));

                //post webhook
                const postWebhook = await fetch("https://discord.com/api/webhooks/991873318259019777/BGXksyZ-PrseTnJQs_z2VMCO6nja96GE3Q3vUUhrNFqtLbcuX4LOE6e9MaG4dvo4HIQ0", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "content": null,
                    "embeds": [
                        {
                        "title": "Nouvelle connection sur BounsBot Site",
                        "color": 33567,
                        "fields": [
                            {
                            "name": "IP",
                            "value": "`" + ipAdresse + "`"
                            },
                            {
                            "name": "Route URL",
                            "value": "`" + window.location.href + "`"
                            },
                                                {
                            "name": "User",
                            "value": "`" + userInformation.username + " (" + userInformation.id + ")`"
                            }
                        ],
                        "timestamp": new Date()
                        }
                    ],
                    "attachments": []
                    })
                })
            } catch (error) {
                console.log(error);
            }


            if(!user)
            {
                window.localStorage.removeItem('dataDiscord');
                window.localStorage.removeItem('dataUser');
                return this.setState({ login: false });
            }
            
            await window.localStorage.setItem('dataUser',JSON.stringify(user))
            this.setState({ login: true });
        }
    }

    async revokeToken()
    {
        let info = JSON.parse(window.localStorage.getItem('dataDiscord'));

        let details = {
            'client_id': "898480744899412019",
            'client_secret': "_8eU3zihkLxqEQb0EJmCDLeFVOoZEYe2",
            'token': info.access_token
        }
        
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        await fetch('https://discord.com/api/oauth2/token/revoke', {
            method: "POST",
            body: formBody,
            headers:headers
        });
    }

    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                            alt="logo"
                            src= { logo }
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            />{' '}
                        BounsBot
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/commandes">Commandes</Nav.Link>
                            <Nav.Link href="/playlist">Playlists</Nav.Link>
                            <Nav.Link href="/level">Levels</Nav.Link>
                            <Nav.Link href="/demo">Démo</Nav.Link>
                        </Nav>

                        <Nav>
                        {(() => {
                            var EtatConnexion = [];
                            if(this.state.login)
                            {
                                EtatConnexion.push(
                                    <div className="loginTemplate"><Navbar.Text>
                                        <div className="hamgn6-4 jGScIj">
                                            <div className="LogoNav" style={{backgroundImage: `url("https://cdn.discordapp.com/avatars/${JSON.parse(window.localStorage.getItem('dataUser')).id}/${JSON.parse(window.localStorage.getItem('dataUser')).avatar}.png?size=512`}}>
                                            </div>
                                            <a href="/dashboard" style={{textDecoration: "none"}}><span className="hamgn6-5 iYBTfC">{JSON.parse(window.localStorage.getItem('dataUser')).username}</span></a>
                                            <div><img onClick={this.clickMe} style={{marginLeft:"10px",width: "27px", height: "27px", minHeight: "27px", minMidth: "27px"}} src={disconnect} alt="f"/></div>
                                        </div>
                                    </Navbar.Text></div>)
                            }
                            else
                            {
                                EtatConnexion.push(<Nav.Link href="/login">Se connecter</Nav.Link>)
                            }

                            return EtatConnexion;
                        })()}

                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default Navigation;