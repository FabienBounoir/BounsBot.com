import "./_features.css";
import hehreaction from '../picture/heyreaction.png';
import moderation from '../picture/moderation.png';
import musique from '../picture/musique.png';
import level from '../picture/level.png';

export const Features = () => {
    return (
        <div className="features">
            <div className="features__content">
                <div className="feature active">
                    <img className="image" alt="logo" src= { hehreaction }/>
                    <div className="content">
                        <div className="title">
                            <h3>Action Réaction</h3> 
                            <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="#0cab34"></path>
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
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="#0cab34"></path>
                            </svg>
                        </div> 
                        <p>Un clic, un émoji et DraftBot réagit.<br/>Utilisez l'ensemble des commandes ci-dessous grâce aux réactions, jusque dans les moindres détails.<br/>Tout est facilité, accessible, intuitif. Alors réagissez !</p>
                    </div>
                    <img className="image" alt="logo" src= { level }/>
                </div>
                <div className="feature active">
                    <img className="image" alt="logo" src= { musique }/>
                    <div className="content">
                        <div className="title">
                            <h3>Musique, Playlist, Radio</h3> 
                            <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="#0cab34"></path>
                            </svg>
                        </div> 
                        <p>Un bot musique acceptant les Liens Youtube / Fichier Externe (.mp3 / .mp4 / .flac / .ogg / .aac / .webm / .wav)<br/>Plus de 40 radio disponibles !!<br/>Crée / Modifier / Jouer une playlist</p>
                    </div>
                </div>
                <div className="feature active">
                    <div className="content">
                        <div className="title">
                            <h3>Moderation</h3> 
                            <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="show-commands">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.02431 0.524414H0V7.52441H7.02431V0.524414ZM35.9998 0.524414H10.5366V7.52441H35.9998V0.524414ZM0 11.0244H7.02431V18.0244H0V11.0244ZM35.9998 11.0244H10.5366V18.0244H35.9998V11.0244ZM0 21.5244H7.02431V28.5244H0V21.5244ZM35.9998 21.5244H10.5366V28.5244H35.9998V21.5244Z" fill="#0cab34"></path>
                            </svg>
                        </div> 
                        <p>Logs de Message Supprimer / Modifier <br/>Auto Rename lorsqu'un pseudo contient des caractères spéciaux<br/>Nettoyer le tchat avec efficacité avec la commande "clear"</p>
                    </div>
                    <img className="image" alt="logo" src= { moderation }/>
                </div>
            </div>
        </div>
    )
}