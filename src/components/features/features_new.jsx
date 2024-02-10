import "./_featurenew.css";

import infractions from "../../assets/picture/features/infractions.png";
import dmMessage from "../../assets/picture/features/dm-message.png";

import music from "../../assets/picture/features/music.png";
import radio from "../../assets/picture/features/radio.png";

import ticket from "../../assets/picture/features/ticket.png";
import transcript from "../../assets/picture/features/transcript.png";
import openTicket from "../../assets/picture/features/open-ticket.png";

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
        }
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


    return (<>
        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Modération</p>
                    <h2>Gérez votre serveur</h2>
                </div>
                <p>Faire respecter la lois sur votre serveur n'a jamais été aussi simple avec Bouns'Bot [AJOUTER DES TRUCS ICI]</p>
                <Feature featureElement={moderation} />
            </div>
        </div>

        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">Multimédia</p>
                    <h2>Ambiancez votre serveur</h2>
                </div>
                <p>Créer une ambiance unique sur votre serveur avec Bouns'Bot, vous avez accès à une multitude de commandes pour animer votre serveur [AJOUTER DES TRUCS ICI]</p>
                <Feature featureElement={multimedia} />
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

    </>
    )
}