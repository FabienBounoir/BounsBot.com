import "./_infoPlaylist.css";
import React, { Component } from 'react'
import backArrow from "../picture/backArrow.png";
import { Card } from 'react-bootstrap/'
import { Spinner } from 'react-bootstrap/'

class infoPlaylist extends Component {
    state = {
        playlistList: [],
        load: true
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let id = this.props.match.params.id
        let url = "https://backendbounsbot.herokuapp.com/playlist/"

        fetch(url + id)
        .then(response => response.json())
        .then((result) => {
            this.setState({
                playlistList: result.playlist,
                load: false
            });

        })
        .catch(console.log)
    };

    render() {
        return (
            <div className="leaderboardglobal">
            <div className="top"><a href="/playlist" style={{"textDecoration": "none" }}> {this.state.playlistList[0] ? (<h1 id="titre" >⬅ {this.state.playlistList[0].nom[0].toUpperCase()+this.state.playlistList[0].nom.slice(1)}</h1>):(<img className="picto" alt='logo' width="40" height="40" src={backArrow} ></img>)}</a></div>

            <div >
                {(() => {
                    var playlistElement = [];

                    if(this.state.playlistList.length !== 0)
                    {
                        for (let i = 0; i < this.state.playlistList[0].musique.length; i++) {
                            playlistElement.push(
                            <Card key={ i } className="cardTemplate" style={{ width: '18rem', backgroundColor: "#181818", color:'white', margin: "10px" }}>
                            <a href={this.state.playlistList[0].musique[i].link} target="_blank" rel="noreferrer" style={{"textDecoration": "none" }}>
                                <Card.Img variant="top" src={ this.state.playlistList[0].musique[i].image } />
                                <Card.Body>
                                <Card.Title style={{ color: '#0cab34', fontSize: '150%' }}>{ this.state.playlistList[0].musique[i].name }</Card.Title>
                                </Card.Body>
                            </a>
                            </Card>);
                        }

                        return <div className="renderPLaylist">{playlistElement}</div>;
                    }
                    else if(this.state.load)
                    {
                        return <div><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /></div>
                    }
                    else
                    {
                        return <h1 style={{paddingTop:"50px"}}>Cette playlist est introuvable</h1>
                    }

                })()}
            </div>
            </div>
        )
    }
}

export default infoPlaylist;