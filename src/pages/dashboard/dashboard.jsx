import "./_dashboard.css";
import React, { useEffect, useState } from 'react'
import { ListServer } from "../../components/listServer/listServer";
import { Configuration } from "../../components/configuration/configuration";
import * as guildsAPI from "../../utils/API/authAPI";

export const Dashboard = () => {
    const [guilds, setGuilds] = useState([])
    const [loading, setLoading] = useState(true)
    const [changeNotSave, setChangeNotSave] = useState(false);

    const getGuilds = async () => {
        try {
            const res = await guildsAPI.getGuilds()
            if ((!res) || res.length == 0) throw new Error("No guilds")
            setGuilds(res)
            setLoading(false)
        } catch (e) {
            document.location.href = "/login";
        }
    }

    const onResize = () => {
        const doc = document.documentElement
        doc.style.setProperty('--doc-height', `${window.innerHeight}px`)

        //get the height of nav
        const nav = document.querySelector("nav")
        const navHeight = nav.offsetHeight
        //create a variable for the height of the dashboard
        doc.style.setProperty('--dashboard-height', `calc(var(--doc-height) - ${navHeight}px)`)
    }

    useEffect(() => {
        onResize()
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        getGuilds();
        window.addEventListener("resize", () => {
            onResize()
        })

        //when rotate the phone
        window.addEventListener("orientationchange", () => {
            onResize()
        })

        //when nav element change size
        const nav = document.querySelector("nav")
        nav.addEventListener("transitionend", () => {
            onResize()
        })

        return () => {
            document.getElementsByTagName("body")[0].style.overflow = "auto";
            window.removeEventListener("resize", onResize)
            window.removeEventListener("orientationchange", onResize)
            nav.removeEventListener("transitionend", onResize)
        }
    }, [])

    return (<div className="dashboard" >
        <ListServer guilds={guilds} loading={loading} changeNotSave={changeNotSave} />
        <Configuration guilds={guilds} setChangeNotSave={setChangeNotSave} changeNotSave={changeNotSave} user={JSON.parse(window.localStorage.getItem("user") || {})} loading={loading} />
    </div>)
}

