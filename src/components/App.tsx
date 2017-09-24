import * as React from "react";
// Maybe someday use multi-page support
// import { Route, BrowserRouter } from "react-router-dom";
// import { createBrowserHistory } from "history";

import {CalcPage} from "./CalcPage";


/**
 * This is the wrapper application element. If this application
 * ever needs to support multiple pages, that
 * multi-page support would be configured here.
 * Currently only the calculator page is rendered.
 */
export class App extends React.Component {

    render() {
        return <div className="cl-mcont">
          <CalcPage />
        </div>
    }
}