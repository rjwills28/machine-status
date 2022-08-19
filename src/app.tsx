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

function parseCycleConfig(json: any): string {
  if (json.screens == null) {
    return "JSON file does not contain a 'screens' tag. ";
  } else {
    for (const s in json.screens) {
      const screenIndex = Number(s) + 1;
      if (json.screens[s].filepath == null) {
        return "screen " + screenIndex + " is missing 'filepath' parameter";
      }
      if (json.screens[s].url == null) {
        return "screen " + screenIndex + " is missing 'url' parameter";
      }
      if (json.screens[s].pagename == null) {
        return "screen " + screenIndex + " is missing 'pagename' parameter";
      }
      if (json.screens[s].delayTime == null) {
        return "screen " + screenIndex + " is missing 'delayTime' parameter";
      }
    }
    return "";
  }
}

const App: React.FC<{ jsonObj: JSON }> = ({ jsonObj }): JSX.Element => {
  // Each instance of context provider allows child components to access
  // the properties on the object placed in value
  // Profiler sends render information whenever child components rerender
  jsonData = jsonObj;
  const errorStatus = parseCycleConfig(jsonData);
  if (errorStatus.length !== 0) {
    throw new Error("Error parsing json file " + errorStatus);
  }
  return (
    <Provider store={store}>
      <div className="App">
        <Profiler id="Dynamic Page Profiler" onRender={onRenderCallback}>
          <Switch>
            <Route exact path="/" component={LoadView} />
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
      filepath={jsonData.screens[current].filepath}
      pagename={jsonData.screens[current].pagename}
      delayTime={jsonData.screens[current].delayTime}
    />
  );
};

const LoadView = (): JSX.Element => {
  return <Redirect exact from="/" to={jsonData.screens[cycleNum].url} />;
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
