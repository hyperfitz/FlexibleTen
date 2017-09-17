import * as React from "react";

import { CalcButton } from "./CalcButton";
import { NumberDisplay } from "./NumberDisplay";

import { FlexibleNumber } from "../logic/number";
import * as convert from "../logic/convert";
import * as operations from "../logic/operations";

export interface CalculatorState {
  operationRegister?: FlexibleNumber;
  displayRegisterA: FlexibleNumber;
  displayRegisterB: FlexibleNumber;
  operation?: string;
  fraction?: boolean;
  operationPending?: boolean;
}

export class Calculator extends React.Component<undefined, CalculatorState> {

  private updateRegisterA(num: FlexibleNumber) {
    const numb = convert.convertNumber(num, this.state.displayRegisterB.numberBase);
    this.setState({
      displayRegisterA: num,
      displayRegisterB: numb,
    });
  }

  private onClear() {
    this.setState({
      fraction: false,
      operationPending: false,
      operation: "",
    });
    const reg = this.state.displayRegisterA;
    reg.fractionDigits = [];
    reg.wholeDigits = [];
    reg.negative = false;
    this.updateRegisterA(reg);
  }

  handleNumberEntry(id: string) {
    // console.log("calc click - " + id);
    if (this.state.operationPending) {
      const operationRegister = JSON.parse(JSON.stringify(this.state.displayRegisterA));
      this.state.displayRegisterA.fractionDigits = [];
      this.state.displayRegisterA.wholeDigits = [];
      this.state.displayRegisterA.negative = false;
      this.setState({
        operationRegister: operationRegister,
        operationPending: false,
      });
    }
    const num = parseInt(id);
    const reg = this.state.displayRegisterA;
    if (this.state.fraction) {
      reg.fractionDigits.push(num);
    } else {
      reg.wholeDigits.unshift(num);
    }
    this.updateRegisterA(reg);
  }

  handleOperation() {
    if (!this.state.operation) {
      return;
    }
    if (this.state.operation == "+") {
      const newNumber = operations.addNumbers(this.state.operationRegister, this.state.displayRegisterA);
      this.setState({
        operationRegister: null,
      });
      this.updateRegisterA(newNumber);
    }
    if (this.state.operation == "-") {
      console.log("subtraction!");
    }
    if (this.state.operation == "*") {
      console.log("multiplication!");
    }
    if (this.state.operation == "/") {
      console.log("division!");
    }
    this.setState({operation: null});
  }

  handleOperationClick(operation: string) {
    this.setState({
      operationPending: true,
      operation: operation,
    });
  }

  handleDecimalClick() {
    this.setState({
      fraction: true
    });
  }

  componentWillMount() {
    const displayRegisterA: FlexibleNumber = {
      negative: false,
      fractionDigits: [],
      wholeDigits: [],
      numberBase: 10,
    };
    const displayRegisterB: FlexibleNumber = {
      negative: false,
      fractionDigits: [],
      wholeDigits: [],
      numberBase: 16,
    }
    this.setState({
      displayRegisterA: displayRegisterA,
      displayRegisterB: displayRegisterB,
    });
  }

  render() {
    console.log("rendering");
    return <div className="block-flat calculator">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h4 className="text-center">
            Number System: <strong>{this.state.displayRegisterA.numberBase}</strong>
          </h4>
          <NumberDisplay num={this.state.displayRegisterA} />
          {/* <textarea rows={3} className="form-control calc-display">

          </textarea> */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h4 className="text-center">
            Number System: <strong>{this.state.displayRegisterB.numberBase}</strong>
          </h4>
          <NumberDisplay num={this.state.displayRegisterB} />
          {/* <textarea rows={3} className="form-control calc-display">

          </textarea> */}
        </div>
      </div>
      <div className="row">
        <CalcButton onClick={this.onClear.bind(this)}>C</CalcButton>
        <CalcButton>()</CalcButton>
        <CalcButton id="%" onClick={this.handleOperationClick.bind(this)}>%</CalcButton>
        <CalcButton id="/" onClick={this.handleOperationClick.bind(this)}>/</CalcButton>
      </div>
      <div className="row">

        <CalcButton id="7" onClick={this.handleNumberEntry.bind(this)}>7</CalcButton>
        <CalcButton id="8" onClick={this.handleNumberEntry.bind(this)}>8</CalcButton>
        <CalcButton id="9" onClick={this.handleNumberEntry.bind(this)}>9</CalcButton>
        <CalcButton id="*" onClick={this.handleOperationClick.bind(this)}>*</CalcButton>
      </div>
      {/* 7,8,9, times */}
      <div className="row">
        <CalcButton id="4" onClick={this.handleNumberEntry.bind(this)}>4</CalcButton>
        <CalcButton id="5" onClick={this.handleNumberEntry.bind(this)}>5</CalcButton>
        <CalcButton id="6" onClick={this.handleNumberEntry.bind(this)}>6</CalcButton>
        <CalcButton id="-" onClick={this.handleOperationClick.bind(this)}>-</CalcButton>
      </div>
      {/* 4,5,6, minus */}
      <div className="row">
        <CalcButton id="1" onClick={this.handleNumberEntry.bind(this)}>1</CalcButton>
        <CalcButton id="2" onClick={this.handleNumberEntry.bind(this)}>2</CalcButton>
        <CalcButton id="3" onClick={this.handleNumberEntry.bind(this)}>3</CalcButton>
        <CalcButton id="+" onClick={this.handleOperationClick.bind(this)}>+</CalcButton>
      </div>
      {/* 1,2,3, plus */}
      <div className="row">
        <CalcButton>&plusmn;</CalcButton>
        <CalcButton id="0" onClick={this.handleNumberEntry.bind(this)}>0</CalcButton>
        <CalcButton onClick={this.handleDecimalClick.bind(this)}>.</CalcButton>
        <CalcButton onClick={this.handleOperation.bind(this)}>=</CalcButton>
      </div>
      {/* sign, 0, ., equals */}
    </div>
  }
}
