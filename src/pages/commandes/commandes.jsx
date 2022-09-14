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
                <div className="command__input">
                    <input type="text" placeholder="Rechercher une commande" />
                    <p className="fa-solid fa-magnifying-glass">
                        <svg width="25" height="25" viewBox="0 0 298 298" xmlns="http://www.w3.org/2000/svg">
                            <path d="M230.942 199.589C239.601 208.247 239.601 222.284 230.942 230.943C222.285 239.601 208.248 239.6 199.59 230.943L149.494 180.847C140.837 172.189 140.835 158.152 149.493 149.494C158.152 140.835 172.189 140.836 180.848 149.494L230.942 199.589Z" fill="var(--color-principal-hover)" />
                            <path d="M201.39 100.695C201.39 156.307 156.307 201.39 100.695 201.39C45.0827 201.39 0 156.307 0 100.695C0 45.0827 45.0827 0 100.695 0C156.307 0 201.39 45.0827 201.39 100.695ZM35.8068 100.695C35.8068 136.532 64.8582 165.583 100.695 165.583C136.532 165.583 165.583 136.532 165.583 100.695C165.583 64.8582 136.532 35.8068 100.695 35.8068C64.8582 35.8068 35.8068 64.8582 35.8068 100.695Z" fill="var(--color-principal)" />
                            <path d="M186.271 233.504C173.227 220.462 173.227 199.313 186.271 186.27C199.314 173.226 220.461 173.227 233.505 186.27L288.105 240.871C301.149 253.914 301.149 275.061 288.105 288.105C275.063 301.148 253.915 301.148 240.871 288.105L186.271 233.504Z" fill="var(--color-principal)" />
                        </svg>
                    </p>
                </div>

                <div className="crtl">
                    <ul role="tablist" className="nav-pills commands-pills mb-20" id="myTabs_6">
                        <li className="active btnSearch btn-commands-category">Tout</li>
                        <li className="btnSearch btn-commands-category">Bot</li>
                        <li className="btnSearch btn-commands-category">Configuration</li>
                        <li className="btnSearch btn-commands-category">Engagement</li>
                        <li className="btnSearch btn-commands-category">ChannelTemporaire</li>
                        <li className="btnSearch btn-commands-category">Games</li>
                        <li className="btnSearch btn-commands-category">Fun</li>
                        <li className="btnSearch btn-commands-category">Moderation</li>
                        <li className="btnSearch btn-commands-category">Musique</li>
                        <li className="btnSearch btn-commands-category">Playlist</li>
                        <li className="btnSearch btn-commands-category">Radio</li>
                        <li className="btnSearch btn-commands-category">Ticket</li>
                    </ul>
                </div>

                <div className="commands-listing">
                    <div className="command-card__container">
                        <div className="command-card__header"><div>
                            <svg className="logo" width="26" height="24" viewBox="0 0 944 882" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M305.841 728.275C300.49 728.275 295.544 731.126 292.862 735.757L221.678 858.652C215.886 868.652 223.101 881.17 234.658 881.17H719.492C731.049 881.17 738.264 868.652 732.472 858.652L661.289 735.757C658.606 731.126 653.66 728.275 648.309 728.275H305.841Z" fill="var(--color-principal)" />
                                <path d="M853.511 525.341C902.931 505.457 926.883 449.27 906.996 399.851C887.111 350.435 830.923 326.499 781.506 346.381C732.083 366.265 708.13 422.457 728.021 471.878C747.909 521.291 804.096 545.224 853.511 525.341Z" fill="url(#paint0_linear_7_295)" />
                                <path d="M65.6184 489.699C101.85 529.117 163.176 531.703 202.599 495.477C242.032 459.241 244.618 397.896 208.373 358.471C172.14 319.06 110.819 316.477 71.3992 352.7C31.9687 388.933 29.3798 450.273 65.6184 489.699Z" fill="url(#paint1_linear_7_295)" />
                                <g filter="url(#filter0_d_7_295)">
                                    <path d="M816.009 662.527C708.084 823.479 267.083 830.795 144.523 662.527C21.9637 492.43 247.595 164.804 478.08 172.12C708.566 181.266 922.106 503.404 816.009 662.527Z" fill="url(#paint2_linear_7_295)" />
                                </g>
                                <path d="M465.721 72.1191C465.721 69.3577 467.959 67.1191 470.721 67.1191H489.849C492.61 67.1191 494.849 69.3577 494.849 72.1191V189.399C494.849 192.16 492.61 194.399 489.849 194.399H470.721C467.959 194.399 465.721 192.16 465.721 189.399V72.1191Z" fill="var(--color-principal-hover)" />
                                <rect x="522" y="411" width="224.113" height="223.123" rx="111.562" fill="white" />
                                <path d="M742.979 505.153C742.979 463.801 710.02 431 668.489 431C627.623 431 594 464.465 594 505.153C594 545.842 627.623 579.306 668.489 579.306C710.02 579.306 742.979 545.842 742.979 505.153Z" fill="black" />
                                <rect x="211" y="411" width="224.113" height="223.123" rx="111.562" fill="white" />
                                <path d="M430.979 505.153C430.979 463.801 398.02 431 356.489 431C315.623 431 282 464.465 282 505.153C282 545.842 315.623 579.306 356.489 579.306C398.02 579.306 430.979 545.842 430.979 505.153Z" fill="black" />
                                <path d="M529.131 650.028C494.2 660.532 455.969 659.869 421.683 648.056C415.103 646.085 410.475 638.861 412.467 631.656C414.439 625.096 421.683 620.488 428.946 622.46C459.25 632.964 491.564 633.609 522.532 624.432C539.011 619.844 545.611 644.776 529.131 650.028Z" fill="black" />
                                <path d="M367.868 319.241C375.112 319.904 381.047 312.681 381.047 306.12C381.047 298.897 375.112 293.645 367.868 293C329.637 289.72 291.406 298.252 257.12 315.961C241.968 323.848 255.147 346.809 270.299 338.94C300.622 323.185 334.245 316.624 367.868 319.241ZM689.529 338.94C704.681 346.809 717.861 324.493 702.709 315.961C669.087 298.252 630.192 289.72 592.625 293C585.381 293.645 579.445 298.897 579.445 306.12C579.445 312.681 585.381 319.904 592.625 319.241C626.248 316.624 659.87 323.185 689.529 338.94Z" fill="black" />
                                <g filter="url(#filter1_d_7_295)">
                                    <path d="M439.988 113.071C460.211 135.076 494.444 136.521 516.45 116.299C538.461 96.0717 539.903 61.8283 519.67 39.823C499.445 17.8274 465.219 16.3871 443.217 36.6051C421.21 56.8285 419.763 91.0648 439.988 113.071Z" fill="url(#paint3_linear_7_295)" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_7_295" x="46" y="112" width="862" height="742" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="32" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape" />
                                    </filter>
                                    <filter id="filter1_d_7_295" x="421.717" y="22.3359" width="116.233" height="116.232" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape" />
                                    </filter>
                                    <linearGradient id="paint0_linear_7_295" x1="890.5" y1="375.5" x2="759.5" y2="479" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--color-principal-hover)" />
                                        <stop offset="1" stopColor="var(--color-principal)" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_7_295" x1="74.5" y1="348.5" x2="200.5" y2="491.5" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--color-principal)" />
                                        <stop offset="1" stopColor="var(--color-principal-hover)" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_7_295" x1="844" y1="556" x2="110" y2="547.5" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--color-principal)" />
                                        <stop offset="1" stopColor="var(--color-principal-hover)" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_7_295" x1="524.317" y1="39.6792" x2="444.498" y2="102.746" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--color-principal-hover)" />
                                        <stop offset="1" stopColor="var(--color-principal)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <h5 className="command-card__header__title">Help - <span>Voir l'ensemble des commandes disponibles</span></h5>
                        </div><span className="arrow"></span></div>
                        <div className="command-card__body">
                            <div className="command-card__body__usage">
                                <h5>Utilisation:</h5>
                                <div className="d-flex">
                                    <p dir="ltr">/profile (user)</p>
                                </div>
                            </div>
                            <div className="command-card__body__examples">
                                <h5>Exemples:</h5>
                                <div className="d-flex">
                                    <p dir="ltr">/profile<br />
                                        /profile @Dramex<br />
                                        /profile 157605500488384512</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="home__top__bot__title__desc"><i>Toutes les commandes sont maintenant disponibles en slash commande</i></p>
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
                            <td>-log [message | user | vocal | join_leave | ban_unban] (Channel id ou 0 pour desactiver)</td>
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
                            <td>Voir les achievements débloqués</td>
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
        </div >
    )
}