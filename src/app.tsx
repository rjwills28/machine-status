import React, { Component, Profiler } from 'react';
import { Provider } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import log, { LogLevelDesc } from "loglevel";
import './app.css';

import { EmbeddedDisplay, onRenderCallback, RelativePosition, store } from '@dls-controls/cs-web-lib';
import { Header } from './components/Header/header';
import { Footer } from './components/Footer/footer';

log.setLevel((process.env.REACT_APP_LOG_LEVEL as LogLevelDesc) ?? "info");

let delayTime: number = parseFloat(process.env.REACT_APP_PAGE_DISPLAY_TIME_SEC ?? "5");

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

const App: React.FC = (): JSX.Element => (
  // Each instance of context provider allows child components to access
  // the properties on the object placed in value
  // Profiler sends render information whenever child components rerender  
  <Provider store={store}>
    <div className="App">
      <Profiler id="Dynamic Page Profiler" onRender={onRenderCallback}>
      <Header/>
        <Switch>
          <Redirect exact from="/" to="/json/ms_day" />
          <Route path="/json/ms_day" component={LoadMSDayView}/>
          <Route path="/json/ms_week" component={LoadMSWeekView}/>
          <Route path="/json/ms_fe1"  component={LoadMSFe1View}/>
          <Route path="/json/ms_fe2"  component={LoadMSFe2View}/>
          <Route path="/json/ms_message"  component={LoadMSMessageView}/>
        </Switch>
      </Profiler>
      <Footer />
    </div>
  </Provider>
);

type Props = {
  urlpath: string;
}

class RedirectAfterTimeout extends Component<Props> {
  private id: any;
  
  state = {
    redirect: false
  };


  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), delayTime * 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.id);
    this.setState({ redirect: false })
  }
  render() {
    return this.state.redirect
      ? <Redirect to={this.props.urlpath} />
      : <div>Content</div>
  }
}

const LoadMSDayView = () => (
  <div>
    <LoadEmbedded/>
    <RedirectAfterTimeout urlpath={"/json/ms_week"}/>
    </div>
);

const LoadMSWeekView = () => (
  <div>
    <LoadEmbedded/>
    <RedirectAfterTimeout urlpath={"/json/ms_fe1"}/>
    </div>
);

const LoadMSFe1View = () => (
  <div>
    <LoadEmbedded/>
    <RedirectAfterTimeout urlpath={"/json/ms_fe2"}/>
    </div>
);

const LoadMSFe2View = () => (
  <div>
    <LoadEmbedded/>
    <RedirectAfterTimeout urlpath={"/json/ms_message"}/>
    </div>
);

const LoadMSMessageView = () => (
  <div>
    <LoadEmbedded/>
    <RedirectAfterTimeout urlpath={"/json/ms_day"}/>
    </div>
);

export default App;