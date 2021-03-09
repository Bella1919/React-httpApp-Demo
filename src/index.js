import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
import logger from './services/logService';
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

logger.init();
//We use logger.init() to replace this part to logService component.
// Sentry.init({
//     dsn: "https://9c99d82404c74506bd70536aafdd7b1b@o545504.ingest.sentry.io/5667620",
//     integrations: [new Integrations.BrowserTracing()],
  
//     // We recommend adjusting this value in production, or using tracesSampler
//     // for finer control
//     tracesSampleRate: 0.8,
//   });

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
