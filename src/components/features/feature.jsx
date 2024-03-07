import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom/cjs/react-router-dom";

export const Feature = ({ featureElement, revert }) => {
    const { t } = useTranslation();

    const [actualFeature, setActualFeature] = useState(0);

    useEffect(() => {
        setActualFeature(Math.floor(Math.random() * featureElement?.length));
    }, []);

    const moveTo = (page) => {

    }

    return (
        <div className={"features__container__card" + (revert ? " reverted" : "")}>
            {revert && <div className="features__container__card__image" style={{ backgroundImage: `url(${featureElement[actualFeature].img})` }} />}

            <div className="features__container__card__description">
                <div className="features__container__card__item">
                    <h2>{t(featureElement[actualFeature].title)}</h2>
                    <p>{t(featureElement[actualFeature].description)}</p>
                    <div className="features__container__card__button">
                        <a href={"https://discord.com/api/oauth2/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID + "&permissions=1945627743&scope=bot%20applications.commands"}>{t("homepage.invite_button")}</a>
                        {featureElement[actualFeature].module && <Link to={"/commands?module=" + featureElement[actualFeature].module} >{t("homepage.learn_more")}</Link>}
                    </div>
                </div>
            </div>

            {!revert && <div className="features__container__card__image" style={{ backgroundImage: `url(${featureElement[actualFeature].img})` }} />}
            <div className="features__container__background" ></div>
        </div >
    )
}