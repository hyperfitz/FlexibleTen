import * as React from "react";
import * as RB from "react-bootstrap";

/**
 * Props configuration for `NumberSystemSelector`
 */
export interface NumberSystemSelectorProps {
  /**
   * The currently selected number system
   */
  numberSystem: number;
  
  /**
   * True if the selector dialog should be displayed
   */
  visible: boolean;

  /**
   * Invoked when the selection is canceled.
   */
  onCancel: () => void;

  /**
   * Invoked when a number system has been selected.
   */
  onSelectNumberSystem: (numberSystem: number) => void;
}

/**
 * Pop-up dialog that allows the user to select a number system.
 */
export class NumberSystemSelector extends React.Component<NumberSystemSelectorProps> {

  // Notify the parent component that the selection was canceled.
  handleModalHide() {
    this.props.onCancel();
  }

  /**
   * Render a row of number system buttons
   */
  renderButtons(start: number, end: number) {
    const numberSystems: Array<number> = [];
    for (let i = start; i <= end; i++) {
      numberSystems.push(i);
    }
    return numberSystems.map(numberSystem => {
      return <NumberSystemButton
        onSelectNumberSystem={this.props.onSelectNumberSystem}
        numberSystem={numberSystem}
        isSelected={numberSystem == this.props.numberSystem}></NumberSystemButton>
    });
  }

  render() {
    return <RB.Modal bsSize={"small"} onHide={this.handleModalHide.bind(this)} show={this.props.visible}>
      <RB.Modal.Header closeButton>
        <RB.Modal.Title>Select Number System</RB.Modal.Title>
      </RB.Modal.Header>
      <RB.Modal.Body>
        <div className="row calculator-row">
          {this.renderButtons(2, 5)}
        </div>
        <div className="row calculator-row">
          {this.renderButtons(6, 9)}
        </div>
        <div className="row calculator-row">
          {this.renderButtons(10, 13)}
        </div>
        <div className="row calculator-row">
          {this.renderButtons(14, 16)}
        </div>
      </RB.Modal.Body>
    </RB.Modal>
  }
}

/**
 * Props configuration for `NumberSystemButton`
 */
interface NumberSystemButtonProps {
  /**
   * True if the button represents the currently selected number system.
   * 
   * If true, the number will be displayed as selected.
   */
  isSelected: boolean;

  /**
   * The number system that the button represents
   */
  numberSystem: number;

  /**
   * Invoked when the button is clicked.
   */
  onSelectNumberSystem: (numberSystem: number) => void;
}

/**
 * An individual button in the `NumberSystemSelector`.
 * 
 * When one of these buttons is clicked, the parent component is notified
 * that a number system has been selected.
 */
class NumberSystemButton extends React.Component<NumberSystemButtonProps> {
  render() {
    const className = "btn calculator-btn " + (this.props.isSelected ? "btn-primary" : "btn-default");
    return <div className="col-md-3">
      <button className={className}
        onClick={() => this.props.onSelectNumberSystem(this.props.numberSystem)}>
        {this.props.numberSystem}
      </button>
    </div>
  }
}
