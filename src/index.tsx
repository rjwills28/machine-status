import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App, { AppWeb } from "./app";
import reportWebVitals from "./reportWebVitals";
import { FileProvider, OutlineProvider } from "@dls-controls/cs-web-lib";

/*
Show one display on initial page load in the DynamicPage
by setting the initialPageState for the FileProvider context
*/
const init_state = {
  opi: {
    path: "../dls/machineStatusClient/Pday_web.opi",
    macros: {},
    defaultProtocol: "ca"
  }
};

const cycleConfigFile: string = process.env.REACT_APP_CYCLE_CONFIG_FILE ?? "";
if (process.env.REACT_APP_BUILD_TARGET === "display") {
  if (cycleConfigFile === "") {
    errorPage(
      new Error("REACT_APP_CYCLE_CONFIG_FILE not defined for 'display' target ")
    );
  } else {
    fetch(cycleConfigFile)
      .then(response => response.json())
      .then(jsonObj => loadDisplayApp(jsonObj))
      .catch(err => errorPage(err));
  }
} else {
  loadWebApp();
}

function loadDisplayApp(jsonObj: JSON): void {
  ReactDOM.render(
    <Router>
      <FileProvider>
        <OutlineProvider>
          <App jsonObj={jsonObj} />
        </OutlineProvider>
      </FileProvider>
    </Router>,
    document.getElementById("root")
  );
}

function loadWebApp(): void {
  ReactDOM.render(
    <Router>
      <FileProvider initialPageState={init_state}>
        <OutlineProvider>
          <AppWeb />
        </OutlineProvider>
      </FileProvider>
    </Router>,
    document.getElementById("root")
  );
}

function errorPage(err: Error): void {
  ReactDOM.render(
    <div className="Error">
      <p>{err.message}</p>
    </div>,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
