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

const cycleConfigFile: string = process.env.REACT_APP_CYCLE_CONFIG ?? "";

const request = new XMLHttpRequest();
request.open("GET", cycleConfigFile, false);
request.send(null);
const jsonData: { screens: CycleConfig[] } = JSON.parse(request.responseText);

interface CycleConfig {
  filepath: string;
  url: string;
  pagename: string;
  delayTime: number;
}

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

const App: React.FC = (): JSX.Element => {
  // Each instance of context provider allows child components to access
  // the properties on the object placed in value
  // Profiler sends render information whenever child components rerender
  return (
    <Provider store={store}>
      <div className="App">
        <Profiler id="Dynamic Page Profiler" onRender={onRenderCallback}>
          <Switch>
            <Redirect exact from="/" to={jsonData.screens[cycleNum].url} />
            <Route path="/refresh" component={TempView} />
            <Route path="*" component={RedirectAfterTimeout} />
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

class RedirectAfterTimeout extends Component {
  private id: any;

  state = {
    redirect: false
  };

  componentDidMount() {
    this.id = setTimeout(
      () => this.setState({ redirect: true }),
      jsonData.screens[cycleNum].delayTime * 1000
    );
    document.title = jsonData.screens[cycleNum].pagename;
    cycleNum = cycleNum + 1;
  }

  componentWillUnmount() {
    clearTimeout(this.id);
    this.setState({ redirect: false });
  }
  render() {
    if (jsonData.screens.length <= cycleNum) {
      cycleNum = 0;
    }
    return this.state.redirect ? (
      <Redirect to={"refresh"} />
    ) : (
      <LoadEmbeddedDirect pathin={jsonData.screens[cycleNum].filepath} />
    );
  }
}

const TempView = () => (
  <Redirect exact from="/refresh" to={jsonData.screens[cycleNum].url} />
);

export default App;
