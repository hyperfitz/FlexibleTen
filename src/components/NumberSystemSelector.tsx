import * as React from "react";
import * as RB from "react-bootstrap";

export interface NumberSystemSelectorProps {
  numberSystem: number;
  visible: boolean;
  onCancel: () => void;
  onSelectNumberSystem: (numberSystem: number) => void;
}

export class NumberSystemSelector extends React.Component<NumberSystemSelectorProps> {

  handleModalHide() {
    this.props.onCancel();
  }

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

interface NumberSystemButtonProps {
  isSelected: boolean;
  numberSystem: number;
  onSelectNumberSystem: (numberSystem: number) => void;
}

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
