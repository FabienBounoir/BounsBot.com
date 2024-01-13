import { useState, useEffect } from "react"
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { useTranslation } from "react-i18next";
import * as infractionsAPI from "../../utils/API/infractionsAPI.js";
import InfiniteScroll from "react-infinite-scroll-component";

export const InfractionElement = ({ inf, index }) => {

    const statusSvg = (status) => {
        switch (status) {
            case "ACTIVE":
                return <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_3022_315)">
                        <path d="M7.35616 5.7965C9.24366 6.34817 11.6137 5.55067 14.1662 4.24067L14.167 4.3065C14.167 5.38984 12.7987 6.72067 11.4603 7.87984C11.2142 8.09556 11.0028 8.34798 10.8337 8.62817V14.2332C11.9345 14.5432 13.1795 15.974 14.0228 17.279C14.0003 17.3523 13.987 17.4282 13.9587 17.4998H6.87533C6.84699 17.4273 6.82783 17.3582 6.80699 17.2882C7.64866 15.9798 8.89783 14.544 10.0012 14.2332V8.62567C9.83633 8.35208 9.63125 8.10487 9.39282 7.89234C8.64726 7.26204 7.96537 6.56006 7.35699 5.7965H7.35616ZM14.9353 1.6665H16.667V2.49984H15.4037C15.6837 3.10579 15.8303 3.76481 15.8337 4.43234C15.8337 6.224 14.6012 8.01067 12.8795 9.509C12.7347 9.61575 12.6139 9.75167 12.525 9.90798C12.436 10.0643 12.3807 10.2375 12.3628 10.4165C12.3807 10.5955 12.436 10.7687 12.525 10.925C12.6139 11.0813 12.7347 11.2173 12.8795 11.324C14.6012 12.8223 15.8337 14.6082 15.8337 16.3998C15.8304 17.0676 15.6838 17.727 15.4037 18.3332H16.667V19.1665H4.16699V18.3332H5.41699C5.1433 17.7256 5.00129 17.067 5.00033 16.4007C5.00033 14.609 6.23283 12.8223 7.95449 11.324C8.09926 11.2173 8.22004 11.0813 8.30903 10.925C8.39802 10.7687 8.45325 10.5955 8.47116 10.4165C8.45325 10.2375 8.39802 10.0643 8.30903 9.90798C8.22004 9.75167 8.09926 9.61575 7.95449 9.509C6.23283 8.01067 5.00033 6.22484 5.00033 4.43317C5.00118 3.76654 5.14318 3.10764 5.41699 2.49984H4.16699V1.6665H14.9353ZM14.4812 2.49984H6.35366C6.01505 3.08806 5.83581 3.75446 5.83366 4.43317C5.83366 5.804 6.78116 7.38317 8.50032 8.87984C8.73974 9.06055 8.93612 9.2921 9.07532 9.55781C9.21451 9.82352 9.29307 10.1168 9.30533 10.4165C9.29322 10.716 9.21481 11.0092 9.07575 11.2747C8.93669 11.5403 8.74045 11.7718 8.50116 11.9523C6.78116 13.4498 5.83449 15.029 5.83449 16.4007C5.83628 17.079 6.01494 17.745 6.35283 18.3332H14.4803C14.8202 17.7455 14.9995 17.0787 15.0003 16.3998C15.0003 15.029 14.0528 13.4498 12.3337 11.9532C12.0942 11.7725 11.8979 11.5409 11.7587 11.2752C11.6195 11.0095 11.5409 10.7162 11.5287 10.4165C11.5408 10.117 11.6192 9.82384 11.7582 9.55826C11.8973 9.29268 12.0935 9.06126 12.3328 8.88067C14.0528 7.38317 14.9995 5.804 14.9995 4.43234C14.9993 3.75396 14.82 3.08754 14.4812 2.49984Z" fill="var(--color-principal)" />
                    </g>
                    <defs>
                        <clipPath id="clip0_3022_315">
                            <rect width="40" height="40" fill="white" />
                        </clipPath>
                    </defs>
                </svg>


                break;
            case "EXPIRED":
                return <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4.58317L4.16667 2.9165M17.5 4.58317L15.8333 2.9165M7.5 7.9165L12.5 12.9165M12.5 7.9165L7.5 12.9165M16.6667 10.4165C16.6667 14.0984 13.6819 17.0832 10 17.0832C6.3181 17.0832 3.33333 14.0984 3.33333 10.4165C3.33333 6.7346 6.3181 3.74984 10 3.74984C13.6819 3.74984 16.6667 6.7346 16.6667 10.4165Z" stroke="var(--color-principal)" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                break;

            default:
                return <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.33301 10L11.6663 13.3333M11.6663 10L8.33301 13.3333M14.9997 5L14.3323 15.0107C14.2738 15.8875 14.2446 16.3259 14.0553 16.6583C13.8885 16.951 13.637 17.1863 13.3339 17.3332C12.9897 17.5 12.5503 17.5 11.6715 17.5H8.32782C7.44907 17.5 7.00969 17.5 6.66542 17.3332C6.36232 17.1863 6.11083 16.951 5.94411 16.6583C5.75473 16.3259 5.72551 15.8875 5.66706 15.0107L4.99967 5M3.33301 5H16.6663M13.333 5L13.1075 4.32339C12.8889 3.66771 12.7796 3.33987 12.5769 3.09748C12.3979 2.88344 12.1681 2.71777 11.9084 2.61565C11.6143 2.5 11.2688 2.5 10.5777 2.5H9.42167C8.73051 2.5 8.38501 2.5 8.09093 2.61565C7.83127 2.71777 7.60141 2.88344 7.42242 3.09748C7.21972 3.33987 7.11044 3.66771 6.89187 4.32339L6.66634 5" stroke="var(--color-principal)" stroke-linecap="round" stroke-linejoin="round" />
                </svg>


                break;
        }
    }

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        // Calcul du reste des secondes, minutes et heures
        const remainingSeconds = seconds % 60;
        const remainingMinutes = minutes % 60;
        const remainingHours = hours % 24;

        // Construction de la chaîne de format
        const formattedTime = `${days ? days + "d " : ""}${remainingHours ? remainingHours + "h " : ""}${remainingMinutes ? remainingMinutes + "m " : ""}${remainingSeconds ? remainingSeconds + "s " : ""}`

        return formattedTime;
    }

    return (<>
        <tr>
            <td colspan="4" className="user">
                <div className="avatar_moderator">
                    <img src={inf.user ? `${inf.user.avatarURL}` : ""} />
                    <div>
                        <p>{inf.user ? `${inf.user.displayName}` : inf.userId}</p>
                        <p>{inf.user ? `${inf.user.tag}` : ""}</p>
                    </div>
                </div>
            </td>
            <td></td>
            <td colspan="1" style={{ textAlign: "left" }}>{inf.type}</td>
            <td className="duration_cellule" colspan="1" style={{ textAlign: "center" }}>{formatTime(inf.duration)}</td>
            <td colspan="1" style={{ textAlign: "center" }} data-tooltip-id={`inf-type`} data-tooltip-html={`${inf.status}`}>{statusSvg(inf.status)}</td>
            <td className="mod_cellule">
                <div className="avatar_moderator">
                    <img src={inf.moderator ? `${inf.moderator.avatarURL}` : ""} />
                    <div>
                        <p>{inf.moderator ? `${inf.moderator.displayName}` : inf.moderatorId}</p>
                        <p>{inf.moderator ? `${inf.moderator.tag}` : ""}</p>
                    </div>
                </div>
            </td>
        </tr>
    </>)
}
