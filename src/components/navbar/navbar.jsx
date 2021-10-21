// import React from "react";
import "./_navbar.css";
import logo from '../picture/logo5.svg';
import disconnect from '../picture/disconnect.png';
import { Navbar,Container , Nav } from 'react-bootstrap/'

let clickMe = () => {
    window.localStorage.removeItem('dataDiscord');
    window.localStorage.removeItem('dataUser');
    document.location.href="/"
}

export const Navigation = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
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
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/commandes">Commandes</Nav.Link>
                        {/* <Nav.Link href="/playlist">Playlist</Nav.Link> */}
                        <Nav.Link href="/level">Level</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    {(() => {
                        var EtatConnexion = [];
                        if(window.localStorage.getItem('dataUser') && window.localStorage.getItem('dataUser').length != 0)
                        {
                            EtatConnexion.push(
                                <div className="loginTemplate"><Navbar.Text>
                                    <div class="hamgn6-4 jGScIj">
                                        <div className="LogoNav" style={{backgroundImage: `url("https://cdn.discordapp.com/avatars/${JSON.parse(window.localStorage.getItem('dataUser')).id}/${JSON.parse(window.localStorage.getItem('dataUser')).avatar}.png?size=512`}}>
                                        </div>
                                        <a href="/dashboard" style={{textDecoration: "none"}}><span class="hamgn6-5 iYBTfC">{JSON.parse(window.localStorage.getItem('dataUser')).username}</span></a>
                                        <div><img onClick={clickMe} style={{marginLeft:"10px",width: "27px", height: "27px", minHeight: "27px", minMidth: "27px"}} src={disconnect} alt="f"/></div>
                                    </div>
                                </Navbar.Text></div>)
                        }
                        else
                        {
                            EtatConnexion.push(
                                <div className="loginTemplate"><Navbar.Text className="loginTemplate">
                                    <a href="/login" style={{textDecoration: "none"}}><div class="hamgn6-4 jGScIj">
                                        <span class="hamgn6-5 iYBTfC">Se connecter</span>
                                    </div></a>
                                </Navbar.Text></div>)
                        }

                        return EtatConnexion;
                    })()}
                </Container>
            </Navbar>
        </>
    )
}