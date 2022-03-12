import "./_features.css";
import Reaction from '../picture/features/reaction.svg';
import Reaction2 from '../picture/features/reaction2.svg';
import Sheesh from '../picture/features/sheesh.svg';
import Moderation from '../picture/features/moderation.svg';
import Rename from '../picture/features/rename.svg';
import Musique from '../picture/features/musique.svg';
import Playlist from '../picture/features/playlist.svg';
import Radio from '../picture/features/radio.svg';
import Level from '../picture/features/level.svg';
import Rank from '../picture/features/rank.svg';
import AnimationImage from "../animationimage/animationimage";
import join from '../picture/features/JoinChannel.svg';
import twitch1 from '../picture/features/twitch1.svg';
import twitch2 from '../picture/features/twitch2.svg';
import tempoVocaux from '../picture/features/tempoVocaux.svg';


export const Features = () => {
    return (
        <div className="features">
            <div className="features__content">
                <div className="feature active">
                    <AnimationImage img={ [Reaction,Reaction2,Sheesh] }/>
                    <div className="content">
                        <div className="title">
                            <h3>Action Réaction</h3> 
                            <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                            </svg>
                        </div> 
                        <p>Un message de Bonjour / Bonne Nuit et BounsBot réagit !!!</p>
                    </div>
                </div>
                <div className="feature active">
                    <div className="content">
                        <div className="title">
                            <h3>Niveaux et points d'XP</h3> 
                            <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                            </svg>
                        </div> 
                        <p>Laissez vos membres se démarquer sur votre serveur grâce au système de Leveling.<br/>Vous pourrez afficher le classement.</p>
                    </div>
                    <AnimationImage img={ [Level,Rank] }/>
                </div>
                <div className="feature active">
                    <AnimationImage img={ [Musique,Radio,Playlist] }/>
                    <div className="content">
                        <div className="title">
                            <h3>Musique, Playlist, Radio</h3> 
                            <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                            </svg>
                        </div> 
                        <p>Un bot musique acceptant les Liens Youtube / Fichier Externe (.mp3 / .mp4 / .flac / .ogg / .aac / .webm / .wav)<br/>Plus de 40 radio disponibles !!<br/>Crée / Modifier / Jouer une playlist.</p>
                    </div>
                </div>
                <div className="feature active">
                    <div className="content">
                        <div className="title">
                            <h3>Moderation</h3> 
                            <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                            </svg>
                        </div> 
                        <p>Des logs de qualité avec les message supprimé / modifié, mais aussi les logs de cam et meme de partage d'ecran<br/>Auto Rename lorsqu'un pseudo contient des caractères spéciaux<br/>Nettoyer le tchat avec efficacité avec la commande "clear".</p>
                    </div>
                    <AnimationImage img={ [Moderation,join,Rename] }/>
                </div>
                <div className="feature active">
                    <AnimationImage img={ [twitch1,twitch2] }/>
                    <div className="content">
                        <div className="title">
                            <h3>Twitch vers Discord</h3> 
                            <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                            </svg>
                        </div> 
                        <p>Retranscrire le tchat Twitch d'une chaine sur un channel Discord <br/>Les badges et les liens sont aussi retranscrit sur Discord<br/>Si un message est supprimer ou si un utilisateur et timeout/ban ces messages seront instant supprimer sur discord.</p>
                    </div>
                </div>
                <div className="feature active">
                    <div className="content">
                        <div className="title">
                            <h3>Salon temporaires</h3> 
                            <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="var(--color-principal)"></path>
                            </svg>
                        </div> 
                        <p>Créer des salons temporaires automatiques, avec un nom prédéfini et une limite de personne par défaut.</p>
                    </div>
                    <AnimationImage img={ [tempoVocaux] }/>
                </div>
            </div>
        </div>
    )
}