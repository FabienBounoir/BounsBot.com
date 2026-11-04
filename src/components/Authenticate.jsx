import { Navigate } from "react-router-dom";

function Authenticate({ children }) {
    const info = window.localStorage.getItem('token');
    return info ? children : <Navigate to="/login?status=invalidToken" replace />;
}

export default Authenticate
