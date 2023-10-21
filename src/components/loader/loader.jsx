import { useEffect, useMemo, useState } from "react";
import "./_loader.css"

const textLoading = [
    "Chargement en cours... 🚀",
    "Saviez-vous que les chatons sont de véritables boules de poils adorables ? 😻",
    "Un petit secret : les pingouins sont d'excellents danseurs ! 🐧💃",
    "La patience est une vertu, même lors du chargement de la page. 🧘‍♂️",
    "Besoin d'une pause ? Pourquoi ne pas faire une petite danse du robot ? 🤖💃",
    "L'astronomie est fascinante. Chaque étoile est un monde en soi. ✨🪐",
    "Amusez-vous à deviner combien de nuages passent pendant le chargement. ☁️☁️☁️",
    "Saviez-vous que les éléphants ont une excellente mémoire ? 🐘🧠",
    "Les coccinelles portent chance ! 🐞🍀",
    "La nature est pleine de beauté. Prenez un moment pour l'apprécier. 🌿🌻",
    "La curiosité est le meilleur carburant de la connaissance. 💡📚",
    "Un sourire est le langage universel de l'amitié. 😄🤝",
    "Les rêves sont comme des étoiles : vous ne pouvez pas toujours les toucher, mais vous pouvez les suivre. 🌟🌠",
    "En attendant, voici une blague : Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau ! 🤣🚢",
    "Saviez-vous que les pingouins ont des réunions secrètes tous les jeudis soir ? Chuuut, c'est un secret ! 🐧🤫",
    "Le chargement peut prendre un peu de temps, mais rappelez-vous : les grandes choses prennent du temps. 🚀🌟",
    "Pourquoi le JavaScript a-t-il l'air si fatigué ? Parce qu'il a toujours besoin de caféine (addEventListener 'coffee') ! ☕😄",
    "La persévérance est la clé du succès. Continuez d'attendre, vous y êtes presque ! 🌈💪",
    "Votre patience est admirable. Profitez de cette pause pour prendre une grande inspiration et sourire. 😊🌬️",
    "Saviez-vous que les pandas sont les rois de la sieste ? 🐼💤",
    "Il y a des trésors cachés dans chaque moment d'attente. Continuez de chercher ! 💎🔍",
    "Rappelez-vous que même les plus grands bâtiments ont commencé par des fondations. Votre page est en train de devenir géniale ! 🏗️📈",
    "Le chargement est une occasion de faire une pause, de respirer profondément et de vous rappeler à quel point vous êtes incroyable. 🌟🌿",
    "Le succès commence par un simple pas. Votre chargement en est un ! 🚶‍♂️🌟",
    "Ne perdez jamais espoir, même en attendant. Chaque instant est une opportunité. 🌈💫",
    "Vous êtes plus fort que vous ne le pensez. Gardez la foi en attendant. 💪🌟",
    "La persévérance est la clé de la réussite. Continuez d'attendre, votre moment viendra. 🗝️🌟",
    "Saviez-vous que les arcs-en-ciel ne viennent qu'après la pluie ? Votre chargement est la pluie avant l'arc-en-ciel. 🌦️🌈",
    "Les rêves se réalisent un pas à la fois. Votre page est un pas de plus vers la réalisation de votre rêve. 🚀💭",
    "Chaque chargement est une opportunité de grandir. Continuez de grandir, même pendant l'attente. 🌱🌟",
    "La patience est une vertu. Vous êtes en train de devenir plus patient chaque seconde. ⏳😇",
    "N'oubliez pas que vous avez traversé des moments difficiles avant et vous en êtes sorti plus fort. 🦸‍♂️💪",
    "La vie est un voyage, et même le chargement fait partie du voyage. Profitez-en ! 🌍🌟",
];



export const Loader = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const time = new Date().getTime()

        window.addEventListener("load", () => {

            if (new Date().getTime() - time < 2000) {
                setTimeout(() => {
                    setLoading(false)
                }, 1500 - (new Date().getTime() - time))
            }
        })

        return () => {
            window.removeEventListener("load", () => { })
        }
    }, [])

    const textLoadingTemplate = useMemo(() => {
        return textLoading[Math.floor(Math.random() * textLoading.length)]
    }, [])


    return (
        <div className={"loader" + (loading ? "" : " disabled")}>
            <div className="loader-container">
                <div className="loader-logo">
                    <svg width="291" viewBox="0 0 291 265" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M107.856 183.338C106.431 183.338 105.112 184.097 104.397 185.331L89.5053 210.992C87.9578 213.659 89.8818 217 92.965 217H197.494C200.577 217 202.501 213.659 200.953 210.992L186.062 185.331C185.346 184.097 184.028 183.338 182.602 183.338H107.856Z"
                            fill="#E9E9E9" />
                        <path
                            d="M230.22 136.249C241.116 131.873 246.423 119.475 242.033 108.585V108.585C237.651 97.7152 225.264 92.4604 214.389 96.8278V96.8278C203.492 101.204 198.185 113.603 202.576 124.493V124.493C206.959 135.362 219.345 140.616 230.22 136.249V136.249Z"
                            fill="#E9E9E9" />
                        <path
                            d="M54.5004 130.842C62.4816 139.509 75.9756 140.076 84.6583 132.112V132.112C93.3662 124.125 93.9393 110.584 85.9343 101.893V101.893C77.9528 93.227 64.46 92.661 55.7778 100.624V100.624C47.0706 108.611 46.4967 122.151 54.5004 130.842V130.842Z"
                            fill="#E9E9E9" />
                        <path
                            d="M142.725 40.9895C142.725 39.2154 144.163 37.7771 145.937 37.7771V37.7771C147.711 37.7771 149.149 39.2154 149.149 40.9895V62.5868C149.149 64.3609 147.711 65.7992 145.937 65.7992V65.7992C144.163 65.7992 142.725 64.3609 142.725 62.5868V40.9895Z"
                            fill="#E9E9E9" />
                        <g filter="url(#filter0_d_2708_336)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M219.988 168.863C196.183 204.299 98.9108 205.909 71.8776 168.863C44.8444 131.414 94.6123 59.2836 145.451 60.8943C196.289 62.9077 243.39 133.83 219.988 168.863ZM155 138C155 124.745 165.745 114 179 114H180C193.255 114 204 124.745 204 138C204 151.255 193.255 162 180 162H179C165.745 162 155 151.255 155 138ZM111 114C97.7452 114 87 124.745 87 138C87 151.255 97.7452 162 111 162H112C125.255 162 136 151.255 136 138C136 124.745 125.255 114 112 114H111Z"
                                fill="#E9E9E9" />
                        </g>
                        <g filter="url(#filter1_d_2708_336)">
                            <path
                                d="M137.064 47.9103C141.519 52.7485 149.051 53.065 153.898 48.6195V48.6195C158.758 44.1611 159.078 36.6023 154.609 31.7512V31.7512C150.154 26.915 142.623 26.5994 137.777 31.0441V31.0441C132.917 35.5017 132.597 43.0589 137.064 47.9103V47.9103Z"
                                fill="#E9E9E9" />
                        </g>
                        <defs>
                            <filter id="filter0_d_2708_336" x="0.262695" y="0.867798" width="289.899" height="263.179"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="32" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2708_336" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2708_336" result="shape" />
                            </filter>
                            <filter id="filter1_d_2708_336" x="129.912" y="24.9067" width="31.8506" height="31.8502"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha" />
                                <feOffset dy="1" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2708_336" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2708_336" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                </div>
                <div className="loader-bar">
                    <div className="loader-bar-container">
                        <div className="loader-bar-content">{textLoadingTemplate}</div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Loader;