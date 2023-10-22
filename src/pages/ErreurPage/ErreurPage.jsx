import "./_ErreurPage.css";
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
                    <a className="invite_bot_button" href={"https://discord.com/api/oauth2/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID + "&permissions=1945627743&scope=bot%20applications.commands"} >
                        <svg width="22" height="25" viewBox="0 0 136 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M115.13 26.7533C106.462 22.7563 97.1662 19.8114 87.4473 18.1247C87.2704 18.0922 87.0935 18.1736 87.0024 18.3363C85.807 20.4731 84.4829 23.2607 83.5555 25.4517C73.1023 23.8789 62.7026 23.8789 52.4638 25.4517C51.5364 23.2119 50.1641 20.4731 48.9633 18.3363C48.8721 18.179 48.6952 18.0976 48.5183 18.1247C38.8049 19.806 29.5095 22.7509 20.836 26.7533C20.7609 26.7859 20.6966 26.8401 20.6537 26.9106C3.02256 53.3821 -1.80738 79.2028 0.562021 104.703C0.572742 104.828 0.64243 104.948 0.738922 105.023C12.3715 113.609 23.6396 118.821 34.6986 122.275C34.8755 122.329 35.0631 122.264 35.1757 122.118C37.7917 118.528 40.1236 114.742 42.1231 110.761C42.241 110.528 42.1285 110.252 41.8872 110.159C38.1884 108.749 34.6664 107.03 31.2785 105.078C31.0105 104.92 30.989 104.535 31.2356 104.351C31.9486 103.814 32.6616 103.255 33.3424 102.691C33.4657 102.588 33.6372 102.567 33.7819 102.632C56.0393 112.844 80.1354 112.844 102.13 102.632C102.275 102.561 102.446 102.583 102.575 102.686C103.256 103.25 103.969 103.814 104.687 104.351C104.934 104.535 104.918 104.92 104.65 105.078C101.262 107.068 97.7398 108.749 94.0356 110.154C93.7943 110.246 93.6871 110.528 93.8051 110.761C95.8475 114.737 98.1794 118.522 100.747 122.112C100.854 122.264 101.047 122.329 101.224 122.275C112.337 118.821 123.605 113.609 135.237 105.023C135.339 104.948 135.404 104.834 135.414 104.709C138.25 75.2274 130.665 49.6183 115.307 26.916C115.269 26.8401 115.205 26.7859 115.13 26.7533ZM45.4467 89.1763C38.7459 89.1763 33.2244 82.9937 33.2244 75.401C33.2244 67.8083 38.6387 61.6256 45.4467 61.6256C52.3083 61.6256 57.7762 67.8625 57.669 75.401C57.669 82.9937 52.2547 89.1763 45.4467 89.1763ZM90.6369 89.1763C83.9361 89.1763 78.4147 82.9937 78.4147 75.401C78.4147 67.8083 83.8289 61.6256 90.6369 61.6256C97.4986 61.6256 102.966 67.8625 102.859 75.401C102.859 82.9937 97.4986 89.1763 90.6369 89.1763Z" fill="white" />
                        </svg>
                        <span>Ajouter à Discord</span>
                    </a>
                </div>
                <div className="ErreurPage__container__error">
                    <div id="error"></div>
                </div>
            </div>
        </div>
    )
}