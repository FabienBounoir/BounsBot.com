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
    hasMoreData: true,
    recherche: false
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let id = new URLSearchParams(window.location.search).get('id') || ""

    //production
    let url = "https://backendbounsbot.herokuapp.com/playlist/"

    //dev
    // let url = `http://localhost:3001/playlist/`

    fetch(url + id + `?page=${this.state.page}`)
      .then(response => response.json())
      .then((result) => {
        // console.log(result)
        this.setState({
          playlistList: this.state.playlistList.concat(result.playlist),
          page: this.state.page + 1,
          hasMoreData: result.playlist.length !== 0,
          recherche: false
        });
      })
      .catch(console.log)
  };

  _handleKeyDown = (e) => {

    if(e.key === "Enter")
    {
      let message = document.getElementById('PLaylistSearch').value;

      let url = "https://backendbounsbot.herokuapp.com/playlist/search/"
      
      // let url = `http://localhost:3001/playlist/search/`

      fetch(url + message)
        .then(response => response.json())
        .then((result) => {
          this.setState({
            playlistList: result.playlist,
            recherche: true
          });
        })
        .catch(console.log)
    }
  }

  render() {
    return (
      <div className="leaderboardglobal">
        <div className="top"><a href="./playlist" style={{"textDecoration": "none" }}><h1 id="titre" >PLAYLIST</h1></a><div className="search search-bar" data-v-7085cbe2=""><Form.Control type="text" id="PLaylistSearch" onKeyDown={this._handleKeyDown}  placeholder="Recherche Playlist" /></div></div>

        <div >
          {(() => {
            var playlistElement = [];
            
            if(this.state.playlistList.length == 1)
            {
              document.getElementById('titre').textContent = this.state.playlistList[0].nom[0].toUpperCase()+this.state.playlistList[0].nom.slice(1)
              for (let i = 0; i < this.state.playlistList[0].musique.length; i++) {
                playlistElement.push(
                    <Card key={ i } className="cardTemplate" style={{ width: '18rem', backgroundColor: "#181818", color:'white', margin: "10px" }}>
                      <a href={this.state.playlistList[0].musique[i].link} target="_blank" style={{"textDecoration": "none" }}>
                        <Card.Img variant="top" src={ this.state.playlistList[0].musique[i].image } />
                        <Card.Body>
                          <Card.Title style={{ color: '#0cab34', fontSize: '150%' }}>{ this.state.playlistList[0].musique[i].name }</Card.Title>
                        </Card.Body>
                      </a>
                    </Card>
                    );
                  }

                  return <div className="renderPLaylist">{playlistElement}</div>;
            }
            else if(this.state.playlistList.length == 0 && this.state.recherche)
            {
                return <h1>Aucune playlist sous ce nom</h1>
            }
            else
            {
              for (let i = 0; i < this.state.playlistList.length; i++) {

                playlistElement.push(
                      <Card key={ i } className="cardTemplate" style={{ width: '18rem', backgroundColor: "#181818", color:'white', margin: "10px" }}>
                        <a href={"./playlist?id=" + this.state.playlistList[i].nom} style={{"textDecoration": "none" }}>
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
                          </a>
                      </Card>
                    );
                  }
                  return <InfiniteScroll dataLength={this.state.playlistList.length} next={this.getData} hasMore={this.state.hasMoreData} loader={<div><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /></div>}><div className="renderPLaylist">{playlistElement}</div></InfiniteScroll>;
            }
              })()}
        </div>
      </div>
    )
  }
}

export default Playlist;

