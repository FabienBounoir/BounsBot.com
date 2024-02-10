import { useEffect, useState } from "react";
import "./_featurenew.css";
import { useTranslation } from "react-i18next";

export const Feature = ({ featureElement }) => {
    const { t } = useTranslation();

    const [actualFeature, setActualFeature] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActualFeature((prev) => (prev + 1) % featureElement.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="features__container__card">
            <div className="features__container__card__description">
                <div className="features__container__card__item">
                    <h2>{featureElement[actualFeature].title}</h2>
                    <p>{featureElement[actualFeature].description}</p>
                    <div className="features__container__card__button">
                        <a href="#">En savoir plus</a>
                        <a href="#">Essayer</a>
                    </div>
                </div>
            </div>
            <div className="features__container__card__image" style={{ backgroundImage: `url(${featureElement[actualFeature].img})` }} />
            <div className="features__container__background" ></div>
        </div>
    )
}