import "./_footer.css";
import { Link } from "react-router-dom"
import Avatar from "../avatar/avatar";

export const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <Avatar classElement="logo" width="100" height="93" />
                        </div>

                        <div className="column">
                            <h5>Bouns'bot</h5>
                            <p>
                                <Link to="/a-propos" style={{ textDecoration: "none" }}>Our history</Link>
                            </p>
                            <p>
                                <Link to="/bot/terms" style={{ textDecoration: "none" }}>Terms of Service</Link>
                            </p>
                            <p>
                                <Link to="/bot/privacy" style={{ textDecoration: "none" }}>Privacy Policy</Link>
                            </p>
                            <p>
                                <a href="https://discord.gg/KxedRVTutX">Support server</a>
                            </p>
                        </div>

                        <div className="column">
                            <h5>Site</h5>
                            <p>
                                <Link to="/bot/terms" style={{ textDecoration: "none" }}>Terms of Service</Link>
                            </p>
                            <p>
                                <Link to="/bot/privacy" style={{ textDecoration: "none" }}>Privacy Policy</Link>
                            </p>
                            <p>
                                <a href="https://github.com/FabienBounoir/BounsBot-Front">Source code</a>
                            </p>
                        </div>
                    </div>
                    {/* //Copyright */}
                </div>
            </div >
            <div className="footer-bottom">
                <p>
                    Copyright © 2021 - {new Date().getFullYear()} Bouns'bot
                </p>
                <p>
                    Tous droits réservés
                </p>
            </div>
        </>
    )
}

export default Footer;