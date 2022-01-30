import "./_callback.css";
import { Component } from 'react'
import { getInfoUser }  from "../../utils/fetch"
import logo from "../picture/logo5.svg";


class Callback extends Component {

    async exchange_code(code){
        let details = {
            'client_id': "898480744899412019",
            'client_secret': "_8eU3zihkLxqEQb0EJmCDLeFVOoZEYe2",
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': "http://localhost:3000/oauth/callback"
        } //'redirect_uri': "http://localhost:3000/oauth/callback" | 'redirect_uri': "https://bounsbot.herokuapp.com/oauth/callback"
        
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
        });

        if(body.status === 200)
        {
            const result = await body.json();

            await window.localStorage.setItem('dataDiscord', JSON.stringify(result));

            const user = await getInfoUser(result.access_token) 

            if(!user) document.location.href="/login"
            await window.localStorage.setItem('dataUser',JSON.stringify(user))

            document.location.href="/dashboard"; 
        }
        else
        {
            document.location.href="/login"; 
        }
    }

    componentDidMount() {
        const code = new URLSearchParams(window.location.search).get('code')

        if(code)
        {
            this.exchange_code(code);
        }
        else
        {
            document.location.href="/login"; 
        }
    }
    

    render() {
        return (
            <div className="sc-10wydb9-0 guBWHp">
                <img alt="logo" src= { logo } className="sc-10wydb9-1 awsUQ"/>
                <p><strong>Authentification en cours</strong><br/>Veuillez patienter...</p>
                <span>Se connecter avec Discord</span>
            </div>
        )
    }
}

export default Callback;