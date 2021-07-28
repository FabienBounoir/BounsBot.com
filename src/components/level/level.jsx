// import React from "react";
import "./_level.css";
import { useState, useEffect } from 'react';

export const Level = () => {
    const [trendInfos, setTrendInfos] = useState({
        json: ""
    });

    update()

    async function update()
    { 

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        
        fetch("http://localhost:3000/discord/", requestOptions)
        .then(response => response.text())
        .then(result => extraireInfoTendance(result))
        .catch(error => console.log('error', error));

    }

    function extraireInfoTendance(leveluser)
    {
        console.log("coucou")
        console.log(leveluser)
        setTrendInfos({
            json: leveluser.body,
        })
    }

    return (
        <p>{ trendInfos.json }</p>
    )
}