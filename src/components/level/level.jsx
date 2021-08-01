// import React from "react";
import "./_level.css";
import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
class Level extends Component {
  state = {
    level: []
  }

    componentDidMount() {
        let coucou = new URLSearchParams(window.location.search).get('id') || ""
        fetch('https://backendbounsbot.herokuapp.com/discord/'+ coucou)
        .then(response => response.json())
        .then((result) => {
            this.setState({level: result.DiscordLevel});
        })
        .catch(console.log)
    }

    render() {
      return (
        <div class="leaderboardglobal">
          <div class="top"><h1>LEVEL</h1><div class="search search-bar" data-v-7085cbe2=""></div></div>
          {(() => {
            const rank = [];
  
            for (let i = 0; i < this.state.level.length; i++) {
                rank.push(
                        <div class="leaderboardPlayersListContainer">
                      <div class="leaderboardPlayer">
                        <div class="leaderboardPlayerLeft">
                          <div class={i == 0 ? ("leaderboardRank premier") : (i == 1 ? ("leaderboardRank second") : (i == 2 ? ("leaderboardRank troisieme") : ("leaderboardRank")))}>
                            {i+1}
                          </div>
                          <div class="leaderboardPlayerIcon">
                            <img src={this.state.level[i].picture} />
                          </div>
                          <div class="leaderboardPlayerUsername">
                            {this.state.level[i].username}
                          </div>
                        </div>
                      <div class="leaderboardPlayerStats">
                        <div class="leaderboardPlayerStatBlock">
                          <div class="leaderboardPlayerStatName">
                            MESSAGES
                          </div>
                          <div class="leaderboardPlayerStatValue">
                            {this.state.level[i].nbMessage}
                          </div>
                        </div>
                      <div class="leaderboardPlayerStatBlock">
                      <div class="leaderboardPlayerStatName">
                        EXPERIENCE
                      </div>
                      <div class="leaderboardPlayerStatValue">
                        {this.state.level[i].xp}
                      </div>
                    </div>
                    <div class="leaderboardPlayerStat p37">
                      <div class="leaderboardPlayerStatText">
                        <div class="leaderboardPlayerStatName">
                        NIVEAU
                        </div>
                      <div class="leaderboardPlayerStatValue">
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

