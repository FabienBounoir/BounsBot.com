// import React from "react";
import "./_level.css";
import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-bootstrap/'

class Level extends Component {
  state = {
    level: [],
    page: 0,
    hasMoreData: true
  }

    componentDidMount() {
      this.getData();
    }

    getData = () => {
      let id = new URLSearchParams(window.location.search).get('id') || ""
        let twitch = new URLSearchParams(window.location.search).get('twitch') != null

        //production
        let url = twitch ? ("https://backendbounsbot.herokuapp.com/twitch/") : (`https://backendbounsbot.herokuapp.com/Discord/`)

        //dev
        // let url = twitch ? ("http://localhost:3001/twitch/") : (`http://localhost:3001/Discord/`)

        fetch(url + id + `?page=${this.state.page}`)
        .then(response => response.json())
        .then((result) => {
            this.setState({
              level: this.state.level.concat(result.rank), 
              page: this.state.page + 1, 
              hasMoreData: result.rank.length !== 0
            });
        })
        .catch(console.log)


    };

    render() {
      return (
        <div className="leaderboardglobal">
          <div className="top"><h1>LEVEL</h1><div className="search search-bar" data-v-7085cbe2=""></div></div>
          <InfiniteScroll
          dataLength={this.state.level.length}
          next={this.getData}
          hasMore={this.state.hasMoreData}
          loader={<div><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /></div>}
        >

          {(() => {
            var rank = [];

            for (let i = 0; i < this.state.level.length; i++) {
                rank.push(
                    <div key={this.state.level[i].identifiant} className="leaderboardPlayersListContainer">
                      <div className="leaderboardPlayer">
                        <div className="leaderboardPlayerLeft">
                          <div className={i === 0 ? ("leaderboardRank premier") : (i === 1 ? ("leaderboardRank second") : (i === 2 ? ("leaderboardRank troisieme") : ("leaderboardRank")))}>
                            {i+1}
                          </div>
                          <div className="leaderboardPlayerIcon">
                          <img src={this.state.level[i].picture} onError={(e)=>{e.target.outerHTML=`<img src='https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png'/>`}} alt=""/>
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
          </InfiniteScroll>
        </div>
      )
    }
}

export default Level;

