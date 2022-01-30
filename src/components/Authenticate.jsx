import { Redirect } from "react-router-dom";

function Authenticate({ children }) {
    let auth = false;

    //check if token in locals storage
    const info = JSON.parse(window.localStorage.getItem('dataDiscord'));

    if (info && info.access_token) {
        auth = true
    }

    return auth ? children : <Redirect to="/login" />;
}

export default Authenticate