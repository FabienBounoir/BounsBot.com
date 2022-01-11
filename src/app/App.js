// import logo from '../components/picture/logo.svg';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Navigation from "../components/navbar/navbar";
import { HomePage } from "../components/homepage/homepage";
import { Features } from "../components/features/features";
import { Commandes } from "../components/commandes/commandes";
import Level from "../components/level/level";
import Playlist from "../components/playlist/playlist";
import infoPlaylist from "../components/infoPlaylist/infoPlaylist";
import { ErreurPage } from "../components/ErreurPage/ErreurPage";
import { Login } from "../components/login/login";
import { TermsAndConditions } from "../components/terms-and-conditions/terms-and-conditions";
import Dashboard from "../components/dashboard/dashboard";
import Guild from "../components/guild/guild";
import Demo from "../components/demo/demo";
// import Test from "../components/sendEmbed/sendembed";

export const App = () => {
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
            <Level/>
          </Route>
          <Route exact path="/demo">
            <Demo />
          </Route>
          <Route exact path="/playlist">
            <Playlist />
          </Route>
          <Route exact path="/playlist/:id" component={infoPlaylist}>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          {/* <Route exact path="/test">
            <Test />
          </Route> */}
          <Route exact path="/dashboard/:id" component={Guild}>
          </Route>
          <Route exact path="/login" >
            <Login />
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