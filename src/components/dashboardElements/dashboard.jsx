import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap/'
import Avatar from "../../components/avatar/avatar";
import LoadingComponent from "../../components/loading/LoadingComponent.jsx";

export const Dashboard = (props) => {

    const [data, setData] = useState({})
    const [initialConfig, setInitialConfig] = useState({})
    const [changeNotSave, setChangeNotSave] = useState(false);
    const [loadingChargement, setLoadingChargement] = useState(false);

    const [loading, setLoading] = useState(true)
    const [channel, setChannel] = useState([])
    const [loadingError, setLoadingError] = useState(false)

    useEffect(async () => {
        setLoading(true)
        try {
            await Promise.all([
                getChannelGuild(),
                getConfigurationDashboard()
            ])
        } catch (error) {
            return setLoadingError(true)
        }

        setLoading(false)
    }, [props.guildId])

    useEffect(() => {
        const keys1 = Object.keys(data);
        const keys2 = Object.keys(initialConfig);

        if (keys1.length !== keys2.length) {
            return setChangeNotSave(true)
        }

        for (let key of keys1) {
            if (data[key] !== initialConfig[key]) {
                return setChangeNotSave(true)
            }
        }

        return setChangeNotSave(false)
    }, [data])

    let getChannelForSelector = (allChannel, selectedchannel) => {
        var option = [];

        if (selectedchannel === "0") {
            option.push(<option value="0" selected>❌ Désactivé</option>)
        }
        else {
            option.push(<option value="0">❌ Désactivé</option>)
        }

        for (let value of allChannel) {
            if (value.id === selectedchannel) {
                option.push(<option key={value.id} value={value.id} selected>{value.name}</option>)
            }
            else {
                option.push(<option key={value.id} value={value.id}>{value.name}</option>)
            }
        }

        return option;
    }

    let resetChange = () => {
        setData(initialConfig)
    }

    let updateConfig = async () => {
        setLoadingChargement(true)

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);


        try {
            await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${props.guildId}/commandtype`, {
                method: "PUT",
                headers,
                body: JSON.stringify(data),
                redirect: 'follow'
            }).then(res => res.json())
        } catch (error) {
            setLoadingChargement(false)
            return console.log("Save Configuration Error", error)
        }

        setInitialConfig(data)
        setLoadingChargement(false)
        setChangeNotSave(false)
    }

    let getChannelGuild = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem('dataDiscord'))?.access_token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(process.env.REACT_APP_HOSTNAME_BOT + "/bot/getchannels/" + props.guildId, requestOptions)
            .then(response => response.json())
            .then((result) => {
                setChannel(result?.channels?.filter(channel => channel.type === 0) || []);
            })
            .catch(console.log)
    };

    let getConfigurationDashboard = async () => {
        let config = await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/guild/${props.guildId}/commandtype`).then(res => res.json()) || {
            guild: props.guildId,
            sheesh: false,
            heyreaction: false,
            rename: true,
            musique: true,
            radio: true,
            playlist: true,
            fun: true,
            game: true,
            chaineTwitch: "0",
            idChannelTwitchTchat: "0",
        }

        await Promise.all([
            setInitialConfig(config),
            setData(config)
        ])
    }

    return (<>
        {loading ?
            <LoadingComponent error={loadingError} errorMessage="Une erreur est survenue" />
            : <>

                <div className="block">
                    <h3>Textuel</h3>
                    <div className="modules">
                        {typeof data.heyreaction == 'boolean' ? <div className="guildModule">
                            <div className="top">
                                {/* <img className="picto" alt='logo' width="48" height="48" src={reactionPicto} ></img> */}
                                <svg className="pictoLog" width="45" height="45" viewBox="0 0 384 384" >
                                    <path fillRule="evenodd" clipRule="evenodd" d="M191.996 2.69141C295.816 2.69141 379.976 86.8513 379.976 190.667C379.976 294.482 295.816 378.642 191.996 378.642C88.1806 378.642 4.021 294.482 4.021 190.667C4.021 86.8513 88.1806 2.69141 191.996 2.69141Z" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M196.217 272.51C110.936 274.869 82.197 203.44 97.3483 167.982C104.077 152.226 129.93 151.933 159.033 150.192C182.308 148.796 257.106 141.993 276.119 154.241C308.795 175.288 286.286 270.02 196.217 272.51Z" fill="#656565" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M193.586 273.404C174.516 274.191 138.206 267.499 159.063 244.6C165.931 237.053 176.578 231.11 190.91 230.52C204.749 229.947 215.68 234.586 223.702 240.631C252.985 262.706 213.195 272.595 193.586 273.404Z" fill="url(#paint0_linear_110_216)" />
                                    <path d="M196.357 277.151C176.119 277.709 158.911 274.243 144.593 268.128C125.998 260.185 112.271 247.765 103.094 233.852C93.8951 219.906 89.2696 204.415 88.8833 190.376C88.6413 181.53 90.0699 173.215 93.0809 166.156C100.47 148.868 124.551 147.495 152.629 145.899L158.772 145.546L168.102 144.927C198.232 142.856 260.423 138.584 278.646 150.325C286.194 155.187 291.177 163.261 293.494 173.089C296.193 184.527 295.258 198.473 290.502 212.358C285.789 226.118 277.31 239.906 264.886 251.204C248.776 265.848 226.054 276.327 196.357 277.151ZM148.237 259.571C161.406 265.197 177.311 268.38 196.101 267.863C223.304 267.109 244.011 257.603 258.622 244.322C269.818 234.14 277.455 221.735 281.689 209.371C285.882 197.137 286.742 185.011 284.425 175.201C282.657 167.691 279.022 161.632 273.625 158.156C257.989 148.082 197.855 152.209 168.721 154.21C165.216 154.452 162.155 154.662 159.321 154.834L153.141 155.187C128.172 156.607 106.757 157.826 101.638 169.799C99.1439 175.644 97.9618 182.624 98.1714 190.12C98.511 202.544 102.639 216.304 110.852 228.756C119.088 241.241 131.447 252.4 148.237 259.571Z" fill="black" />
                                    <path d="M92.0236 56.9297C96.4067 42.5325 102.14 34.5939 116.309 31.6344C131.954 28.3631 147.063 37.2836 150.041 51.5412C153.382 67.5068 146.626 86.1993 134.28 104.827C115.741 132.797 104.369 139.512 73.0568 118.135C54.3643 105.371 40.0785 91.3597 36.7095 75.2313C33.7267 60.9738 44.0012 46.7484 59.6413 43.4771C73.8104 40.5176 82.2422 45.492 92.0236 56.9297ZM290.376 54.7705C300.92 44.0308 309.673 39.6474 323.605 43.5748C338.989 47.9117 348.258 62.8068 344.308 76.8228C339.882 92.5279 325.248 105.976 305.69 116.781C276.318 133.007 263.126 133.7 245.253 100.266C234.582 80.3033 228.394 61.2759 232.866 45.4175C236.816 31.3971 252.502 23.533 267.882 27.8652C281.813 31.7973 286.993 40.1081 290.376 54.7705Z" fill="url(#paint1_linear_110_216)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_110_216" x1="193.478" y1="232.935" x2="199.36" y2="318.797" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset="1" stopColor="#65221D" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_110_216" x1="93.6567" y1="132.039" x2="101.67" y2="35.7759" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset="1" stopColor="white" />
                                        </linearGradient>
                                    </defs>
                                </svg>



                                <Form.Check className="picto" type="switch" id="custom-switch success" onChange={() => { setData({ ...data, heyreaction: !data?.heyreaction }) }} checked={data?.heyreaction} />
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Réactions</h5>
                            <div>Laissez le bot réagir avec 👋 / 💤 suivant le message</div>
                        </div> : ""}

                        {typeof data?.rename == "boolean" ?
                            <div className="guildModule">
                                <div className="top">
                                    <svg className="pictoLog" width="45" height="45" viewBox="0 0 24 24">
                                        <path d="M20.0049 5.99512H19.0049V7.99512H20.0049V15.9951H19.0049V17.9951H20.0049C21.1079 17.9951 22.0049 17.0981 22.0049 15.9951V7.99512C22.0049 6.89312 21.1069 5.99512 20.0049 5.99512V5.99512ZM6.00488 9.99512H14.9999V13.9951H6.00488V9.99512Z" />
                                        <path d="M17.0049 17.995V4H19.9999V2H11.9999V4H15.0049V5.995H4.00488C2.90188 5.995 2.00488 6.892 2.00488 7.995V15.995C2.00488 17.098 2.90188 17.995 4.00488 17.995H15.0049V20H11.9999V22H19.9999V20H17.0049V17.995ZM4.00488 15.995V7.995H15.0049V15.995H4.00488Z" />
                                    </svg>

                                    <Form.Check type="switch" id="custom-switch success" onChange={() => { setData({ ...data, rename: !data?.rename }) }} checked={data?.rename} />
                                </div>
                                <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Rename</h5>
                                <div>Laissez le bot rename les membres lorsque leurs pseudos ne sont pas identifiables par la modération</div>
                            </div>
                            : ""}

                        {typeof data.sheesh == 'boolean' ?
                            <div className="guildModule">
                                <div className="top">
                                    <svg className="pictoLog" width="55" height="55" viewBox="0 0 400 400" >
                                        <path d="M64.8851 93.8035L59.9606 121.467C55.0858 115.891 49.7633 113.104 43.9932 113.104C38.223 113.104 33.5472 115.355 29.9657 119.859C26.4837 124.362 24.7427 131.439 24.7427 141.089C24.7427 152.883 29.3191 166.286 38.4717 181.297C42.2522 187.516 46.0326 193.95 49.8131 200.598C53.5935 207.031 56.8268 214.537 59.5129 223.114C62.199 231.478 63.5421 239.412 63.5421 246.918C63.5421 254.423 62.9451 261.286 61.7513 267.505C60.657 273.509 58.7667 279.728 56.0806 286.161C53.3945 292.595 49.2161 297.849 43.5455 301.923C37.8748 305.998 31.5077 308.035 24.4443 308.035C17.3808 308.035 11.1132 306.212 5.64151 302.567C4.54717 298.921 4 295.704 4 292.917C4 290.129 4.04974 288.735 4.14923 288.735C4.3482 288.735 5.09434 289.164 6.38765 290.022C10.4666 292.38 14.5455 293.56 18.6244 293.56C26.9811 293.56 33.7462 289.914 38.9194 282.623C44.1921 275.332 46.8285 266.004 46.8285 254.638C46.8285 241.771 42.5506 227.939 33.9949 213.143C30.4134 206.924 26.8319 200.705 23.2504 194.486C14.6947 179.689 10.4168 165.214 10.4168 151.061C10.4168 142.054 12.1578 133.262 15.6398 124.684C23.3002 105.598 38.8697 92.5168 62.3482 85.4401L64.8851 93.8035Z" />
                                        <path d="M122.111 305.14C123.503 276.19 124.2 253.244 124.2 236.303C124.2 202.635 121.265 185.801 115.395 185.801C111.018 185.801 106.442 193.628 101.666 209.283C96.9905 224.937 93.1106 247.025 90.0266 275.546H89.8773C89.3799 280.908 88.4348 290.236 87.042 303.532C86.4451 305.033 85.4502 306.319 84.0574 307.392C82.7641 308.464 81.6698 309 80.7744 309C79.9785 309 79.5806 308.464 79.5806 307.392C84.0574 262.572 86.2959 219.79 86.2959 179.046C86.2959 138.087 84.3559 103.454 80.476 75.1467L84.2067 70L96.1449 82.2234C97.1398 96.5913 97.6372 113.747 97.6372 133.69C97.6372 153.419 96.8413 176.794 95.2495 203.814C99.4279 186.659 104.004 172.934 108.979 162.641C114.052 152.347 118.828 147.201 123.304 147.201C131.263 147.201 135.243 159.317 135.243 183.549C135.243 203.493 134.397 226.653 132.706 253.03C131.015 279.192 130.02 295.383 129.721 301.602C128.328 304.604 126.14 306.105 123.155 306.105C122.459 306.105 122.111 305.783 122.111 305.14Z" />
                                        <path d="M200.029 180.654C198.934 190.519 196.746 199.418 193.463 207.353C190.18 215.287 186.449 221.613 182.271 226.331C174.61 234.909 167.895 240.377 162.125 242.736C162.523 253.458 163.816 261.393 166.005 266.54C168.193 271.686 170.83 274.26 173.914 274.26C182.669 274.26 190.578 258.391 197.641 226.653C197.741 225.366 198.238 224.723 199.133 224.723C200.029 224.723 201.372 226.224 203.163 229.226C198.885 251.528 193.612 269.971 187.344 284.553C181.176 298.921 175.008 306.105 168.84 306.105C162.672 306.105 157.847 301.28 154.365 291.63C150.982 281.98 149.291 269.006 149.291 252.708C149.291 230.191 152.126 209.39 157.797 190.304C160.881 180.011 165.209 171.004 170.78 163.284C176.451 155.349 183.166 149.452 190.926 145.592C196.994 150.096 200.029 161.783 200.029 180.654ZM182.569 171.004C178.391 171.004 174.063 176.258 169.586 186.766C165.109 197.059 162.622 211.427 162.125 229.869C170.382 225.152 176.699 218.289 181.077 209.283C185.554 200.061 187.792 191.055 187.792 182.262C187.792 179.046 187.344 176.365 186.449 174.221C185.554 172.076 184.26 171.004 182.569 171.004Z" />
                                        <path d="M263.567 180.654C262.473 190.519 260.284 199.418 257.001 207.353C253.718 215.287 249.988 221.613 245.809 226.331C238.149 234.909 231.433 240.377 225.663 242.736C226.061 253.458 227.355 261.393 229.543 266.54C231.732 271.686 234.368 274.26 237.452 274.26C246.207 274.26 254.116 258.391 261.18 226.653C261.279 225.366 261.777 224.723 262.672 224.723C263.567 224.723 264.91 226.224 266.701 229.226C262.423 251.528 257.15 269.971 250.883 284.553C244.715 298.921 238.547 306.105 232.379 306.105C226.211 306.105 221.385 301.28 217.903 291.63C214.521 281.98 212.83 269.006 212.83 252.708C212.83 230.191 215.665 209.39 221.336 190.304C224.42 180.011 228.747 171.004 234.319 163.284C239.989 155.349 246.705 149.452 254.464 145.592C260.533 150.096 263.567 161.783 263.567 180.654ZM246.108 171.004C241.929 171.004 237.602 176.258 233.125 186.766C228.648 197.059 226.161 211.427 225.663 229.869C233.921 225.152 240.238 218.289 244.615 209.283C249.092 200.061 251.331 191.055 251.331 182.262C251.331 179.046 250.883 176.365 249.988 174.221C249.092 172.076 247.799 171.004 246.108 171.004Z" />
                                        <path d="M321.734 147.201L316.958 175.829C312.382 169.396 307.855 166.179 303.379 166.179C296.017 166.179 292.336 172.291 292.336 184.514C292.336 192.878 295.42 202.635 301.588 213.786C304.274 218.504 306.91 223.436 309.497 228.583C315.665 240.806 318.749 253.137 318.749 265.575C318.749 275.225 317.058 284.446 313.675 293.238C311.785 297.956 308.701 301.709 304.423 304.497C300.245 307.499 295.42 309 289.948 309C284.476 309 279.552 307.499 275.174 304.497C274.677 303.639 274.08 301.709 273.384 298.707C272.787 295.49 272.488 293.238 272.488 291.952C272.488 290.665 272.588 290.022 272.787 290.022C273.085 290.022 273.831 290.343 275.025 290.987C278.01 292.702 281.79 293.56 286.367 293.56C290.943 293.56 294.773 291.415 297.857 287.127C301.041 282.838 302.632 277.369 302.632 270.721C302.632 264.074 301.339 257.533 298.752 251.1C296.265 244.666 293.48 238.876 290.396 233.729C287.411 228.583 284.626 222.257 282.039 214.751C279.552 207.031 278.308 199.311 278.308 191.591C278.308 184.729 279.353 178.617 281.442 173.256C283.631 167.68 286.118 163.07 288.903 159.424C295.668 150.846 305.518 144.734 318.451 141.089L321.734 147.201Z" />
                                        <path d="M377.868 305.14C379.261 276.19 379.957 253.244 379.957 236.303C379.957 202.635 377.022 185.801 371.153 185.801C366.775 185.801 362.199 193.628 357.424 209.283C352.748 224.937 348.868 247.025 345.784 275.546H345.635C345.137 280.908 344.192 290.236 342.799 303.532C342.202 305.033 341.208 306.319 339.815 307.392C338.521 308.464 337.427 309 336.532 309C335.736 309 335.338 308.464 335.338 307.392C339.815 262.572 342.053 219.79 342.053 179.046C342.053 138.087 340.113 103.454 336.233 75.1467L339.964 70L351.902 82.2234C352.897 96.5913 353.395 113.747 353.395 133.69C353.395 153.419 352.599 176.794 351.007 203.814C355.185 186.659 359.762 172.934 364.736 162.641C369.81 152.347 374.585 147.201 379.062 147.201C387.021 147.201 391 159.317 391 183.549C391 203.493 390.154 226.653 388.463 253.03C386.772 279.192 385.777 295.383 385.479 301.602C384.086 304.604 381.897 306.105 378.913 306.105C378.216 306.105 377.868 305.783 377.868 305.14Z" />
                                    </svg>

                                    <Form.Check type="switch" id="custom-switch success" onChange={() => { setData({ ...data, sheesh: !data.sheesh }) }} checked={data.sheesh} />
                                </div>
                                <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Sheesh</h5>
                                <div>Laissez le bot réagir avec son meilleur "SHEEEESHHHH" si un membre dit "sheesh"</div>
                            </div> : ""}

                    </div>
                </div>

                <div className="block">
                    <h3>Multimedia</h3>
                    <div className="modules">
                        {typeof data.radio == 'boolean' ?
                            <div className="guildModule">
                                <div className="top">
                                    <svg className="pictoLog" width="45" height="45" viewBox="0 0 60 60">
                                        <path d="M31.938 36.8369C31.938 42.8609 27.038 47.7609 21.013 47.7609C14.988 47.7609 10.088 42.8609 10.088 36.8369C10.088 30.8129 14.988 25.9119 21.013 25.9119C27.038 25.9119 31.938 30.8129 31.938 36.8369ZM59.5 21.8339V51.8389C59.5 55.8429 56.254 59.0889 52.25 59.0889H7.25C3.246 59.0889 0 55.8429 0 51.8389V21.8339C0 17.8299 3.246 14.5839 7.25 14.5839H42.873L6.186 3.34589C5.394 3.10289 4.948 2.26389 5.19 1.47189C5.434 0.679885 6.271 0.233885 7.064 0.477885L53.48 14.6959C56.897 15.2819 59.5 18.2509 59.5 21.8339ZM34.938 36.8369C34.938 29.1589 28.691 22.9119 21.013 22.9119C13.335 22.9119 7.089 29.1579 7.089 36.8369C7.089 44.5149 13.336 50.7609 21.014 50.7609C28.692 50.7609 34.938 44.5139 34.938 36.8369ZM50.625 37.6849C50.625 36.8559 49.953 36.1849 49.125 36.1849C48.297 36.1849 47.625 36.8559 47.625 37.6849V49.2609C47.625 50.0899 48.297 50.7609 49.125 50.7609C49.953 50.7609 50.625 50.0899 50.625 49.2609V37.6849ZM52.352 27.5499C52.352 25.7679 50.907 24.3229 49.125 24.3229C47.343 24.3229 45.898 25.7679 45.898 27.5499C45.898 29.3319 47.343 30.7769 49.125 30.7769C50.907 30.7769 52.352 29.3319 52.352 27.5499Z" />
                                    </svg>

                                    <Form.Check type="switch" id="custom-switch success" onChange={() => { setData({ ...data, radio: !data.radio }) }} checked={data.radio} />
                                </div>
                                <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Radio</h5>
                                <div>Laissez vos membres écouter une des 41 radios disponibles sur le Bot</div>
                            </div>
                            : ""}

                        {typeof data.musique == 'boolean' ?
                            <div className="guildModule">
                                <div className="top">
                                    <svg className="pictoLog" width="45" height="45" viewBox="0 0 514 514" >
                                        <path d="M331.895 421.526V237.344L440.37 219.756C423.093 128.184 342.73 58.9062 246.136 58.9062C136.935 58.9062 48.415 147.426 48.415 256.627C48.415 365.829 136.935 454.349 246.136 454.349C256.728 454.349 267.114 453.492 277.251 451.89C285.189 438.714 299.428 428.14 317.509 423.619C322.285 422.437 327.108 421.727 331.895 421.526ZM282.463 75.0432L261.279 167.854H240.094L224.962 75.0432C247.159 63.9422 282.463 75.0432 282.463 75.0432ZM246.136 330.033C205.594 330.033 172.73 297.169 172.73 256.627C172.73 216.085 205.594 183.222 246.136 183.222C286.678 183.222 319.542 216.086 319.542 256.627C319.542 297.169 286.678 330.033 246.136 330.033ZM246.136 200.658C215.267 200.658 190.167 225.758 190.167 256.627C190.167 287.493 215.267 312.597 246.136 312.597C277.003 312.597 302.105 287.493 302.105 256.627C302.105 225.758 277.002 200.658 246.136 200.658ZM246.136 296.607C224.092 296.607 206.159 278.674 206.159 256.627C206.159 234.583 224.098 216.65 246.136 216.65C268.183 216.65 286.104 234.583 286.104 256.627C286.104 278.675 268.183 296.607 246.136 296.607ZM271.458 486.001C272.416 491.309 274.52 496.25 277.558 500.689C267.262 502.007 256.788 502.764 246.143 502.764C110.419 502.764 0 392.345 0 256.627C0 120.91 110.419 10.4912 246.136 10.4912C366.609 10.4912 467.081 97.5272 488.146 212.007L464.25 215.887C445.057 112.913 354.586 34.7022 246.136 34.7022C123.765 34.7022 24.211 134.257 24.211 256.627C24.211 378.998 123.766 478.553 246.136 478.553C254.331 478.553 262.415 478.074 270.382 477.205C270.453 480.125 270.772 483.062 271.458 486.001ZM513.255 225.279V438.684C513.255 456.358 500.08 470.455 479.528 475.644C456.966 481.236 435.185 471.79 430.858 454.496C426.532 437.172 441.308 418.594 463.864 412.949C474.06 410.431 484.091 410.945 492.49 413.901V285.336L377.119 306.42L376.587 466.364H376.564C376.463 481.514 362.803 496.38 343.156 501.244C320.873 506.853 297.513 496.243 295.008 480.367C290.723 463.238 305.328 444.849 327.671 439.252C337.725 436.752 347.549 437.255 355.806 440.145V250.817L513.255 225.279Z" />
                                    </svg>

                                    <Form.Check type="switch" id="custom-switch success" onChange={() => { setData({ ...data, musique: !data.musique }) }} checked={data.musique} />
                                </div>
                                <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Musique</h5>
                                <div>Laissez vos membres écouter leurs meilleures musiques</div>
                            </div>
                            : ""}

                        {typeof data.playlist == 'boolean' ?
                            <div className="guildModule">
                                <div className="top">
                                    <svg className="pictoLog" width="45" height="45" viewBox="0 0 512 512" >
                                        <path d="M48 64H208C225.672 64 240 49.672 240 32C240 14.326 225.672 0 208 0H48C30.328 0 16 14.326 16 32C16 49.672 30.328 64 48 64Z" />
                                        <path d="M48 160H208C225.672 160 240 145.672 240 128C240 110.326 225.672 96 208 96H48C30.328 96 16 110.326 16 128C16 145.672 30.328 160 48 160Z" />
                                        <path d="M240 224C240 206.326 225.672 192 208 192H48C30.328 192 16 206.326 16 224C16 241.672 30.328 256 48 256H208C225.672 256 240 241.672 240 224Z" />
                                        <path d="M411.328 75.914C393.043 61.805 368 42.477 368 32C368 14.328 353.672 0 336 0C318.328 0 304 14.328 304 32V325.58C293.977 322.031 283.238 320 272 320C218.98 320 176 362.98 176 416C176 469.02 218.98 512 272 512C325.02 512 368 469.02 368 416V123.293C369.414 124.387 370.82 125.496 372.23 126.586C408.335 154.438 432 174.664 432 200.891C432 241.657 410.316 264.407 409.695 265.055C397.023 277.375 396.734 297.633 409.054 310.305C415.327 316.758 423.659 320 432.003 320C440.038 320 448.085 316.992 454.304 310.945C458.574 306.797 495.999 268.461 495.999 200.89C496 141.25 449.051 105.023 411.328 75.914Z" />
                                    </svg>

                                    <Form.Check type="switch" id="custom-switch success" onChange={() => { setData({ ...data, playlist: !data.playlist }) }} checked={data.playlist} />
                                </div>
                                <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Playlist</h5>
                                <div>Laissez vos membres réaliser / modifier / écouter leurs playlists</div>
                            </div> : ""}

                    </div>
                </div>

                <div className="block">
                    <h3>Activité</h3>
                    <div className="modules">

                        {typeof data.game == 'boolean' ?
                            <div className="guildModule">
                                <div className="top">
                                    <svg className="pictoLog" width="48" height="48" viewBox="0 0 577 577" >
                                        <path d="M464.695 0H112.161C97.8711 0 86.2671 11.595 86.2671 25.896V550.963C86.2671 565.264 97.8721 576.859 112.161 576.859H370.678C436.907 576.859 490.593 523.171 490.593 456.953V25.896C490.593 11.595 478.987 0 464.695 0ZM135.085 80.745C135.085 69.001 144.608 59.49 156.344 59.49H420.512C432.248 59.49 441.769 69.001 441.769 80.745V230.126C441.769 241.871 432.248 251.381 420.512 251.381H156.345C144.609 251.381 135.086 241.871 135.086 230.126V80.745H135.085ZM264.431 430.222C264.431 434.879 260.655 438.655 256 438.655H224.77V469.883C224.77 474.541 220.996 478.316 216.338 478.316H175.518C170.861 478.316 167.085 474.542 167.085 469.883V438.655H135.861C131.203 438.655 127.427 434.879 127.427 430.222V389.4C127.427 384.743 131.203 380.967 135.861 380.967H167.087V349.738C167.087 345.081 170.863 341.306 175.52 341.306H216.343C221 341.306 224.774 345.079 224.774 349.738V380.967H256.004C260.659 380.967 264.435 384.741 264.435 389.4V430.221H264.431V430.222ZM353.756 490.33C336.499 490.33 322.511 476.342 322.511 459.084C322.511 441.827 336.499 427.837 353.756 427.837C371.014 427.837 385.002 441.825 385.002 459.084C385.004 476.342 371.014 490.33 353.756 490.33ZM411.442 394.188C394.184 394.188 380.198 380.201 380.198 362.942C380.198 345.684 394.184 331.695 411.442 331.695C428.701 331.695 442.689 345.682 442.689 362.942C442.689 380.2 428.701 394.188 411.442 394.188Z" />
                                    </svg>

                                    <Form.Check type="switch" id="custom-switch success" onChange={() => { setData({ ...data, game: !data.game }) }} checked={data.game} />
                                </div>
                                <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Game</h5>
                                <div>Plusieurs jeux sont disponibles pour vous amuser</div>
                            </div> : ""}

                        {typeof data.fun == 'boolean' ?
                            <div className="guildModule">

                                <div className="top">
                                    <svg className="pictoLog" width="45" height="45" viewBox="0 0 490 490">
                                        <path d="M69.086 490H420.915C459.001 490 490 459.001 490 420.914V69.086C490 30.991 459.001 0 420.914 0H69.086C30.999 0 0 30.991 0 69.086V420.915C0 459.001 30.999 490 69.086 490ZM332.349 132.647C355.9 132.647 374.991 151.738 374.991 175.288C374.991 198.839 355.9 217.93 332.349 217.93C308.799 217.93 289.708 198.839 289.708 175.288C289.708 151.738 308.799 132.647 332.349 132.647ZM352.292 300.927L370.595 325.481C328.919 356.57 287.109 366.933 249.904 366.933C176.018 366.933 120.211 326.08 119.374 325.467L137.707 300.928C142.104 304.186 246.436 379.882 352.292 300.927ZM157.651 132.647C181.201 132.647 200.292 151.738 200.292 175.288C200.292 198.839 181.201 217.93 157.651 217.93C134.1 217.93 115.009 198.839 115.009 175.288C115.009 151.738 134.1 132.647 157.651 132.647Z" />
                                    </svg>
                                    <Form.Check type="switch" id="custom-switch success" onChange={() => { setData({ ...data, fun: !data.fun }) }} checked={data.fun} />
                                </div>

                                <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Fun</h5>
                                <div>Laissez vos membres s'amuser avec des commandes funs et ludiques</div>
                            </div> : ""}

                    </div>
                </div>


                {(data.idChannelTwitchTchat) ? <div className="block">
                    <h3>Twitch</h3>
                    <div className="modules">

                        <div className="guildModule">
                            <div className="top">
                                {/* <img className="pictoLog" alt='logo' width="48" height="48" src={twitch} ></img> */}
                                <svg className="pictoLog" width="50" height="50" viewBox="0 0 256 268">
                                    <path d="M17.4579 0L0 46.5559V232.757H63.9826V267.691H98.9145L133.812 232.757H186.172L256 162.954V0H17.4579ZM40.7167 23.2632H232.731V151.292L191.992 192.033H128L93.1127 226.919V192.033H40.7167V23.2632ZM104.725 139.668H128V69.8439H104.725V139.668ZM168.722 139.668H191.992V69.8439H168.722V139.668Z" />
                                </svg>

                                {/* <Form.Check type="switch" id="custom-switch success" onChange={() => { this.setState({ logChannel: !this.state.logChannel }) }} checked={this.state.fun} /> */}
                                {/* <Form.Control type="text" placeholder="Chaine" value={this.state.configuration.chaineTwitch} onChange={(event) => { this.setState({ configuration: { ...this.state.configuration, chaineTwitch: event.target.value } }) }} /> */}
                                <Form.Select defaultValue={data.idChannelTwitchTchat} onChange={(event) => { setData({ ...data, idChannelTwitchTchat: event.target.value }) }}>
                                    {(() => {
                                        return getChannelForSelector(channel, data.idChannelTwitchTchat);
                                    })()}
                                </Form.Select>
                                {/* </div> */}
                            </div>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Twitch</h5>
                            <div>Choisir la chaine Twitch et le channel pour afficher le tchat.</div>
                        </div>

                        <div className="guildModule">
                            <div className="top">
                                {/* <img className="pictoLog" alt='logo' width="48" height="48" src={twitch} ></img> */}
                                <svg className="pictoLog" width="50" height="50" viewBox="0 0 256 268">
                                    <path d="M17.4579 0L0 46.5559V232.757H63.9826V267.691H98.9145L133.812 232.757H186.172L256 162.954V0H17.4579ZM40.7167 23.2632H232.731V151.292L191.992 192.033H128L93.1127 226.919V192.033H40.7167V23.2632ZM104.725 139.668H128V69.8439H104.725V139.668ZM168.722 139.668H191.992V69.8439H168.722V139.668Z" />
                                </svg>
                                <Form.Control type="text" placeholder="Chaine" value={data.chaineTwitch} onChange={(event) => { setData({ ...data, chaineTwitch: event.target.value }) }} />
                            </div>

                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Twitch</h5>
                            <div>Choisir la chaine Twitch et le channel pour afficher le tchat.</div>
                        </div>
                    </div>

                </div> : ""}
                <div id="card" className={"cardSave" + (changeNotSave ? " hidden" : "")} ><div className="saveConfig"><div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "0.3em" }}><Avatar classElement="logoChangement" width="30" height="28" /> Changements détectés ! Veuillez enregistrer ou annuler.</div><div className="buttonContainer"><button className="cancelButton" disabled={loadingChargement} type="button" onClick={resetChange}>Annuler</button><button className="saveButton" type="button" disabled={loadingChargement} onClick={updateConfig}>Enregistrer</button></div></div></div>
            </>}

    </>)
}



