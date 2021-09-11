// import logo from '../components/picture/logo.svg';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { Navigation } from "../components/navbar/navbar";
import { HomePage } from "../components/homepage/homepage";
import { Features } from "../components/features/features";
import { Commandes } from "../components/commandes/commandes";
import Level from "../components/level/level";
import { ErreurPage } from "../components/ErreurPage/ErreurPage";
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
          <Route>
            <ErreurPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}