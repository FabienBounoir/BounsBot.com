// import React from "react";
import "./_playlist.css";
import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-bootstrap/'
import { Form, Card, ListGroup, ListGroupItem } from 'react-bootstrap/'

class Playlist extends Component {
  state = {
    playlistList: [],
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
    let url = "https://backendbounsbot.herokuapp.com/playlist/"

    //dev
    // let url = twitch ? ("http://localhost:3001/twitch/") : (`http://localhost:3001/Discord/`)

    fetch(url + id + `?page=${this.state.page}`)
      .then(response => response.json())
      .then((result) => {
        console.log(result)
        this.setState({
          playlistList: this.state.playlistList.concat(result.playlist),
          // page: this.state.page + 1,
          // hasMoreData: result.rank.length !== 0
        });
      })
      .catch(console.log)
  };

  render() {
    return (
      <div className="leaderboardglobal">
        <div className="top"><h1>PLAYLIST</h1><div className="search search-bar" data-v-7085cbe2=""><Form.Control type="text" placeholder="Recherche Playlist" /></div></div>

        <div className="renderPLaylist">
          {(() => {
            var playlistElement = [];

            console.log(this.state.playlistList.length)

            for (let i = 0; i < this.state.playlistList.length; i++) {
              console.log("console: " + i)
              playlistElement.push(
                  <a href={"./playlist?id=" + this.state.playlistList[i].nom} style={{"textDecoration": "none" }}>
                    <Card className="cardTemplate" style={{ width: '18rem', backgroundColor: "#181818", color:'white', margin: "10px" }}>
                      <Card.Img variant="top" src="https://media.discordapp.net/attachments/886573195715575858/889935572653731860/logo-printemps.png" />
                      <Card.Body>
                        <Card.Title style={{ color: '#0cab34', fontSize: '150%' }}>{ this.state.playlistList[i].nom[0].toUpperCase() }{ this.state.playlistList[i].nom.slice(1) }</Card.Title>
                        {/* <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text> */}
                        </Card.Body>
                        <ListGroup style={{"borderRadius": "5px" }}>
                          <ListGroupItem style={{backgroundColor: "#0cab34" }} >{ this.state.playlistList[i].ownerName }</ListGroupItem>
                          <ListGroupItem style={{backgroundColor: "#0cab34" }} >{ this.state.playlistList[i].musique.length } musiques</ListGroupItem>
                        </ListGroup>
                    </Card>
                  </a>
                  );
                }
                console.log(playlistElement)
                return playlistElement;
              })()}
        </div>
      </div>
    )
  }
}

export default Playlist;

