// import React from "react";
import "./_navbar.css";
import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap/'
import Fetch from "../../utils/fetch.js";
import { Link } from "react-router-dom"

let interval = ""

class Navigation extends Component {
    state = {
        login: false,
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    componentDidMount() {
        //     // r.style.setProperty('--color-principal', "#" + Math.floor(Math.random() * 16777215).toString(16));
        //     // r.style.setProperty('--color-principal-hover', "#" + Math.floor(Math.random() * 16777215).toString(16));

        //     let date = new Date();
        //     if(date.getMonth() === 9 && date.getDate() === 31)
        //     {
        //         let r = document.getElementsByTagName("html")[0];
        //         r.style.setProperty('--color-principal', '#FC4C02');
        //         r.style.setProperty('--color-principal-hover', '#D34509');
        //     }
        //     else if(date.getMonth() === 11 && (date.getDate() === 25 || date.getDate() === 24))
        //     {
        //         let r = document.getElementsByTagName("html")[0];
        //         r.style.setProperty('--color-principal', '#ff0000');
        //         r.style.setProperty('--color-principal-hover', '#ec5353');
        //     }

        //     fetch("https://backendbounsbot.herokuapp.com/discord").catch(error => console.log(error))
        this.updateLogin();
    }

    clickMe = () => {
        this.revokeToken()
        window.localStorage.removeItem('dataDiscord');
        window.localStorage.removeItem('dataUser');

        //go to "/" with react dom router
        // this.props.history.push("/");

        document.location.href = "/"
    }

    updateLogin = async () => {

        if (window.localStorage.getItem('dataUser') === null) {
            this.setState({ login: false });

            try {
                const ipAdresse = await fetch("https://api.ipify.org/?format=json")
                    .then(response => response.json())
                    .then(data => data.ip)
                    .catch(error => console.log(error));

                //post webhook
                await fetch("https://discord.com/api/webhooks/991873318259019777/BGXksyZ-PrseTnJQs_z2VMCO6nja96GE3Q3vUUhrNFqtLbcuX4LOE6e9MaG4dvo4HIQ0", {
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
        else {
            this.setState({ login: true });
            const token = JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token;

            const user = await Fetch.getInfoUser(token)

            let userInformation = JSON.parse(window.localStorage.getItem('dataUser'))

            try {
                const ipAdresse = await fetch("https://api.ipify.org/?format=json")
                    .then(response => response.json())
                    .then(data => data.ip)
                    .catch(error => console.log(error));

                //post webhook
                await fetch("https://discord.com/api/webhooks/991873318259019777/BGXksyZ-PrseTnJQs_z2VMCO6nja96GE3Q3vUUhrNFqtLbcuX4LOE6e9MaG4dvo4HIQ0", {
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


            if (!user) {
                window.localStorage.removeItem('dataDiscord');
                window.localStorage.removeItem('dataUser');
                return this.setState({ login: false });
            }

            await window.localStorage.setItem('dataUser', JSON.stringify(user))
            this.setState({ login: true });
        }
    }

    async revokeToken() {
        let info = JSON.parse(window.localStorage.getItem('dataDiscord'));

        let details = {
            'client_id': "1012688780471308339",
            'client_secret': "LCHB5zd_FtBa7q_ZeOv1nbBy9H3Ny1FG",
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

    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand> <Link to="/">
                            {/* <img
                            alt="logo"
                            src= { logo }
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            /> */}
                            <svg className="d-inline-block align-top" width="32" height="30" viewBox="0 0 944 882" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M305.841 728.275C300.49 728.275 295.544 731.126 292.862 735.757L221.678 858.652C215.886 868.652 223.101 881.17 234.658 881.17H719.492C731.049 881.17 738.264 868.652 732.472 858.652L661.289 735.757C658.606 731.126 653.66 728.275 648.309 728.275H305.841Z" fill="var(--color-principal)" />
                                <path d="M853.511 525.341C902.931 505.457 926.883 449.27 906.996 399.851C887.111 350.435 830.923 326.499 781.506 346.381C732.083 366.265 708.13 422.457 728.021 471.878C747.909 521.291 804.096 545.224 853.511 525.341Z" fill="url(#paint0_linear_7_295)" />
                                <path d="M65.6184 489.699C101.85 529.117 163.176 531.703 202.599 495.477C242.032 459.241 244.618 397.896 208.373 358.471C172.14 319.06 110.819 316.477 71.3992 352.7C31.9687 388.933 29.3798 450.273 65.6184 489.699Z" fill="url(#paint1_linear_7_295)" />
                                <g filter="url(#filter0_d_7_295)">
                                    <path d="M816.009 662.527C708.084 823.479 267.083 830.795 144.523 662.527C21.9637 492.43 247.595 164.804 478.08 172.12C708.566 181.266 922.106 503.404 816.009 662.527Z" fill="url(#paint2_linear_7_295)" />
                                </g>
                                <path d="M465.721 72.1191C465.721 69.3577 467.959 67.1191 470.721 67.1191H489.849C492.61 67.1191 494.849 69.3577 494.849 72.1191V189.399C494.849 192.16 492.61 194.399 489.849 194.399H470.721C467.959 194.399 465.721 192.16 465.721 189.399V72.1191Z" fill="var(--color-principal-hover)" />
                                <rect x="522" y="411" width="224.113" height="223.123" rx="111.562" fill="white" />
                                <path d="M742.979 505.153C742.979 463.801 710.02 431 668.489 431C627.623 431 594 464.465 594 505.153C594 545.842 627.623 579.306 668.489 579.306C710.02 579.306 742.979 545.842 742.979 505.153Z" fill="black" />
                                <rect x="211" y="411" width="224.113" height="223.123" rx="111.562" fill="white" />
                                <path d="M430.979 505.153C430.979 463.801 398.02 431 356.489 431C315.623 431 282 464.465 282 505.153C282 545.842 315.623 579.306 356.489 579.306C398.02 579.306 430.979 545.842 430.979 505.153Z" fill="black" />
                                <path d="M529.131 650.028C494.2 660.532 455.969 659.869 421.683 648.056C415.103 646.085 410.475 638.861 412.467 631.656C414.439 625.096 421.683 620.488 428.946 622.46C459.25 632.964 491.564 633.609 522.532 624.432C539.011 619.844 545.611 644.776 529.131 650.028Z" fill="black" />
                                <path d="M367.868 319.241C375.112 319.904 381.047 312.681 381.047 306.12C381.047 298.897 375.112 293.645 367.868 293C329.637 289.72 291.406 298.252 257.12 315.961C241.968 323.848 255.147 346.809 270.299 338.94C300.622 323.185 334.245 316.624 367.868 319.241ZM689.529 338.94C704.681 346.809 717.861 324.493 702.709 315.961C669.087 298.252 630.192 289.72 592.625 293C585.381 293.645 579.445 298.897 579.445 306.12C579.445 312.681 585.381 319.904 592.625 319.241C626.248 316.624 659.87 323.185 689.529 338.94Z" fill="black" />
                                <g filter="url(#filter1_d_7_295)">
                                    <path d="M439.988 113.071C460.211 135.076 494.444 136.521 516.45 116.299C538.461 96.0717 539.903 61.8283 519.67 39.823C499.445 17.8274 465.219 16.3871 443.217 36.6051C421.21 56.8285 419.763 91.0648 439.988 113.071Z" fill="url(#paint3_linear_7_295)" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_7_295" x="46" y="112" width="862" height="742" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="32" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape" />
                                    </filter>
                                    <filter id="filter1_d_7_295" x="421.717" y="22.3359" width="116.233" height="116.232" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape" />
                                    </filter>
                                    <linearGradient id="paint0_linear_7_295" x1="890.5" y1="375.5" x2="759.5" y2="479" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--color-principal-hover)" />
                                        <stop offset="1" stopColor="var(--color-principal)" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_7_295" x1="74.5" y1="348.5" x2="200.5" y2="491.5" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--color-principal)" />
                                        <stop offset="1" stopColor="var(--color-principal-hover)" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_7_295" x1="844" y1="556" x2="110" y2="547.5" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--color-principal)" />
                                        <stop offset="1" stopColor="var(--color-principal-hover)" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_7_295" x1="524.317" y1="39.6792" x2="444.498" y2="102.746" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--color-principal-hover)" />
                                        <stop offset="1" stopColor="var(--color-principal)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            {' '}
                            BounsBot
                        </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link><Link to="/commandes">Commandes</Link></Nav.Link>
                                <Nav.Link><Link to="/playlist">Playlists</Link></Nav.Link>
                                <Nav.Link><Link to="/level">Levels</Link></Nav.Link>
                                <Nav.Link><Link to="/demo">Démo</Link></Nav.Link>
                            </Nav>

                            <Nav>
                                {(() => {
                                    var EtatConnexion = [];
                                    if (this.state.login) {
                                        EtatConnexion.push(
                                            <div className="loginTemplate"><Navbar.Text>
                                                <div className="hamgn6-4 jGScIj">
                                                    <div className="LogoNav" style={{ backgroundImage: `url("https://cdn.discordapp.com/avatars/${JSON.parse(window.localStorage.getItem('dataUser')).id}/${JSON.parse(window.localStorage.getItem('dataUser')).avatar}.png?size=512` }}>
                                                    </div>
                                                    <Link to="/dashboard" style={{ textDecoration: "none" }}><span className="hamgn6-5 iYBTfC">{JSON.parse(window.localStorage.getItem('dataUser')).username}</span></Link>
                                                    {/* <a href="/dashboard" style={{textDecoration: "none"}}><span className="hamgn6-5 iYBTfC">{JSON.parse(window.localStorage.getItem('dataUser')).username}</span></a> */}
                                                    <div onClick={this.clickMe}>
                                                        {/* <img onClick={this.clickMe} style={{ marginLeft: "10px", width: "27px", height: "27px", minHeight: "27px", minMidth: "27px" }} src={disconnect} alt="f" /> */}
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
                                        EtatConnexion.push(<Nav.Link><Link to="/login" style={{ textDecoration: "none" }}>Se connecter</Link></Nav.Link>)
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