import "./_homepage.css";

import AnimationText from "../animationtext/animationtext";
import Avatar from "../../components/avatar/avatar";

export const HomePage = () => {
    return (
        <div id="head" className={"homepage" + (new Date().getMonth() === 9 ? " home_halloween" : "")}>
            <div className={"homepage__bot" + (new Date().getMonth() === 9 ? " home_halloween_bottom" : "")}>

                {(() => {
                    //test if width screen > 768px

                    if (window.innerWidth > 768) {

                        let particulesNano = [];
                        let nbParticule = 20 || Math.floor(Math.random() * 35) + 20;

                        for (let i = 0; i < nbParticule; i++) {
                            let size = Math.floor(Math.random() * 30) + 20;
                            let size2 = Math.floor(249 * size / 267);

                            //position random sur la div
                            let top = Math.floor(Math.random() * 90) + 2 + "%";
                            let left = Math.floor(Math.random() * 90) + 5 + "%";

                            //rotation random -180° à 180°
                            let rotate = Math.floor(Math.random() * 360) - 180 + "deg";

                            particulesNano.push(<Avatar classElement="particulesNano" width={size} height={size2} styleElement={{ top, left, transform: `rotate(${rotate})`, animation: `nanoParticuleAnimation ${Math.floor(Math.random() * 8) + 5}s linear infinite` }} />);
                        }
                        return particulesNano;
                    }
                })()}

                <Avatar classElement="logo" width="267" height="249" />

                <div className="homepage_bot_feature">
                    <p className="homepage_bot_feature__desc" >Un bot Discord pour</p>
                    <div id="animated-texts" className="homepage_bot_feature_element">
                        <AnimationText />
                    </div>
                </div>
                <a className="invite_bot_button" href={"https://discord.com/api/oauth2/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID + "&permissions=1945627743&scope=bot%20applications.commands"} >
                    {/* <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.9485 8.6582C8.45993 8.6582 8.07422 9.07487 8.07422 9.5832C8.07422 10.0915 8.4685 10.5082 8.9485 10.5082C9.43708 10.5082 9.82279 10.0915 9.82279 9.5832C9.83136 9.07487 9.43708 8.6582 8.9485 8.6582ZM12.0771 8.6582C11.5885 8.6582 11.2028 9.07487 11.2028 9.5832C11.2028 10.0915 11.5971 10.5082 12.0771 10.5082C12.5656 10.5082 12.9514 10.0915 12.9514 9.5832C12.9514 9.07487 12.5656 8.6582 12.0771 8.6582Z" fill="white"></path> <path d="M17.4515 0H3.66863C2.51149 0 1.56006 0.916667 1.56006 2.05833V15.5833C1.56006 16.725 2.50292 17.6417 3.66863 17.6417H15.3343L14.7858 15.7917L16.1058 16.9833L17.3486 18.1L19.5601 20V2.05833C19.5601 0.916667 18.6172 0 17.4515 0ZM13.4829 13.0583C13.4829 13.0583 13.1143 12.625 12.8058 12.25C14.1515 11.8833 14.6658 11.0583 14.6658 11.0583C14.2458 11.325 13.8429 11.5167 13.4829 11.65C12.9686 11.8583 12.4715 12 11.9915 12.0833C11.0058 12.2667 10.0972 12.2167 9.32577 12.075C8.74291 11.9667 8.2372 11.8083 7.8172 11.6417C7.5772 11.55 7.32006 11.4417 7.06291 11.3C7.02863 11.2833 7.00291 11.2667 6.96863 11.25C6.95149 11.2417 6.93434 11.2333 6.92577 11.2167C6.7372 11.1167 6.63434 11.05 6.63434 11.05C6.63434 11.05 7.13149 11.85 8.43434 12.2333C8.12577 12.6167 7.74863 13.0667 7.74863 13.0667C5.4772 13 4.61149 11.55 4.61149 11.55C4.61149 8.33333 6.09434 5.71667 6.09434 5.71667C7.5772 4.63333 8.98291 4.66667 8.98291 4.66667L9.08577 4.78333C7.23434 5.3 6.3772 6.09167 6.3772 6.09167C6.3772 6.09167 6.60006 5.975 6.98577 5.8C8.08291 5.33333 8.9572 5.2 9.3172 5.16667C9.3772 5.15833 9.42863 5.15 9.48863 5.15C10.1143 5.06667 10.8258 5.05 11.5629 5.13333C12.5401 5.24167 13.5858 5.525 14.6572 6.09167C14.6572 6.09167 13.8429 5.34167 12.0943 4.825L12.2401 4.66667C12.2401 4.66667 13.6458 4.63333 15.1286 5.71667C15.1286 5.71667 16.6115 8.325 16.6115 11.55C16.6286 11.5417 15.7543 12.9917 13.4829 13.0583Z" fill="white"></path></svg> */}

                    <svg width="22" height="25" viewBox="0 0 136 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M115.13 26.7533C106.462 22.7563 97.1662 19.8114 87.4473 18.1247C87.2704 18.0922 87.0935 18.1736 87.0024 18.3363C85.807 20.4731 84.4829 23.2607 83.5555 25.4517C73.1023 23.8789 62.7026 23.8789 52.4638 25.4517C51.5364 23.2119 50.1641 20.4731 48.9633 18.3363C48.8721 18.179 48.6952 18.0976 48.5183 18.1247C38.8049 19.806 29.5095 22.7509 20.836 26.7533C20.7609 26.7859 20.6966 26.8401 20.6537 26.9106C3.02256 53.3821 -1.80738 79.2028 0.562021 104.703C0.572742 104.828 0.64243 104.948 0.738922 105.023C12.3715 113.609 23.6396 118.821 34.6986 122.275C34.8755 122.329 35.0631 122.264 35.1757 122.118C37.7917 118.528 40.1236 114.742 42.1231 110.761C42.241 110.528 42.1285 110.252 41.8872 110.159C38.1884 108.749 34.6664 107.03 31.2785 105.078C31.0105 104.92 30.989 104.535 31.2356 104.351C31.9486 103.814 32.6616 103.255 33.3424 102.691C33.4657 102.588 33.6372 102.567 33.7819 102.632C56.0393 112.844 80.1354 112.844 102.13 102.632C102.275 102.561 102.446 102.583 102.575 102.686C103.256 103.25 103.969 103.814 104.687 104.351C104.934 104.535 104.918 104.92 104.65 105.078C101.262 107.068 97.7398 108.749 94.0356 110.154C93.7943 110.246 93.6871 110.528 93.8051 110.761C95.8475 114.737 98.1794 118.522 100.747 122.112C100.854 122.264 101.047 122.329 101.224 122.275C112.337 118.821 123.605 113.609 135.237 105.023C135.339 104.948 135.404 104.834 135.414 104.709C138.25 75.2274 130.665 49.6183 115.307 26.916C115.269 26.8401 115.205 26.7859 115.13 26.7533ZM45.4467 89.1763C38.7459 89.1763 33.2244 82.9937 33.2244 75.401C33.2244 67.8083 38.6387 61.6256 45.4467 61.6256C52.3083 61.6256 57.7762 67.8625 57.669 75.401C57.669 82.9937 52.2547 89.1763 45.4467 89.1763ZM90.6369 89.1763C83.9361 89.1763 78.4147 82.9937 78.4147 75.401C78.4147 67.8083 83.8289 61.6256 90.6369 61.6256C97.4986 61.6256 102.966 67.8625 102.859 75.401C102.859 82.9937 97.4986 89.1763 90.6369 89.1763Z" fill="white" />
                    </svg>



                    <span>Ajouter à Discord</span></a>
                <div className="wave">

                    {(() => {
                        let svg = [];

                        for (let i = 0; i < 5; i++) {

                            svg.push(<svg key={i} width="2064" height="219" viewBox="0 0 2064 219" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_846_502)">
                                    <path d="M0 87.4993V218.999L2064 218.999V95.4993C2021 107.999 1879.8 125.699 1659 96.4993C1442.2 21.2993 1233 19.4993 1155.5 27.9993C991.667 75.166 624.4 152.099 466 82.4993C307.6 12.8993 89.3333 56.8326 0 87.4993Z" fill="#40454A" />
                                    <g filter="url(#filter0_dd_846_502)">
                                        <path d="M439 53.0008C287.397 -5.23017 84 37.3341 0 69.0008V111.001C99.2 80.2007 212.667 69.6674 257 68.0007C330.6 67.2007 412 90.9419 445 100.001C470.5 107.001 545.7 132.301 678.5 127.501C811.3 122.701 991.5 85.8341 1065 68.0007C1131.17 54.0007 1293.2 30.4007 1412 48.0007C1560.5 70.0007 1573.5 99.0007 1710.5 132.501C1820.1 159.301 1992 131.5 2064 111.001V69.0007C1980 98 1902.83 102.501 1875 104.501C1775 104.501 1733.7 111.701 1544.5 40.5007C1355.3 -30.6993 1098.33 10.834 993.5 40.5007C871 71.0007 590 111 439 53.0008Z" fill="url(#paint0_linear_846_502)" />
                                    </g>
                                </g>
                                <defs>
                                    <filter id="filter0_dd_846_502" x="-10" y="-8.8125" width="2084" height="162.367" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_846_502" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="effect1_dropShadow_846_502" result="effect2_dropShadow_846_502" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_846_502" result="shape" />
                                    </filter>
                                    <linearGradient id="paint0_linear_846_502" x1="1032" y1="1.1875" x2="1032" y2="143.166" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--color-principal)" />
                                        <stop offset="1" stopColor="var(--color-principal-hover)" />
                                    </linearGradient>
                                    <clipPath id="clip0_846_502">
                                        <rect width="2064" height="219" fill="var(--color-principal)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            )
                        }

                        return svg;
                    })()}
                </div>
            </div>
        </div>
    )
}