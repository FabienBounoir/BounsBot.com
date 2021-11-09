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
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" colSpan="2">ㆍMusique</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-play (URL/NOM/FICHIER)</td>
                    <td>Jouer la musique avec un lien / un nom ou directement depuis un fichier envoyé</td>
                </tr>
                <tr>
                    <td>-stop</td>
                    <td>Arreté la musique en train d'etre joué</td>
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
                    <td>Affiché les musiques dans la playlist</td>
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
                    <td>-volume (chiffre)</td>
                    <td>Changer le volume de la musique actuelle</td>
                </tr>
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" colSpan="2">ㆍRadio <a className="testRadio" href="./demo">Demo</a></th></tr>
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
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" colSpan="2">ㆍPlaylist <a className="testRadio" href="./playlist">Liste</a></th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-setPlaylist (Name) (Url Youtube)</td>
                    <td>Crée/Ajouter musique dans une playlist</td>
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
                <tr><th className="titleCommand" colSpan="2">ㆍConfiguration</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-setlogchannel (idChannel ou 0 pour Désactiver)</td>
                    <td>Crée/ajouter musique dans une playlist</td>
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
                    <td>-set fun (true/false)</td>
                    <td>Config les commandes fun</td>
                </tr>         
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" colSpan="2">ㆍLevel</th></tr>
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
                    <td>-setbanniere + drag and drop image</td>
                    <td>Changer la bannière du rank (Best dimension = 934x282)</td>
                </tr>    
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" colSpan="2">ㆍAdministration</th></tr>
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
                <tr><th className="titleCommand" colSpan="2">ㆍModération</th></tr>
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
                <tr><th className="titleCommand" colSpan="2">ㆍBot</th></tr>
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
                    <td>-report (texte)</td>
                    <td>Report un bug sur le Bot ou demander une amélioration</td>
                </tr>
                <tr>
                    <td>-invite</td>
                    <td>Invité le bot sur votre serveur</td>
                </tr>
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" colSpan="2">ㆍOthers</th></tr>
            </thead>
            <tbody>
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
                    <td>-wasted</td>
                    <td>Ta PP en mode wasted</td>
                </tr>
                <tr>
                    <td>-pika</td>
                    <td>Affiche un gif de Pikachu</td>
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
                    <td>-anniv</td>
                    <td>Souhaiter un joyeux anniversaire a un membre du serveur</td>
                </tr>   
                <tr>
                    <td>-comment (Nom) (Text)</td>
                    <td>Genere un fake commentaire youtube</td>
                </tr>  
                <tr>
                    <td>-fortnite (Pseudo)</td>
                    <td>Information compte fortnite</td>
                </tr>  
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th className="titleCommand" colSpan="2">ㆍ Advance</th></tr>
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