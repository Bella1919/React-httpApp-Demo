import axios from 'axios';
import {toast} from 'react-toastify';
import logger from './logService';
// import * as Sentry from "@sentry/react";

axios.interceptors.response.use( null,error=>{
    const expectedError = error.response && error.response.status >=400  && error.response.status <500;
    //!expectedError = unexpectedError.
    if(!expectedError){
        logger.log(error);
        //We use logger.log(error) to replace this part to logService component.
        // Sentry.captureException(error);

    //   console.log("Logging the error",error); 
      //toast its a new alert. The .error is the style of toast.
      toast.error("An unexpected error occurred");
    };
    return Promise.reject(error);
  });

  export default {
      get:axios.get,
      post:axios.post,
      put:axios.put,
      delete:axios.delete
  };