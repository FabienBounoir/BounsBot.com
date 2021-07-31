// import React from "react";
import "./_ErreurPage.css";
import logo404 from '../picture/404page.png';

export const ErreurPage = () => {
    return (
        <div class="error-page">
            <img src={logo404} class="error-page" alt="Erreur 404" title="Erreur 404"/>
        </div>
    )
}