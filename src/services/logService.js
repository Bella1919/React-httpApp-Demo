import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init(){
    Sentry.init({
        dsn: "https://9c99d82404c74506bd70536aafdd7b1b@o545504.ingest.sentry.io/5667620",
        integrations: [new Integrations.BrowserTracing()],
      
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 0.8,
      });
    
}

function log(error){
    Sentry.captureException(error);
}

export default {
    init,
    log
}