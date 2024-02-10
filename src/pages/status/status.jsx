import { useEffect, useState } from "react";
import "./_status.css";
import { Tooltip } from 'react-tooltip'
import * as shardsAPI from "../../utils/API/shardsAPI"
import { Toaster, toast } from 'sonner'
import { useTranslation } from "react-i18next";


export const Status = () => {
    const { t } = useTranslation();

    const [shards, setShards] = useState([])
    const [guildInSearch, setGuildInSearch] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = () => {
        shardsAPI.getStatus().then((data) => { setShards([...data, ...data, data[0]]) }).catch((err) => {
            toast.error(t("status.error"), {
                duration: 5000,
            })
        })
        setLoading(true)
    }

    useEffect(() => {
        fetchData()

        let autorefresh = setInterval(() => {
            fetchData()
        }, 20000)

        return () => {
            clearInterval(autorefresh)
        }
    }, [])

    const shardTooltip = (shard) => {

        const millisecondsPerSecond = 1000;
        const millisecondsPerMinute = 60 * millisecondsPerSecond;
        const millisecondsPerHour = 60 * millisecondsPerMinute;
        const millisecondsPerDay = 24 * millisecondsPerHour;

        let uptimeString = ""

        const days = Math.floor(shard.uptime / millisecondsPerDay);
        shard.uptime %= millisecondsPerDay;

        if (days > 0) uptimeString += days + "j "

        const hours = Math.floor(shard.uptime / millisecondsPerHour);
        shard.uptime %= millisecondsPerHour;

        if (hours > 0) uptimeString += hours + "h "

        const minutes = Math.floor(shard.uptime / millisecondsPerMinute);
        shard.uptime %= millisecondsPerMinute;

        if (minutes > 0) uptimeString += minutes + "m "

        const seconds = Math.floor(shard.uptime / millisecondsPerSecond);

        if (seconds > 0) uptimeString += seconds + "s "

        let status = new Map([
            [-1, t("status.offline")],
            [0, t("status.online")],
            [1, t("status.connection")],
            [2, t("status.reconnection")],
            [3, t("status.idle")],
            [4, "Presque"],
            [5, t("status.disconnect")],
            [6, t("status.waitingForServers")],
            [7, t("status.identification")],
            [8, t("status.resumption")],
        ])

        return (
            `
            <div style="display: flex; flex-direction: column;place-items:start; justify-content: start; z-index: 9999;">
                <h5>Shard n°${shard.cluster_id}</h4>
                <span>${t("status.status")}: ${status.get(shard.status)}</span>
                ${shard?.ping ? `<span>${t("status.latency")}: ${shard?.ping}ms</span>` : ""}
                ${uptimeString ? `<span>${t("status.uptime")}: ${uptimeString}</span>` : ""}
                ${shard.guilds ? `<span>${t("status.guildCount", { count: shard.guilds })}</span>` : ""}
                ${shard.channels ? `<span>${t("status.channelCount", { count: shard.channels })}</span>` : ""}
                ${shard.members ? `<span>${t("status.userCount", { count: shard.members })}</span>` : ""}
            </div>`
        )
    }

    const searchGuild = async (e) => {
        const value = e.target.value

        if (value.match(/^\d{17,19}/)) {
            //if yes, search for the shard
            try {
                let response = await shardsAPI.searchGuild(value)
                if (response.shard) {
                    setGuildInSearch(response.shard)
                }
                else {
                    setGuildInSearch(null)
                    toast.error("Aucune shard n'a été trouvé pour ce serveur.")
                }
            }
            catch (err) {
                setGuildInSearch(null)
                toast.error("Une erreur est survenue lors de la recherche du serveur. Veuillez réessayer plus tard.")
            }
        }
        else {
            setGuildInSearch(null)
        }
    }


    return (
        <div transition="page" className="statusContainer" >
            <div className="top">
                <h1>{t("status.status")}</h1>
                <div className="statusShard" data-v-7085cbe2="" style={shards.length > 0 ? { display: "initial" } : { display: "none" }}>
                    {shards?.filter((s) => { return ![-1, 1, 3, 5].includes(s.status) })?.length || 0} / {shards.length} Shards
                </div>
            </div>

            <p>{t("status.description")}</p>


            <div className="shardManager">
                <input type="text" placeholder={t("status.idServer")} onChange={(e) => {
                    searchGuild(e)
                }} />
            </div>

            <div className="shardGrid">

                {(() => {
                    let shardsComponent = []
                    let i = 0
                    for (let shard of shards) {
                        shardsComponent.push(<><div className={("shard" + ([-1, 1, 3, 5].includes(shard.status) ? " error" : "")) + (guildInSearch == shard.cluster_id ? " guild-in-shard" : "")} data-tooltip-id={"ShardStatus-" + shard.cluster_id} data-tooltip-html={shardTooltip(shard)} >{i || shard.cluster_id}</div><Tooltip className="shardTooltips" opacity={0.99} id={"ShardStatus-" + shard.cluster_id} ></Tooltip> </>)
                        i++
                    }
                    return shardsComponent
                })()}

            </div>

            <Toaster richColors expand={false} position="bottom-right" />
        </div >
    )

}

export default Status;