import "./_privacy.css";
import React from "react";

export const Privacy = () => {
    return (
        <div className="privacy">
            <div className="privacy-section">
                <h1>Privacy Policy</h1>
            </div>


            <div className="privacy-section">
                <p className="last-update">
                    <strong>Derniere mise à jour</strong> : 1 octobre 2022
                </p>
                <p><b>Bouns'bot</b> est un bot francais qui a pour but <b>d'améliorer votre expérience</b> au sein de votre discord, pour mener à bien ce projet, nous avons besoin de collecter quelques données personnelles.</p>
                <h2>Pourquoi nous collectons des données</h2>
                <p>
                    Nous collectons des données dans l'unique but de vous fournir un <b>service de qualité</b>.
                </p>

                <h2>Les données que nous collectons</h2>
                <p>
                    Bouns'bot collecte Uniquement les données essentiel à son bon fonctionnement, voici le détail de ces données :
                </p>
                <section>
                    <h5>Les données de votre serveur discord</h5>
                    <p>
                        Bouns'bot a besoin de collecter quelques données sur serveur discord pour pouvoir fonctionner, ces données sont :
                    </p>
                    <ul>
                        <li>L'identifiant du serveur</li>
                        <li>La configuration de bouns'bot au sein du serveur:<br />
                            - Les commandes activées<br />
                            - Les channels ou sont retransmis les logs<br />
                            - Les roles obtenable en fonction des niveaux que les membres peuvent avoir<br />
                            - les mots bannis au sein du serveur, pour pouvoir les supprimés.<br />
                        </li>

                        <li>Les données des membres du serveur discord:<br />
                            - Le pseudo du membre<br />
                            - L'identifiant du membre<br />
                            - Le nombre de messages du membre<br />
                            - Le nombre d'xp obtenue par le membre<br />
                            - Le lien de son avatar<br />
                        </li>
                    </ul>
                </section>
                <section>
                    <h5>Les données de votre compte discord</h5>
                    <p>
                        Bouns'bot a besoin de collecter quelques données de sur compte discord pour qu'il sache qui vous êtes, pour pouvoir vous fournir un service optimisé et de qualité en fonction de l'utilisateur, ces données sont les suivantes :
                    </p>
                    <ul>
                        <li>L'identifiant de votre compte discord</li>
                        <li>Le pseudo de votre compte discord</li>
                        <li>Le lien de votre avatar discord</li>
                        <li>Les differentes achievements que l'utilisateur à obtenue</li>
                        <li>L'information si l'utilisateur accepte ou non la collecte de ses données</li>
                    </ul>
                </section>

                <h2>Comment sont utilisées les données</h2>
                <p>
                    Les données sont utilisées pour vous fournir un service de qualité, voici les différents cas d'utilisation des données :
                </p>
                <section>
                    <h5>Les données de votre serveur discord</h5>
                    <p>
                        Les données de votre serveur discord sont utilisées pour vous fournir un service de qualité, Nous utilisons les données collecter dans l'unique but d'avoir la configuration de Bouns'bot au sein de votre serveur discord, mais aussi l'xp et le nombre de message des membres pour pouvoir vous fournir des roles en fonction des niveaux que les membres peuvent avoir mais aussi pour afficher les classements des membres au sein de votre serveur discord.
                    </p>
                </section>
                <section>
                    <h5>Les données de votre compte discord</h5>
                    <p>
                        Les données de votre compte discord sont utilisées dans l'unique but de vous fournir un service de qualité, nous utilisons les données collecter pour afficher dans un leaderboard les membres les plus actifs en global, mais aussi pour vous fournir des achievements en fonction de vos actions sur le bot.
                    </p>
                </section>

                <h2>Comment les données sont telles partagées</h2>
                <p>
                    <b>AUCUNE données stockées</b> n'est partagées avec des tiers, elle sont exclusive à l'utilisation de Bouns'bot. Les données sont stockées sur un serveur privé, et sont accessible uniquement par les développeurs de Bouns'bot.
                </p>

                <h2>Comment nous contacter</h2>
                <p>
                    L'equipe de bouns'bot se veut etre transparent avec l'utilisation de vos données c'est pour cela que nous mettons en place enormement de moyens pour vous permettre de nous contacter, voici les différents moyens de nous contacter :
                </p>
                <section>
                    <h5>Discord</h5>
                    <p>
                        Vous pouvez nous contacter sur notre serveur discord, pour cela il vous suffit de rejoindre le serveur discord de Bouns'bot en cliquant sur le bouton ci-dessous :
                    </p>
                    <a href="https://discord.gg/8QZ7Y4K" target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-primary linkButton">Rejoindre le serveur discord</button>
                    </a>
                </section>
                <section>
                    <h5>Mail</h5>
                    <p>
                        Vous pouvez nous contacter par mail, pour cela il vous suffit d'envoyer un mail à l'adresse suivante :
                    </p>
                    <a href="mailto:bounoirfabien@gmail.com">
                        <button className="btn btn-primary linkButton">Envoyer un mail</button>
                    </a>
                </section>
                <section>
                    <h5>Directement avec le bot</h5>
                    <p>
                        Vous pouvez nous contacter directement avec le bot, pour cela il vous suffit de faire la commande
                        <code>/report</code><br />
                        Un message privé sera donc envoyé a l'équipe de bouns'bot, et vous recevrez une réponse dans les plus brefs délais en message privé.
                    </p>
                </section>

                <h2>Comment supprimer vos données</h2>
                <p>
                    Bouns'bot a été crée dans l'unique but d'ameliorer votre expérience sur discord, et nous ne voulons pas que vos données soient utilisées à mauvais escient, c'est pour cela que nous mettons en place plusieur moyen pour visualisé vos donnée collecter, et pour les supprimer si vous le souhaitez.
                </p>
                <section>
                    <h5>Supprimer vos données</h5>
                    <p>
                        Vous pouvez supprimer vos données en faisant la commande <code>/data delete</code> sur un serveur discord, ou en message privé avec le bot, la suppression de vos données est définitive, et ne pourra pas être annulée.
                    </p>
                    <p>
                        Vous pouvez également supprimer vos données en nous contactant par mail ou sur notre serveur discord, nous supprimerons vos données dans les plus brefs délais.
                    </p>
                    <p>
                        Vous pouvez également envoyer un message au support avec la commande <code>/report</code> pour supprimer vos données, vous recevrez alors une reponse par message privé.
                    </p>
                </section>
                <section>
                    <h5>Visualiser vos données</h5>
                    <p>
                        Vous pouvez visualiser vos données en faisant la commande <code>/data get</code> sur un serveur discord, ou en message privé avec le bot, l'utilisation de cette commande vous enverra un fichier contenant l'ensemble de vos données.
                    </p>
                </section>
                <section>
                    <h5>Desactivé la collecte de vos données</h5>
                    <p>
                        Vous pouvez a tout moment desactivé la collecte de vos données en faisant la commande <code>/data collection:false</code> sur un serveur discord, ou en message privé avec le bot, l'utilisation de cette commande desactive la collecte de vos données, cela auras pour concequence de ne plus pouvoir utiliser quelque fonctionnalités de Bouns'bot.
                    </p>
                    <p>
                        Vous pouvez également desactivé la collecte de vos données en nous contactant par mail ou sur notre serveur discord, nous desactiverons la collecte de vos données des que possible.
                    </p>
                    <p>
                        Vous pouvez également envoyer un message au support avec la commande <code>/report</code> pour desactiver la collecte de vos données, vous recevrez alors une reponse par message privé des que cette operation sera effectuée.
                    </p>
                </section>

                <div className="signature">
                    <p>
                        <b>Bouns'o'team</b>
                    </p>
                </div>
            </div>
        </div>
    );
};