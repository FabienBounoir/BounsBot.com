import { useTranslation } from "react-i18next";
import "./_ticket.css";
import { useEffect, useState } from "react";

export const Ticket = () => {
    const { t } = useTranslation();
    const [html, setHtml] = useState("<></>")

    useEffect(async () => {
        // let ticketUrl = new URLSearchParams(window.location.search).get('url')
        // console.log("ticketUrl", ticketUrl)
        // const html = await fetch("https://cdn.discordapp.com/attachments/1004792421319716894/1196599364139892776/transcripcion-1196598174274555955.html?ex=65b83700&is=65a5c200&hm=095c35d9e57e51a405894e843c2bc07b7274e3a88f73b425d16fda7d5d3efe66&")
        //     .then(response => response.text())
        //     .catch(error => console.error(error))

        // console.log("html", html)

        const lien = "https://cdn.discordapp.com/attachments/1004792421319716894/1196599364139892776/transcripcion-1196598174274555955.html?ex=65b83700&is=65a5c200&hm=095c35d9e57e51a405894e843c2bc07b7274e3a88f73b425d16fda7d5d3efe66&"

        const xhr = new XMLHttpRequest();
        xhr.open("GET", lien, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Remplacer le contenu de la page par le contenu HTML
                document.body.innerHTML = xhr.responseText;
            }
        };
        xhr.send();
    }, [])

    return (
        <></>
    )
}