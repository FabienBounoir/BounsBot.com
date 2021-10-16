import "./_guild.css";
import React, { Component } from 'react'
import logo from "../picture/logo5.svg";
import { Form } from 'react-bootstrap/'
import { Spinner } from 'react-bootstrap/'

class Guild extends Component {
    state = {
        user: {},
        guilds: [],
    }

    componentDidMount() 
    {
        this.getData();
    }
    
    getData = () => {
        let id = this.props.match.params.id
        //let url = "https://backendbounsbot.herokuapp.com/guild/"

        //dev
        // let url = "http://localhost:3001/guild/"
        let url = "https://backendbounsbot.herokuapp.com/guild/"

        fetch(url + id)
        .then(response => response.json())
        .then((result) => {
            console.log(result)
            this.setState({
                guildInfo: result.guild
            });
        })
        .catch(console.log)
    };

    render() {
        return (
            <div className="Dashboard">
                <h1 className="titleDashboard">Information de la guild</h1>

                {(() => {
                var rank = [];
                if(this.state.guildInfo)
                {
                    rank.push(<div className='componentGuild'>
                    <div className="guildModule">
                        <div className="top">
                            <img className="picto" alt='logo' width="48" height="48" src={logo} ></img>
                            {/* <button value="true" role="checkbox" type="button" aria-checked="true" aria-label="checked" class="xb4a75-0 hSePco buttonCheck"></button> */}
                            {/* <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked/> */}
                            <Form.Check type="switch" id="custom-switch success" defaultChecked={this.state.guildInfo[0].heyreaction}/>
                        </div>
                        <h5 class="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Réactions</h5>
                        <div>Laissez vos membres obtenir des rôles en réagissant à un message</div>
                    </div>
                    <div className="guildModule">
                        <div className="top">
                            <img className="picto" alt='logo' width="48" height="48" src={logo} ></img>
                            {/* <button value="true" role="checkbox" type="button" aria-checked="true" aria-label="checked" class="xb4a75-0 hSePco buttonCheck"></button> */}
                            {/* <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked/> */}
                            <Form.Check type="switch" id="custom-switch success" defaultChecked={this.state.guildInfo[0].musique}/>
                        </div>
                        <h5 class="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Musique</h5>
                        <div>Laissez vos membres obtenir des rôles en réagissant à un message</div>
                    </div>
                    <div className="guildModule">
                        <div className="top">
                            <img className="picto" alt='logo' width="48" height="48" src={logo} ></img>
                            {/* <button value="true" role="checkbox" type="button" aria-checked="true" aria-label="checked" class="xb4a75-0 hSePco buttonCheck"></button> */}
                            {/* <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked/> */}
                            <Form.Check type="switch" id="custom-switch success" defaultChecked={this.state.guildInfo[0].playlist}/>
                        </div>
                        <h5 class="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Playlist</h5>
                        <div>Laissez vos membres obtenir des rôles en réagissant à un message</div>
                    </div>
                    <div className="guildModule">
                        <div className="top">
                            <img className="picto" alt='logo' width="48" height="48" src={logo} ></img>
                            {/* <button value="true" role="checkbox" type="button" aria-checked="true" aria-label="checked" class="xb4a75-0 hSePco buttonCheck"></button> */}
                            {/* <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked/> */}
                            <Form.Check type="switch" id="custom-switch success" defaultChecked={this.state.guildInfo[0].radio}/>
                        </div>
                        <h5 class="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Radio</h5>
                        <div>Laissez vos membres obtenir des rôles en réagissant à un message</div>
                    </div>
                    <div className="guildModule">
                        <div className="top">
                            <img className="picto" alt='logo' width="48" height="48" src={logo} ></img>
                            {/* <button value="true" role="checkbox" type="button" aria-checked="true" aria-label="checked" class="xb4a75-0 hSePco buttonCheck"></button> */}
                            {/* <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked/> */}
                            <Form.Check type="switch" id="custom-switch success" defaultChecked={this.state.guildInfo[0].rename}/>
                        </div>
                        <h5 class="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Rename</h5>
                        <div>Laissez vos membres obtenir des rôles en réagissant à un message</div>
                    </div>
                    <div className="guildModule">
                        <div className="top">
                            <img className="picto" alt='logo' width="48" height="48" src={logo} ></img>
                            {/* <button value="true" role="checkbox" type="button" aria-checked="true" aria-label="checked" class="xb4a75-0 hSePco buttonCheck"></button> */}
                            {/* <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked/> */}
                            <Form.Check type="switch" id="custom-switch success" defaultChecked={this.state.guildInfo[0].sheesh}/>
                        </div>
                        <h5 class="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Sheesh</h5>
                        <div>Laissez vos membres obtenir des rôles en réagissant à un message</div>
                    </div>
                    <div className="guildModule">
                        <div className="top">
                            <img className="picto" alt='logo' width="48" height="48" src={logo} ></img>
                            {/* <button value="true" role="checkbox" type="button" aria-checked="true" aria-label="checked" class="xb4a75-0 hSePco buttonCheck"></button> */}
                            {/* <input type='checkbox' className='custom-control-input' id='customSwitchesChecked' defaultChecked/> */}
                            <Form.Check type="switch" id="custom-switch success" defaultChecked={this.state.guildInfo[0].fun}/>
                        </div>
                        <h5 class="hrnh5k-0 eeKdki sc-1wkjbe7-8 GoZzi">Fun</h5>
                        <div>Laissez vos membres obtenir des rôles en réagissant à un message</div>
                    </div>
                </div>);
                }
                else
                {
                    rank.push(<div><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /><Spinner animation="grow" variant="success" /></div>)
                }
            return rank;
          })()}
        </div>
        )
    }
}

export default Guild;
