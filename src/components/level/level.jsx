// import React from "react";
import "./_level.css";
import React, { Component } from 'react'
class Level extends Component {
  state = {
    level: []
  }

    componentDidMount() {
        let id = new URLSearchParams(window.location.search).get('id') || ""
        let twitch = new URLSearchParams(window.location.search).get('twitch') != null
        console.log(twitch)
        let url = twitch ? ("https://backendbounsbot.herokuapp.com/twitch/") : ("https://backendbounsbot.herokuapp.com/Discord/")

        fetch(url + id)
        .then(response => response.json())
        .then((result) => {
            this.setState({level: result.rank});
        })
        .catch(console.log)
    }

    render() {
      return (
        <div className="leaderboardglobal">
          <div className="top"><h1>LEVEL</h1><div className="search search-bar" data-v-7085cbe2=""></div></div>
          {(() => {
            const rank = [];
  
            for (let i = 0; i < this.state.level.length; i++) {
                rank.push(
                        <div key={this.state.level[i].identifiant} className="leaderboardPlayersListContainer">
                      <div className="leaderboardPlayer">
                        <div className="leaderboardPlayerLeft">
                          <div className={i === 0 ? ("leaderboardRank premier") : (i === 1 ? ("leaderboardRank second") : (i === 2 ? ("leaderboardRank troisieme") : ("leaderboardRank")))}>
                            {i+1}
                          </div>
                          <div className="leaderboardPlayerIcon">
                          <img src={this.state.level[i].picture} onError={(e)=>{console.log(e.target.style); e.target.outerHTML="<img src=''/>"}}/>
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
                            {this.state.level[i].nbMessage}
                          </div>
                        </div>
                      <div className="leaderboardPlayerStatBlock">
                      <div className="leaderboardPlayerStatName">
                        EXPERIENCE
                      </div>
                      <div className="leaderboardPlayerStatValue">
                        {this.state.level[i].xp}
                      </div>
                    </div>
                    <div className="leaderboardPlayerStat">
                      <div className="leaderboardPlayerStatText">
                        <div className="leaderboardPlayerStatName">
                        NIVEAU
                        </div>
                      <div className="leaderboardPlayerStatValue">
                        1
                      </div>
                    </div>
                    </div>
                    </div>
                  </div>
                  </div>
                );
            }
  
            return rank;
          })()}
        </div>
      )
    }
}

export default Level;

