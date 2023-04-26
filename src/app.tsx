import React, { Component, Profiler } from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import log, { LogLevelDesc } from "loglevel";
import "./app.css";

import {
  EmbeddedDisplay,
  onRenderCallback,
  RelativePosition,
  store
} from "@dls-controls/cs-web-lib";
import { Header } from "./components/Header/header";
import { Footer } from "./components/Footer/footer";
import Ajv from "ajv";
import { LoadI09SDM002, LoadI09SDM005 } from "./customDisplays/i09/sdm";

log.setLevel((process.env.REACT_APP_LOG_LEVEL as LogLevelDesc) ?? "info");

let jsonData: any;
let cycleNum = 0;

type PropsPath = {
  pathin: string;
};

const LoadEmbeddedDirect = (props: PropsPath): JSX.Element => {
  const path = String(props.pathin) + ".json";
  return (
    <EmbeddedDisplay
      position={new RelativePosition()}
      file={{
        path,
        defaultProtocol: "pva",
        macros: {}
      }}
    />
  );
};

function parseCycleConfig(jsonData: JSON): string {
  if (validator(jsonData)) {
    return "";
  } else {
    let rtnStr = "";
    const errors = validator.errors;
    if (errors) {
      for (let i = 0; i < errors.length; i++) {
        const err = errors[i];
        // Add instance
        rtnStr = rtnStr + err.instancePath + ": ";
        rtnStr = rtnStr + err.message;
      }
    } else {
      rtnStr = rtnStr + "Unknown error";
    }
    return rtnStr;
  }
}

const schema = {
  type: "object",
  properties: {
    screens: {
      type: "array",
      items: {
        type: "object",
        properties: {
          redirect_url: { type: "string" },
          display_url: { type: "string" },
          display_title: { type: "string" },
          delay_seconds: { type: "number" }
        },
        required: [
          "redirect_url",
          "display_url",
          "display_title",
          "delay_seconds"
        ]
      }
    }
  },
  required: ["screens"]
};

const ajv = new Ajv();
const validator = ajv.compile(schema);

const App: React.FC<{ jsonObj: JSON }> = ({ jsonObj }): JSX.Element => {
  // Each instance of context provider allows child components to access
  // the properties on the object placed in value
  // Profiler sends render information whenever child components rerender
  const errorStatus = parseCycleConfig(jsonObj);
  if (errorStatus.length !== 0) {
    throw new Error("Error parsing json file... " + errorStatus);
  }
  jsonData = jsonObj;

  return (
    <Provider store={store}>
      <div className="App">
        <Profiler id="Dynamic Page Profiler" onRender={onRenderCallback}>
          <Switch>
            <Route exact path="/" component={LoadView} />
            <Route path="/i09-sdm002">
              <LoadI09SDM002 pathin={"/json/i09_sdm002"} />
            </Route>
            <Route path="/i09-sdm005">
              <LoadI09SDM005 pathin={"/json/i09_sdm002"} />
            </Route>
            <Route path="*" component={LoadRedirectView} />
          </Switch>
        </Profiler>
      </div>
    </Provider>
  );
};

export const AppWeb: React.FC = (): JSX.Element => (
  // Each instance of context provider allows child components to access
  // the properties on the object placed in value
  // Profiler sends render information whenever child components rerender
  <Provider store={store}>
    <div className="AppWeb">
      <Header />
      <LoadEmbeddedDirect pathin={"/json/machineStatus"} />
      <Footer />
    </div>
  </Provider>
);

const LoadRedirectView = (): JSX.Element => {
  const current = cycleNum;
  cycleNum = cycleNum + 1;
  if (cycleNum >= jsonData.screens.length) {
    cycleNum = 0;
  }
  return (
    <RedirectAfterTimeout
      filepath={jsonData.screens[current].redirect_url}
      pagename={jsonData.screens[current].display_title}
      delayTime={jsonData.screens[current].delay_seconds}
    />
  );
};

const LoadView = (): JSX.Element => {
  return (
    <Redirect exact from="/" to={jsonData.screens[cycleNum].display_url} />
  );
};

type RedirectProps = {
  filepath: string;
  pagename: string;
  delayTime: number;
};

class RedirectAfterTimeout extends Component<RedirectProps> {
  private id: any;

  state = {
    redirect: false
  };

  componentDidMount() {
    this.id = setTimeout(
      () => this.setState({ redirect: true }),
      this.props.delayTime * 1000
    );
    document.title = this.props.pagename;
  }

  componentWillUnmount() {
    clearTimeout(this.id);
    this.setState({ redirect: false });
  }
  render() {
    return this.state.redirect ? (
      <Redirect to={"/"} />
    ) : (
      <LoadEmbeddedDirect pathin={this.props.filepath} />
    );
  }
}

export default App;
