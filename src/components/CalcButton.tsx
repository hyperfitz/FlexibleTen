import * as React from "react";

export class CalcButton extends React.Component {
  render() {
    return <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <button className="btn btn-default">{this.props.children}</button>
    </div>
  }
}