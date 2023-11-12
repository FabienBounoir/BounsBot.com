import "./_callback.css";
import { Component } from 'react'
import Fetch from "../../utils/fetch.js";
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

    sendCode() {
        const code = new URLSearchParams(window.location.search).get('code')

        login(code).then(data => {
            console.log(data)
            this.setState({
                type: "sendCode",
                data: data
            })
        })
    }

    logout() {
        fetch("http://localhost:3500/auth/logout").then(res => res.json()).then(data => {
            console.log(data)
            this.setState({
                type: "logout",
                data: data
            })
        })

    }

    getGuilds() {
        fetch("http://localhost:3500/auth/guilds", {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("token")
            }
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({
                type: "getGuilds",
                data: data
            })
        })
    }

    render() {
        return (
            <div className="container-logo">
                <Avatar classElement="width-logo-svg" />
                <p><strong>Authentification en cours</strong><br />Veuillez patienter...</p>
                <span>Se connecter avec Discord</span>

                <button onClick={() => { this.sendCode() }} >sendCode</button>
                <button onClick={() => { this.logout() }} >logout</button>
                <button onClick={() => { this.getGuilds() }} >Guilds</button>

                <pre>
                    {JSON.stringify(this.state, null, 2)}
                </pre>


            </div>
        )
    }
}

export default Callback;