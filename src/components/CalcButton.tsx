import * as React from "react";

export interface CalcButtonProps {
  id?: string;
  disabled?: boolean;
  onClick?: (id: string) => void;
}

export class CalcButton extends React.Component<CalcButtonProps> {

  handleClick() {
    // console.log("click! - " + this.props.id);
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  }

  render() {
    return <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <button disabled={this.props.disabled} className="btn btn-default calculator-btn" onClick={this.handleClick.bind(this)}>{this.props.children}</button>
    </div>
  }
}