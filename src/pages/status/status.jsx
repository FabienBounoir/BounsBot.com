import { useEffect, useState } from "react";
import "./_status.css";
import { Tooltip } from 'react-tooltip'

export const Status = () => {
    const [shards, setShards] = useState([])

    useEffect(async () => {
        const response = await fetch(process.env.REACT_APP_HOSTNAME_BACKEND + "/shards")
        const data = await response.json()

        setShards(data)
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
            [-1, "Hors ligne"],
            [0, "En ligne"],
            [1, "Connexion"],
            [2, "Reconnexion"],
            [3, "Inactif"],
            [4, "Presque"],
            [5, "Déconnecté"],
            [6, "En attente de serveurs"],
            [7, "Identification"],
            [8, "Reprise"],
        ])

        return (
            `
            <div style="display: flex; flex-direction: column;place-items:start; justify-content: start; z-index: 9999;">
                <h5>Shard n°${shard.cluster_id + 1}</h4>
                <span>Status: ${status.get(shard.status)}</span>
                ${shard?.ping ? `<span>Latence: ${shard?.ping}ms</span>` : ""}
                ${uptimeString ? `<span>Uptime: ${uptimeString}</span>` : ""}
                ${shard.guilds ? `<span>${shard.guilds} serveurs</span>` : ""}
                ${shard.channels ? `<span>${shard.channels} salons</span>` : ""}
                ${shard.members ? `<span>${shard.members} utilisateurs</span>` : ""}
            </div>`
        )
    }


    return (
        <div transition="page" className="statusContainer" >
            <div className="top">
                <h1>Statuts</h1>
                <div className="statusShard" data-v-7085cbe2="" style={shards.length > 0 ? { display: "initial" } : { display: "none" }}>
                    {shards?.filter((s) => { return ![-1, 1, 3, 5].includes(s.status) })?.length || 0} / {shards.length} Shards
                </div>
            </div>

            <p>
                Bienvenue sur la page "Statuts de Bouns'bot". Ici, vous trouverez des informations sur les différents shards et leur état actuel. Cela vous permettra de rester informé en cas de problèmes éventuels et de savoir si cela a une incidence sur votre serveur.</p>

            <div className="shardGrid">

                {(() => {
                    let shardsComponent = []
                    for (let shard of shards) {
                        shardsComponent.push(<><div className={"shard" + ([-1, 1, 3, 5].includes(shard.status) ? " error" : "")} data-tooltip-id={"ShardStatus-" + shard.cluster_id} data-tooltip-html={shardTooltip(shard)} >{shard.cluster_id + 1}</div><Tooltip className="shardTooltips" opacity={0.99} id={"ShardStatus-" + shard.cluster_id} ></Tooltip> </>)
                    }
                    return shardsComponent
                })()}

            </div>

        </div>
    )

}

export default Status;