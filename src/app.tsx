import React, { Component, Profiler } from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
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

const delayTime: number = parseFloat(
  process.env.REACT_APP_PAGE_DISPLAY_TIME_SEC ?? "5"
);

type Props = {
  urlpath: string;
  pagename: string;
};

type PropsPath = {
  pathin: string;
};

const LoadEmbedded = (): JSX.Element => {
  const match = useRouteMatch();
  let path = match.url;
  if (
    !match.url.endsWith(".opi") ||
    match.url.endsWith(".json") ||
    match.url.endsWith(".bob")
  ) {
    path = `${match.url}.json`;
  }

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

const App: React.FC = (): JSX.Element => (
  // Each instance of context provider allows child components to access
  // the properties on the object placed in value
  // Profiler sends render information whenever child components rerender
  <Provider store={store}>
    <div className="App">
      <Profiler id="Dynamic Page Profiler" onRender={onRenderCallback}>
        <Switch>
          <Redirect exact from="/" to="/day" />
          <Route path="/day" component={LoadMSDayView} />
          <Route path="/week" component={LoadMSWeekView} />
          <Route path="/fe1" component={LoadMSFe1View} />
          <Route path="/fe2" component={LoadMSFe2View} />
          <Route path="/message" component={LoadMSMessageView} />
          <Route path="*">
            <LoadEmbedded />
          </Route>
        </Switch>
      </Profiler>
    </div>
  </Provider>
);

export const AppWeb: React.FC = (): JSX.Element => (
  // Each instance of context provider allows child components to access
  // the properties on the object placed in value
  // Profiler sends render information whenever child components rerender
  <Provider store={store}>
    <div className="AppWeb">
      <Header />
      <Profiler id="Dynamic Page Profiler" onRender={onRenderCallback}>
        <Switch>
          <Redirect exact from="/" to="/machine-status" />
          <Route path="/machine-status" component={LoadMachineStatusView} />
          <Route path="/*">
            <LoadEmbedded />
          </Route>
        </Switch>
      </Profiler>
      <Footer />
    </div>
  </Provider>
);

class RedirectAfterTimeout extends Component<Props> {
  private id: any;

  state = {
    redirect: false
  };

  componentDidMount() {
    this.id = setTimeout(
      () => this.setState({ redirect: true }),
      delayTime * 1000
    );
    document.title = this.props.pagename;
  }

  componentWillUnmount() {
    clearTimeout(this.id);
    this.setState({ redirect: false });
  }
  render() {
    return this.state.redirect ? (
      <Redirect to={this.props.urlpath} />
    ) : (
      <div>Content</div>
    );
  }
}

const LoadMSDayView = () => (
  <div>
    <LoadEmbeddedDirect pathin={"/json/ms_day"} />
    <RedirectAfterTimeout urlpath={"week"} pagename={"Day View"} />
  </div>
);

const LoadMSWeekView = () => (
  <div>
    <LoadEmbeddedDirect pathin={"/json/ms_week"} />
    <RedirectAfterTimeout urlpath={"fe1"} pagename={"Week View"} />
  </div>
);

const LoadMSFe1View = () => (
  <div>
    <LoadEmbeddedDirect pathin={"/json/ms_fe1"} />
    <RedirectAfterTimeout urlpath={"fe2"} pagename={"Front Ends"} />
  </div>
);

const LoadMSFe2View = () => (
  <div>
    <LoadEmbeddedDirect pathin={"/json/ms_fe2"} />
    <RedirectAfterTimeout urlpath={"message"} pagename={"Front Ends"} />
  </div>
);

const LoadMSMessageView = () => (
  <div>
    <LoadEmbeddedDirect pathin={"/json/ms_message"} />
    <RedirectAfterTimeout urlpath={"day"} pagename={"Operations Messages"} />
  </div>
);

const LoadMachineStatusView = () => (
  <div>
    <LoadEmbeddedDirect pathin={"/json/machineStatus"} />
  </div>
);

export default App;
