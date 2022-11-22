import "./_homepage.css";
import Avatar from "../../components/avatar/avatar";
import TypeIt from "typeit";
import { useEffect } from "react";

export const HomePage = () => {
    const scrollToFeatures = () => {
        document.getElementsByClassName("features")[0].scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        document.addEventListener("DOMContentLoaded", () => {
            new TypeIt("#typeit", {
                speed: 70,
                startDelay: 0,
                loop: true,
                lifeLike: true,
                cursorSpeed: 1000,
            }).move(-19).delete(8)
                .type("<b>la modération</b>", { delay: 1200, speed: 100 }).delete(13)
                .type("<b>les levels</b>", { delay: 1200, speed: 100 }).delete(10)
                .type("<b>l'animation</b>", { delay: 1200, speed: 100 }).delete(11)
                .type("<b>la musique</b>", { delay: 1200, speed: 100 }).delete(10)
                .type("<b>les tickets</b>", { delay: 1200, speed: 100 }).delete(11)
                .type("<b>les logs</b>", { delay: 1200, speed: 100 })
                .move(null, { to: "END" }).delete(27).type("<b>vous !!!</b>", { delay: 5000 }).go() //.delete(null, { to: "END" }).go() //.move(null, { to: "END" }).go();
        })
    }, [])

    const setClassEvent = () => {
        let classElement = "";
        let date = new Date();

        if (date.getMonth() === 9) {
            classElement = " home_halloween";
        }
        else if (date.getMonth() === 11 && (date.getDate() <= 26 && date.getDate() >= 15)) {
            classElement = " home_noel";
        }

        return classElement;
    }

    return (
        <div className={"homepage" + setClassEvent()}>
            {(() => {
                if (window.innerWidth > 768) {

                    let particulesNano = [];
                    let nbParticule = 20 || Math.floor(Math.random() * 35) + 20;

                    for (let i = 0; i < nbParticule; i++) {
                        let size = Math.floor(Math.random() * 30) + 20;
                        let size2 = Math.floor(249 * size / 267);

                        //position random sur la div
                        let top = Math.floor(Math.random() * 90) + 5 + "%";
                        let left = Math.floor(Math.random() * 90) + 5 + "%";

                        //rotation random -180° à 180°
                        let rotate = Math.floor(Math.random() * 360) - 180 + "deg";

                        particulesNano.push(<Avatar key={i} classElement="particulesNano" width={size} height={size2} styleElement={{ top, left, transform: `rotate(${rotate})`, animation: `nanoParticuleAnimation ${Math.floor(Math.random() * 8) + 5}s linear infinite` }} />);
                    }
                    return particulesNano;
                }
            })()}

            <div className="homepage__text">
                <h1><span>Bouns'Bot</span> le meilleur bot pour Discord</h1>
                <p id="typeit">Votre acolyte pour <b>la radio</b> sur votre serveur.</p>


                <div className="buttonContainer">
                    <a className="invite_bot_button" href={"https://discord.com/api/oauth2/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID + "&permissions=1945627743&scope=bot%20applications.commands"} >
                        <span>Inviter Bouns'bot</span>
                    </a>

                    <a className="invite_bot_button" href={"https://discord.gg/KxedRVTutX"} >
                        <span>Support</span></a>
                </div>

            </div>
            <div className="homepage__avatar">
                <Avatar easterEgg={true} />
            </div>

            <div className="homepage__scrollAnimation" onClick={() => scrollToFeatures()}>
                <div className="chevron"></div>
                <div className="chevron"></div>
                <div className="chevron"></div>
            </div>


        </div>
    )
}