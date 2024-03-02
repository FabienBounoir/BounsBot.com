import "./_features.css";


import logsinfractions from "../../assets/picture/features/logs-infractions.png";
import infractions from "../../assets/picture/features/infractions.png";
import dmMessage from "../../assets/picture/features/dm-message.png";

import music from "../../assets/picture/features/music.png";
import radio from "../../assets/picture/features/radio.png";
import blindtest from "../../assets/picture/features/blindtest.png";

import ticket from "../../assets/picture/features/ticket.png";
import transcript from "../../assets/picture/features/transcript.png";
import openTicket from "../../assets/picture/features/open-ticket.png";

import chifumi from "../../assets/picture/features/game-chifumi.png";
import minesweeper from "../../assets/picture/features/game-minesweeper.png";
import whothatpokemon from "../../assets/picture/features/game-whothatpokemon.png";

import logsuser from "../../assets/picture/features/logs-user.png";
import logsjoin from "../../assets/picture/features/logs-join.png";
import logsvocal from "../../assets/picture/features/logs-vocal.png";


import { useTranslation } from "react-i18next";
import { Feature } from "./feature";

export const Features = () => {
    const { t } = useTranslation();

    const moderation = [
        {
            title: "Commande /infractions",
            img: infractions,
            description: "Garder l'historique complet des infractions de vos membres, rien n'est laissé de coté, ban, kick, mute, warn, tout est enregistré pour votre plus grand plaisir."
        },
        {
            title: "Message privé d'infractions",
            img: dmMessage,
            description: "Pour chaque infraction, un message privé est envoyé au membre pour l'informer de son infraction, et lui donner le détail de celle-ci, il sera donc impossible pour lui de dire qu'il ne savait pas."
        },
        {
            title: "Logs d'infractions",
            img: logsinfractions,
            description: "Toutes les infractions sont enregistré dans un channel spécifique, pour que vous puissiez suivre l'activité de votre serveur."
        }
    ]

    const multimedia = [
        {
            title: "Commande /play",
            img: music,
            description: "Jouer de la musique sur votre serveur n'a jamais été aussi simple, avec Bouns'Bot."
        },
        {
            title: "Commande /radio",
            img: radio,
            description: "Vous n'avez pas de musique à jouer ? Pas de problème, Bouns'Bot vous propose plus de 60000 radios pour animer votre serveur."
        },
        {
            title: "Blindtest",
            img: blindtest,
            description: "Vous pouvez vous tester sur votre culture musicale avec le blindtest, sois de façon aléatoire, sois en choisissant votre playlist."
        },
    ]

    const ticketing = [
        {
            title: "Ticketing",
            img: ticket,
            description: "Créer un système de ticketing sur votre serveur, pour que vos membres puissent vous contacter facilement."
        },
        {
            title: "Transcript",
            img: transcript,
            description: "Garder une trace de chaque ticket, pour ne rien oublier, chaque ticket est enregistré dans un channel spécifique avec toutes les informations nécessaires."
        },
        {
            title: "Ouvrir un ticket",
            img: openTicket,
            description: "Ouvrir un ticket n'a jamais été aussi simple, avec Bouns'Bot, vos membres peuvent ouvrir un ticket en un clic. Entièrement personnalisable pour s'adapter à votre serveur."
        }
    ]

    const logs = [
        {
            title: "Join / Leave",
            img: logsjoin,
            description: "Vous serrez informé chaque fois qu'un membre rejoins ou quitte votre serveur."
        },
        {
            title: "Vocal",
            img: logsvocal,
            description: "Chaque action realisé dans un salon vocal est enregistré que ce sois un join, leave, l'activation de la caméra, ou encore le partage d'écran."
        },
        {
            title: "Utilisateur",
            img: logsuser,
            description: "Vous serrez informé chaque fois qu'un membre change de pseudo, de rôle, ou encore de photo de profil."
        }
    ]

    const games = [
        {
            title: "Chifumi",
            img: chifumi,
            description: "Defiez vos amis au Chifumi et prouvez que vous êtes le meilleur. Vous pouvez meme defier Bouns'Bot."
        },
        {
            title: "Demineur",
            img: minesweeper,
            description: "Le but du jeu est de localiser toutes les mines présentes dans un champ de mines le plus rapidement possible. A chaque case cliqué vous aurez une indication sur le nombre de mines présentes autour de cette case."
        },
        {
            title: "Who that Pokemon",
            img: whothatpokemon,
            description: "Seras tu capable de reconnaitre tout les pokemons ? Avec ce jeu tu ne pourras plus dire que tu ne les connais pas."
        }
    ]

    return (<>
        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Modération</p>
                    <h2>Gérez votre serveur</h2>
                </div>
                <p>Faire respecter la lois sur votre serveur n'a jamais été aussi simple avec Bouns'Bot</p>
                <Feature featureElement={moderation} />
            </div>
        </div>

        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Multimédia</p>
                    <h2>Ambiancez votre serveur</h2>
                </div>
                <p>Créer une ambiance unique sur votre serveur avec Bouns'Bot, vous avez accès à une multitude de commandes pour animer votre serveur.</p>
                <Feature featureElement={multimedia} revert={true} />
            </div>
        </div>

        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Ticket</p>
                    <h2>Un support de qualité</h2>
                </div>
                <p>Bouns’bot permet de créer des channels de supports privés, que nous appelons des tickets, entre votre équipe et les personnes qui cherchent de l'aide.</p>
                <Feature featureElement={ticketing} />
            </div>
        </div>

        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Logs</p>
                    <h2>Surveillance</h2>
                </div>
                <p>Surveillez votre serveur avec Bouns'Bot, vous avez accès à une multitude de logs pour suivre l'activité de votre serveur.</p>
                <Feature featureElement={logs} revert={true} />
            </div>
        </div>

        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Jeux</p>
                    <h2>Amusez-vous</h2>
                </div>
                <p>Amusez-vous avec Bouns'Bot, Engagez votre communauté n'a jamais été aussi simple avec Bouns'Bot. Vous avez accès à plus de 20 jeux différents pour animer votre serveur.</p>
                <Feature featureElement={games} />
            </div>
        </div>



    </>
    )
}