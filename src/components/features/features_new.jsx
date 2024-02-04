import "./_featurenew.css";

import achievement from "../../assets/picture/features/achievementTemplate.webp";
import engagement from "../../assets/picture/features/engagementTemplate.webp";
import gameDuo from "../../assets/picture/features/gameDuoTemplate.webp";
import game from "../../assets/picture/features/gameTemplate.webp";
import logsMessage from "../../assets/picture/features/logsMessageTemplate.webp";
import logsVocaux from "../../assets/picture/features/logsVocauxTemplate.webp";
import logsUser from "../../assets/picture/features/logsUserTemplate.webp";
import music from "../../assets/picture/features/musicTemplate.webp";
import quiz from "../../assets/picture/features/quizTemplate.webp";
import radio from "../../assets/picture/features/radioTemplate.webp";
import support from "../../assets/picture/features/supportTemplate.webp";
import ticket from "../../assets/picture/features/ticketTemplate.webp";
import transcript from "../../assets/picture/features/transcriptTemplate.webp";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { FeatureImage } from "./featuresImage";

export const Features = () => {
    const { t } = useTranslation();


    return (<>
        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Commande /imagine</p>
                    <h2>Générer 🔥 images</h2>
                </div>
                <p>Que tu génères une composition pour un dessin, imagine quelque chose d'irréel ou que tu métrais simplement des lolcats autour de ton ami, /imagine rend tout cela possible</p>
                <div className="features__container__card">
                    <div className="features__container__card__description">
                        <div className="features__container__card__item">
                            <h2>Commande /imagine</h2>
                            <p>Explore les possibilités infinies grâce à la puissance de l'IA. Tape simplement tes mots descriptifs et regarde la commande "/ imagine" traduire tes idées en visuels captivants, adaptés à ton imagination</p>
                            <div className="features__container__card__button">
                                <a href="#">En savoir plus</a>
                                <a href="#">Essayer</a>
                            </div>
                        </div>
                    </div>
                    <div className="features__container__card__image" />
                    <div className="features__container__background" ></div>
                </div>
            </div>

            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Commande /imagine</p>
                    <h2>Générer 🔥 images</h2>
                </div>
                <p>Que tu génères une composition pour un dessin, imagine quelque chose d'irréel ou que tu métrais simplement des lolcats autour de ton ami, /imagine rend tout cela possible</p>
                <div className="features__container__card reverted">
                    <div className="features__container__card__image" />
                    <div className="features__container__card__description">
                        <div className="features__container__card__item">
                            <h2>Commande /imagine</h2>
                            <p>Explore les possibilités infinies grâce à la puissance de l'IA. Tape simplement tes mots descriptifs et regarde la commande "/ imagine" traduire tes idées en visuels captivants, adaptés à ton imagination</p>
                            <div className="features__container__card__button">
                                <a href="#">En savoir plus</a>
                                <a href="#">Essayer</a>
                            </div>
                        </div>
                    </div>
                    <div className="features__container__background" ></div>
                </div>
            </div>

            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Commande /imagine</p>
                    <h2>Générer 🔥 images</h2>
                </div>
                <p>Que tu génères une composition pour un dessin, imagine quelque chose d'irréel ou que tu métrais simplement des lolcats autour de ton ami, /imagine rend tout cela possible</p>
                <div className="features__container__card">
                    <div className="features__container__card__description">
                        <div className="features__container__card__item">
                            <h2>Commande /imagine</h2>
                            <p>Explore les possibilités infinies grâce à la puissance de l'IA. Tape simplement tes mots descriptifs et regarde la commande "/ imagine" traduire tes idées en visuels captivants, adaptés à ton imagination</p>
                            <div className="features__container__card__button">
                                <a href="#">En savoir plus</a>
                                <a href="#">Essayer</a>
                            </div>
                        </div>
                    </div>
                    <div className="features__container__card__image" />
                    <div className="features__container__background" ></div>
                </div>
            </div>

        </div>


    </>
    )
}