import { useState, useEffect } from "react"
import "./_approvedBy.css";
import * as guildsApi from "../../utils/API/guildsAPI"
import { useTranslation } from 'react-i18next'
import BestGuild from "./bestGuild";

export const ApprovedBy = (props) => {
    const { t } = useTranslation();
    const [bestGuilds, setBestGuilds] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                await getInfo()
            }
            catch (e) {
                setError(true)
            }
        }
        fetchData()
    }, [props.guildId])

    let getInfo = async () => {
        let guilds = await guildsApi.best()
        setBestGuilds(guilds)
    }

    let renderGuilds = (max, display = false) => {
        return bestGuilds?.guilds.slice(0, max)?.map((guild, index) => {
            return (<BestGuild guild={guild} display={display} index={index} />)
        })
    }


    const formatNumber = (number) => {
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



    return ((error) ? (<div className="infoComponentDisable"></div>) : (
        <div className="infoComponent">
            <svg className="cloud" width="247" height="63" viewBox="0 0 247 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_621_4)">
                    <path d="M3.03492 62.0648C44.9327 61.7045 207.886 59.2805 243.864 58.7891C244.459 58.7908 245.041 58.4544 245.532 57.8244C246.022 57.1945 246.399 56.3008 246.61 55.2625C246.822 54.2242 246.859 53.0902 246.717 52.0116C246.574 50.9329 246.259 49.9607 245.814 49.2241C237.452 35.2368 219.252 10.5052 194.113 8.27772C168.219 5.98473 155.466 18.6616 150.599 23.3459C150.231 23.6891 149.829 23.8867 149.418 23.9261C149.006 23.9656 148.595 23.8461 148.21 23.5752C137.02 15.386 120.349 0.645264 90.6249 0.645264C66.9619 0.645264 30.8964 8.21229 1.17269 52.1723C0.673342 52.8755 0.306854 53.8562 0.125993 54.9732C-0.0548679 56.0902 -0.0407112 57.2855 0.166523 58.3865C0.373757 59.4874 0.763269 60.437 1.27884 61.0982C1.79441 61.7593 2.40943 62.0979 3.03492 62.0648Z" fill="url(#paint0_linear_621_4)" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_621_4" x1="120.5" y1="-4" x2="123" y2="77" gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-principal)" />
                        <stop offset="1" stop-color="var(--color-principal-hover)" />
                    </linearGradient>
                    <clipPath id="clip0_621_4">
                        <rect width="247" height="63" fill="var(--color-principal)" />
                    </clipPath>
                </defs>
            </svg>



            <div class="pillar_bg-noise"></div>
            {(() => {
                return (bestGuilds ? (<>
                    <h2>{t("homepage.on_number_of_server", { number: formatNumber(bestGuilds?.totalGuild) })}</h2>

                    <div className="guilds-container desktop">
                        {(() => {
                            return renderGuilds(8, true);
                        })()}
                    </div>
                    <div className="guilds-container tablette">
                        {(() => {
                            return renderGuilds(6, false);
                        })()}
                    </div>

                    <div className="guilds-container mobile">
                        {(() => {
                            return renderGuilds(4, true);
                        })()}
                    </div>
                </>) : (null))
            })()}

            <svg className="cloud_2" width="370" height="86" viewBox="0 0 370 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_621_6)">
                    <path d="M364.883 85.4994H2.70318C2.18755 85.5104 1.6799 85.3718 1.24268 85.1007C0.805449 84.8296 0.457692 84.4378 0.242157 83.9735C0.0266225 83.5091 -0.0472934 82.9925 0.0294987 82.4871C0.106291 81.9816 0.330413 81.5095 0.674365 81.1286C22.3734 55.4284 54.8338 54.1172 89.9404 60.8482C109.699 -14.5915 198.436 -13.7173 228.691 32.7004C260.975 8.04919 368.941 5.33931 369.999 80.3419C370.011 81.015 369.887 81.6837 369.635 82.309C369.384 82.9342 369.009 83.5035 368.532 83.9836C368.056 84.4637 367.488 84.845 366.862 85.1053C366.235 85.3655 365.563 85.4995 364.883 85.4994Z" fill="url(#paint0_linear_621_6)" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_621_6" x1="185" y1="0.500007" x2="185" y2="85.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-principal)" />
                        <stop offset="1" stop-color="var(--color-principal-hover)" />
                    </linearGradient>
                    <clipPath id="clip0_621_6">
                        <rect width="370" height="86" fill="var(--color-principal)" />
                    </clipPath>
                </defs>
            </svg>

            <svg className="cloud_3" width="364" height="151" viewBox="0 0 364 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_621_120)">
                    <path d="M61.6035 28.1383C74.8869 28.1383 87.1818 32.4013 97.2216 39.5991C108.466 16.6466 132.067 0.830078 159.376 0.830078C197.588 0.830078 228.542 31.8144 228.542 69.9964C228.542 74.1359 228.171 78.1827 227.461 82.1368C284.394 93.2269 316.737 142.221 363.785 150.5H61.6035C27.8081 150.5 0.407227 123.099 0.407227 89.3037C0.407227 55.5083 27.8081 28.1074 61.6035 28.1074V28.1383Z" fill="url(#paint0_linear_621_120)" />
                </g>
                <defs>
                    <linearGradient id="paint0_linear_621_120" x1="182.096" y1="0.830078" x2="182.096" y2="150.5" gradientUnits="userSpaceOnUse">
                        <stop offset="0.420232" stop-color="var(--color-principal)" />
                        <stop offset="1" stop-color="var(--color-principal-hover)" />
                    </linearGradient>
                    <clipPath id="clip0_621_120">
                        <rect width="364" height="151" fill="var(--color-principal)" />
                    </clipPath>
                </defs>
            </svg>



        </div >))
}



export default ApprovedBy;