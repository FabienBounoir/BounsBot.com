// import logo from '../components/picture/logo.svg';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Navigation from "../components/navbar/navbar";
import { HomePage } from "../components/homepage/homepage";
import { Features } from "../components/features/features";
import { Commandes } from "../components/commandes/commandes";
import Level from "../components/level/level";
import Playlist from "../components/playlist/playlist";
import { ErreurPage } from "../components/ErreurPage/ErreurPage";
import { Login } from "../components/login/login";
import Dashboard from "../components/dashboard/dashboard";
import Guild from "../components/guild/guild";
import Demo from "../components/demo/demo";

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
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/dashboard/:id" component={Guild}>
            {/* <Guild /> */}
          </Route>
          <Route exact path="/login" >
            <Login />
          </Route>
          <Route>
            <ErreurPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}