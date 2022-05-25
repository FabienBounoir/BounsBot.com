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
                    <td>Arreter la musique en train d'etre joué</td>
                </tr>
                <tr>
                    <td>-dj (@user / Id User)</td>
                    <td>Controller la musique directement avec son compte spotify (prérequis: avoir l'activiter spotify sur son compte discord)</td>
                </tr>
                <tr>
                    <td>-add (URL/NOM)</td>
                    <td>Permet d'ajouté une musique a la file d'attente</td>
                </tr>
                <tr>
                    <td>-resume</td>
                    <td>Resume la musique en cours</td>
                </tr>
                <tr>
                    <td>-pause</td>
                    <td>Pause la musique en cours</td>
                </tr>
                <tr>
                    <td>-skip</td>
                    <td>Skip la musique en train d'etre joué</td>
                </tr>
                <tr>
                    <td>-list</td>
                    <td>Afficher les musiques dans la playlist</td>
                </tr>
                <tr>
                    <td>-forcePlay (URL/NOM)</td>
                    <td>Ajouter un son juste apres celle en cour</td>
                </tr>
                <tr>
                    <td>-remove (Numero)</td>
                    <td>Supprimer une musique de la playlist</td>
                </tr>
                <tr>
                    <td>-clearqueue</td>
                    <td>Vider la playlist</td>
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
                    <td>-lyrics (Name)</td>
                    <td>Avoir les lyrics de la musique en cours ou celle-ci passé en paramètre</td>
                </tr>
                <tr>
                    <td>-shuffle</td>
                    <td>Melanger les musiques qui sont dans la file d'attente</td>
                </tr>
                <tr>
                    <td>-volume (chiffre)</td>
                    <td>Changer le volume de la musique actuelle</td>
                </tr>
                <tr>
                    <td>-favoris (@User)</td>
                    <td>Lancer les favoris d'une personne</td>
                </tr>
                <tr>
                    <td>-nowplay</td>
                    <td>Voir la musique en cour de lecture</td>
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
                    <td>Sélectionner la radio a écouter (24h/24)</td>
                </tr>
                <tr>
                    <td>-currentradio (Numero)</td>
                    <td>Voir la radio en train d'etre jouer</td>
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
                    <td>Crée/Ajouter musique dans une playlist</td>
                </tr>
                <tr>
                    <td>-setPicturePlaylist (Name) (Url Youtube)</td>
                    <td>Mettre un logo a ça playlist</td>
                </tr>
                <tr>
                    <td>-playlist (Name)</td>
                    <td>Jouer la playlist</td>
                </tr>
                <tr>
                    <td>-infoPlaylist (Name)</td>
                    <td>Avoir les info d'une playlist</td>
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
                    <td>Afficher la configuration actuelle des channels temporaire</td>
                </tr>  
                <tr>
                    <td>-settempo (Id Channel)</td>
                    <td>Set un channel en createur de channel temporaire</td>
                </tr>
                <tr>
                    <td>-deletetempo (Id Channel)</td>
                    <td>Enlever la configuration d'un channel temporaire</td>
                </tr>  
                <tr>
                    <td>-namechanneltemporaire (name)</td>
                    <td>Choisir un template de nom pour le channel temporaire</td>
                </tr>  
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="configCommande" colSpan="2">ㆍConfiguration</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-setlogchannel (idChannel ou 0 pour Désactiver)</td>
                    <td>Crée/ajouter musique dans une playlist</td>
                </tr>
                <tr>
                    <td>-settwitch (chaine twitch)</td>
                    <td>Choisir la chaine que le bot doit ecouter</td>
                </tr>    
                <tr>
                    <td>-setchanneltwitch (id channel Discord)</td>
                    <td>Choisir la channel ou sera retranscrit le tchat twitch</td>
                </tr>   
                <tr>
                    <td>-setwelcomemessage</td>
                    <td>Mettre en place un message de bienvenue envoyer en MP au membre du serveur</td>
                </tr>  
                <tr>
                    <td>-set heyreaction (true/false)</td>
                    <td>Config les reaction de bonjour / bonne nuit</td>
                </tr>
                <tr>
                    <td>-set sheesh (true/false)</td>
                    <td>Config la reponse avec un sheesh lorsqu'une personne dit sheeshhh</td>
                </tr>
                <tr>
                    <td>-set rename (true/false)</td>
                    <td>Config l'auto rename lorsqu'un pseudo n'est pas valide</td>
                </tr>   
                <tr>
                    <td>-set musique (true/false)</td>
                    <td>Config les commandes musique</td>
                </tr>  
                <tr>
                    <td>-set radio (true/false)</td>
                    <td>Config les commandes radio</td>
                </tr>  
                <tr>
                    <td>-set playlist (true/false)</td>
                    <td>Config les commandes playlist</td>
                </tr>  
                <tr>
                    <td>-set game (true/false)</td>
                    <td>Config les commandes games</td>
                </tr>  
                <tr>
                    <td>-set fun (true/false)</td>
                    <td>Config les commandes fun</td>
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
                    <td>Voir la carte de son rank par rapport au bot</td>
                </tr>
                <tr>
                    <td>-levels</td>
                    <td>Leaderboard des levels du serveur</td>
                </tr>
                <tr>
                    <td>-achievement</td>
                    <td>Voir les achievements débloqué</td>
                </tr>   
                <tr>
                    <td>-setbanniere + drag and drop image</td>
                    <td>Changer la bannière du rank (Best dimension = 934x282)</td>
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
                    <td>Fight toi avec un pokemon random contre une autre personne</td>
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
                    <td>Ajouter un role a une personne specifique</td>
                </tr>
                <tr>
                    <td>-removerole (@user) (id/name role)</td>
                    <td>Enlever un role a une personne specifique</td>
                </tr>
                <tr>
                    <td>-webhook</td>
                    <td>Crée webhook Personnaliser</td>
                </tr>  
                <tr>
                    <td>-slowmode (Nb secondes)</td>
                    <td>Mettre un couldown dans le channel en question</td>
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
                    <td>Supprimer message dans le tchat</td>
                </tr>
                <tr>
                    <td>-rename (@user/id) (optionnal: Name) </td>
                    <td>Rename une personne</td>
                </tr>
                <tr>
                    <td>-ban (@user/id) (raison)</td>
                    <td>Ban une personne</td>
                </tr> 
                <tr>
                    <td>-unban (@user/id)</td>
                    <td>Unban une personne</td>
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
                    <td>Quelque stats croustillante sur le bot</td>
                </tr>
                <tr>
                    <td>-ping</td>
                    <td>Resevoir un magnifique pong du Bouns'bot</td>
                </tr>
                <tr>
                    <td>-support (texte)</td>
                    <td>Contacter le support pour des Questions/Ameliorations</td>
                </tr>
                <tr>
                    <td>-invite</td>
                    <td>Invité le bot sur votre serveur</td>
                </tr>
                <tr>
                    <td>-help</td>
                    <td>Voir les commandes disponible</td>
                </tr>
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" id="otherCommande" colSpan="2">ㆍOthers</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-userInfo (Id User / @User)</td>
                    <td>Voir les informations d'un compte discord</td>
                </tr>
                <tr>
                    <td>-picture</td>
                    <td>Le bot affiche ta pp sans aucun respect</td>
                </tr>
                <tr>
                    <td>-meme</td>
                    <td>Affiche un meme aleatoire</td>
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
                    <td>Affiche un gif de Pikachu</td>
                </tr>
                <tr>
                    <td>-meteo (ville)</td>
                    <td>Voir la meteo de la ville selectionné</td>
                </tr>
                <tr>
                    <td>-cat</td>
                    <td>Affiche un gif de chat</td>
                </tr>   
                <tr>
                    <td>-dog</td>
                    <td>Affiche un chien dans le channel</td>
                </tr>   
                <tr>
                    <td>-comment (Nom) (Text)</td>
                    <td>Genere un fake commentaire youtube</td>
                </tr>  
                <tr>
                    <td>-anniversaire</td>
                    <td>Jouer une musique d'anniversaire dans le channel</td>
                </tr>
                <tr>
                    <td>-fortnite (Pseudo)</td>
                    <td>Information compte fortnite</td>
                </tr>  
                <tr>
                    <td>-minecraft (Pseudo)</td>
                    <td>Information compte minecraft</td>
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
                    <td>Recupérer sous forme de JSON les differents channel avec leur nom, le nom du serveur et le nom du bot, l'icone et la banniere du serveur</td>
                </tr>
            </tbody>
        </Table>
        </>
        </div>
    )
}