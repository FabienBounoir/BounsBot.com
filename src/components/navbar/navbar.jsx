import "./_navbar.css";
import React, { useEffect, useState } from 'react'
import { Link, Router } from "react-router-dom"
import Avatar from "../avatar/avatar";
import { useTranslation } from "react-i18next";
import { getUser } from "../../utils/API/authAPI";
import * as authAPI from "../../utils/API/authAPI";
import { useStore } from "../../utils/store";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


export const Navigation = ({ props, sticky, background }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const [state, dispatch] = useStore()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        updateLogin();
    }, []);

    const clickMe = () => {
        authAPI.logout();
        history.push("/")

        dispatch({ logged: false, user: null })
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const updateLogin = async () => {
        if (window.localStorage.getItem('user')) {
            try {
                const user = await getUser()

                if (!user) {
                    dispatch({ logged: false, user: null })
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                }
                else dispatch({ logged: true, user })
            }
            catch (e) {
                dispatch({ logged: false, user: null })
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            }
        }
    }

    const eventClick = () => {
        if (window.innerWidth <= 900) {
            setOpen(false)
        }
    }

    return (
        <header className={(sticky ? "nav sticky " : "nav ") + (open ? "navMenuOpen" : "")} style={{ '--background': background }}>
            <div className="container">
                <div className="navigation">
                    <Link to="/" onClick={() => { eventClick() }}>
                        <Avatar classElement="d-inline-block align-top" width="32" height="30" />
                        {' '}
                        <span className="logoNavbar">Bouns'Bot</span>
                    </Link>
                    <div className="links">
                        <Link className="link" to="/commands" onClick={() => { eventClick() }}>{t("title.commands")}</Link>
                        <Link className="link" to="/level" onClick={() => { eventClick() }}>{t("title.levels")}</Link>
                        <Link className="link" to="/status" onClick={() => { eventClick() }}>{t("title.status")}</Link>
                        <Link className="link" to="/demo" onClick={() => { eventClick() }}>{t("title.demo")}</Link>
                    </div>
                </div>

                <div className="compte">
                    {(() => {
                        let EtatConnexion = [
                        ];
                        if (state && state?.logged) {
                            EtatConnexion.push(
                                <div className="login-template"><div>
                                    <div className="login_button_container">
                                        <div className={"goToDashboard " + (open ? "open" : "")} onClick={() => { setOpen(!open) }}>
                                            <div className="LogoNav" style={{ backgroundImage: `url("https://cdn.discordapp.com/avatars/${JSON.parse(window?.localStorage?.getItem?.('user') || {})?.id}/${JSON.parse(window?.localStorage?.getItem?.('user'))?.avatar}.png?size=256` }}>
                                            </div>
                                            <span className="hamgn6-5 dashboard_button">{JSON.parse(window.localStorage.getItem('user')).global_name || JSON.parse(window.localStorage.getItem('user')).username}</span>
                                            <svg className={open ? "rotate" : ""} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ltr:ml-1 rtl:mr-1 text-dark-200 transition-all scale-100"><path d="M7 14.5l5-5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                                        </div>

                                        <div className={"accountMenu " + (open ? "" : "hidden")}>
                                            <Link onClick={() => { eventClick() }} to="/dashboard/user/description" style={{ textDecoration: "none" }}><span>{t("title.dashboard")}</span></Link>
                                            <span onClick={() => { clickMe() }}>{t("title.disconnect")}</span>
                                        </div>
                                    </div>
                                </div></div>)
                        }
                        else {
                            EtatConnexion.push(<>
                                <a className="button-login-discord" href={process.env.REACT_APP_OAUTH2_LINK} onClick={() => { eventClick() }}>{t("title.login")}</a>
                                <button className=" navbar-toggler collapsed" onClick={() => { setOpen(!open) }}>
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </>)
                        }

                        EtatConnexion.push(<div id="buttonToggleNav">
                            <div className={"navigationMenu " + (open ? "hidden" : "")}>
                                <Link className="link" to="/commands" onClick={() => { eventClick() }}>{t("title.commands")}</Link>
                                <Link className="link" to="/level" onClick={() => { eventClick() }}>{t("title.levels")}</Link>
                                <Link className="link" to="/status" onClick={() => { eventClick() }}>{t("title.status")}</Link>
                                <Link className="link" to="/demo" onClick={() => { eventClick() }}>{t("title.demo")}</Link>

                                {(() => {
                                    let EtatConnexion = [];
                                    if (state && state?.logged) {
                                        EtatConnexion.push(
                                            <div className="divider"></div>
                                        )
                                        EtatConnexion.push(<>
                                            <Link className="link" to="/dashboard/user/description" onClick={() => { eventClick() }}>{t("title.dashboard")}</Link>
                                            <span className="link disconnect" onClick={() => { clickMe() }}>{t("title.disconnect")}</span>
                                        </>
                                        )
                                    }


                                    return EtatConnexion;
                                })()}

                            </div>
                        </div>)

                        return EtatConnexion;
                    })()}
                </div>

            </div>

        </header >
    )
}

export default Navigation;