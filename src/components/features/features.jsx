import "./_features.css";

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

export const Features = () => {
    const { t } = useTranslation();
    return (<>
        <div className="features">
            <div className="header">
                <h1>{t("feature.fonctionnality")}</h1>
                <svg width="24" height="47" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.002 21.067c-4.257-2.694-7.128-7.058-7.877-11.976L12.849.718A.855.855 0 0 0 12 0a.852.852 0 0 0-.849.718L9.875 9.091c-.749 4.918-3.62 9.282-7.877 11.976l-1.106.699a.838.838 0 0 0-.392.708v.052c0 .287.147.554.392.708l1.106.699c4.257 2.694 7.128 7.058 7.877 11.976l1.276 8.373A.855.855 0 0 0 12 45a.852.852 0 0 0 .849-.718l1.276-8.373c.749-4.918 3.62-9.282 7.877-11.976l1.106-.699a.838.838 0 0 0 .392-.708v-.052a.838.838 0 0 0-.392-.708l-1.106-.699Z" ></path></svg>
                <svg width="24" height="47" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.002 21.067c-4.257-2.694-7.128-7.058-7.877-11.976L12.849.718A.855.855 0 0 0 12 0a.852.852 0 0 0-.849.718L9.875 9.091c-.749 4.918-3.62 9.282-7.877 11.976l-1.106.699a.838.838 0 0 0-.392.708v.052c0 .287.147.554.392.708l1.106.699c4.257 2.694 7.128 7.058 7.877 11.976l1.276 8.373A.855.855 0 0 0 12 45a.852.852 0 0 0 .849-.718l1.276-8.373c.749-4.918 3.62-9.282 7.877-11.976l1.106-.699a.838.838 0 0 0 .392-.708v-.052a.838.838 0 0 0-.392-.708l-1.106-.699Z" ></path></svg>

            </div>
            <div className="feature">
                <div className="feature-container">
                    <div className="columns">
                        <div className="picture">
                            <img src={radio} alt="Reaction" />
                            <img src={music} alt="Reaction" />
                        </div>

                        <div className="articleContainer left">
                            <article className="article">
                                <h2>{t("feature.multimedia.name")}</h2>
                                <p>{t("feature.multimedia.description1")}<br /> {t("feature.multimedia.description2")}</p>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature">
                <div className="feature-container">
                    <div className="columns revertMobile">
                        <div className="articleContainer right">
                            <article className="article">
                                <h2>{t("feature.game.name")}</h2>
                                <p>{t("feature.multimedia.description1")}<br />{t("feature.multimedia.description2")}</p>
                            </article>
                        </div>

                        <div className="picture">
                            <img src={gameDuo} alt="Reaction" />
                            <img src={game} alt="Reaction" />
                            <img src={quiz} alt="Reaction" />
                        </div>

                    </div>
                </div>
            </div>

            <div className="feature">
                <div className="feature-container">
                    <div className="columns">
                        <div className="picture">
                            <img src={logsMessage} alt="Reaction" />
                            <img src={logsVocaux} alt="Reaction" />
                            <img src={logsUser} alt="Reaction" />
                        </div>

                        <div className="articleContainer left">
                            <article className="article">
                                <h2>{t("feature.logs.name")}</h2>
                                <p>{t("feature.logs.description1")}<br />{t("feature.logs.description2")}</p>
                            </article>

                        </div>
                    </div>
                </div>
            </div>

            <div className="feature">
                <div className="feature-container">
                    <div className="columns revertMobile">
                        <div className="articleContainer right">
                            <article className="article">
                                <h2>{t("feature.ticket.name")}</h2>
                                <p>{t("feature.ticket.description")}</p>
                            </article>
                        </div>

                        <div className="picture">
                            <img src={support} alt="Reaction" />
                            <img src={ticket} alt="Reaction" />
                            <img src={transcript} alt="Reaction" />
                        </div>

                    </div>
                </div>
            </div>

            <div className="feature">
                <div className="feature-container">
                    <div className="columns">
                        <div className="picture">
                            <img src={engagement} alt="Reaction" />
                            <img src={achievement} alt="Reaction" />
                        </div>

                        <div className="articleContainer left">
                            <article className="article">
                                <h2>{t("feature.engagement.name")}</h2>
                                <p>{t("feature.engagement.description")}</p>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
    )
}