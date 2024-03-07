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
            title: "feature.moderation.example1.title",
            img: infractions,
            description: "feature.moderation.example1.description",
            module: "Moderation"
        },
        {
            title: "feature.moderation.example2.title",
            img: dmMessage,
            description: "feature.moderation.example2.description",
            module: "Moderation"
        },
        {
            title: "feature.moderation.example3.title",
            img: logsinfractions,
            description: "feature.moderation.example3.description",
            module: "Moderation"
        }
    ]

    const multimedia = [
        {
            title: "feature.multimedia.example1.title",
            img: music,
            description: "feature.multimedia.example1.description",
            module: "Musique"
        },
        {
            title: "feature.multimedia.example2.title",
            img: radio,
            description: "feature.multimedia.example2.description",
            module: "Radio"
        },
        {
            title: "feature.multimedia.example3.title",
            img: blindtest,
            description: "feature.multimedia.example3.description",
            module: "Fun"
        },
    ]

    const ticketing = [
        {
            title: "feature.ticket.example1.title",
            img: ticket,
            description: "feature.ticket.example1.description",
            module: "ticket"

        },
        {
            title: "feature.ticket.example2.title",
            img: transcript,
            description: "feature.ticket.example2.description",
            module: "ticket"
        },
        {
            title: "feature.ticket.example3.title",
            img: openTicket,
            description: "feature.ticket.example3.description",
            module: "ticket"
        }
    ]

    const logs = [
        {
            title: "feature.logs.example1.title",
            img: logsjoin,
            description: "feature.logs.example1.description",
            module: "Config"
        },
        {
            title: "feature.logs.example2.title",
            img: logsvocal,
            description: "feature.logs.example2.description",
            module: "Config"
        },
        {
            title: "feature.logs.example3.title",
            img: logsuser,
            description: "feature.logs.example3.description",
            module: "Config"
        }
    ]

    const games = [
        {
            title: "feature.game.example1.title",
            img: chifumi,
            description: "feature.game.example1.description",
            module: "Game"
        },
        {
            title: "feature.game.example2.title",
            img: minesweeper,
            description: "feature.game.example2.description",
            module: "Game"
        },
        {
            title: "feature.game.example3.title",
            img: whothatpokemon,
            description: "feature.game.example3.description",
            module: "Game"
        }
    ]

    return (<>
        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">{t("feature.moderation.name")}</p>
                    <h2>{t("feature.moderation.title")}</h2>
                </div>
                <p>{t("feature.moderation.description")}</p>
                <Feature featureElement={moderation} />
            </div>
        </div>

        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">{t("feature.multimedia.name")}</p>
                    <h2>{t("feature.multimedia.title")}</h2>
                </div>
                <p>{t("feature.multimedia.description")}</p>
                <Feature featureElement={multimedia} revert={true} />
            </div>
        </div>

        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">{t("feature.ticket.name")}</p>
                    <h2>{t("feature.ticket.title")}</h2>
                </div>
                <p>{t("feature.ticket.description")}</p>
                <Feature featureElement={ticketing} />
            </div>
        </div>

        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">{t("feature.logs.name")}</p>
                    <h2>{t("feature.logs.title")}</h2>
                </div>
                <p>{t("feature.logs.description")}</p>
                <Feature featureElement={logs} revert={true} />
            </div>
        </div>

        <div className="features">
            <div className="features__container">
                <div className="features__container__title">
                    <p class="">{t("feature.game.name")}</p>
                    <h2>{t("feature.game.title")}</h2>
                </div>
                <p>{t("feature.game.description")}</p>
                <Feature featureElement={games} />
            </div>
        </div>



    </>
    )
}