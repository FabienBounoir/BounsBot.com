// import React from "react";
import "./_commandes.css";
import logo from '../picture/logo5.svg';
import { Table } from 'react-bootstrap/'

export const Commandes = () => {
    return (
        <div transition="page" class="commands-list">
        <div class="top">
            <h1>COMMANDES</h1> 
            <div class="search search-bar" data-v-7085cbe2=""></div>
        </div>
        <>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th class="titleCommand" colSpan="2">ㆍMusique</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-play (URL/NOM/FICHIER)</td>
                    <td>Jouer la musique sans l'ajouté à la playlist ou jouer de la musique avec un fichier envoyé</td>
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
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th class="titleCommand" colSpan="2">ㆍRadio</th></tr>
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
                <tr><th class="titleCommand" colSpan="2">ㆍPlaylist</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>-setPlaylist (Name) (Url Youtube)</td>
                    <td>Crée/ajouter musique dans une playlist</td>
                </tr>
                <tr>
                    <td>-playlist (Name)</td>
                    <td>jouer la playlist</td>
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
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th class="titleCommand" colSpan="2">ㆍConfiguration</th></tr>
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
                    <td>-setbanniere</td>
                    <td>Changer la bannière du rank (Best dimension = 934x282)</td>
                </tr>              
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th class="titleCommand" colSpan="2">ㆍAdministration</th></tr>
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
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr><th class="titleCommand" colSpan="2">ㆍOthers</th></tr>
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
                    <td>Affiche un meme aleatoire</td>
                </tr>
                <tr>
                    <td>-anniv</td>
                    <td>Souhaiter un joyeux anniversaire a un membre du serveur</td>
                </tr>   
                <tr>
                    <td>-comment (Nom) (Text)</td>
                    <td>Genere un fake commentaire youtube</td>
                </tr>  
            </tbody>
        </Table>
        </>
        </div>
    )
}