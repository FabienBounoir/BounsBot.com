// import React from "react";
import "./_navbar.css";
import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap/'
import { Link } from "react-router-dom"
import Avatar from "../avatar/avatar";
import { useTranslation } from "react-i18next";
import { getUser } from "../../utils/API/authAPI";

export const Navigation = () => {
    const { t } = useTranslation();

    const [login, setlogin] = useState(false)

    useEffect(() => {
        updateLogin();
    }, []);

    const clickMe = () => {
        revokeToken()
        window.localStorage.removeItem('dataDiscord');
        window.localStorage.removeItem('user');

        document.location.href = "/"
    }

    const updateLogin = async () => {

        if (window.localStorage.getItem('user') === null) {
            setlogin(false)
        }
        else {
            try {
                const user = await getUser()

                if (!user) {
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('tokenType');
                    window.localStorage.removeItem('user');
                    return setlogin(false)
                }

                await window.localStorage.setItem('user', JSON.stringify(user))
                setlogin(true)
            }
            catch (e) {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('tokenType');
                window.localStorage.removeItem('user');
                setlogin(false)
            }
        }
    }

    const revokeToken = async () => {
        let info = JSON.parse(window.localStorage.getItem('dataDiscord'));

        let details = {
            'client_id': process.env.REACT_APP_CLIENT_ID,
            'client_secret': process.env.REACT_APP_CLIENT_SECRET,
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
            headers: headers
        });
    }

    const eventClick = () => {
        if (window.innerWidth <= 768) {
            document.getElementById("buttonToggleNav").click();
        }
    }

    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand> <Link to="/" onClick={() => { eventClick() }}>
                        <Avatar classElement="d-inline-block align-top" width="32" height="30" />
                        {' '}
                        <span style={{ color: "white", fontFamily: "Bebas Neue, sans-serif", letterSpacing: "3px", fontWeight: "900" }}>Bouns'Bot</span>
                    </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" id="buttonToggleNav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/commands" onClick={() => { eventClick() }}>{t("title.commands")}</Nav.Link>
                            <Nav.Link as={Link} to="/level" onClick={() => { eventClick() }}>{t("title.levels")}</Nav.Link>
                            <Nav.Link as={Link} to="/status" onClick={() => { eventClick() }}>{t("title.status")}</Nav.Link>
                            <Nav.Link as={Link} to="/demo" onClick={() => { eventClick() }}>{t("title.demo")}</Nav.Link>
                        </Nav>

                        <Nav>
                            {(() => {
                                var EtatConnexion = [];
                                if (login) {
                                    EtatConnexion.push(
                                        <div key="45678" className="login-template"><Navbar.Text>
                                            <div className="login_button_container">
                                                <div className="goToDashboard">
                                                    <div className="LogoNav" style={{ backgroundImage: `url("https://cdn.discordapp.com/avatars/${JSON.parse(window.localStorage.getItem('user')).id}/${JSON.parse(window.localStorage.getItem('user')).avatar}.png?size=512` }}>
                                                    </div>
                                                    <Link onClick={() => { eventClick() }} to="/dashboard/user/description" style={{ textDecoration: "none" }}><span className="hamgn6-5 dashboard_button">{JSON.parse(window.localStorage.getItem('user')).global_name || JSON.parse(window.localStorage.getItem('user')).username}</span></Link>
                                                </div>
                                                <div className="logoutButton" onClick={() => { clickMe() }}>
                                                    <svg style={{ marginLeft: "10px", width: "27px", height: "27px", minHeight: "27px", minMidth: "27px" }} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M192 256C192 220.715 220.715 192 256 192H341.333V21.333C341.333 9.557 331.797 0 320 0H21.333C9.536 0 0 9.557 0 21.333V490.666C0 502.442 9.536 511.999 21.333 511.999H320C331.797 511.999 341.333 502.442 341.333 490.666V341.333V320H256C220.715 320 192 291.285 192 256Z"
                                                            fill="url(#paint0_linear_117_53)" />
                                                        <path
                                                            d="M507.201 269.477C507.266 269.398 507.32 269.313 507.383 269.233C507.749 268.771 508.104 268.3 508.431 267.808C508.585 267.578 508.715 267.338 508.859 267.103C509.075 266.75 509.296 266.4 509.491 266.034C509.652 265.734 509.787 265.424 509.932 265.118C510.082 264.801 510.241 264.489 510.376 264.164C510.521 263.814 510.639 263.457 510.764 263.102C510.868 262.807 510.983 262.517 511.074 262.216C511.201 261.798 511.298 261.375 511.399 260.952C511.458 260.704 511.53 260.461 511.581 260.21C511.698 259.629 511.78 259.044 511.848 258.457C511.86 258.356 511.881 258.258 511.891 258.156C512.036 256.722 512.036 255.276 511.891 253.842C511.881 253.74 511.859 253.642 511.848 253.541C511.78 252.954 511.697 252.369 511.581 251.788C511.531 251.537 511.459 251.294 511.399 251.046C511.298 250.623 511.201 250.199 511.074 249.782C510.983 249.481 510.868 249.191 510.764 248.896C510.638 248.541 510.521 248.183 510.376 247.834C510.241 247.509 510.083 247.197 509.932 246.88C509.787 246.574 509.652 246.265 509.491 245.964C509.295 245.598 509.075 245.248 508.859 244.895C508.715 244.66 508.585 244.42 508.431 244.19C508.104 243.698 507.749 243.227 507.383 242.765C507.32 242.685 507.266 242.601 507.201 242.521C506.721 241.932 506.21 241.37 505.67 240.836L420.416 155.582C412.075 147.241 398.592 147.241 390.251 155.582C381.91 163.923 381.91 177.406 390.251 185.747L439.168 234.664H256C244.203 234.664 234.667 244.221 234.667 255.997C234.667 267.773 244.203 277.33 256 277.33H439.168L390.251 326.247C381.91 334.588 381.91 348.071 390.251 356.412C394.411 360.572 399.872 362.663 405.334 362.663C410.795 362.663 416.257 360.572 420.417 356.412L505.671 271.158C506.209 270.628 506.72 270.066 507.201 269.477Z"
                                                            fill="url(#paint1_linear_117_53)" />
                                                        <defs>
                                                            <linearGradient id="paint0_linear_117_53" x1="0.333333" y1="252" x2="342.04" y2="255.334"
                                                                gradientUnits="userSpaceOnUse">
                                                                <stop style={{ stopColor: "var(--color-principal)" }} /> {/* "#22DE04" */}
                                                                <stop offset="1" style={{ stopColor: "var(--color-principal-hover)" }} /> {/* "#107100" */}
                                                            </linearGradient>
                                                            <linearGradient id="paint1_linear_117_53" x1="234.938" y1="254.328" x2="512.501" y2="259.608"
                                                                gradientUnits="userSpaceOnUse">
                                                                <stop style={{ stopColor: "var(--color-principal)" }} /> {/* "#22DE04" */}
                                                                <stop offset="1" style={{ stopColor: "var(--color-principal-hover)" }} /> {/* "#107100" */}
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                        </Navbar.Text></div>)
                                }
                                else {
                                    EtatConnexion.push(<a href={process.env.REACT_APP_OAUTH2_LINK} style={{ textDecoration: "none", color: "var(--color-principal)", padding: "0.5rem 1rem", cursor: "pointer" }} key="948509" onClick={() => { eventClick() }}>{t("title.login")}</a>)
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

export default Navigation;