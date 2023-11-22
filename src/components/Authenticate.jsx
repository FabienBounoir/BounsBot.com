import { Redirect } from "react-router-dom";

function Authenticate({ children }) {
    let auth = false;

    const info = window.localStorage.getItem('token');

    return info ? children : <Redirect to="/login?status=invalidToken" />;
}

export default Authenticate