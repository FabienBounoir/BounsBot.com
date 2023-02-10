// import React from "react";
import "./_level.css";
import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingFullPage from "../../components/loading/LoadingFullPage.jsx";
import GainRolesLevels from "../../components/gainRolesLevels/gainRolesLevels.jsx";

let levels = [
  { "value": 1, "totalxp": 100 },
  { "value": 2, "totalxp": 255 },
  { "value": 3, "totalxp": 475 },
  { "value": 4, "totalxp": 770 },
  { "value": 5, "totalxp": 1150 },
  { "value": 6, "totalxp": 1625 },
  { "value": 7, "totalxp": 2205 },
  { "value": 8, "totalxp": 2900 },
  { "value": 9, "totalxp": 3720 },
  { "value": 10, "totalxp": 4675 },
  { "value": 11, "totalxp": 5775 },
  { "value": 12, "totalxp": 7030 },
  { "value": 13, "totalxp": 8450 },
  { "value": 14, "totalxp": 10045 },
  { "value": 15, "totalxp": 11825 },
  { "value": 16, "totalxp": 13800 },
  { "value": 17, "totalxp": 15980 },
  { "value": 18, "totalxp": 18375 },
  { "value": 19, "totalxp": 20995 },
  { "value": 20, "totalxp": 23850 },
  { "value": 21, "totalxp": 26950 },
  { "value": 22, "totalxp": 30305 },
  { "value": 23, "totalxp": 33925 },
  { "value": 24, "totalxp": 37820 },
  { "value": 25, "totalxp": 42000 },
  { "value": 26, "totalxp": 46475 },
  { "value": 27, "totalxp": 51225 },
  { "value": 28, "totalxp": 56350 },
  { "value": 29, "totalxp": 61770 },
  { "value": 30, "totalxp": 67525 },
  { "value": 31, "totalxp": 73625 },
  { "value": 32, "totalxp": 80080 },
  { "value": 33, "totalxp": 86900 },
  { "value": 34, "totalxp": 94095 },
  { "value": 35, "totalxp": 101675 },
  { "value": 36, "totalxp": 109650 },
  { "value": 37, "totalxp": 118030 },
  { "value": 38, "totalxp": 126825 },
  { "value": 39, "totalxp": 136045 },
  { "value": 40, "totalxp": 145700 },
  { "value": 41, "totalxp": 155800 },
  { "value": 42, "totalxp": 166355 },
  { "value": 43, "totalxp": 177575 },
  { "value": 44, "totalxp": 188870 },
  { "value": 45, "totalxp": 200850 },
  { "value": 46, "totalxp": 213325 },
  { "value": 47, "totalxp": 226305 },
  { "value": 48, "totalxp": 239800 },
  { "value": 49, "totalxp": 253820 },
  { "value": 50, "totalxp": 268375 },
  { "value": 51, "totalxp": 283375 },
  { "value": 52, "totalxp": 299130 },
  { "value": 53, "totalxp": 315350 },
  { "value": 54, "totalxp": 332145 },
  { "value": 55, "totalxp": 349525 },
  { "value": 56, "totalxp": 367500 },
  { "value": 57, "totalxp": 386080 },
  { "value": 58, "totalxp": 405275 },
  { "value": 59, "totalxp": 425095 },
  { "value": 60, "totalxp": 445550 },
  { "value": 61, "totalxp": 466650 },
  { "value": 62, "totalxp": 488405 },
  { "value": 63, "totalxp": 510825 },
  { "value": 64, "totalxp": 533920 },
  { "value": 65, "totalxp": 555700 },
  { "value": 66, "totalxp": 582175 },
  { "value": 67, "totalxp": 607355 },
  { "value": 68, "totalxp": 633250 },
  { "value": 69, "totalxp": 659870 },
  { "value": 70, "totalxp": 687825 },
  { "value": 71, "totalxp": 715325 },
  { "value": 72, "totalxp": 744180 },
  { "value": 73, "totalxp": 773800 },
  { "value": 74, "totalxp": 804195 },
  { "value": 75, "totalxp": 835375 },
  { "value": 76, "totalxp": 867350 },
  { "value": 77, "totalxp": 900130 },
  { "value": 78, "totalxp": 933925 },
  { "value": 79, "totalxp": 968145 },
  { "value": 80, "totalxp": 1034000 },
  { "value": 81, "totalxp": 1039500 },
  { "value": 82, "totalxp": 1076455 },
  { "value": 83, "totalxp": 1114275 },
  { "value": 84, "totalxp": 1152970 },
  { "value": 85, "totalxp": 1192550 },
  { "value": 86, "totalxp": 1233025 },
  { "value": 87, "totalxp": 1274405 },
  { "value": 88, "totalxp": 1316700 },
  { "value": 89, "totalxp": 1359920 },
  { "value": 90, "totalxp": 1404075 },
  { "value": 91, "totalxp": 1449175 },
  { "value": 92, "totalxp": 1495230 },
  { "value": 93, "totalxp": 1542250 },
  { "value": 94, "totalxp": 1590245 },
  { "value": 95, "totalxp": 1639225 },
  { "value": 96, "totalxp": 1689200 },
  { "value": 97, "totalxp": 1740180 },
  { "value": 98, "totalxp": 1792175 },
  { "value": 99, "totalxp": 1845195 },
  { "value": 100, "totalxp": 1899250 },
  { "value": 101, "totalxp": 1954355 },
  { "value": 102, "totalxp": 2010505 },
  { "value": 103, "totalxp": 2067700 },
  { "value": 104, "totalxp": 2125945 },
  { "value": 105, "totalxp": 2185245 },
  { "value": 106, "totalxp": 2245600 },
  { "value": 107, "totalxp": 2307015 },
  { "value": 108, "totalxp": 2369575 },
  { "value": 109, "totalxp": 2433190 },
  { "value": 110, "totalxp": 2497875 },
  { "value": 111, "totalxp": 2563625 },
  { "value": 112, "totalxp": 2630450 },
  { "value": 113, "totalxp": 2698350 },
  { "value": 114, "totalxp": 2767325 },
  { "value": 115, "totalxp": 2837375 },
  { "value": 116, "totalxp": 2908500 },
  { "value": 117, "totalxp": 2980725 },
  { "value": 118, "totalxp": 3054125 },
  { "value": 119, "totalxp": 3128600 },
  { "value": 120, "totalxp": 3204155 },
  { "value": 121, "totalxp": 3281805 },
  { "value": 122, "totalxp": 3361550 },
  { "value": 123, "totalxp": 3443300 },
  { "value": 124, "totalxp": 3526155 },
  { "value": 125, "totalxp": 3611125 },
  { "value": 126, "totalxp": 3697200 },
  { "value": 127, "totalxp": 3784385 },
  { "value": 128, "totalxp": 3872685 },
  { "value": 129, "totalxp": 3963100 },
  { "value": 130, "totalxp": 4054625 },
  { "value": 131, "totalxp": 4147275 },
  { "value": 132, "totalxp": 4241050 },
  { "value": 133, "totalxp": 4335950 },
  { "value": 134, "totalxp": 4431980 },
  { "value": 135, "totalxp": 4529100 },
  { "value": 136, "totalxp": 4627350 },
  { "value": 137, "totalxp": 4726725 },
  { "value": 138, "totalxp": 4827225 },
  { "value": 139, "totalxp": 4928850 },
  { "value": 140, "totalxp": 5031605 },
  { "value": 141, "totalxp": 5135400 },
  { "value": 142, "totalxp": 5240325 },
  { "value": 143, "totalxp": 5346385 },
  { "value": 144, "totalxp": 5453580 },
  { "value": 145, "totalxp": 5561915 },
  { "value": 146, "totalxp": 5671390 },
  { "value": 147, "totalxp": 5781995 },
  { "value": 148, "totalxp": 5893725 },
  { "value": 149, "totalxp": 6006595 },
  { "value": 150, "totalxp": 6120500 },
  { "value": 151, "totalxp": 6235455 },
  { "value": 152, "totalxp": 6351555 },
  { "value": 153, "totalxp": 6468800 },
  { "value": 154, "totalxp": 6587195 },
  { "value": 155, "totalxp": 6706735 },
  { "value": 156, "totalxp": 6827420 },
  { "value": 157, "totalxp": 6949255 },
  { "value": 158, "totalxp": 7072235 },
  { "value": 159, "totalxp": 7196365 },
  { "value": 160, "totalxp": 7321640 },
  { "value": 161, "totalxp": 7448065 },
  { "value": 162, "totalxp": 7575640 },
  { "value": 163, "totalxp": 7704365 },
  { "value": 164, "totalxp": 7834245 },
  { "value": 165, "totalxp": 7965275 },
  { "value": 166, "totalxp": 8097455 },
  { "value": 167, "totalxp": 8230790 },
  { "value": 168, "totalxp": 8365280 },
  { "value": 169, "totalxp": 8500825 },
  { "value": 170, "totalxp": 8637525 },
  { "value": 171, "totalxp": 8775380 },
  { "value": 172, "totalxp": 8914295 },
  { "value": 173, "totalxp": 9054275 },
  { "value": 174, "totalxp": 9195305 },
  { "value": 175, "totalxp": 9337400 },
  { "value": 176, "totalxp": 9481560 },
  { "value": 177, "totalxp": 9626785 },
  { "value": 178, "totalxp": 9773080 },
  { "value": 179, "totalxp": 9920445 },
  { "value": 180, "totalxp": 10068975 },
  { "value": 181, "totalxp": 10218585 },
  { "value": 182, "totalxp": 10369275 },
  { "value": 183, "totalxp": 10521125 },
  { "value": 184, "totalxp": 10674045 },
  { "value": 185, "totalxp": 10828135 },
  { "value": 186, "totalxp": 10983300 },
  { "value": 187, "totalxp": 11139555 },
  { "value": 188, "totalxp": 11296985 },
  { "value": 189, "totalxp": 11455495 },
  { "value": 190, "totalxp": 11615100 },
  { "value": 191, "totalxp": 11775795 },
  { "value": 192, "totalxp": 11937675 },
  { "value": 193, "totalxp": 12101645 },
  { "value": 194, "totalxp": 12266710 },
  { "value": 195, "totalxp": 12432870 },
  { "value": 196, "totalxp": 12599130 },
  { "value": 197, "totalxp": 12766580 },
  { "value": 198, "totalxp": 12935030 },
  { "value": 199, "totalxp": 13104580 },
  { "value": 200, "totalxp": 13275230 },
  { "value": 201, "totalxp": 13446980 },
  { "value": 202, "totalxp": 13619835 },
  { "value": 203, "totalxp": 13793895 },
  { "value": 204, "totalxp": 13969065 },
  { "value": 205, "totalxp": 14145335 },
  { "value": 206, "totalxp": 14322710 },
  { "value": 207, "totalxp": 14500190 },
  { "value": 208, "totalxp": 14678780 },
  { "value": 209, "totalxp": 14858475 },
  { "value": 210, "totalxp": 15039275 },
  { "value": 211, "totalxp": 15221185 },
  { "value": 212, "totalxp": 15404210 },
  { "value": 213, "totalxp": 15588355 },
  { "value": 214, "totalxp": 15773615 },
  { "value": 215, "totalxp": 15959995 },
  { "value": 216, "totalxp": 16147500 },
  { "value": 217, "totalxp": 16336130 },
  { "value": 218, "totalxp": 16525890 },
  { "value": 219, "totalxp": 16716875 },
  { "value": 220, "totalxp": 16909085 },
  { "value": 221, "totalxp": 17102420 },
  { "value": 222, "totalxp": 17296880 },
  { "value": 223, "totalxp": 17492465 },
  { "value": 224, "totalxp": 17689285 },
  { "value": 225, "totalxp": 17887230 },
  { "value": 226, "totalxp": 18086310 },
  { "value": 227, "totalxp": 18286525 },
  { "value": 228, "totalxp": 18487875 },
  { "value": 229, "totalxp": 18690360 },
  { "value": 230, "totalxp": 18893980 },
  { "value": 231, "totalxp": 19098735 },
  { "value": 232, "totalxp": 19304625 },
  { "value": 233, "totalxp": 19511650 },
  { "value": 234, "totalxp": 19719710 },
  { "value": 235, "totalxp": 19928905 },
  { "value": 236, "totalxp": 20139230 },
  { "value": 237, "totalxp": 20350700 },
  { "value": 238, "totalxp": 20563315 },
  { "value": 239, "totalxp": 20777075 },
  { "value": 240, "totalxp": 20991980 },
  { "value": 241, "totalxp": 21208000 },
  { "value": 242, "totalxp": 21425175 },
  { "value": 243, "totalxp": 21643495 },
  { "value": 244, "totalxp": 21862860 },
  { "value": 245, "totalxp": 22083380 },
  { "value": 246, "totalxp": 22305055 },
  { "value": 247, "totalxp": 22527975 },
  { "value": 248, "totalxp": 22752050 },
  { "value": 249, "totalxp": 22977280 },
  { "value": 250, "totalxp": 23203665 }
]


