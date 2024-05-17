import "./_dashboard.css";
import React, { useEffect, useState } from 'react'
import { ListServer } from "../../components/listServer/listServer";
import { Configuration } from "../../components/configuration/configuration";
import * as guildsAPI from "../../utils/API/authAPI";
import { useStore } from "../../utils/store";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const Dashboard = () => {
    const history = useHistory();
    const [guilds, setGuilds] = useState([])
    const [loading, setLoading] = useState(true)
    const [changeNotSave, setChangeNotSave] = useState(false);
    const [state, dispatch] = useStore();

    useEffect(() => {
        if (!state?.logged) {
            history.push("/login?status=invalidToken")
        }
    }, [])

    useEffect(() => {
        if (!state?.logged) {
            history.push("/login?status=invalidToken")
        }
    }, [state])


    const getGuilds = async () => {
        try {
            const res = await guildsAPI.getGuilds()
            if ((!res) || res.length == 0) throw new Error("No guilds")
            setGuilds(res)
            setLoading(false)
        } catch (e) {
            console.error("get user guilds error", e)
            dispatch({ logged: false, user: null })
            history.push("/login")
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    }

    const onResize = () => {
        const doc = document.documentElement
        // doc.style.setProperty('--doc-height', `${window.innerHeight}px`)

        //get the height of nav
        const nav = document.querySelector(".nav")
        console.log("nav", nav)
        const navHeight = nav?.offsetHeight || 80
        //create a variable for the height of the dashboard
        doc.style.setProperty('--dashboard-height', `calc(100dvh - ${navHeight}px)`)
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
        if (nav) {
            nav.addEventListener("transitionend", () => {
                onResize()
            })
        }

        return () => {
            document.getElementsByTagName("body")[0].style.overflow = "auto";
            window?.removeEventListener?.("resize", onResize)
            window?.removeEventListener?.("orientationchange", onResize)
            nav?.removeEventListener?.("transitionend", onResize)
        }
    }, [])

    return (<div className="dashboard" >
        <ListServer guilds={guilds} loading={loading} changeNotSave={changeNotSave} />
        <Configuration guilds={guilds} setChangeNotSave={setChangeNotSave} changeNotSave={changeNotSave} user={JSON.parse(window.localStorage.getItem("user") || `{"id":"0","username":"wumpus","avatar":"656908def8d35773ccabf8feacb23e02","discriminator":"0","accent_color":1579292,"verified":true}`)} loading={loading} />
    </div>)
}

