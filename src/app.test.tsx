import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App, { AppWeb } from "./app";

it("display app renders without crashing", (): void => {
  const div = document.createElement("div");
  const jsonObj = JSON.parse(`
  {
    "screens" : [
      {
        "redirect_url" : "/json/ms_day",
        "display_url" : "/day",
        "display_title" : "Day View",
        "delay_seconds": 5
      }
    ]
  }`);
  ReactDOM.render(
    <Router>
      <App jsonObj={jsonObj} />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("web app renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <AppWeb />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
