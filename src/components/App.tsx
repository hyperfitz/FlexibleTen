import * as React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import {CalcPage} from "./CalcPage";

// export interface HelloProps { compiler: string; framework: string; }
export interface AppState {

}

export interface AppProps { }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class App extends React.Component<AppProps, AppState> {

    componentWillMount() {
    }

    render() {
        return <div className="cl-mcont">
          <CalcPage />
            {/* <BrowserRouter>
                <div>
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/interests" component={Interests} />
                    <Route path="/bio" component={BioPage} />
                </div>
            </BrowserRouter> */}
        </div>
    }
}