class Level extends Component {
  state = {
    level: [],
    levelsRole: [],
    page: 0,
    hasMoreData: true,
    loading: true,
    errorLoading: false
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let id = new URLSearchParams(window.location.search).get('id') || ""
    let twitch = new URLSearchParams(window.location.search).get('twitch') !== null

    fetch(process.env.REACT_APP_HOSTNAME_BACKEND + `${twitch ? ("/twitch/") : ("/discord/")}` + id + `?page=${this.state.page}`)
      .then(response => response.json())
      .then((result) => {
        this.setState({
          level: this.state.level.concat(result.rank),
          page: this.state.page + 1,
          hasMoreData: result.rank.length !== 0,
          loading: false,
          levelsRole: result.levelsRole
        });
      })
      .catch((error) => {
        this.setState({
          errorLoading: true,
        })
        console.log(error)
      })
  };

  formatNumber = (number) => {
    //format number exmeple 25666 to 25.6k
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (number >= 1000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return number;
  }

  calculeLevel = (xp) => {
    return levels.findIndex(element => element.totalxp >= xp);
  }

  renderLoadingAnimation = () => {
    let loadingLevelNumber = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
    let loadingLevel = [];

    for (let i = 0; i < loadingLevelNumber; i++) {
      loadingLevel.push(<div key={this.state.level.length + 1 + i} className="leaderboardPlayersListContainer">
        <div className="leaderboardPlayer">
          <div className="leaderboardPlayerLeft">
            <div className={this.state.level.length === 0 ? ("leaderboardRank premier") : (this.state.level.length === 1 ? ("leaderboardRank second") : (this.state.level.length === 2 ? ("leaderboardRank troisieme") : ("leaderboardRank")))}>
              {this.state.level.length + i + 1}
            </div>
            <div className="leaderboardPlayerIconLoading">
            </div>
            <div className="leaderboardPlayerUsernameLoading" style={{ width: `${Math.floor(Math.random() * (12 - 6 + 1)) + 6}em` }}>
            </div>
          </div>
          <div className="leaderboardPlayerStats">
            <div className="leaderboardPlayerStatBlock">
              <div className="leaderboardPlayerStatValueLoading">
              </div>
            </div>
            <div className="leaderboardPlayerStatBlock">
              <div className="leaderboardPlayerStatValueLoading">
              </div>
            </div>
            <div className="leaderboardPlayerStat">
              <div className="leaderboardPlayerStatTextLoading" style={{ background: `linear-gradient(90deg, var(--color-principal) 0%, var(--color-principal-hover) 50%, var(--color-principal) 100%)` }} >
              </div>
            </div>
          </div>
        </div>
      </div>)
    }

    return loadingLevel
  }

  render() {
    return (
      <div className="leaderboardglobal">
        <div className="top"><h1>LEVELS</h1><div className="search search-bar" data-v-7085cbe2=""></div></div>

        <div className="leaderboard">
          <div className="leaderboardLevel">
            <InfiniteScroll

              dataLength={this.state.level.length}
              next={this.getData}
              hasMore={this.state.hasMoreData}
              loader={this.renderLoadingAnimation()}
            // {<div><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /></div>}
            >

              {(() => {
                var rank = [];

                for (let i = 0; i < this.state.level.length; i++) {
                  rank.push(
                    <div key={this.state.level[i].identifiant} className="leaderboardPlayersListContainer">
                      <div className="leaderboardPlayer">
                        <div className="leaderboardPlayerLeft">
                          <div className={i === 0 ? ("leaderboardRank premier") : (i === 1 ? ("leaderboardRank second") : (i === 2 ? ("leaderboardRank troisieme") : ("leaderboardRank")))}>
                            {i + 1}
                          </div>
                          <div className="leaderboardPlayerIcon">
                            <img loading="lazy" src={this.state.level[i].picture} onError={(e) => { e.target.outerHTML = `<img loading="lazy" src='https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png'/>` }} alt="" />
                          </div>
                          <div className="leaderboardPlayerUsername">
                            {this.state.level[i].username}
                          </div>
                        </div>
                        <div className="leaderboardPlayerStats">
                          <div className="leaderboardPlayerStatBlock">
                            <div className="leaderboardPlayerStatName">
                              MESSAGES
                            </div>
                            <div className="leaderboardPlayerStatValue">
                              {this.formatNumber(this.state.level[i].nbMessage)}
                            </div>
                          </div>
                          <div className="leaderboardPlayerStatBlock">
                            <div className="leaderboardPlayerStatName">
                              EXPERIENCE
                            </div>
                            <div className="leaderboardPlayerStatValue">
                              {this.formatNumber(this.state.level[i].xp)}
                            </div>
                          </div>
                          <div className="leaderboardPlayerStat">
                            <div className="leaderboardPlayerStatText">
                              <svg width="50" height="45" viewBox="0 0 974 882" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M319.841 728.275C314.49 728.275 309.544 731.126 306.862 735.757L235.678 858.652C229.886 868.652 237.101 881.17 248.658 881.17H733.492C745.049 881.17 752.264 868.652 746.472 858.652L675.289 735.757C672.606 731.126 667.66 728.275 662.309 728.275H319.841Z" fill="var(--color-principal)" />
                                <path d="M883.511 525.341C932.931 505.456 956.883 449.269 936.996 399.85V399.85C917.111 350.435 860.923 326.498 811.506 346.38V346.38C762.083 366.265 738.13 422.457 758.021 471.878V471.878C777.909 521.291 834.096 545.224 883.511 525.341V525.341Z" fill="url(#paint0_linear_831_495)" />
                                <path d="M65.6184 489.699C101.85 529.117 163.176 531.703 202.599 495.477V495.477C242.032 459.241 244.618 397.896 208.373 358.471V358.471C172.14 319.06 110.819 316.477 71.3992 352.7V352.7C31.9687 388.933 29.3798 450.273 65.6184 489.699V489.699Z" fill="url(#paint1_linear_831_495)" />
                                <path d="M830.009 662.527C722.084 823.479 281.083 830.795 158.523 662.527C35.9637 492.43 261.595 164.804 492.08 172.12C722.566 181.266 936.106 503.404 830.009 662.527Z" fill="url(#paint2_linear_831_495)" />
                                <path d="M794.213 641.39C698.638 783.923 308.106 790.402 199.573 641.391C91.0387 490.76 290.848 200.628 494.957 207.107C699.065 215.205 888.167 500.478 794.213 641.39Z" fill="black" />
                                <path d="M479.721 72.1191C479.721 69.3577 481.959 67.1191 484.721 67.1191H503.849C506.61 67.1191 508.849 69.3577 508.849 72.1191V189.399C508.849 192.16 506.61 194.399 503.849 194.399H484.721C481.959 194.399 479.721 192.16 479.721 189.399V72.1191Z" fill="var(--color-principal-hover)" />
                                <path d="M453.988 113.071C474.211 135.076 508.444 136.521 530.45 116.299V116.299C552.461 96.0717 553.903 61.8283 533.67 39.823V39.823C513.445 17.8274 479.219 16.3871 457.217 36.6051V36.6051C435.21 56.8285 433.763 91.0648 453.988 113.071V113.071Z" fill="url(#paint3_linear_831_495)" />
                                <defs>
                                  <linearGradient id="paint0_linear_831_495" x1="920.5" y1="375.5" x2="789.5" y2="479" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--color-principal-hover)" />
                                    <stop offset="1" stopColor="var(--color-principal)" />
                                  </linearGradient>
                                  <linearGradient id="paint1_linear_831_495" x1="74.5" y1="348.5" x2="200.5" y2="491.5" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--color-principal)" />
                                    <stop offset="1" stopColor="var(--color-principal-hover)" />
                                  </linearGradient>
                                  <linearGradient id="paint2_linear_831_495" x1="858" y1="556" x2="124" y2="547.5" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--color-principal)" />
                                    <stop offset="1" stopColor="var(--color-principal-hover)" />
                                  </linearGradient>
                                  <linearGradient id="paint3_linear_831_495" x1="538.317" y1="39.6792" x2="458.498" y2="102.746" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--color-principal-hover)" />
                                    <stop offset="1" stopColor="var(--color-principal)" />
                                  </linearGradient>
                                </defs>
                              </svg>

                              <p className="niveau">{this.calculeLevel(this.state.level[i].xp)}</p>

                              {/* <div className="leaderboardPlayerStatName">
                                NIVEAU
                              </div>
                              <div className="leaderboardPlayerStatValue">
                                1
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return rank;
              })()}
            </InfiniteScroll>
          </div>

          {(() => {
            if (this.state.levelsRole && this.state.levelsRole.length > 0) {
              return (<GainRolesLevels levelsRole={this.state.levelsRole} />)
            }
          })()}

        </div>

        {(() => {
          if (this.state.loading) return <LoadingFullPage error={this.state.errorLoading} />
        })()}
      </div>
    )
  }
}

export default Level;

