import "./_infoPlaylist.css";
import React, { Component } from 'react'
import { Card } from 'react-bootstrap/'
import Loading from "../../components/loading/loading.jsx";

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
        // let url = "https://backendbounsbot.herokuapp.com/playlist/"
        let url = "https://api.bounsbot.com/playlist/"

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
            <div className="playlist_container">
                <div className="top"><a href="/playlist" style={{ "textDecoration": "none" }}> <h1 id="titre" >⬅ {this.state.playlistList[0]?.nom ? this.state.playlistList[0]?.nom[0]?.toUpperCase() + this.state.playlistList[0]?.nom?.slice(1) : ""}</h1></a></div>

                <div >
                    {(() => {
                        var playlistElement = [];

                        if (this.state.playlistList.length !== 0) {
                            for (let i = 0; i < this.state.playlistList[0].musique.length; i++) {
                                playlistElement.push(
                                    <Card key={i} className="cardTemplate" style={{ width: '18rem', backgroundColor: "#181818", color: 'white', margin: "10px auto", borderRadius: "10px" }}>
                                        <a href={this.state.playlistList[0].musique[i].link} target="_blank" rel="noreferrer" style={{ "textDecoration": "none" }}>
                                            <Card.Img loading="lazy" variant="top" src={this.state.playlistList[0].musique[i].image} style={{ borderRadius: "10px" }} />
                                            <Card.Body>
                                                <Card.Title style={{ color: 'var(--color-principal)', fontSize: '150%' }}>{this.state.playlistList[0].musique[i].name}</Card.Title>
                                            </Card.Body>
                                        </a>
                                    </Card>);
                            }

                            return <div className="renderPlaylist">{playlistElement}</div>;
                        }
                        else if (this.state.load) {
                            return <Loading />
                        }
                        else {
                            return <h1 style={{ paddingTop: "50px" }}>Cette playlist est introuvable</h1>
                        }

                    })()}
                </div>
            </div>
        )
    }
}

export default infoPlaylist;