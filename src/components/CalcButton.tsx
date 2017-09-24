import * as React from "react";

/**
 * Props configuration for `CalcButton`
 */
export interface CalcButtonProps {
  /**
   * Unique identifier for the button.
   * 
   * This value is passed onto the onClick callback.
   */
  id?: string;

  /**
   * Disables the button.
   */
  disabled?: boolean;

  /**
   * onClick is invoked when the button is clicked.
   */
  onClick?: (id: string) => void;
}

/**
 * Simple styled button that is 25% width in
 * a row of calculator buttons.
 */
export class CalcButton extends React.Component<CalcButtonProps> {

  /**
   * Emit a more useful click event
   * that has the id of the button.
   */
  handleClick() {
    // console.log("click! - " + this.props.id);
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  }

  render() {
    return <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
      <button
        disabled={this.props.disabled}
        className="btn btn-default calculator-btn"
        onClick={this.handleClick.bind(this)}>
          {this.props.children}
        </button>
    </div>
  }
}