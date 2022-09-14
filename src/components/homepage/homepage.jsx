import "./_homepage.css";

import AnimationText from "../animationtext/animationtext";

export const HomePage = () => {
    return (
        <div id="head" className="home__top">
            <div className="home__top__bot">

                {(() => {
                    let particulesNano = [];
                    let nbParticule = Math.floor(Math.random() * 50) + 20;

                    for (let i = 0; i < nbParticule; i++) {
                        let size = Math.floor(Math.random() * 40) + 1;
                        let size2 = Math.floor(249 * size / 267);

                        //position random sur la div
                        let top = Math.floor(Math.random() * 90) + "%";
                        let left = Math.floor(Math.random() * 90) + 5 + "%";

                        //rotation random -180° à 180°
                        let rotate = Math.floor(Math.random() * 360) - 180 + "deg";
                        console.log("rotate", rotate);

                        particulesNano.push(<svg className="particulesNano" width={size} height={size2} style={{
                            top, left, transform: `rotate(${rotate})`, animation: `nanoParticuleAnimation ${Math.floor(Math.random() * 8) + 3}s linear infinite`
                        }} viewBox="0 0 944 882" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M305.841 728.275C300.49 728.275 295.544 731.126 292.862 735.757L221.678 858.652C215.886 868.652 223.101 881.17 234.658 881.17H719.492C731.049 881.17 738.264 868.652 732.472 858.652L661.289 735.757C658.606 731.126 653.66 728.275 648.309 728.275H305.841Z" fill="var(--color-principal)" />
                            <path d="M853.511 525.341C902.931 505.457 926.883 449.27 906.996 399.851C887.111 350.435 830.923 326.499 781.506 346.381C732.083 366.265 708.13 422.457 728.021 471.878C747.909 521.291 804.096 545.224 853.511 525.341Z" fill="url(#paint0_linear_7_295)" />
                            <path d="M65.6184 489.699C101.85 529.117 163.176 531.703 202.599 495.477C242.032 459.241 244.618 397.896 208.373 358.471C172.14 319.06 110.819 316.477 71.3992 352.7C31.9687 388.933 29.3798 450.273 65.6184 489.699Z" fill="url(#paint1_linear_7_295)" />
                            <g filter="url(#filter0_d_7_295)">
                                <path d="M816.009 662.527C708.084 823.479 267.083 830.795 144.523 662.527C21.9637 492.43 247.595 164.804 478.08 172.12C708.566 181.266 922.106 503.404 816.009 662.527Z" fill="url(#paint2_linear_7_295)" />
                            </g>
                            <path d="M465.721 72.1191C465.721 69.3577 467.959 67.1191 470.721 67.1191H489.849C492.61 67.1191 494.849 69.3577 494.849 72.1191V189.399C494.849 192.16 492.61 194.399 489.849 194.399H470.721C467.959 194.399 465.721 192.16 465.721 189.399V72.1191Z" fill="var(--color-principal-hover)" />
                            <rect x="522" y="411" width="224.113" height="223.123" rx="111.562" fill="white" />
                            <path d="M742.979 505.153C742.979 463.801 710.02 431 668.489 431C627.623 431 594 464.465 594 505.153C594 545.842 627.623 579.306 668.489 579.306C710.02 579.306 742.979 545.842 742.979 505.153Z" fill="black" />
                            <rect x="211" y="411" width="224.113" height="223.123" rx="111.562" fill="white" />
                            <path d="M430.979 505.153C430.979 463.801 398.02 431 356.489 431C315.623 431 282 464.465 282 505.153C282 545.842 315.623 579.306 356.489 579.306C398.02 579.306 430.979 545.842 430.979 505.153Z" fill="black" />
                            <path d="M529.131 650.028C494.2 660.532 455.969 659.869 421.683 648.056C415.103 646.085 410.475 638.861 412.467 631.656C414.439 625.096 421.683 620.488 428.946 622.46C459.25 632.964 491.564 633.609 522.532 624.432C539.011 619.844 545.611 644.776 529.131 650.028Z" fill="black" />
                            <path d="M367.868 319.241C375.112 319.904 381.047 312.681 381.047 306.12C381.047 298.897 375.112 293.645 367.868 293C329.637 289.72 291.406 298.252 257.12 315.961C241.968 323.848 255.147 346.809 270.299 338.94C300.622 323.185 334.245 316.624 367.868 319.241ZM689.529 338.94C704.681 346.809 717.861 324.493 702.709 315.961C669.087 298.252 630.192 289.72 592.625 293C585.381 293.645 579.445 298.897 579.445 306.12C579.445 312.681 585.381 319.904 592.625 319.241C626.248 316.624 659.87 323.185 689.529 338.94Z" fill="black" />
                            <g filter="url(#filter1_d_7_295)">
                                <path d="M439.988 113.071C460.211 135.076 494.444 136.521 516.45 116.299C538.461 96.0717 539.903 61.8283 519.67 39.823C499.445 17.8274 465.219 16.3871 443.217 36.6051C421.21 56.8285 419.763 91.0648 439.988 113.071Z" fill="url(#paint3_linear_7_295)" />
                            </g>
                            <defs>
                                <filter id="filter0_d_7_295" x="46" y="112" width="862" height="742" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="32" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape" />
                                </filter>
                                <filter id="filter1_d_7_295" x="421.717" y="22.3359" width="116.233" height="116.232" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape" />
                                </filter>
                                <linearGradient id="paint0_linear_7_295" x1="890.5" y1="375.5" x2="759.5" y2="479" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--color-principal-hover)" />
                                    <stop offset="1" stopColor="var(--color-principal)" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_7_295" x1="74.5" y1="348.5" x2="200.5" y2="491.5" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--color-principal)" />
                                    <stop offset="1" stopColor="var(--color-principal-hover)" />
                                </linearGradient>
                                <linearGradient id="paint2_linear_7_295" x1="844" y1="556" x2="110" y2="547.5" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--color-principal)" />
                                    <stop offset="1" stopColor="var(--color-principal-hover)" />
                                </linearGradient>
                                <linearGradient id="paint3_linear_7_295" x1="524.317" y1="39.6792" x2="444.498" y2="102.746" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--color-principal-hover)" />
                                    <stop offset="1" stopColor="var(--color-principal)" />
                                </linearGradient>
                            </defs>
                        </svg>);

                    }
                    return particulesNano;
                })()}

                <svg className="logo" width="267" height="249" viewBox="0 0 944 882" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M305.841 728.275C300.49 728.275 295.544 731.126 292.862 735.757L221.678 858.652C215.886 868.652 223.101 881.17 234.658 881.17H719.492C731.049 881.17 738.264 868.652 732.472 858.652L661.289 735.757C658.606 731.126 653.66 728.275 648.309 728.275H305.841Z" fill="var(--color-principal)" />
                    <path d="M853.511 525.341C902.931 505.457 926.883 449.27 906.996 399.851C887.111 350.435 830.923 326.499 781.506 346.381C732.083 366.265 708.13 422.457 728.021 471.878C747.909 521.291 804.096 545.224 853.511 525.341Z" fill="url(#paint0_linear_7_295)" />
                    <path d="M65.6184 489.699C101.85 529.117 163.176 531.703 202.599 495.477C242.032 459.241 244.618 397.896 208.373 358.471C172.14 319.06 110.819 316.477 71.3992 352.7C31.9687 388.933 29.3798 450.273 65.6184 489.699Z" fill="url(#paint1_linear_7_295)" />
                    <g filter="url(#filter0_d_7_295)">
                        <path d="M816.009 662.527C708.084 823.479 267.083 830.795 144.523 662.527C21.9637 492.43 247.595 164.804 478.08 172.12C708.566 181.266 922.106 503.404 816.009 662.527Z" fill="url(#paint2_linear_7_295)" />
                    </g>
                    <path d="M465.721 72.1191C465.721 69.3577 467.959 67.1191 470.721 67.1191H489.849C492.61 67.1191 494.849 69.3577 494.849 72.1191V189.399C494.849 192.16 492.61 194.399 489.849 194.399H470.721C467.959 194.399 465.721 192.16 465.721 189.399V72.1191Z" fill="var(--color-principal-hover)" />
                    <rect x="522" y="411" width="224.113" height="223.123" rx="111.562" fill="white" />
                    <path d="M742.979 505.153C742.979 463.801 710.02 431 668.489 431C627.623 431 594 464.465 594 505.153C594 545.842 627.623 579.306 668.489 579.306C710.02 579.306 742.979 545.842 742.979 505.153Z" fill="black" />
                    <rect x="211" y="411" width="224.113" height="223.123" rx="111.562" fill="white" />
                    <path d="M430.979 505.153C430.979 463.801 398.02 431 356.489 431C315.623 431 282 464.465 282 505.153C282 545.842 315.623 579.306 356.489 579.306C398.02 579.306 430.979 545.842 430.979 505.153Z" fill="black" />
                    <path d="M529.131 650.028C494.2 660.532 455.969 659.869 421.683 648.056C415.103 646.085 410.475 638.861 412.467 631.656C414.439 625.096 421.683 620.488 428.946 622.46C459.25 632.964 491.564 633.609 522.532 624.432C539.011 619.844 545.611 644.776 529.131 650.028Z" fill="black" />
                    <path d="M367.868 319.241C375.112 319.904 381.047 312.681 381.047 306.12C381.047 298.897 375.112 293.645 367.868 293C329.637 289.72 291.406 298.252 257.12 315.961C241.968 323.848 255.147 346.809 270.299 338.94C300.622 323.185 334.245 316.624 367.868 319.241ZM689.529 338.94C704.681 346.809 717.861 324.493 702.709 315.961C669.087 298.252 630.192 289.72 592.625 293C585.381 293.645 579.445 298.897 579.445 306.12C579.445 312.681 585.381 319.904 592.625 319.241C626.248 316.624 659.87 323.185 689.529 338.94Z" fill="black" />
                    <g filter="url(#filter1_d_7_295)">
                        <path d="M439.988 113.071C460.211 135.076 494.444 136.521 516.45 116.299C538.461 96.0717 539.903 61.8283 519.67 39.823C499.445 17.8274 465.219 16.3871 443.217 36.6051C421.21 56.8285 419.763 91.0648 439.988 113.071Z" fill="url(#paint3_linear_7_295)" />
                    </g>
                    <defs>
                        <filter id="filter0_d_7_295" x="46" y="112" width="862" height="742" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="32" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape" />
                        </filter>
                        <filter id="filter1_d_7_295" x="421.717" y="22.3359" width="116.233" height="116.232" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_295" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_295" result="shape" />
                        </filter>
                        <linearGradient id="paint0_linear_7_295" x1="890.5" y1="375.5" x2="759.5" y2="479" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--color-principal-hover)" />
                            <stop offset="1" stopColor="var(--color-principal)" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_7_295" x1="74.5" y1="348.5" x2="200.5" y2="491.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--color-principal)" />
                            <stop offset="1" stopColor="var(--color-principal-hover)" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_7_295" x1="844" y1="556" x2="110" y2="547.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--color-principal)" />
                            <stop offset="1" stopColor="var(--color-principal-hover)" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_7_295" x1="524.317" y1="39.6792" x2="444.498" y2="102.746" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--color-principal-hover)" />
                            <stop offset="1" stopColor="var(--color-principal)" />
                        </linearGradient>
                    </defs>
                </svg>



                <div className="home__top__bot__title">
                    <p className="home__top__bot__title__desc" >Un bot Discord pour</p>
                    <div id="animated-texts" className="home__top__bot__title__activities">
                        <AnimationText />
                    </div>
                </div>
                <a className="home__top__bot__invite" href="https://discord.com/api/oauth2/authorize?client_id=1012688780471308339&permissions=1945627743&scope=bot%20applications.commands" >
                    {/* <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.9485 8.6582C8.45993 8.6582 8.07422 9.07487 8.07422 9.5832C8.07422 10.0915 8.4685 10.5082 8.9485 10.5082C9.43708 10.5082 9.82279 10.0915 9.82279 9.5832C9.83136 9.07487 9.43708 8.6582 8.9485 8.6582ZM12.0771 8.6582C11.5885 8.6582 11.2028 9.07487 11.2028 9.5832C11.2028 10.0915 11.5971 10.5082 12.0771 10.5082C12.5656 10.5082 12.9514 10.0915 12.9514 9.5832C12.9514 9.07487 12.5656 8.6582 12.0771 8.6582Z" fill="white"></path> <path d="M17.4515 0H3.66863C2.51149 0 1.56006 0.916667 1.56006 2.05833V15.5833C1.56006 16.725 2.50292 17.6417 3.66863 17.6417H15.3343L14.7858 15.7917L16.1058 16.9833L17.3486 18.1L19.5601 20V2.05833C19.5601 0.916667 18.6172 0 17.4515 0ZM13.4829 13.0583C13.4829 13.0583 13.1143 12.625 12.8058 12.25C14.1515 11.8833 14.6658 11.0583 14.6658 11.0583C14.2458 11.325 13.8429 11.5167 13.4829 11.65C12.9686 11.8583 12.4715 12 11.9915 12.0833C11.0058 12.2667 10.0972 12.2167 9.32577 12.075C8.74291 11.9667 8.2372 11.8083 7.8172 11.6417C7.5772 11.55 7.32006 11.4417 7.06291 11.3C7.02863 11.2833 7.00291 11.2667 6.96863 11.25C6.95149 11.2417 6.93434 11.2333 6.92577 11.2167C6.7372 11.1167 6.63434 11.05 6.63434 11.05C6.63434 11.05 7.13149 11.85 8.43434 12.2333C8.12577 12.6167 7.74863 13.0667 7.74863 13.0667C5.4772 13 4.61149 11.55 4.61149 11.55C4.61149 8.33333 6.09434 5.71667 6.09434 5.71667C7.5772 4.63333 8.98291 4.66667 8.98291 4.66667L9.08577 4.78333C7.23434 5.3 6.3772 6.09167 6.3772 6.09167C6.3772 6.09167 6.60006 5.975 6.98577 5.8C8.08291 5.33333 8.9572 5.2 9.3172 5.16667C9.3772 5.15833 9.42863 5.15 9.48863 5.15C10.1143 5.06667 10.8258 5.05 11.5629 5.13333C12.5401 5.24167 13.5858 5.525 14.6572 6.09167C14.6572 6.09167 13.8429 5.34167 12.0943 4.825L12.2401 4.66667C12.2401 4.66667 13.6458 4.63333 15.1286 5.71667C15.1286 5.71667 16.6115 8.325 16.6115 11.55C16.6286 11.5417 15.7543 12.9917 13.4829 13.0583Z" fill="white"></path></svg> */}

                    <svg width="22" height="25" viewBox="0 0 136 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M115.13 26.7533C106.462 22.7563 97.1662 19.8114 87.4473 18.1247C87.2704 18.0922 87.0935 18.1736 87.0024 18.3363C85.807 20.4731 84.4829 23.2607 83.5555 25.4517C73.1023 23.8789 62.7026 23.8789 52.4638 25.4517C51.5364 23.2119 50.1641 20.4731 48.9633 18.3363C48.8721 18.179 48.6952 18.0976 48.5183 18.1247C38.8049 19.806 29.5095 22.7509 20.836 26.7533C20.7609 26.7859 20.6966 26.8401 20.6537 26.9106C3.02256 53.3821 -1.80738 79.2028 0.562021 104.703C0.572742 104.828 0.64243 104.948 0.738922 105.023C12.3715 113.609 23.6396 118.821 34.6986 122.275C34.8755 122.329 35.0631 122.264 35.1757 122.118C37.7917 118.528 40.1236 114.742 42.1231 110.761C42.241 110.528 42.1285 110.252 41.8872 110.159C38.1884 108.749 34.6664 107.03 31.2785 105.078C31.0105 104.92 30.989 104.535 31.2356 104.351C31.9486 103.814 32.6616 103.255 33.3424 102.691C33.4657 102.588 33.6372 102.567 33.7819 102.632C56.0393 112.844 80.1354 112.844 102.13 102.632C102.275 102.561 102.446 102.583 102.575 102.686C103.256 103.25 103.969 103.814 104.687 104.351C104.934 104.535 104.918 104.92 104.65 105.078C101.262 107.068 97.7398 108.749 94.0356 110.154C93.7943 110.246 93.6871 110.528 93.8051 110.761C95.8475 114.737 98.1794 118.522 100.747 122.112C100.854 122.264 101.047 122.329 101.224 122.275C112.337 118.821 123.605 113.609 135.237 105.023C135.339 104.948 135.404 104.834 135.414 104.709C138.25 75.2274 130.665 49.6183 115.307 26.916C115.269 26.8401 115.205 26.7859 115.13 26.7533ZM45.4467 89.1763C38.7459 89.1763 33.2244 82.9937 33.2244 75.401C33.2244 67.8083 38.6387 61.6256 45.4467 61.6256C52.3083 61.6256 57.7762 67.8625 57.669 75.401C57.669 82.9937 52.2547 89.1763 45.4467 89.1763ZM90.6369 89.1763C83.9361 89.1763 78.4147 82.9937 78.4147 75.401C78.4147 67.8083 83.8289 61.6256 90.6369 61.6256C97.4986 61.6256 102.966 67.8625 102.859 75.401C102.859 82.9937 97.4986 89.1763 90.6369 89.1763Z" fill="white" />
                    </svg>



                    <span>Ajouter à Discord</span></a>
                <div className="wave">

                    {(() => {
                        let svg = [];

                        for (let i = 0; i < 2; i++) {

                            svg.push(<svg width="2064" height="219" viewBox="0 0 2064 219" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_846_502)">
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
        // </div >
    )
}