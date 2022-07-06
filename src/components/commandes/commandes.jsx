// import React from "react";
import "./_commandes.css";
import { Table } from 'react-bootstrap/'

export const Commandes = () => {
    return (
        <div transition="page" className="commands-list">
        <div className="top">
            <h1>COMMANDES</h1> 
            <div className="search search-bar" data-v-7085cbe2=""></div>
        </div>
        <>
        <p class="home__top__bot__title__desc"><i>Toutes les commandes sont maintenant disponibles en slash commande</i></p>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="musiqueCommande" colSpan="2">ㆍMusique</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-play (URL/NOM/FICHIER)</td>
                    <td>Jouer la musique avec un lien / un nom ou directement depuis un fichier envoyé</td>
                </tr>
                <tr>
                    <td>-stop</td>
                    <td>Arrêter la musique en train d'être jouée</td>
                </tr>
                <tr>
                    <td>-dj (@user / Id User)</td>
                    <td>Contrôler la musique directement avec son compte Spotify (prérequis: avoir l'activité Spotify sur son compte Discord)</td>
                </tr>
                <tr>
                    <td>-add (URL/NOM)</td>
                    <td>Permet d'ajouter une musique à la file d'attente</td>
                </tr>
                <tr>
                    <td>-resume</td>
                    <td>Résume la musique en cours</td>
                </tr>
                <tr>
                    <td>-pause</td>
                    <td>Met en pause la musique en cours</td>
                </tr>
                <tr>
                    <td>-skip</td>
                    <td>Skip la musique en train d'être jouée</td>
                </tr>
                <tr>
                    <td>-list</td>
                    <td>Afficher les musiques dans la file d'attente</td>
                </tr>
                <tr>
                    <td>-forcePlay (URL/NOM)</td>
                    <td>Ajouter un son juste après celle en cours</td>
                </tr>
                <tr>
                    <td>-remove (Numero)</td>
                    <td>Supprimer une musique qui est dans la file d'attente</td>
                </tr>
                <tr>
                    <td>-clearqueue</td>
                    <td>Vider la file d'attente</td>
                </tr>
                <tr>
                    <td>-search (Recherche)</td>
                    <td>Rechercher une musique</td>
                </tr>
                <tr>
                    <td>-loop</td>
                    <td>Mettre la musique en boucle</td>
                </tr>
                <tr>
                    <td>-lyrics (!Name)</td>
                    <td>Avoir les lyrics d'une musique</td>
                </tr>
                <tr>
                    <td>-shuffle</td>
                    <td>Mélanger les musiques qui sont dans la file d'attente</td>
                </tr>
                <tr>
                    <td>-volume (chiffre)</td>
                    <td>Changer le volume des musiques jouées</td>
                </tr>
                <tr>
                    <td>-favoris (@User)</td>
                    <td>Lancer les musiques mises en favorites d'une personne</td>
                </tr>
                <tr>
                    <td>-nowplay</td>
                    <td>Voir la musique en cours de lecture</td>
                </tr>
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="radioCommande" colSpan="2">ㆍRadio</th></tr>{/*  <a className="testRadio" href="./demo">Demo</a> */}
            </thead>
            <tbody>
                <tr>
                    <td>-radio</td>
                    <td>Voir les radios disponibles (41 radios)</td>
                </tr>
                <tr>
                    <td>-radio (Numero)</td>
                    <td>Sélectionner la radio à écouter (24h/24)</td>
                </tr>
                <tr>
                    <td>-currentradio (Numero)</td>
                    <td>Voir la radio en train d'être jouée</td>
                </tr>
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="playlistCommande" colSpan="2">ㆍPlaylist </th></tr> {/* <a className="testRadio" href="./playlist">Liste</a> */}
            </thead>
            <tbody>
                <tr>
                    <td>-setPlaylist (Name) (Url Youtube)</td>
                    <td>Créer/Ajouter musique dans une playlist</td>
                </tr>
                <tr>
                    <td>-setPicturePlaylist (Name) (Url Youtube)</td>
                    <td>Mettre un logo à sa playlist</td>
                </tr>
                <tr>
                    <td>-playlist (Name)</td>
                    <td>Jouer la playlist</td>
                </tr>
                <tr>
                    <td>-infoPlaylist (Name)</td>
                    <td>Avoir les informations d'une playlist</td>
                </tr>
                <tr>
                    <td>-deletePlaylist (Name)</td>
                    <td>Supprimer une playlist</td>
                </tr>
                <tr>
                    <td>-removeMusiquePlaylist (Name) (Numero)</td>
                    <td>Supprimer une musique dans la playlist</td>
                </tr>  
                <tr>
                    <td>-searchPlaylist (Name)</td>
                    <td>Rechercher des playlists</td>
                </tr>               
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="tempChannelCommande" colSpan="2">ㆍChannel Temporaire</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-channeltempo</td>
                    <td>Afficher la configuration actuelle des channels temporaires</td>
                </tr>  
                <tr>
                    <td>-settempo (Id Channel)</td>
                    <td>Set un channel qui crée des channels temporaires</td>
                </tr>
                <tr>
                    <td>-deletetempo (Id Channel)</td>
                    <td>Enlever la configuration d'un channel temporaire</td>
                </tr>  
                <tr>
                    <td>-namechanneltemporaire (name)</td>
                    <td>Modifier le nom des channels temporaires créés</td>
                </tr>  
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="configCommande" colSpan="2">ㆍConfiguration</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-log [message|user|vocal|join_leave|ban_unban] (Channel id ou 0 pour desactiver)</td>
                    <td>Choisir le channel de log</td>
                </tr>
                <tr>
                    <td>-settwitch (chaine twitch)</td>
                    <td>Choisir la chaine que le bot va retranscrire sur discord</td>
                </tr>    
                <tr>
                    <td>-setchanneltwitch (id channel Discord)</td>
                    <td>Choisir le channel où sera retranscrit le tchat Twitch</td>
                </tr>   
                <tr>
                    <td>-setwelcomemessage</td>
                    <td>Mettre en place un message de bienvenue envoyé en message privé au membre du serveur</td>
                </tr>  
                <tr>
                    <td>-set heyreaction (true/false)</td>
                    <td>Configurer les reactions de bonjour / bonne nuit</td>
                </tr>
                <tr>
                    <td>-set sheesh (true/false)</td>
                    <td>Configurer la réponse avec un sheesh lorsqu'une personne dit sheeshhh</td>
                </tr>
                <tr>
                    <td>-set rename (true/false)</td>
                    <td>Configurer l'auto rename lorsqu'un pseudo n'est pas valide</td>
                </tr>   
                <tr>
                    <td>-set musique (true/false)</td>
                    <td>Configurer les commandes musiques</td>
                </tr>  
                <tr>
                    <td>-set radio (true/false)</td>
                    <td>Configurer les commandes radios</td>
                </tr>  
                <tr>
                    <td>-set playlist (true/false)</td>
                    <td>Configurer les commandes playlists</td>
                </tr>  
                <tr>
                    <td>-set game (true/false)</td>
                    <td>Configurer les commandes games</td>
                </tr>  
                <tr>
                    <td>-set fun (true/false)</td>
                    <td>Configurer les commandes funs</td>
                </tr>         
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="levelCommande" colSpan="2">ㆍLevel</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-rank</td>
                    <td>Voir la carte de son rank</td>
                </tr>
                <tr>
                    <td>-levels</td>
                    <td>Classement des utilisateurs sur le du serveur</td>
                </tr>
                <tr>
                    <td>-achievement</td>
                    <td>Voir les achievements débloqués/td>
                </tr>   
                <tr>
                    <td>-setbanniere + drag and drop image</td>
                    <td>Changer la bannière du rank (Meilleur dimension = 934x282)</td>
                </tr>    
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="gameCommande" colSpan="2">ㆍGame</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-motus</td>
                    <td>Le jeu motus directement sur discord</td>
                </tr>  
                <tr>
                    <td>-morpion</td>
                    <td>Le jeu morpion directement sur discord pour affronter tes amis</td>
                </tr> 
                <tr>
                    <td>-chifumi</td>
                    <td>Le jeu chifumi directement sur discord pour affronter tes amis</td>
                </tr>        
                <tr>
                    <td>-pendu</td>
                    <td>Test tes connaissance en trouvant le mot en moin de 6 coups</td>
                </tr>        
                <tr>
                    <td>-puissance4</td>
                    <td>Un puissance 4 sur discord pour affronter tes amis</td>
                </tr>   
                <tr>
                    <td>-undercover</td>
                    <td>Le jeu undercover (il faut trouver la personne avec le mot different)</td>
                </tr>  
                <tr>
                    <td>-combatpokemon</td>
                    <td>Fight toi avec un pokemon aléatoire contre une autre personne</td>
                </tr>             
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="AdministrateurCommande" colSpan="2">ㆍAdministrateur</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-addrole (@user) (id/name role)</td>
                    <td>Ajouter un rôle a une personne spécifique</td>
                </tr>
                <tr>
                    <td>-removerole (@user) (id/name role)</td>
                    <td>Enlever un rôle a une personne spécifique</td>
                </tr>
                <tr>
                    <td>-webhook</td>
                    <td>Créer webhook personnaliser</td>
                </tr>  
                <tr>
                    <td>-slowmode (Nb secondes)</td>
                    <td>Mettre un couldown dans un channel</td>
                </tr>             
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="ModerationCommande" colSpan="2">ㆍModération</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-clear (NB message)</td>
                    <td>Supprimer des messages dans un channel</td>
                </tr>
                <tr>
                    <td>-rename (@user/id) (optionnal: Name) </td>
                    <td>Renommer une personne</td>
                </tr>
                <tr>
                    <td>-ban (@user/id) (raison)</td>
                    <td>Ban un utilisateur</td>
                </tr> 
                <tr>
                    <td>-unban (@user/id)</td>
                    <td>Unban un utilisateur</td>
                </tr>             
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="botCommande" colSpan="2">ㆍBot</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-stats</td>
                    <td>Quelques statistiques croustillantes sur Bounsbot</td>
                </tr>
                <tr>
                    <td>-ping</td>
                    <td>Recevoir un magnifique pong du Bouns'bot 🏓</td>
                </tr>
                <tr>
                    <td>-support (texte)</td>
                    <td>Contacter le support pour des Questions/Ameliorations</td>
                </tr>
                <tr>
                    <td>-invite</td>
                    <td>Inviter le bot sur votre serveur</td>
                </tr>
                <tr>
                    <td>-help</td>
                    <td>Voir les commandes disponibles</td>
                </tr>
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="otherCommande" colSpan="2">ㆍAutre</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-userInfo (Id User / @User)</td>
                    <td>Voir les informations d'un compte Discord</td>
                </tr>
                <tr>
                    <td>-picture</td>
                    <td>Le bot affiche ta PP sans aucun respect</td>
                </tr>
                <tr>
                    <td>-meme</td>
                    <td>Affiche un même aléatoire</td>
                </tr>
                <tr>
                    <td>-triggered</td>
                    <td>Ta PP en mode triggered</td>
                </tr>   
                <tr>
                    <td>-missionpassed</td>
                    <td>Ta PP en mode mission passed</td>
                </tr>   
                <tr>
                    <td>-prison</td>
                    <td>Ta PP en prison</td>
                </tr>   
                <tr>
                    <td>-fact</td>
                    <td>Afficher un fact</td>
                </tr>   
                <tr>
                    <td>-wasted</td>
                    <td>Ta PP en mode wasted</td>
                </tr>
                <tr>
                    <td>-pika</td>
                    <td>Afficher un gif de Pikachu</td>
                </tr>
                <tr>
                    <td>-meteo (ville)</td>
                    <td>Voir la méteo de la ville sélectionnée</td>
                </tr>
                <tr>
                    <td>-cat</td>
                    <td>Afficher un gif de chat</td>
                </tr>   
                <tr>
                    <td>-dog</td>
                    <td>Afficher un chien dans le channel</td>
                </tr>   
                <tr>
                    <td>-comment (Nom) (Text)</td>
                    <td>Générer un fake commentaire Youtube</td>
                </tr>  
                <tr>
                    <td>-anniversaire</td>
                    <td>Jouer une musique d'anniversaire dans un vocal</td>
                </tr>
                <tr>
                    <td>-fortnite (Pseudo)</td>
                    <td>Informations sur un compte Fortnite</td>
                </tr>  
                <tr>
                    <td>-minecraft (Pseudo)</td>
                    <td>Informations sur un compte Minecraft</td>
                </tr> 
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="advanceCommande" colSpan="2">ㆍ Advance</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-gettemplate</td>
                    <td>Recupérer sous forme de JSON les différents channels avec leur nom, le nom du serveur et le nom du bot, l'îcone et la bannière du serveur</td>
                </tr>
            </tbody>
        </Table>
        </>
        </div>
    )
}