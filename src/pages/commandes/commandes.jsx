import "./_commandes.css";
import { commands } from "./../../components/command.json"
import { Component } from "react";


class Commandes extends Component {
    state = {
        commands: [],
        types: [],
        activeType: "Tout",
        query: ""
    }

    componentDidMount() {
        let types = ["Tout"];
        for (let command of commands) {
            command.open = false
            if (!types.includes(command.type)) {
                types.push(command.type)
            }
        }
        this.setState({ commands, types })
    }

    openCommand = (index) => {
        let commands = this.state.commands
        commands[index].open = !commands[index].open

        this.setState({ commands })
    }

    selectType = (type) => {
        let commands = this.state.commands
        for (let command of commands) {
            command.open = false
        }

        this.setState({ activeType: type, commands })
    }

    search = (e) => {
        let query = e.target.value
        let commands = this.state.commands
        for (let command of commands) {
            command.open = false
        }

        this.setState({ query, commands, activeType: "Tout" })
    }

    render() {
        return (
            <div transition="page" className="commands-list" >
                <div className="top">
                    <h1>COMMANDES</h1>
                    <div className="search search-bar" data-v-7085cbe2=""></div>
                </div>
                <>
                    <div className="command__input">
                        <input type="text" placeholder="Rechercher une commande" onChange={(e) => this.search(e)} />
                        <p className="fa-solid fa-magnifying-glass">
                            <svg width="25" height="25" viewBox="0 0 298 298" xmlns="http://www.w3.org/2000/svg">
                                <path d="M230.942 199.589C239.601 208.247 239.601 222.284 230.942 230.943C222.285 239.601 208.248 239.6 199.59 230.943L149.494 180.847C140.837 172.189 140.835 158.152 149.493 149.494C158.152 140.835 172.189 140.836 180.848 149.494L230.942 199.589Z" fill="var(--color-principal-hover)" />
                                <path d="M201.39 100.695C201.39 156.307 156.307 201.39 100.695 201.39C45.0827 201.39 0 156.307 0 100.695C0 45.0827 45.0827 0 100.695 0C156.307 0 201.39 45.0827 201.39 100.695ZM35.8068 100.695C35.8068 136.532 64.8582 165.583 100.695 165.583C136.532 165.583 165.583 136.532 165.583 100.695C165.583 64.8582 136.532 35.8068 100.695 35.8068C64.8582 35.8068 35.8068 64.8582 35.8068 100.695Z" fill="var(--color-principal)" />
                                <path d="M186.271 233.504C173.227 220.462 173.227 199.313 186.271 186.27C199.314 173.226 220.461 173.227 233.505 186.27L288.105 240.871C301.149 253.914 301.149 275.061 288.105 288.105C275.063 301.148 253.915 301.148 240.871 288.105L186.271 233.504Z" fill="var(--color-principal)" />
                            </svg>
                        </p>
                    </div>

                    <div className="crtl">
                        <ul role="tablist" className="nav-pills commands-pills mb-20" id="myTabs_6">
                            {(() => {
                                let typesList = [];
                                for (let type of this.state.types) {
                                    typesList.push(<li className={"btnSearch btn-commands-category " + (this.state.activeType === type ? "active" : "")} onClick={() => { this.selectType(type) }} >{type}</li>)
                                }
                                return typesList;
                            })()}
                        </ul>
                    </div>

                    <div className="commands-listing">
                        {(() => {
                            let commandListing = [];

                            for (let i = 0; i < this.state.commands.length; i++) {
                                if (this.state.activeType !== "Tout" && this.state.activeType !== this.state.commands[i].type) continue
                                if (this.state.query !== "" && !this.state.commands[i].name.toLowerCase().includes(this.state.query.toLowerCase())) continue

                                commandListing.push(
                                    <div key={i} className={"command-card__container " + (this.state.commands[i].open ? 'active' : '')} onClick={() => { this.openCommand(i) }}>
                                        <div className="command-card__header"><div>
                                            <svg className="logo" width="26" height="24" viewBox="0 0 944 882" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                            <h5 className="command-card__header__title">{`${(this.state.commands[i].name[0] + "").toUpperCase()}${(this.state.commands[i].name + "").substring(1)}`} <span>- {`${(this.state.commands[i].description[0] + "").toUpperCase()}${(this.state.commands[i].description + "").substring(1)}`}</span></h5>
                                        </div>
                                            <svg className="arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 30.021 30.021"><path d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151 c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0 l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z" fill="var(--color-principal)" /></svg>
                                        </div>
                                        <div className="command-card__body">
                                            <div className="command-card__body__usage">
                                                <h5>Utilisation:</h5>
                                                <div className="elementBody">
                                                    {(() => {
                                                        return <pre >{this.state.commands[i].usages.join("\n")}</pre>
                                                    })()}
                                                </div>
                                            </div>
                                            <div className="command-card__body__examples">
                                                <h5>Exemples:</h5>
                                                <div className="elementBody">
                                                    {(() => {
                                                        return <pre>{this.state.commands[i].examples.join("\n")}</pre>
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                            }

                            return commandListing;
                        })()}

                    </div>
                </>
            </div >
        )
    }
}

export default Commandes;