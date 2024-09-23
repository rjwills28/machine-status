import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AppScreen, { AppPublic } from "./app";
import reportWebVitals from "./reportWebVitals";
import { FileProvider, OutlineProvider } from "@diamondlightsource/cs-web-lib";

/*
Show one display on initial page load in the DynamicPage
by setting the initialPageState for the FileProvider context
*/
const init_state = {
  opi: {
    path: "../dls/machineStatusClient/Pday_web.bob",
    macros: {},
    defaultProtocol: "ca"
  }
};

const cycleConfigFile: string = import.meta.env.VITE_CYCLE_CONFIG_FILE ?? "";
if (import.meta.env.VITE_BUILD_TARGET === "screen") {
  if (cycleConfigFile === "") {
    errorPage(
      new Error("VITE_CYCLE_CONFIG_FILE not defined for 'screen' target ")
    );
  } else {
    fetch(cycleConfigFile)
      .then(response => response.json())
      .then(jsonObj => loadScreenApp(jsonObj))
      .catch(err => errorPage(err));
  }
} else {
  loadPublicApp();
}

function loadScreenApp(jsonObj: JSON): void {
  ReactDOM.render(
    <Router>
      <FileProvider>
        <OutlineProvider>
          <AppScreen jsonObj={jsonObj} />
        </OutlineProvider>
      </FileProvider>
    </Router>,
    document.getElementById("root")
  );
}

function loadPublicApp(): void {
  ReactDOM.render(
    <Router>
      <FileProvider initialPageState={init_state}>
        <OutlineProvider>
          <AppPublic />
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
