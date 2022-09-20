import "./_bio.css";
import React from "react";

export const Bio = () => {
    return (
        <div className="privacy">
            <div className="privacy-section">
                <h1>Qui sommes-nous ?</h1>
            </div>
            <div className="privacy-section">
                <p><b>Bouns'bot</b> est un bot née d'une passion du developpement et de la programmation<br /> realisé par <b>BadbounsTV</b></p>
                <p>Le bot est en constante évolution, et est régulièrement mis à jour.</p>
                <p>il est actuellement en version <b>2.2.0</b></p>
                {/* <br /> */}
                <p>La philosophie de <b>Bouns'bot</b> est de proposer un bot complet, et de qualité, avec l'ensemble des fonctionnalités que vous pouvez attendre d'un bot tous ça gratuitement !</p>
                <p>De nombreuse fonctionnalités disponibles sur <b>Bouns'bot</b> sont des fonctionnalités exclusives, et ne sont pas disponibles sur aucun autre bot.</p>

                <p>les data sont stockées sur un serveur privé, et ne sont pas partagées avec des tiers.</p>
                <p>les <b>données</b> sont utilisées uniquement pour le bon fonctionnement du bot, et ne sont pas utilisées à des fins commerciales.</p>
                <p>les <b>données</b> sont supprimées à la <b>demande de l'utilisateur</b></p>
                <p><b>Bouns'bot</b> est un bot <b>100% gratuit</b>, et ne demande aucune donnée bancaire.</p>

                <p>Si vous avez des questions, ou si vous souhaitez nous contacter, vous pouvez nous contacter sur notre serveur discord : <a href="https://discord.gg/KxedRVTutX">https://discord.gg/KxedRVTutX</a></p>
            </div>
        </div>
    );
};