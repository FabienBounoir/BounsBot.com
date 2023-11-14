import { useState, useEffect } from "react"
import { Form } from 'react-bootstrap/'
import Avatar from "../avatar/avatar";
import LoadingComponent from "../loading/LoadingComponent.jsx";

export const Logs = ({ guildId, configuration, updateConfiguration, channels, loading }) => {
    const [channel, setChannel] = useState([])

    useEffect(() => {
        setChannel(channels?.filter(channel => channel.type === 0) || [])
    }, [channels])


    let getChannelForSelector = (selectedchannel) => {
        var option = [];

        if (selectedchannel === "0" || selectedchannel === null) {
            option.push(<option value="0" selected>❌ Désactivé</option>)
        }
        else {
            option.push(<option value="0">❌ Désactivé</option>)
        }

        for (let value of channel) {
            if (value.id === selectedchannel) {
                option.push(<option value={value.id} selected>{value.name}</option>)
            }
            else {
                option.push(<option value={value.id}>{value.name}</option>)
            }
        }

        return option;
    }

    return (<>
        {["ERROR", "LOADING"].includes(loading) ?
            <LoadingComponent error={loading == "ERROR"} errorMessage="Une erreur est survenue" />
            : <>
                <div className="guildModule" style={{ marginBottom: "1em" }} >
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 1024 1024">
                                <path d="M924.3 338.4a447.57 447.57 0 0 0-96.1-143.3 443.09 443.09 0 0 0-143-96.3A443.91 443.91 0 0 0 512 64h-2c-60.5.3-119 12.3-174.1 35.9a444.08 444.08 0 0 0-141.7 96.5 445 445 0 0 0-95 142.8A449.89 449.89 0 0 0 65 514.1c.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8a447.72 447.72 0 0 0 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3A443.2 443.2 0 0 0 827 830.5c41.2-40.9 73.6-88.7 96.3-142 23.5-55.2 35.5-113.9 35.8-174.5.2-60.9-11.6-120-34.8-175.6zM312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.4 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48z" />
                            </svg>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Messages</h5>
                        </div>
                        <Form.Select defaultValue={configuration.logs?.message} value={configuration.logs?.message} onChange={(event) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, message: event.target.value } }) }} >
                            {(() => {
                                return getChannelForSelector(configuration.logs?.message);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Pouvoir modérer les différents messages sur le serveur</div>
                </div>

                <div className="guildModule" style={{ marginBottom: "1em" }} >
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 16 16">
                                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                            </svg>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Vocaux</h5>
                        </div>
                        <Form.Select defaultValue={configuration.logs?.vocal} value={configuration.logs?.vocal} onChange={(event) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, vocal: event.target.value } }) }} >
                            {(() => {
                                return getChannelForSelector(configuration.logs?.vocal);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Pouvoir modérer les différents vocaux sur le serveur</div>
                </div>

                <div className="guildModule" style={{ marginBottom: "1em" }} >
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 50 50">
                                <path d="M16.1899 15.0818C16.1899 10.2169 20.133 6.271 24.9993 6.271C29.8683 6.271 33.8086 10.2169 33.8086 15.0818C33.8086 19.9494 29.8683 23.8925 24.9993 23.8925C20.133 23.8925 16.1899 19.9508 16.1899 15.0818ZM49.9607 31.6667L48.7295 24.2847C48.5081 22.9484 47.3833 21.8278 46.0736 21.5056C44.9026 22.5422 43.3674 23.1739 41.6809 23.1739C39.9958 23.1739 38.4591 22.5408 37.2895 21.5056C35.9756 21.8264 34.8536 22.9484 34.6323 24.2847L34.6028 24.4584C33.8716 23.7538 32.964 23.2244 31.9862 22.9848C30.1232 24.6321 27.6831 25.6407 25.0007 25.6407C22.3182 25.6407 19.8781 24.6321 18.0151 22.9848C17.0374 23.2244 16.1297 23.7538 15.3985 24.4584L15.3691 24.2847C15.1477 22.9484 14.0215 21.8278 12.7118 21.5056C11.5422 22.5422 10.0056 23.1739 8.32045 23.1739C6.63393 23.1739 5.09871 22.5408 3.92767 21.5056C2.61656 21.8264 1.49316 22.9484 1.27184 24.2847L0.0405737 31.6667C-0.224169 33.251 0.875425 34.5481 2.47929 34.5481H12.5956L11.8279 39.1468C11.4077 41.6667 13.1559 43.7286 15.7094 43.7286H34.2905C36.844 43.7286 38.5922 41.6625 38.172 39.1468L37.4044 34.5481H47.5206C49.1259 34.5453 50.2241 33.251 49.9607 31.6667ZM41.6795 22.0785C44.7387 22.0785 47.2181 19.5992 47.2181 16.5399C47.2181 13.4821 44.7373 11.0014 41.6795 11.0014C38.6216 11.0014 36.1423 13.4821 36.1423 16.5399C36.1423 19.5992 38.6244 22.0785 41.6795 22.0785ZM8.31764 22.0785C11.3755 22.0785 13.8548 19.5992 13.8548 16.5399C13.8548 13.4821 11.3741 11.0014 8.31764 11.0014C5.25839 11.0014 2.77905 13.4821 2.77905 16.5399C2.77905 19.5992 5.25979 22.0785 8.31764 22.0785Z" />
                            </svg>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Users</h5>
                        </div>
                        <Form.Select defaultValue={configuration.logs?.user} value={configuration.logs?.user} onChange={(event) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, user: event.target.value } }) }} >
                            {(() => {
                                return getChannelForSelector(configuration.logs?.user);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Voir en temps réel les changements effectués sur un utilisateur</div>
                </div>

                <div className="guildModule" style={{ marginBottom: "1em" }} >
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 297 297">
                                <path d="M43.5041 293.985L183.892 153.597C186.225 151.264 186.224 147.446 183.889 145.115L153.775 115.04C151.44 112.708 147.62 112.709 145.287 115.043L4.92406 255.406C2.99406 257.337 1.90906 259.955 1.90906 262.685C1.90906 265.415 2.99406 268.034 4.92406 269.964L28.9451 293.984C30.9561 295.994 33.5891 296.999 36.2241 296.999C38.8591 297 41.4931 295.995 43.5041 293.985Z" />
                                <path d="M210.546 150.962C216.944 157.36 225.475 160.883 234.567 160.883C243.659 160.883 252.191 157.359 258.588 150.962L285.157 124.394C298.402 111.148 298.402 89.597 285.157 76.351L223.831 15.024C222.701 13.894 221.323 13.043 219.807 12.537L183.775 0.526989C180.079 -0.703011 175.999 0.257989 173.241 3.01399L137.21 39.046C134.453 41.804 133.49 45.882 134.724 49.58L146.735 85.612C147.24 87.128 148.091 88.506 149.221 89.636L210.546 150.962Z" />
                            </svg>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Ban / Unban</h5>
                        </div>
                        <Form.Select defaultValue={configuration.logs?.ban_unban} value={configuration.logs?.ban_unban} onChange={(event) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, ban_unban: event.target.value } }) }} >
                            {(() => {
                                return getChannelForSelector(configuration.logs?.ban_unban);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Voir en temps réel les differents ban / unban sur le serveur</div>
                </div>

                <div className="guildModule" style={{ marginBottom: "1em" }} >
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 512 512" >
                                <path d="M501.084 295.982H483.622C483.622 287.584 483.622 282.068 483.622 273.856C483.622 268.286 479.107 263.77 473.536 263.77H467.572C468.281 255.053 462.658 246.832 453.9 244.581C446.94 242.792 403.049 231.511 396.28 229.771L414.841 181.16C420.215 167.084 413.168 151.308 399.08 145.929L356.59 129.489C348.447 126.338 339.699 125.533 331.111 127.109C297.395 133.294 241.982 143.461 235.58 144.631C231.347 145.405 227.524 147.645 224.778 150.958L187.059 196.481V59.3691C187.059 54.0111 183.524 49.2971 178.381 47.7961L97.2411 24.1161H307.618V113.141L331.73 109.991V12.0601C331.73 5.4021 326.332 0.00409956 319.674 0.00409956C317.965 0.00409956 12.8421 -0.0229004 11.9101 0.0540996C5.52609 0.5801 0.841094 5.9461 0.841094 12.0601C0.841094 15.0181 0.784094 452.85 0.945094 454.135C1.55809 459.007 5.04009 462.89 9.52009 464.199L171.627 511.508C179.35 513.765 187.06 507.947 187.06 499.935V250.25C189.854 249.157 192.427 247.386 194.476 244.911L248.719 179.444C255.322 178.237 301.738 169.747 309.198 168.383L268.434 275.145C268.434 275.145 269.887 271.473 242.722 364.463L211.108 424.556V481.49H211.109C220.414 483.76 230.379 479.513 235.017 470.695L281.455 382.422C282.118 381.163 282.652 379.84 283.052 378.474L308.741 290.536C310.609 291.249 309.689 290.898 314.53 292.746C320.999 302.906 352.84 352.914 359.281 363.032L327.112 453.636C323.172 464.732 328.973 476.922 340.07 480.862C351.106 484.781 363.349 479.021 367.296 467.904L402.947 367.493C405.09 361.455 404.45 354.576 400.84 348.908L369.554 299.771C374.113 287.83 378.557 276.191 383.138 264.193C400.509 268.658 411.945 271.598 411.945 271.598L411.682 295.984H394.22C391.951 295.984 389.865 296.743 388.181 298.006L414.894 339.961C421.221 349.898 422.589 361.965 418.648 373.067L414.211 385.565H501.086C506.655 385.565 511.169 381.05 511.169 375.482V306.068C511.169 300.497 506.654 295.982 501.084 295.982ZM152.698 316.97C152.698 323.628 147.3 329.026 140.642 329.026C133.984 329.026 128.586 323.628 128.586 316.97V247.374C128.586 240.716 133.984 235.318 140.642 235.318C147.3 235.318 152.698 240.716 152.698 247.374V316.97ZM463.453 295.982H463.452H431.853V283.941H463.453V295.982V295.982Z" />
                                <path d="M315.805 325.767L307.617 353.795V440.572H269.688L257.003 464.685H309.408C308.829 459.133 309.489 453.478 311.413 448.061L331.731 390.839V350.779L315.805 325.767Z" />
                                <path d="M416.914 50.6339C396.069 42.6749 372.719 53.1209 364.76 73.9659C356.731 94.9909 367.461 118.243 388.092 126.12C408.748 134.008 432.228 123.788 440.246 102.788C448.204 81.9429 437.759 58.5929 416.914 50.6339Z" />
                            </svg>

                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Join / Leave</h5>
                        </div>
                        <Form.Select defaultValue={configuration.logs?.join_leave} value={configuration.logs?.join_leave} onChange={(event) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, join_leave: event.target.value } }) }} >
                            {(() => {
                                return getChannelForSelector(configuration.logs?.join_leave);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Voir les arrivés & départs des différents utilisateurs</div>
                </div>

                <div className="guildModule" style={{ marginBottom: "1em" }} >
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 188 160" >
                                <path d="M160.38 41.42L155.239 24.2133C139.836 35.1473 110.314 34.7253 93.6253 16.0991C76.9366 34.7253 47.4148 35.1665 32.0113 24.2133L26.8704 41.42C26.8704 41.42 30.4767 43.1656 32.7786 49.0162H31.6084C31.7235 67.5465 33.9103 95.0925 44.288 114.332C55.5481 135.145 79.5454 153.139 91.1316 158.318V159.757C91.7262 159.661 92.4743 159.45 93.28 159.162C94.0857 159.45 94.8338 159.661 95.4284 159.757V158.318C107.015 153.139 131.012 135.145 142.272 114.332C152.669 95.1116 154.836 67.5465 154.952 49.0162H154.434C156.755 43.1656 160.38 41.42 160.38 41.42ZM133.391 105.911C124.432 122.485 105.307 136.814 96.0998 140.939V142.089C95.6203 142.013 95.0256 141.84 94.3926 141.629C93.7404 141.859 93.1457 142.032 92.6853 142.089V140.939C83.4586 136.814 64.3529 122.485 55.3947 105.911C55.1645 105.489 54.9535 105.067 54.7425 104.645H64.3721C72.4287 116.865 86.24 127.05 93.2416 130.177V131.136C93.6445 131.079 94.1432 130.925 94.6803 130.753C95.2174 130.944 95.7162 131.079 96.119 131.136V130.177C103.121 127.05 116.932 116.865 124.989 104.645H134.081C133.813 105.067 133.621 105.489 133.391 105.911Z" />
                                <path d="M167.075 132.402C170.163 128.892 146.588 108.386 143.02 105.374L44.4992 20.8948L51.7886 12.5888C54.1288 9.92245 51.8077 4.1869 49.0838 1.885C46.3599 -0.41689 41.4492 -0.781356 39.109 1.885L26.5445 16.1951L14.7281 6.2586C11.1601 3.24696 6.26861 3.05513 3.18024 6.56552L1.68401 8.27276C-1.40437 11.7831 0.053497 15.869 3.64062 18.8807L15.6105 28.6253L3.92835 41.9188C1.58809 44.5851 2.68149 49.2848 5.4054 51.5867C8.12931 53.8886 14.2485 55.289 16.608 52.6226L22.6504 45.7361L110.142 120.778C115.455 116.308 120.922 110.726 124.931 104.626H134.024C133.813 105.048 133.602 105.489 133.372 105.892C129.286 113.45 123.09 120.509 116.683 126.379L119.752 129.007C123.32 132.019 149.657 152.18 152.727 148.688C152.727 148.688 174.192 158.606 177.472 154.865C180.791 151.163 167.075 132.402 167.075 132.402Z" />
                                <path d="M186.315 8.25335L184.819 6.54611C181.73 3.03572 176.858 3.22755 173.271 6.23919L161.474 16.1949L148.89 1.8656C146.55 -0.800765 141.639 -0.436299 138.915 1.8656C136.191 4.16749 133.87 9.90304 136.211 12.5694L143.5 20.8754L44.998 105.374C41.4108 108.386 17.8548 128.892 20.924 132.402C20.924 132.402 7.22772 151.163 10.5079 154.884C13.7881 158.605 35.2533 148.707 35.2533 148.707C38.3417 152.218 64.66 132.057 68.2279 129.026L71.6616 126.072C65.3889 120.279 59.3464 113.316 55.3373 105.911C55.1071 105.489 54.8961 105.067 54.6851 104.645H64.3147C68.1704 110.496 73.3496 115.867 78.4713 120.241L165.368 45.7359L171.41 52.6224C173.751 55.2887 179.889 53.8884 182.613 51.5865C185.337 49.2846 186.43 44.5849 184.09 41.9185L172.408 28.6251L184.378 18.8804C187.946 15.8496 189.403 11.7637 186.315 8.25335Z" />
                            </svg>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Guild</h5>
                        </div>
                        <Form.Select defaultValue={configuration.logs?.guild} value={configuration.logs?.guild} onChange={(e) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, guild: e.target.value } }) }}>
                            {(() => {
                                return getChannelForSelector(configuration.logs?.guild);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Voir les differents changements opérés sur la guild</div>
                </div>

                <div className="guildModule" style={{ marginBottom: "1em" }} >
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 310 320" >
                                <path d="M303.719 182.794L233.719 132.794C228.503 129.069 221.497 129.069 216.281 132.794L167.056 167.954C150.995 159.792 133.195 155.5 115 155.5C51.589 155.5 0 207.089 0 270.5C0 278.784 6.716 285.5 15 285.5H140V305C140 313.284 146.716 320 155 320H295C303.284 320 310 313.284 310 305V195C310 190.155 307.661 185.609 303.719 182.794ZM31.325 255.5C38.431 215.761 73.248 185.5 115 185.5C123.903 185.5 132.675 186.887 141.029 189.568C140.364 191.279 140 193.115 140 195V255.5H31.325ZM280 290H170V202.72L176.61 197.998C176.628 197.986 176.646 197.973 176.664 197.96L225 163.434L280 202.72V290Z" />
                                <path d="M115 125.5C149.601 125.5 177.751 97.351 177.751 62.75C177.751 28.149 149.601 0 115 0C80.399 0 52.249 28.149 52.249 62.75C52.249 97.351 80.399 125.5 115 125.5ZM115 30C133.059 30 147.751 44.691 147.751 62.75C147.751 80.809 133.059 95.5 115 95.5C96.941 95.5 82.249 80.809 82.249 62.75C82.249 44.691 96.941 30 115 30Z" />
                            </svg>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Roles</h5>
                        </div>
                        <Form.Select defaultValue={configuration.logs?.roles} value={configuration.logs?.roles} onChange={(e) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, roles: e.target.value } }) }}>
                            {(() => {
                                return getChannelForSelector(configuration.logs?.roles);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Voir lorsqu'un role est crée / modifié ou supprimé</div>
                </div>

                <div className="guildModule" style={{ marginBottom: "1em" }} >
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 145 134">
                                <path d="M28.093 134C25.788 134 24.0426 131.907 24.4454 129.627L28.9335 104.222H3.70567C1.4042 104.222 -0.340242 102.136 0.056451 99.8583L1.35307 92.4138C1.6633 90.6331 3.20265 89.3333 5.00229 89.3333H31.5268L39.3806 44.6667H14.1527C11.8513 44.6667 10.1068 42.5805 10.5035 40.3028L11.8002 32.8584C12.1104 31.0773 13.6497 29.7778 15.4494 29.7778H41.9738L46.6918 3.07173C47.0057 1.29466 48.5431 0 50.3394 0H57.6328C59.9376 0 61.6832 2.09241 61.2801 4.37272L56.7924 29.7778H101.248L105.966 3.07173C106.28 1.29466 107.817 0 109.614 0H116.907C119.212 0 120.957 2.09241 120.554 4.37272L116.067 29.7778H141.294C143.596 29.7778 145.341 31.8639 144.943 34.1416L143.647 41.5861C143.337 43.3672 141.797 44.6667 139.998 44.6667H113.473L105.619 89.3333H130.847C133.149 89.3333 134.893 91.4193 134.496 93.6973L133.2 101.142C132.89 102.922 131.35 104.222 129.551 104.222H103.026L98.308 130.928C97.9946 132.705 96.4571 134 94.6604 134H87.3674C85.0624 134 83.3168 131.907 83.7199 129.627L88.2076 104.222H43.7521L39.0341 130.928C38.7202 132.705 37.1827 134 35.3865 134H28.093ZM54.2024 44.6667L46.3486 89.3333H90.8039L98.6577 44.6667H54.2024Z" />
                            </svg>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Channels</h5>
                        </div>
                        <Form.Select defaultValue={configuration.logs?.channels} value={configuration.logs?.channels} onChange={(e) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, channels: e.target.value } }) }}>
                            {(() => {
                                return getChannelForSelector(configuration.logs?.channels);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Voir lorsqu'un channel est crée / modifié ou supprimé</div>
                </div>

                <div className="guildModule" style={{ marginBottom: "1em" }} >
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 295 295" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M294.048 56.386C294.048 48.102 287.332 41.386 279.048 41.386H15C6.716 41.386 0 48.102 0 56.386V237.662C0 245.946 6.716 252.662 15 252.662H279.048C287.332 252.662 294.048 245.946 294.048 237.662V56.386ZM264.048 86.936C264.048 91.351 262.111 95.543 258.75 98.405L201.23 147.381L258.805 196.404C262.132 199.236 264.048 203.386 264.048 207.755C264.048 215.988 257.374 222.663 249.14 222.663H249.012C245.369 222.663 241.844 221.366 239.07 219.004L178.091 167.082L156.748 185.254C153.945 187.64 150.484 188.833 147.023 188.833C143.562 188.833 140.101 187.64 137.298 185.254L115.955 167.082L55.075 218.92C52.238 221.336 48.633 222.662 44.907 222.662C36.674 222.662 29.999 215.988 29.999 207.754C29.999 203.385 31.916 199.236 35.242 196.403L92.818 147.38L36.094 99.082C32.228 95.79 30 90.967 30 85.889C30 77.879 36.493 71.385 44.504 71.385C47.95 71.385 51.283 72.612 53.907 74.846L142.283 150.094C145.016 152.421 149.034 152.421 151.768 150.094L240.143 74.846C242.767 72.612 246.1 71.385 249.545 71.385C257.555 71.385 264.048 77.878 264.048 85.888V86.936Z" />
                            </svg>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Invites</h5>
                        </div>
                        <Form.Select defaultValue={configuration.logs?.invites} value={configuration.logs?.invites} onChange={(e) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, invites: e.target.value } }) }}>
                            {(() => {
                                return getChannelForSelector(configuration.logs?.invites);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Pouvoir modérer les différents invites crée sur la guild</div>
                </div>

                <div className="guildModule" style={{ marginBottom: "0.5em" }}>
                    <div className="top">
                        <div className="type">
                            <svg className="pictoLog" width="35" height="35" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M106.528 0C119.491 0 130 10.5089 130 23.4722V72.215L95.7028 72.2222L94.1636 72.2723C85.5137 72.8344 78.1411 78.0802 74.5593 85.506C71.5283 86.3248 68.3481 86.7353 65.0062 86.7353C57.4609 86.7353 50.71 84.644 44.6083 80.4237C42.148 78.722 38.7739 79.337 37.0722 81.7973C35.3704 84.2577 35.9854 87.6318 38.4458 89.3335C46.3651 94.811 55.267 97.5686 65.0062 97.5686C66.646 97.5686 68.2631 97.4905 69.8566 97.334L72.2291 97.0407L72.2222 130H23.4722C10.5089 130 0 119.491 0 106.528V23.4722C0 10.5089 10.5089 0 23.4722 0H106.528ZM125.24 84.6421L84.6421 125.24C84.145 125.738 83.6191 126.199 83.0682 126.623L83.0611 95.6953L83.1035 94.6588C83.604 88.5252 88.4835 83.6291 94.6107 83.1025L95.7043 83.0556L126.629 83.061C126.203 83.6145 125.74 84.1428 125.24 84.6421ZM43.3366 34.3139C38.3535 34.3139 34.3139 38.3535 34.3139 43.3366C34.3139 48.3196 38.3535 52.3592 43.3366 52.3592C48.3196 52.3592 52.3592 48.3196 52.3592 43.3366C52.3592 38.3535 48.3196 34.3139 43.3366 34.3139ZM86.6699 34.3139C81.6868 34.3139 77.6473 38.3535 77.6473 43.3366C77.6473 48.3196 81.6868 52.3592 86.6699 52.3592C91.653 52.3592 95.6925 48.3196 95.6925 43.3366C95.6925 38.3535 91.653 34.3139 86.6699 34.3139Z" />
                            </svg>
                            <h5 className="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Emotes / Stickers</h5>
                        </div>
                        {/* defaultValue={this.state.configuration.logs.message} onChange={(event) => { this.setState({ configuration: { ...this.state.configuration, logs: { ...this.state.configuration.logs, message: event.target.value } } }) }} */}
                        <Form.Select defaultValue={configuration.logs?.emotes_stickers} value={configuration.logs?.emotes_stickers} onChange={(e) => { updateConfiguration({ ...configuration, logs: { ...configuration.logs, emotes_stickers: e.target.value } }) }}>
                            {(() => {
                                return getChannelForSelector(configuration.logs?.emotes_stickers);
                            })()}
                        </Form.Select>
                    </div>
                    <div>Voir les differents changements opérés sur les Emotes et les stickers</div>
                </div>
            </>}

    </>)
}



