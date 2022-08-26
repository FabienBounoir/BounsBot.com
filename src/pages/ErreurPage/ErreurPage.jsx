import "./_ErreurPage.css";
import logo404 from '../../assets/picture/404page.png';
import lottie from 'lottie-web'
import logo from "../../assets/data.json";
import React from "react";

export const ErreurPage = () => {
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#error"), // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: logo,
            name: "404 error",
            rendererSettings: {
                progressiveLoad: true,
                hideOnTransparent: true
            },
        });
    }, []);

    return (
        //fait moi une page 404
        <div className="ErreurPage">
            <div className="ErreurPage__container">
                <div className="ErreurPage__container__text">
                    <h1>MAUVAIS VIRAGE ?</h1>
                    <p>Tu as l'air perdu, étranger. si tu souhaites ajouter Bouns'Bot, le bouton ci-dessous pourrait t’aider </p>
                    <a className="home__top__bot__invite" href="https://discord.com/api/oauth2/authorize?client_id=806105506883960853&permissions=1945627743&scope=bot%20applications.commands" ><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.9485 8.6582C8.45993 8.6582 8.07422 9.07487 8.07422 9.5832C8.07422 10.0915 8.4685 10.5082 8.9485 10.5082C9.43708 10.5082 9.82279 10.0915 9.82279 9.5832C9.83136 9.07487 9.43708 8.6582 8.9485 8.6582ZM12.0771 8.6582C11.5885 8.6582 11.2028 9.07487 11.2028 9.5832C11.2028 10.0915 11.5971 10.5082 12.0771 10.5082C12.5656 10.5082 12.9514 10.0915 12.9514 9.5832C12.9514 9.07487 12.5656 8.6582 12.0771 8.6582Z" fill="white"></path> <path d="M17.4515 0H3.66863C2.51149 0 1.56006 0.916667 1.56006 2.05833V15.5833C1.56006 16.725 2.50292 17.6417 3.66863 17.6417H15.3343L14.7858 15.7917L16.1058 16.9833L17.3486 18.1L19.5601 20V2.05833C19.5601 0.916667 18.6172 0 17.4515 0ZM13.4829 13.0583C13.4829 13.0583 13.1143 12.625 12.8058 12.25C14.1515 11.8833 14.6658 11.0583 14.6658 11.0583C14.2458 11.325 13.8429 11.5167 13.4829 11.65C12.9686 11.8583 12.4715 12 11.9915 12.0833C11.0058 12.2667 10.0972 12.2167 9.32577 12.075C8.74291 11.9667 8.2372 11.8083 7.8172 11.6417C7.5772 11.55 7.32006 11.4417 7.06291 11.3C7.02863 11.2833 7.00291 11.2667 6.96863 11.25C6.95149 11.2417 6.93434 11.2333 6.92577 11.2167C6.7372 11.1167 6.63434 11.05 6.63434 11.05C6.63434 11.05 7.13149 11.85 8.43434 12.2333C8.12577 12.6167 7.74863 13.0667 7.74863 13.0667C5.4772 13 4.61149 11.55 4.61149 11.55C4.61149 8.33333 6.09434 5.71667 6.09434 5.71667C7.5772 4.63333 8.98291 4.66667 8.98291 4.66667L9.08577 4.78333C7.23434 5.3 6.3772 6.09167 6.3772 6.09167C6.3772 6.09167 6.60006 5.975 6.98577 5.8C8.08291 5.33333 8.9572 5.2 9.3172 5.16667C9.3772 5.15833 9.42863 5.15 9.48863 5.15C10.1143 5.06667 10.8258 5.05 11.5629 5.13333C12.5401 5.24167 13.5858 5.525 14.6572 6.09167C14.6572 6.09167 13.8429 5.34167 12.0943 4.825L12.2401 4.66667C12.2401 4.66667 13.6458 4.63333 15.1286 5.71667C15.1286 5.71667 16.6115 8.325 16.6115 11.55C16.6286 11.5417 15.7543 12.9917 13.4829 13.0583Z" fill="white"></path></svg> <span>Ajouter à Discord</span></a>
                </div>
                <div className="ErreurPage__container__error">
                    <div id="error"></div>
                </div>
            </div>
        </div>
    )
}