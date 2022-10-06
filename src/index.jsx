import React from "react";
import { render } from "react-dom";

import { App } from "./app/App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

render(<App />, document.getElementById('root'));

serviceWorkerRegistration.register();