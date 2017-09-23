import * as React from "react";

import { FlexibleNumber } from "../logic/number";
import * as render from "../logic/render";

export interface CalculatorDetailsProps {
  operator?: string;
  registerA?: FlexibleNumber;
  registerB?: FlexibleNumber;
  operationRegister?: FlexibleNumber;
}

export class CalculatorDetails extends React.Component<CalculatorDetailsProps> {

  renderNumber(num: FlexibleNumber): string {
    return num ? render.renderNumber(num) : "";
  }

  renderOperator() {
    // if (this.props.operator) {
      return <div className="row">
      <div className="col-lg-12 col-md-12">Operator: <strong>{this.props.operator}</strong></div>
    </div>;
    // }
  }

  renderOperationRegister() {
    // if (this.props.operationRegister) {
      return <div className="row">
      <div className="col-lg-12 col-md-12">Left Operand: <strong>{this.renderNumber(this.props.operationRegister)}</strong></div>
    </div>;
    // }
  }

  render() {
    return <div>
      {this.renderOperator()}
      {this.renderOperationRegister()}
      <div className="row">
        <div className="col-lg-12 col-md-12">Display 1: <strong>{this.renderNumber(this.props.registerA)}</strong></div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">Display 2: <strong>{this.renderNumber(this.props.registerB)}</strong></div>
      </div>
    </div>
  }
}