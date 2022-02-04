import "./_ErreurPage.css";
import logo404 from '../picture/404page.png';

export const ErreurPage = () => {
    return (
        <div className="error-page">
            <img src={logo404}
             className="error-page" alt="Erreur 404" title="Erreur 404"/>
        </div>
    )
}