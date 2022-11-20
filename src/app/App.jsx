// import logo from '../components/picture/logo.svg';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Navigation from "../components/navbar/navbar";

import { HomePage } from "../components/homepage/homepage";
import Footer from '../components/footer/footer';

// import { Features } from "../components/oldFeatures/features";
// import Playlist from "../pages/playlist/playlist";
// import infoPlaylist from "../pages/infoPlaylist/infoPlaylist";
import { Features } from "../components/features/features";
import Level from "../pages/level/level";
import Commandes from "../pages/commandes/commandes";
import { ErreurPage } from "../pages/ErreurPage/ErreurPage";
import { PrivacyBot } from "../pages/privacyBot/privacy";
import { Login } from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";
// import Guild from "../pages/guild/guild";

import Demo from "../pages/demo/demo";
import Callback from "../components/callback/callback";
import Authenticate from '../components/Authenticate';
import { Bio } from "../pages/bio/bio";
import { TermsBot } from "../pages/termsBot/terms";
import ScrollToTop from "../utils/ScrollToTop"

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
    if (date.getMonth() === 9) { //&& date.getDate() === 31
      let r = document.getElementsByTagName("html")[0];
      r.style.setProperty('--color-principal', '#ff5e00');
      r.style.setProperty('--color-principal-hover', '#702a00');
    }
    else if (date.getMonth() === 11 && (date.getDate() === 25 || date.getDate() === 24)) {
      let r = document.getElementsByTagName("html")[0];
      r.style.setProperty('--color-principal', '#ff0000');
      r.style.setProperty('--color-principal-hover', '#ec5353');
    }
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
            <Footer />
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
          {/* <Route exact path="/playlist">
            <Playlist />
          </Route>
          <Route exact path="/playlist/:id" component={infoPlaylist}>
          </Route> */}
          <Authenticate exact path="/dashboard">
            <Dashboard />
          </Authenticate>
          {/* <Authenticate exact path="/dashboard/:id/:type">
            <Route exact path="/dashboard/:id" component={Guild}>
            </Route>
          </Authenticate> */}

          <Authenticate exact path="/dashboard/:id/:typeconfig">
            <Route exact path="/dashboard/:id/:typeconfig" component={Dashboard}>
            </Route>
          </Authenticate>

          <Route exact path="/login" >
            <Login />
          </Route>
          <Route exact path="/bot/privacy" >
            <ScrollToTop>
              <PrivacyBot />
              <Footer />
            </ScrollToTop>
          </Route>
          <Route exact path="/a-propos" >
            <ScrollToTop>
              <Bio />
              <Footer />
            </ScrollToTop>
          </Route>
          <Route exact path="/bot/terms" >
            <ScrollToTop>
              <TermsBot />
              <Footer />
            </ScrollToTop>
          </Route>
          <Route exact path="/oauth/callback" >
            <Callback />
          </Route>
          <Route>
            <ErreurPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}