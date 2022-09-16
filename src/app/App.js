// import logo from '../components/picture/logo.svg';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Navigation from "../components/navbar/navbar";
import { HomePage } from "../components/homepage/homepage";
import { Features } from "../components/features/features";
import Level from "../pages/level/level";
import Commandes from "../pages/commandes/commandes";
import Playlist from "../pages/playlist/playlist";
import infoPlaylist from "../pages/infoPlaylist/infoPlaylist";
import { ErreurPage } from "../pages/ErreurPage/ErreurPage";
import { Login } from "../pages/login/login";
import { TermsAndConditions } from "../pages/terms-and-conditions/terms-and-conditions";
import Dashboard from "../pages/dashboard/dashboard";
import Guild from "../pages/guild/guild";
import Demo from "../pages/demo/demo";
import Callback from "../components/callback/callback";
import Authenticate from '../components/Authenticate';
// import Test from "../components/sendEmbed/sendembed";

export const App = () => {

  //create randomColor but not dark or light
  let randomColor = () => {
    let color = "";
    let letters = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    if (color.substring(0, 2) === "00" || color.substring(0, 2) === "11") {
      randomColor();
    }
    return color;
  }

  let componentDidMount = () => {
    let r = document.getElementsByTagName("html")[0];

    if (Math.floor(Math.random() * 10) === 3) {
      r.style.setProperty('--color-principal', "#" + randomColor());
      r.style.setProperty('--color-principal-hover', "#" + randomColor());
    }

    let date = new Date();
    if (date.getMonth() === 9 && date.getDate() === 31) {
      let r = document.getElementsByTagName("html")[0];
      r.style.setProperty('--color-principal', '#FC4C02');
      r.style.setProperty('--color-principal-hover', '#D34509');
    }
    else if (date.getMonth() === 11 && (date.getDate() === 25 || date.getDate() === 24)) {
      let r = document.getElementsByTagName("html")[0];
      r.style.setProperty('--color-principal', '#ff0000');
      r.style.setProperty('--color-principal-hover', '#ec5353');
    }

    // this.updateLogin();
    fetch("https://backendbounsbot.herokuapp.com/discord").catch(error => console.log(error))
  }

  componentDidMount()

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <HomePage />
            <Features />
          </Route>

          <Route exact path="/commandes">
            <Commandes />
          </Route>

          <Route exact path="/level">
            <Level />
          </Route>
          <Route exact path="/demo">
            <Demo />
          </Route>
          <Route exact path="/playlist">
            <Playlist />
          </Route>
          <Route exact path="/playlist/:id" component={infoPlaylist}>
          </Route>
          <Authenticate exact path="/dashboard">
            <Dashboard />
          </Authenticate>
          {/* <Route exact path="/test">
            <Test />
          </Route> */}
          <Authenticate exact path="/dashboard/:id">
            <Route exact path="/dashboard/:id" component={Guild}>
            </Route>
          </Authenticate>
          <Route exact path="/login" >
            <Login />
          </Route>
          <Route exact path="/oauth/callback" >
            <Callback />
          </Route>
          <Route exact path="/terms-and-conditions" >
            <TermsAndConditions />
          </Route>
          <Route>
            <ErreurPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}