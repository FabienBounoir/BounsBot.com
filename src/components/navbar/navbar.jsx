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
        this.updateLogin();
        fetch("https://backendbounsbot.herokuapp.com/discord")
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
            return this.setState({ login: false });
        }
        else
        {            
            const token = JSON.parse(window.localStorage.getItem('dataDiscord')).access_token;
    
            const user = await Fetch.getInfoUser(token)
    
            if(!user)
            {
                window.localStorage.removeItem('dataDiscord');
                window.localStorage.removeItem('dataUser');
                return this.setState({ login: false });
            }
            
            await window.localStorage.setItem('dataUser',JSON.stringify(user))
            return this.setState({ login: true });
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
                                // EtatConnexion.push(
                                //     <div className="loginTemplate"><Navbar.Text className="loginTemplate">
                                //         <a href="/login" style={{textDecoration: "none"}}><div className="hamgn6-4 jGScIj">
                                //             <span className="hamgn6-5 iYBTfC">Se connecter</span>
                                //         </div></a>
                                //     </Navbar.Text></div>)

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


//  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       <Navbar.Brand href="#home">
//         <Logo
//           alt=""
//           width="30"
//           height="30"
//           className="d-inline-block align-top"
//         />
//         Dice Roller
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//       <Navbar.Collapse id="responsive-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Link href="#features">Features</Nav.Link>
//           <Nav.Link href="#pricing">Pricing</Nav.Link>
//           <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.2">
//               Another action
//             </NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item href="#action/3.4">
//               Separated link
//             </NavDropdown.Item>
//           </NavDropdown>
//         </Nav>
//         <Nav>
//           <Nav.Link href="#deets">More deets</Nav.Link>
//           <Nav.Link eventKey={2} href="#memes">
//             Dank memes
//           </Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar> 


//     <Navbar bg="dark" variant="dark">
//     <Container>
//         <Navbar.Brand href="/">
//             <img
//             alt="logo"
//             src= { logo }
//             width="30"
//             height="30"
//             className="d-inline-block align-top"
//             />{' '}
//         BounsBot
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="me-auto">
//             <Nav.Link href="/commandes">Commandes</Nav.Link>
//             {/* <Nav.Link href="/playlist">Playlist</Nav.Link> */}
//             <Nav.Link href="/level">Levels</Nav.Link>
//         </Nav>
//         </Navbar.Collapse>
//         {(() => {
//             var EtatConnexion = [];
//             if(this.state.login)
//             {
//                 EtatConnexion.push(
//                     <div className="loginTemplate"><Navbar.Text>
//                         <div className="hamgn6-4 jGScIj">
//                             <div className="LogoNav" style={{backgroundImage: `url("https://cdn.discordapp.com/avatars/${JSON.parse(window.localStorage.getItem('dataUser')).id}/${JSON.parse(window.localStorage.getItem('dataUser')).avatar}.png?size=512`}}>
//                             </div>
//                             <a href="/dashboard" style={{textDecoration: "none"}}><span className="hamgn6-5 iYBTfC">{JSON.parse(window.localStorage.getItem('dataUser')).username}</span></a>
//                             <div><img onClick={this.clickMe} style={{marginLeft:"10px",width: "27px", height: "27px", minHeight: "27px", minMidth: "27px"}} src={disconnect} alt="f"/></div>
//                         </div>
//                     </Navbar.Text></div>)
//             }
//             else
//             {
//                 EtatConnexion.push(
//                     <div className="loginTemplate"><Navbar.Text className="loginTemplate">
//                         <a href="/login" style={{textDecoration: "none"}}><div className="hamgn6-4 jGScIj">
//                             <span className="hamgn6-5 iYBTfC">Se connecter</span>
//                         </div></a>
//                     </Navbar.Text></div>)
//             }

//             return EtatConnexion;
//         })()}
//     </Container>
// </Navbar>