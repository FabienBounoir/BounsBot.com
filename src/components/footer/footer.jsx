import "./_footer.css";
import { Link } from "react-router-dom"
import Avatar from "../avatar/avatar";
import { useTranslation } from "react-i18next";

export const Footer = () => {
    const { t } = useTranslation();

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
                                <Link to="/a-propos" style={{ textDecoration: "none" }}>{t("footer.our_history")}</Link>
                            </p>
                            <p>
                                <Link to="/bot/terms" style={{ textDecoration: "none" }}>{t("footer.terms_of_service")}</Link>
                            </p>
                            <p>
                                <Link to="/bot/privacy" style={{ textDecoration: "none" }}>{t("footer.privacy_policy")}</Link>
                            </p>
                            <p>
                                <a href="https://discord.gg/KxedRVTutX">{t("footer.support_server")}</a>
                            </p>
                        </div>

                        <div className="column">
                            <h5>Site</h5>
                            <p>
                                <Link to="/bot/terms" style={{ textDecoration: "none" }}>{t("footer.terms_of_service")}</Link>
                            </p>
                            <p>
                                <Link to="/bot/privacy" style={{ textDecoration: "none" }}>{t("footer.privacy_policy")}</Link>
                            </p>
                            <p>
                                <a href="https://github.com/FabienBounoir/BounsBot-Front">{t("footer.source_code")}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
            <div className="footer-bottom">
                <p>
                    Copyright © 2021 - {new Date().getFullYear()} Bouns'bot
                </p>
                <p>
                    {t("footer.all_rights_reserved")}
                </p>
            </div>
        </>
    )
}

export default Footer;