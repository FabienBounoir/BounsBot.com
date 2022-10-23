import "./_callback.css";
import { Component } from 'react'
import Fetch from "../../utils/fetch.js";
import Avatar from "../avatar/avatar";


class Callback extends Component {

    async exchange_code(code) {
        let details = {
            'client_id': "1012688780471308339",
            'client_secret': "LCHB5zd_FtBa7q_ZeOv1nbBy9H3Ny1FG",
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': "https://bounsbot.com/oauth/callback"
        } //'redirect_uri': "http://localhost:3000/oauth/callback" | 'redirect_uri': "https://bounsbot.com/oauth/callback"

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const body = await fetch('https://discord.com/api/oauth2/token', {
            headers: headers,
            method: "POST",
            body: formBody
        }).catch(error => { console.error(error); document.location.href = "/"; });

        if (body.status === 200) {
            const result = await body.json();

            await window.localStorage.setItem('dataDiscord', JSON.stringify(result));

            const user = await Fetch.getInfoUser(result.access_token)

            if (!user) document.location.href = "/login"
            await window.localStorage.setItem('dataUser', JSON.stringify(user))

            document.location.href = "/dashboard";
        }
        else {
            document.location.href = "/login";
        }
    }

    componentDidMount() {
        const code = new URLSearchParams(window.location.search).get('code')

        if (code) {
            this.exchange_code(code);
        }
        else {
            // document.location.href = "/login";
        }
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