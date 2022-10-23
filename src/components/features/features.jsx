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

export const Features = () => {
    return (<>
        <div className="features">
            <div className="feature">
                <div className="feature-container">
                    <div className="columns">
                        <div className="picture">
                            <img src={radio} alt="Reaction" />
                            <img src={music} alt="Reaction" />
                            {/* <img src="https://media.discordapp.net/attachments/1015543023146389506/1031680265950613544/unknown.png?width=1948&height=1290" alt="Reaction" /> */}
                        </div>

                        <div className="articleContainer left">
                            <article className="article">
                                <h2>Multimedia</h2>
                                <p>Jouez des chansons à la demande ou écoutez une station de radio toute la journée sans jamais devoir vous arrêter.<br />La fête ne s'arrêtera pas non plus quand vous partirez, car Bouns'bot reste dans votre channel 24h/24, 7j/7 !</p>
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
                                <h2>Les Jeux</h2>
                                <p>Jouez à un grand nombre de mini-jeux ! Vous pouvez jouer à plus de 15 mini-jeux seuls ou contre vos amis. <br />Démarqué vous grâce au classement intégré à Bouns'bot , et venez tester votre culture générale grâce à notre quiz.</p>
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
                                <h2>Les Logs</h2>
                                <p>Comment ça, vous ne savez pas que Wumpus a allumé sa caméra ! <br />Avec Bouns'bot vous avez accès à tous les logs disponibles sur Discord, il vous suffit d'activer ce dont vous avez besoin.</p>
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
                                <h2>Les Tickets</h2>
                                <p>Bouns’bot permet de créer des channels de supports privés, que nous appelons des tickets, entre votre équipe et les personnes qui cherchent de l'aide.</p>
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
                                <h2>L'engagement</h2>
                                <p>Récompensez vos membres avec des points d'XP et gardez la trace des membres les plus actifs sur votre tableau de classement personnalisé.</p>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
    )
}