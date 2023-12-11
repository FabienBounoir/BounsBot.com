import { useEffect, useState } from "react";
import "./_status.css";
import { Tooltip } from 'react-tooltip'
import * as shardsAPI from "../../utils/API/shardsAPI"
import { Toaster, toast } from 'sonner'


export const Status = () => {
    const [shards, setShards] = useState([])
    const [guildInSearch, setGuildInSearch] = useState(null)

    const fetchData = () => {
        shardsAPI.getStatus().then((data) => { setShards(data) }).catch((err) => {
            toast.error("Une erreur est survenue lors de la récupération des statuts. Veuillez réessayer plus tard.", {
                duration: 5000,
            })
        })
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
                <h5>Shard n°${shard.cluster_id}</h4>
                <span>Status: ${status.get(shard.status)}</span>
                ${shard?.ping ? `<span>Latence: ${shard?.ping}ms</span>` : ""}
                ${uptimeString ? `<span>Uptime: ${uptimeString}</span>` : ""}
                ${shard.guilds ? `<span>${shard.guilds} serveurs</span>` : ""}
                ${shard.channels ? `<span>${shard.channels} salons</span>` : ""}
                ${shard.members ? `<span>${shard.members} utilisateurs</span>` : ""}
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
                <h1>Statuts</h1>
                <div className="statusShard" data-v-7085cbe2="" style={shards.length > 0 ? { display: "initial" } : { display: "none" }}>
                    {shards?.filter((s) => { return ![-1, 1, 3, 5].includes(s.status) })?.length || 0} / {shards.length} Shards
                </div>
            </div>

            <p>
                Bienvenue sur la page "Statuts de Bouns'bot". Ici, vous trouverez des informations sur les différents shards et leur état actuel. Cela vous permettra de rester informé en cas de problèmes éventuels et de savoir si cela a une incidence sur votre serveur.</p>

            <input type="text" placeholder="Rechercher un serveur" onChange={(e) => {
                searchGuild(e)
            }} />
            <div className="shardGrid">

                {(() => {
                    let shardsComponent = []
                    for (let shard of shards) {
                        shardsComponent.push(<><div className={("shard" + ([-1, 1, 3, 5].includes(shard.status) ? " error" : "")) + (guildInSearch == shard.cluster_id ? " guild-in-shard" : "")} data-tooltip-id={"ShardStatus-" + shard.cluster_id} data-tooltip-html={shardTooltip(shard)} >{shard.cluster_id}</div><Tooltip className="shardTooltips" opacity={0.99} id={"ShardStatus-" + shard.cluster_id} ></Tooltip> </>)
                    }
                    return shardsComponent
                })()}

            </div>

            <Toaster richColors expand={false} position="top-center" />
        </div>
    )

}

export default Status;