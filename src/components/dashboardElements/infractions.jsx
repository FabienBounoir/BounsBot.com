import { useState, useEffect } from "react"
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { useTranslation } from "react-i18next";
import * as infractionsAPI from "../../utils/API/infractionsAPI";
import * as userAPI from "../../utils/API/userAPI";
import { Tooltip } from 'react-tooltip'
import { InfractionElement } from "./infractionElement";

export const Infractions = ({ guildId, configuration, updateConfiguration, channels, loading }) => {
    const { t } = useTranslation();

    const [page, setPage] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);

    const [moderatorStats, setModeratorStats] = useState([])
    const [infractionsStats, setInfractionsStats] = useState({
        "total": 0,
        "active": 0,
        "ban": 0,
        "tempban": 0,
        "mute": 0,
        "tempmute": 0,
        "timeout": 0,
        "warn": 0
    })

    const [getInfractionsInProgress, setGetInfractionsInProgress] = useState(false)

    const [infractions, setInfractions] = useState([])
    const [usersInformation, setUsersInformation] = useState([])

    const [expandModStats, setExpandModStats] = useState(false)

    const getStats = async () => {
        getInfractions()
        try {
            const infractionStats = await infractionsAPI.stats(guildId)
            if (infractionStats) setInfractionsStats(infractionStats)
        }
        catch (error) {
            console.log("GET INFRACTIONS GLOBAL STATS", error)
        }

        try {
            const moderatorStats = await infractionsAPI.moderatorStats(guildId)
            if (moderatorStats) setModeratorStats(moderatorStats)
        } catch (error) {
            console.log("GET MODERATOR STATS", error)
        }
    }

    const getInfractions = async () => {
        try {
            if (getInfractionsInProgress) return
            setGetInfractionsInProgress(true)
            const result = await infractionsAPI.list(guildId, page, 10)

            setHasMoreData(result?.length !== 0 && result?.length === 10)
            if (result && !result?.length) return;

            let userNotInCache = []

            for (let i = 0; i < result.length; i++) {
                if (!usersInformation.find(user => user.id === result[i].userId)) {
                    userNotInCache.push(result[i].userId)
                }

                if (!usersInformation.find(user => user.id === result[i].moderatorId)) {
                    userNotInCache.push(result[i].moderatorId)
                }
            }

            if (userNotInCache.length > 0) {
                getUsers([...new Set(userNotInCache)], guildId)
            }


            setPage(page + 1)
            setInfractions(infractions.concat(result))
            console.log("infractions", infractions)
        } catch (error) {
            console.log(error)
        }
        setGetInfractionsInProgress(false)
    }

    const getUsers = async (ids, guildId) => {
        try {
            const users = await userAPI.getUserInformations(ids, guildId)
            console.log("users", users)
            if (users) {
                setUsersInformation(usersInformation.concat(users))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStats()

        return () => {

        }
    }, [guildId])


    const modStatsFormat = (moderatorStats) => {
        let format = []

        if (moderatorStats.length === 0) {
            format.push(<div className="stats_moderator_info">
                <p>Aucun modérateur n'a encore modéré sur votre serveur...</p>
            </div>)
        }

        for (let i = 0; i < moderatorStats.length; i++) {
            format.push(<div>
                <div className="avatar_moderator">
                    <img src={moderatorStats[i].moderator ? `${moderatorStats[i].moderator.avatarURL}` : ""} />
                    <div>
                        <p>{moderatorStats[i].moderator ? `${moderatorStats[i].moderator.displayName}` : moderatorStats[i]._id}</p>
                        <p>{moderatorStats[i].moderator ? `${moderatorStats[i].moderator.tag}` : moderatorStats[i]._id}</p>
                    </div>
                </div>

                <div className="stats_moderator_info_short">
                    <div>{moderatorStats[i].total} <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M11.302 21.6149C11.5234 21.744 11.6341 21.8086 11.7903 21.8421C11.9116 21.8681 12.0884 21.8681 12.2097 21.8421C12.3659 21.8086 12.4766 21.744 12.698 21.6149C14.646 20.4784 20 16.9084 20 12V6.6C20 6.04207 20 5.7631 19.8926 5.55048C19.7974 5.36198 19.6487 5.21152 19.4613 5.11409C19.25 5.00419 18.9663 5.00084 18.3988 4.99413C15.4272 4.95899 13.7136 4.71361 12 3C10.2864 4.71361 8.57279 4.95899 5.6012 4.99413C5.03373 5.00084 4.74999 5.00419 4.53865 5.11409C4.35129 5.21152 4.20259 5.36198 4.10739 5.55048C4 5.7631 4 6.04207 4 6.6V12C4 16.9084 9.35396 20.4784 11.302 21.6149Z" stroke="var(--color-principal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></div>
                </div>

                <div className="stats_moderator_info">
                    <p>{moderatorStats[i].ban + moderatorStats[i].tempban} <svg width="20" height="20" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M793.375 317.236L528.408 52.269C524.12 47.9867 518.345 45.6416 512.403 45.6416C510.949 45.6416 509.485 45.7815 508.034 46.0664L206.471 105.306C201.732 105.946 197.155 108.092 193.518 111.729C184.679 120.571 184.674 134.903 193.518 143.747C193.529 143.758 193.543 143.767 193.548 143.781L580.188 530.417C584.61 534.84 590.402 537.05 596.197 537.05C601.989 537.05 607.787 534.84 612.204 530.417L793.373 349.253C802.209 340.411 802.209 326.076 793.375 317.236Z" fill="var(--color-principal)" />
                        <path d="M22.0382 625.868C-7.34607 655.258 -7.34607 702.915 22.046 732.311C51.4395 761.701 99.1021 761.71 128.494 732.311L418.925 441.882L312.477 335.436L22.0382 625.868Z" fill="var(--color-principal)" />
                    </svg>
                    </p>

                    <p>{moderatorStats[i].mute + moderatorStats[i].tempmute + moderatorStats[i].timeout} <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_3014_279)">
                            <path d="M1.28906 7.96518V12.5409C1.28906 13.9449 2.42732 15.0829 3.83098 15.0829H6.48907L13.8089 19.8901C14.5502 20.2996 15.5596 19.5059 16.0536 18.5019L3.08585 5.53467C2.04568 5.85322 1.28906 6.82039 1.28906 7.96518Z" fill="var(--color-principal)" />
                            <path d="M16.3507 2.73082C16.3507 1.32677 15.0796 -0.616234 13.8088 0.188907L7.09863 4.99579L16.3507 14.2479V2.73082Z" fill="var(--color-principal)" />
                            <path d="M3.83434 5.5725L16.1012 17.8896L17.3003 19.0932C17.5199 19.3145 17.8087 19.4251 18.0971 19.4251C18.3855 19.4251 18.6743 19.3145 18.8943 19.0932C19.3347 18.6514 19.3347 17.9345 18.8943 17.4923L16.2144 14.8014L6.8558 5.4044L2.77422 1.30696C2.55441 1.08574 2.26582 0.975098 1.97723 0.975098C1.68863 0.975098 1.40023 1.08574 1.18004 1.30696C0.739466 1.74877 0.739466 2.46569 1.18004 2.90769L3.83434 5.5725Z" fill="var(--color-principal)" />
                        </g>
                        <defs>
                            <clipPath id="clip0_3014_279">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>


                    </p>

                    <p>{moderatorStats[i].warn} <svg width="20" height="20" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M763.875 630.475L450.9 94.575C424.8 68.475 382.45 68.475 356.35 94.575L43.3504 630.475C17.2504 656.55 17.2504 698.875 43.3504 725H763.85C790 698.875 790 656.55 763.875 630.475ZM374.8 286.95C374.8 266.225 391.6 249.45 412.3 249.45C433 249.45 449.8 266.225 449.8 286.95V461.95C449.8 482.65 433 499.45 412.3 499.45C391.6 499.45 374.8 482.65 374.8 461.95V286.95ZM412.525 624.65C391.825 624.65 375.025 607.9 375.025 587.15C375.025 566.45 391.825 549.65 412.525 549.65C433.225 549.65 450.025 566.45 450.025 587.15C450.025 607.9 433.225 624.65 412.525 624.65Z" fill="var(--color-principal)" />
                    </svg></p>
                </div>
            </div>)


        }

        if (!expandModStats && moderatorStats.length > 5) {
            format = format.slice(0, 5)
            format.push(<div className="load_more_data" onClick={() => setExpandModStats(true)}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9997 11.6665V28.3332M19.9997 28.3332L26.6663 21.6665M19.9997 28.3332L13.333 21.6665" stroke="rgba(var(--color-red), var(--color-green), var(--color-blue), 0.7)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>)
        }

        return format
    }

    return (<>
        {["ERROR", "LOADING"].includes(loading) ?
            <LoadingComponent error={loading == "ERROR"} errorMessage="Une erreur est survenue" />
            : <>
                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>{t("infractions.infractionsStats")}</h5>
                    </div>
                    <div className="separator"></div>

                    <div style={{ "display": "flex", "flexDirection": "row", flexWrap: "wrap", justifyContent: "space-evenly", color: "white", gap: "20px", textAlign: 'center' }}>
                        <div className="stats_sanction">
                            <h4>{infractionsStats.total}</h4>
                            <p>{t("infractions.totals")}</p>
                        </div>

                        <div className="stats_separator" />

                        <div className="stats_sanction">
                            <h4>{infractionsStats.active}</h4>
                            <p>{t("infractions.actives")}</p>
                        </div>

                        <div className="stats_separator" />

                        <div className="stats_sanction" data-tooltip-id={"infractions-ban"} data-tooltip-html={`<p>${infractionsStats.ban} ban</p> <p>${infractionsStats.tempban} tempban</p>`}>
                            <h4>{infractionsStats.ban + infractionsStats.tempban}</h4>
                            <p>{t("infractions.ban")}</p>
                            <Tooltip className="shardTooltips" opacity={0.99} id={"infractions-ban"} ></Tooltip>
                        </div>

                        <div className="stats_separator" />

                        <div className="stats_sanction" data-tooltip-id={"infractions-mute"} data-tooltip-html={`<p>${infractionsStats.mute} mute</p> <p>${infractionsStats.tempmute} tempmute</p> <p>${infractionsStats.timeout} timeout</p>`}>
                            <h4>{infractionsStats.mute + infractionsStats.tempmute + infractionsStats.timeout}</h4>
                            <p>{t("infractions.mute")}</p>
                            <Tooltip className="shardTooltips" opacity={0.99} id={"infractions-mute"} ></Tooltip>
                        </div>

                        <div className="stats_separator" />

                        <div className="stats_sanction">
                            <h4>{infractionsStats.warn}</h4>
                            <p>{t("infractions.warn")}</p>
                        </div>
                    </div>
                </div>

                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>{t("infractions.moderatorStats")}</h5>
                    </div>
                    <div className="separator"></div>

                    <div className="stats_moderator">
                        {modStatsFormat(moderatorStats)}
                    </div>
                </div>
                <div className="block padding-1">
                    <div className="infoActive">
                        <h5>{t("infractions.listInfraction")}</h5>
                    </div>
                    <div className="separator"></div>
                    {infractions.length === 0 ? <div className="no_infraction">
                        <p>{t("infractions.noInfractions")}</p>
                        <p><b>/ban</b> <i>[@user] [reason]</i></p>
                        <p><b>/tempban</b> <i>[@user] [time] [reason]</i></p>
                        <p><b>/mute</b> <i>[@user] [reason]</i></p>
                        <p><b>/tempmute</b> <i>[@user] [time] [reason]</i></p>
                        <p><b>/warn</b> <i>[@user] [reason]</i></p>
                    </div> : <>
                        <table>
                            <thead>
                                <tr>
                                    <th colspan="4">{t("infractions.name")}</th>
                                    <th></th>
                                    <th style={{ textAlign: "left" }}>{t("infractions.type")}</th>
                                    <th className="duration_cellule" style={{ textAlign: "center" }}>{t("infractions.time")}</th>
                                    <th style={{ textAlign: "center" }}>{t("infractions.status")}</th>
                                    <th className="mod_cellule">{t("infractions.moderator")}</th>
                                </tr>

                            </thead>
                            <tbody>
                                {infractions.map((infraction, index) => {
                                    return <InfractionElement inf={infraction} index={index} users={usersInformation} />
                                })}

                                <Tooltip className="shardTooltips" opacity={0.99} id={"inf-type"}></Tooltip>
                            </tbody>
                        </table>
                        <div className={"load_more_data" + (!hasMoreData ? " noMoreData" : "")} onClick={() => {
                            getInfractions()
                        }
                        }>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.9997 11.6665V28.3332M19.9997 28.3332L26.6663 21.6665M19.9997 28.3332L13.333 21.6665" stroke="rgba(var(--color-red), var(--color-green), var(--color-blue), 0.7)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </>
                    }
                </div>
            </>}
    </>)
}
