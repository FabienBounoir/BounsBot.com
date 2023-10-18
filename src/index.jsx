import React from "react";
// import { render } from "react-dom";
import { createRoot } from 'react-dom/client';

import { App } from "./app/App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

serviceWorkerRegistration.register();