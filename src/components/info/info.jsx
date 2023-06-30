import { useState, useEffect } from "react"
import "./_info.css";

export const Info = (props) => {
    const [info, setInfo] = useState(props.alerte)

    useEffect(() => {
        async function fetchData() {
            await Promise.all([
                getInfo()
            ])
        }
        fetchData()
    }, [props.guildId])

    let getInfo = async () => {
        let stats = await fetch(`https://api.bounsbot.com/bot/stats`).then(res => res.json()) //${process.env.REACT_APP_HOSTNAME_BACKEND}
        setInfo(stats)
    }

    //arrondir a la centaine au dessus
    let formatNumber = (number) => {
        if (number > 1000) {
            return Math.ceil(number / 100) * 100
        }
        else if (number > 100) {
            return Math.ceil(number / 10) * 10
        }
        else {
            return number
        }

    }

    // let renderGuilds = () => {
    //     if (info?.bestGuild) {
    //         let guilds = []

    //         info.bestGuild = info.bestGuild.slice(0, 7)

    //         for (let guild of info.bestGuild) {
    //             guilds.push(
    //                 <div className="guilds">
    //                     {/* style="--play: running; --direction: normal; --duration: 76.8s; --delay: 0s; --iteration-count: infinite;"> */}
    //                     <img src={guild.iconURL || "https://media.discordapp.net/attachments/1014101467126304798/1056241554764869673/image.png?width=1290&height=1290"} alt="logo" onError={(e) => { e.target.outerHTML = `<img loading="lazy" src='https://media.discordapp.net/attachments/1014101467126304798/1056241554764869673/image.png?width=1290&height=1290'/>` }} />
    //                     <div>
    //                         <h3>{guild.name}</h3>

    //                         <div className="member">

    //                             <svg width="18" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                                 <path fill-rule="evenodd" clip-rule="evenodd" d="M35 20.4977C35 26.0103 30.515 30.4978 25 30.4978C19.4875 30.4978 15 26.0103 15 20.4977C15 14.9852 19.485 10.4977 25 10.4977C30.515 10.4977 35 14.9852 35 20.4977ZM5.00003 47.9978C5.00003 39.1653 13.225 32.9978 25 32.9978C36.7775 32.9978 45 39.1653 45 47.9978V50.4978H5.00003V47.9978Z" fill="#D9D9D9" />
    //                                 <path fill-rule="evenodd" clip-rule="evenodd" d="M35 20.4977C35 26.0103 30.515 30.4978 25 30.4978C19.4875 30.4978 15 26.0103 15 20.4977C15 14.9852 19.485 10.4977 25 10.4977C30.515 10.4977 35 14.9852 35 20.4977ZM5.00003 47.9978C5.00003 39.1653 13.225 32.9978 25 32.9978C36.7775 32.9978 45 39.1653 45 47.9978V50.4978H5.00003V47.9978Z" fill="#D9D9D9" />
    //                                 <path d="M50.0003 50.498H55.0003V47.998C55.0003 41.5913 50.6743 36.5868 43.8033 34.321C47.6553 37.7648 50.0003 42.4978 50.0003 47.998V50.498Z" fill="#D9D9D9" />
    //                                 <path d="M37.2084 30.252C41.6642 29.2437 45.0002 25.252 45.0002 20.4977C45.0002 15.4056 41.1732 11.1882 36.2427 10.5745C38.5804 13.2205 40.0002 16.6958 40.0002 20.4977C40.0002 24.1049 38.7222 27.4182 36.5944 30.0082C36.8007 30.0872 37.0054 30.1685 37.2084 30.252Z" fill="#D9D9D9" />
    //                             </svg>
    //                             <p>{formatNumber(guild.memberCount)} membres</p>
    //                         </div>
    //                     </div>
    //                 </div>)
    //         }

    //         return guilds
    //     }
    // }

    let renderGuilds = (max, display = false) => {
        return info?.bestGuild?.filter(guild => guild.iconURL).slice(0, max)?.map((guild, index) => {
            return (<div className="guilds">
                {/* style="--play: running; --direction: normal; --duration: 76.8s; --delay: 0s; --iteration-count: infinite;"> */}
                <img src={guild.iconURL || "https://media.discordapp.net/attachments/1014101467126304798/1056241554764869673/image.png?width=1290&height=1290"} alt="logo" onError={(e) => { e.target.outerHTML = `<img loading="lazy" src='https://media.discordapp.net/attachments/1014101467126304798/1056241554764869673/image.png?width=1290&height=1290'/>` }} />
                <div>
                    <h3>{guild.name}</h3>

                    <div className="member">

                        <svg width="18" viewBox="0 0 60 61" fill="none" xmlns="http:www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35 20.4977C35 26.0103 30.515 30.4978 25 30.4978C19.4875 30.4978 15 26.0103 15 20.4977C15 14.9852 19.485 10.4977 25 10.4977C30.515 10.4977 35 14.9852 35 20.4977ZM5.00003 47.9978C5.00003 39.1653 13.225 32.9978 25 32.9978C36.7775 32.9978 45 39.1653 45 47.9978V50.4978H5.00003V47.9978Z" fill="#D9D9D9" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M35 20.4977C35 26.0103 30.515 30.4978 25 30.4978C19.4875 30.4978 15 26.0103 15 20.4977C15 14.9852 19.485 10.4977 25 10.4977C30.515 10.4977 35 14.9852 35 20.4977ZM5.00003 47.9978C5.00003 39.1653 13.225 32.9978 25 32.9978C36.7775 32.9978 45 39.1653 45 47.9978V50.4978H5.00003V47.9978Z" fill="#D9D9D9" />
                            <path d="M50.0003 50.498H55.0003V47.998C55.0003 41.5913 50.6743 36.5868 43.8033 34.321C47.6553 37.7648 50.0003 42.4978 50.0003 47.998V50.498Z" fill="#D9D9D9" />
                            <path d="M37.2084 30.252C41.6642 29.2437 45.0002 25.252 45.0002 20.4977C45.0002 15.4056 41.1732 11.1882 36.2427 10.5745C38.5804 13.2205 40.0002 16.6958 40.0002 20.4977C40.0002 24.1049 38.7222 27.4182 36.5944 30.0082C36.8007 30.0872 37.0054 30.1685 37.2084 30.252Z" fill="#D9D9D9" />
                        </svg>
                        <p>{formatNumber(guild.memberCount)} {display ? "membres" : ""}</p>
                    </div>
                </div>
            </div>)
        })
    }

    return (info?.bestGuild ? (
        <div className="infoComponent">
            <h2>Bounsbot, le bot Discord approuvé par plus de {formatNumber(info?.guild)} serveurs</h2>
            <div className="guilds-container desktop">
                {(() => {
                    return renderGuilds(8);
                })()}
            </div>
            <div className="guilds-container tablette">
                {(() => {
                    return renderGuilds(6);
                })()}
            </div>

            <div className="guilds-container mobile">
                {(() => {
                    return renderGuilds(4, true);
                })()}
            </div>
        </div>) : (null))
}



