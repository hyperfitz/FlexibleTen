import * as React from "react";

import { Calculator } from "./Calculator";

export class CalcPage extends React.Component {
  render() {
    return <div>
      <div className="row">
        <div className="col-lg-3 col-md-3"></div>
        <div className="col-lg-6 col-md-6">
          <h1 className="text-center calc-header">Flexible Ten Calculator</h1>
        </div>
        <div className="col-lg-3 col-md-3"></div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-3"></div>
        <div className="col-lg-6 col-md-6">
          <Calculator />
        </div>
        <div className="col-lg-3 col-md-3"></div>
      </div>
    </div>
  }
}