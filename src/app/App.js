// import logo from '../components/picture/logo.svg';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import { Navigation } from "../components/navbar/navbar";
import { HomePage } from "../components/homepage/homepage";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Route path="/">
          <HomePage />
        </Route>
      </BrowserRouter>

    
    </div>

  );
}

{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}