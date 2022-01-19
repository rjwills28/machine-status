import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { FileProvider, OutlineProvider } from '@dls-controls/cs-web-lib';

ReactDOM.render(
  <Router>
    <FileProvider>
      <OutlineProvider>
        <App />
        </OutlineProvider>
    </FileProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
