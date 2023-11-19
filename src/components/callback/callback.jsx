import "./_callback.css";
import { Component } from 'react'
import Avatar from "../avatar/avatar";
import { login } from "../../utils/API/authAPI";

class Callback extends Component {

    state = {
        type: null,
        data: null
    }

    componentDidMount() {
        const code = new URLSearchParams(window.location.search).get('code')

        if (!code) {
            return document.location.href = "/login";
        }

        login(code).then(data => {
            document.location.href = "/dashboard/user/description";
        }).catch(error => {
            console.error(error)
            document.location.href = "/login";
        })
    }


    render() {
        return (
            <div className="container-logo">
                <Avatar classElement="width-logo-svg" />
                <p><strong>Authentification en cours</strong><br />Veuillez patienter...</p>
                <span>Se connecter avec Discord</span>
            </div>
        )
    }
}

export default Callback;