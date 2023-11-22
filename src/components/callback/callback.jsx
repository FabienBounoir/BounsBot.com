import "./_callback.css";
import { Component, useEffect } from 'react'
import Avatar from "../avatar/avatar";
import { getUser, login } from "../../utils/API/authAPI";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useStore } from "../../utils/store";

// class Callback extends Component {
export const Callback = () => {
    const history = useHistory();
    // const [state, dispatch] = useStore();
    const [state, dispatch] = useStore();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code')

        if (!code) {
            return document.location.href = "/login";
        }

        login(code).then(data => {
            getUser().then(user => {
                history.push("/dashboard/user/description")
                dispatch({ logged: true, user })
            }).catch(error => {
                console.error("User error", error)
                dispatch({ logged: false, user: null })
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                history.push("/login")
            })
        }).catch(error => {
            console.error("login send code error", error)
            dispatch({ logged: false, user: null })
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            history.push("/login")
        })
    }, [])



    return (
        <div className="container-logo">
            <Avatar classElement="width-logo-svg" />
            <p><strong>Authentification en cours</strong><br />Veuillez patienter...</p>
            <span>Se connecter avec Discord</span>
        </div>
    )
}

// export default Callback;