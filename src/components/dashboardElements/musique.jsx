
import { useState, useEffect } from "react"
import LoadingComponent from "../loading/LoadingComponent.jsx";


export const Musique = (props) => {
    const [loading, setLoading] = useState(false)
    const [pause, setPause] = useState(false)
    const [music, setMusic] = useState([])
    const [haveBeforeMusic] = useState(false) //setHaveBeforeMusic

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            await Promise.all([
                getMusic()
            ])
            setLoading(false)
        }
        fetchData();
    }, [props.guildId])

    let getMusic = async () => {
        const token = "Bearer " + JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_HOSTNAME_BACKEND + "/bot/getfile/" + props.guildId, requestOptions)
            .then(response => response.json())
            .then(result => {
                setMusic(result?.playlist || [])
            })
            .catch(error => console.log('error', error));
    }

    let deleteMusic = async (index) => {
        console.log(index)
    }


    let renderListingMusique = () => {
        return music.map((file, index) => {
            return (
                <div className="list">
                    <div className="pochette">
                        <img src={file.image} alt="IMG" />
                    </div>
                    <div className="titre">
                        <p>{file.title}</p>
                    </div>
                    <div className="interaction">
                        <button onClick={() => deleteMusic(index)}>X</button>
                        <button onClick={() => deleteMusic(index)}>v</button>
                    </div>
                </div>
            )
        }

        )
        // <p>{file.title}</p>)
    }


    let renderVolumeIcon = () => {

        return (<svg role="presentation" height="16" width="16" aria-label="Volume élevé" id="volume-icon" viewBox="0 0 16 16" className="Svg-ytk21e-0 eqtHWV"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path></svg>
        )
    }

    let togglePause = () => {
        setPause(!pause)
    }


    return (
        <>
            {loading ? <LoadingComponent /> :
                <div className="containerPlayer">
                    <h1>File d'attente</h1>
                    <div className="file-attente">
                        {renderListingMusique()}
                    </div>

                    <div className="playing-bar">
                        <div className="cover">
                            <img src="https://m.media-amazon.com/images/I/61jxguiMreL._SL1200_.jpg" alt="" />
                            <p>zefjznefun</p>
                        </div>
                        <div className="player-control">
                            <svg className={haveBeforeMusic ? "" : "disable"} id="skip" viewBox="0 0 16 16" ><path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"></path></svg>

                            {pause ?
                                <svg onClick={() => { togglePause() }} id="play-pause" viewBox="0 0 39.989 39.989">
                                    <path id="XMLID_148_" d="M19.995,0C8.952,0,0,8.952,0,19.994c0,11.043,8.952,19.995,19.995,19.995s19.995-8.952,19.995-19.995
	C39.989,8.952,31.037,0,19.995,0z M18.328,26.057c0,0.829-0.671,1.5-1.5,1.5s-1.5-0.671-1.5-1.5V14.724c0-0.829,0.671-1.5,1.5-1.5
	s1.5,0.671,1.5,1.5V26.057z M24.661,26.057c0,0.829-0.671,1.5-1.5,1.5s-1.5-0.671-1.5-1.5V14.724c0-0.829,0.671-1.5,1.5-1.5
	s1.5,0.671,1.5,1.5V26.057z" />
                                </svg>
                                :
                                <svg onClick={() => { togglePause() }} id="play-pause" viewBox="0 0 459 459">
                                    <path d="M229.5,0C102.751,0,0,102.751,0,229.5S102.751,459,229.5,459S459,356.249,459,229.5S356.249,0,229.5,0z M310.292,239.651
			l-111.764,76.084c-3.761,2.56-8.63,2.831-12.652,0.704c-4.022-2.128-6.538-6.305-6.538-10.855V153.416
			c0-4.55,2.516-8.727,6.538-10.855c4.022-2.127,8.891-1.857,12.652,0.704l111.764,76.084c3.359,2.287,5.37,6.087,5.37,10.151
			C315.662,233.564,313.652,237.364,310.292,239.651z" />
                                </svg>}

                            <svg id="skip" viewBox="0 0 16 16" className="Svg-ytk21e-0 eqtHWV"><path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path></svg>

                        </div>
                        <div className="volume-control">
                            {renderVolumeIcon()}
                            <input type="range" min="0" max="100" value="50" className="slider" id="myRange" />
                        </div>


                    </div>
                </div>
            }
        </>
    )
}


