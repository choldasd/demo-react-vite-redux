import axios from "axios";
import { ConfigService, StorageService } from "./";

let abortRequestController:any;
type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

const hit = async (_request:any) => {
  try {
    //Store currenrt time as expiry
    StorageService.setObject('epochTime',new Date().getTime())

    const apiBaseUrl = ConfigService.apiBaseUrl();
    let response = {};
    let _url = _request.externalUrl ? _request.url : apiBaseUrl + _request.url;
    let _authToken = null;

    if (_request.formData?.token) {
      _authToken = "Bearer " + _request.formData.token; 
    }else{
      _authToken = ConfigService.authorizationToken()
    }

    let _config:any = {
      headers: {
        "content-type": _request.isMultipart
          ? "multipart/form-data"
          : _request.externalContentType ? _request.externalContentType : "application/json",
        Authorization: _request.isAuthorized
          ? _authToken 
          : null,
      },
    };

    if (_request.params) {
      _config["params"] = _request.params;
    }

            // abort request
    if (_request.allowRequestCancellation) {
      if (abortRequestController) {
        abortRequestController.abort();
      }
      abortRequestController = new AbortController();
      _config["signal"] = abortRequestController.signal;
    }
      
    if (_request.method == "get") {
      response = await axios.get(_url, _config);
    } else {
      let method:Methods = _request?.method;      
      response = await axios[method](_url, _request.formData, _config);
    }
    return response;

  } catch (error:any) {
    if(error.code === "ERR_NETWORK"){
        console.log("ERR_NETWORK");
        throw new Error("Unable to process your request, please try again later.");
    }else if (error.response.status === 500) {
        throw new Error(error.response.data.message);
    } 
    throw new Error(error.message);
  }
};

export {
  hit,
};
