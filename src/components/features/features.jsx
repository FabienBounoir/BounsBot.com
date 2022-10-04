import "./_features.css";
// import { Link } from "react-router-dom"
import AnimationImage from "../animationimage/animationimage";

import Reaction from '../../assets/picture/features/reaction1.png';
import Reaction2 from '../../assets/picture/features/reaction2.png';
import Sheesh from '../../assets/picture/features/sheesh.png';

import tempoVocaux from '../../assets/picture/features/tempChannel.png';

import twitch1 from '../../assets/picture/features/twitch1.png';
import twitch2 from '../../assets/picture/features/twitch2.png';

import Rename from '../../assets/picture/features/rename.png';
import LogVocal from '../../assets/picture/features/logVocal.png';
import LogTextuel from '../../assets/picture/features/logTextuel.png';
import AppElement from '../../assets/picture/features/appElement.png';

// import Musique from '../../assets/picture/features/music.png';
// import Playlist from '../../assets/picture/features/playlist.png';
import Radio from '../../assets/picture/features/radio.png';

import Level from '../../assets/picture/features/level.png';
import Rank from '../../assets/picture/features/rank.png';
import Achievement from '../../assets/picture/features/achievement.png';

import chifumi from '../../assets/picture/features/chifumi.png';
import morpion from '../../assets/picture/features/morpion.png';
import puissance4 from '../../assets/picture/features/puissance.png';


export const Features = () => {
    return (
        <div className="features">
            <div className="features__content">
                <div className="feature active">
                    <AnimationImage img={[morpion, chifumi, puissance4]} />
                    <div className="content">
                        <div className="title">
                            <h3>Pleins de jeux</h3>
                            {/* <Link to="/commandes#configCommande">
                                <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                                </svg>
                            </Link> */}
                        </div>
                        <p>Tu veux affronter tes amis, tu as donc à ta disposition plusieurs jeux: le morpion, puissance4, chifumi, le motus, et bientôt d'autres 👀</p>
                    </div>
                </div>

                <div className="feature active">
                    <div className="content">
                        <div className="title">
                            <h3>Niveaux et points d'XP</h3>
                            {/* <Link to="/commandes#levelCommande">
                                <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                                </svg>
                            </Link> */}
                        </div>
                        <p>Laissez vos membres se démarquer sur votre serveur grâce au système de Leveling.<br />Vous pourrez afficher le classement.</p>
                    </div>
                    <AnimationImage img={[Level, Rank, Achievement]} />
                </div>
                <div className="feature active">
                    <AnimationImage img={[Radio]} />
                    <div className="content">
                        <div className="title">
                            <h3>Radio</h3>
                            {/* <Link to="/commandes#musiqueCommande">
                                <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                                </svg>
                            </Link> */}
                        </div>
                        {/* <p>Un bot musique acceptant les liens Youtube / Spotify / deezer /soundcloud et fichier externe (.mp3 / .mp4 / .flac / .ogg / .aac / .webm / .wav)<br />Plus de 40 radios disponibles !!<br />Créer / Modifier / Jouer une playlist.</p> */}
                        <p>Vous pouvez écouter l'une des 60,000 radios disponibles à vous de trouver la radio qui vous correspond</p>
                    </div>
                </div>
                <div className="feature active">
                    <div className="content">
                        <div className="title">
                            <h3>Modération</h3>
                            {/* <Link to="/commandes#ModerationCommande">
                                <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                                </svg>
                            </Link> */}
                        </div>
                        <p>Des logs de qualités avec les messages supprimés / modifiés, mais aussi les logs de cam et même de partage d'écran<br />Auto Rename lorsqu'un pseudo contient des caractères spéciaux<br />Nettoyer le tchat avec efficacité avec la commande "clear".</p>
                    </div>
                    <AnimationImage img={[LogTextuel, LogVocal, AppElement, Rename]} />
                </div>
                <div className="feature active">
                    <AnimationImage img={[twitch1, twitch2]} />
                    <div className="content">
                        <div className="title">
                            <h3>Twitch vers Discord</h3>
                            {/* <Link to="/commandes#configCommande">
                                <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                                </svg>
                            </Link> */}
                        </div>
                        <p>Retranscrire le tchat Twitch d'une chaine sur un channel Discord <br />Les badges et les liens sont aussi retranscrits sur Discord<br />Si un message est supprimé ou si un utilisateur est timeout/ban ces messages seront instantanement supprimés sur Discord.</p>
                    </div>
                </div>
                <div className="feature active">
                    <div className="content">
                        <div className="title">
                            <h3>Salons temporaires</h3>
                            {/* <Link to="/commandes#tempChannelCommande">
                                <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                                </svg>
                            </Link> */}
                        </div>
                        <p>Créer des salons temporaires automatiques, avec un nom prédéfini et une limite de personne par défaut.</p>
                    </div>
                    <AnimationImage img={[tempoVocaux]} />
                </div>
                <div className="feature active">
                    <AnimationImage img={[Reaction, Reaction2, Sheesh]} />
                    <div className="content">
                        <div className="title">
                            <h3>Action Réaction</h3>
                            {/* <Link to="/commandes">
                                <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                                </svg>
                            </Link> */}
                        </div>
                        <p>Un message de Bonjour / Bonne Nuit et BounsBot réagit !!!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}