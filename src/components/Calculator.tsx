import * as React from "react";

import { CalcButton } from "./CalcButton";
import { NumberDisplay } from "./NumberDisplay";
import { NumberSystemSelector } from "./NumberSystemSelector";

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
  showNumberSystemSelectorA: boolean;
  showNumberSystemSelectorB: boolean;
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
    let newNumber: FlexibleNumber;
    if (this.state.operation == "+") {
      newNumber = operations.addNumbers(this.state.operationRegister, this.state.displayRegisterA);

    }
    if (this.state.operation == "-") {
      newNumber = operations.subtractNumbers(this.state.operationRegister, this.state.displayRegisterA);
    }
    if (this.state.operation == "*") {
      newNumber = operations.multiplyNumbers(this.state.operationRegister, this.state.displayRegisterA);
    }
    if (this.state.operation == "/") {
      newNumber = operations.divideNumbers(this.state.operationRegister, this.state.displayRegisterA);
    }
    this.setState({
      operationRegister: null,
      operation: null,
    });
    this.updateRegisterA(newNumber);
  }

  handleOperationClick(operation: string) {
    this.setState({
      operationPending: true,
      operation: operation,
      fraction: false,
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
      numberBase: 10,
    }
    this.setState({
      displayRegisterA: displayRegisterA,
      displayRegisterB: displayRegisterB,
    });
  }

  cancelUpdateNumberSystem() {
    this.setState({
      showNumberSystemSelectorA: false,
      showNumberSystemSelectorB: false,
    });
  }

  editNumberSystemA() {
    this.setState({
      showNumberSystemSelectorA: true,
    });
  }

  editNumberSystemB() {
    this.setState({
      showNumberSystemSelectorB: true,
    });
  }

  updateNumberSystemA(numberSystem: number) {
    this.setState({
      showNumberSystemSelectorA: false,
    });
    this.updateRegisterA(convert.convertNumber(this.state.displayRegisterA, numberSystem));
  }

  updateNumberSystemB(numberSystem: number) {
    this.setState({
      displayRegisterB: convert.convertNumber(this.state.displayRegisterA, numberSystem),
      showNumberSystemSelectorB: false,
    });
  }

  invertSign() {
    const regA = this.state.displayRegisterA;
    const regB = this.state.displayRegisterB;
    regA.negative = !regA.negative;
    regB.negative = regA.negative;
    this.setState({
      displayRegisterA: regA,
      displayRegisterB: regB
    });
  }

  isValidDigit(digit: number): boolean {
    const result = digit < this.state.displayRegisterA.numberBase;
    console.log(digit + ", " + this.state.displayRegisterA.numberBase + ", " + result);
    return result;
  }

  render() {
    console.log("rendering");
    return <div className="block-flat calculator">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h4 className="text-center">
            Number System: <strong style={{cursor: "pointer"}}
              onClick={this.editNumberSystemA.bind(this)}>{this.state.displayRegisterA.numberBase}</strong>
          </h4>
          <NumberDisplay num={this.state.displayRegisterA} />
        </div>
      </div>
      <NumberSystemSelector
        visible={this.state.showNumberSystemSelectorA}
        numberSystem={this.state.displayRegisterA.numberBase}
        onSelectNumberSystem={this.updateNumberSystemA.bind(this)}
        onCancel={this.cancelUpdateNumberSystem.bind(this)}></NumberSystemSelector>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h4 className="text-center">
            Number System: <strong style={{cursor: "pointer"}}
              onClick={this.editNumberSystemB.bind(this)}>{this.state.displayRegisterB.numberBase}</strong>
          </h4>
          <NumberDisplay num={this.state.displayRegisterB} />
        </div>
      </div>
      <NumberSystemSelector
        visible={this.state.showNumberSystemSelectorB}
        numberSystem={this.state.displayRegisterB.numberBase}
        onSelectNumberSystem={this.updateNumberSystemB.bind(this)}
        onCancel={this.cancelUpdateNumberSystem.bind(this)}></NumberSystemSelector>
      <div className="row">
        <CalcButton onClick={this.onClear.bind(this)}>C</CalcButton>
        <CalcButton>()</CalcButton>
        <CalcButton id="%" onClick={this.handleOperationClick.bind(this)}>%</CalcButton>
        <CalcButton id="/" onClick={this.handleOperationClick.bind(this)}>/</CalcButton>
      </div>
      <div className="row">

        <CalcButton disabled={!this.isValidDigit(7)} id="7" onClick={this.handleNumberEntry.bind(this)}>7</CalcButton>
        <CalcButton disabled={!this.isValidDigit(8)} id="8" onClick={this.handleNumberEntry.bind(this)}>8</CalcButton>
        <CalcButton disabled={!this.isValidDigit(9)} id="9" onClick={this.handleNumberEntry.bind(this)}>9</CalcButton>
        <CalcButton id="*" onClick={this.handleOperationClick.bind(this)}>*</CalcButton>
      </div>
      {/* 7,8,9, times */}
      <div className="row">
        <CalcButton disabled={!this.isValidDigit(4)} id="4" onClick={this.handleNumberEntry.bind(this)}>4</CalcButton>
        <CalcButton disabled={!this.isValidDigit(5)} id="5" onClick={this.handleNumberEntry.bind(this)}>5</CalcButton>
        <CalcButton disabled={!this.isValidDigit(6)} id="6" onClick={this.handleNumberEntry.bind(this)}>6</CalcButton>
        <CalcButton id="-" onClick={this.handleOperationClick.bind(this)}>-</CalcButton>
      </div>
      {/* 4,5,6, minus */}
      <div className="row">
        <CalcButton disabled={!this.isValidDigit(1)} id="1" onClick={this.handleNumberEntry.bind(this)}>1</CalcButton>
        <CalcButton disabled={!this.isValidDigit(2)} id="2" onClick={this.handleNumberEntry.bind(this)}>2</CalcButton>
        <CalcButton disabled={!this.isValidDigit(3)} id="3" onClick={this.handleNumberEntry.bind(this)}>3</CalcButton>
        <CalcButton id="+" onClick={this.handleOperationClick.bind(this)}>+</CalcButton>
      </div>
      {/* 1,2,3, plus */}
      <div className="row">
        <CalcButton onClick={this.invertSign.bind(this)}>&plusmn;</CalcButton>
        <CalcButton disabled={!this.isValidDigit(0)} id="0" onClick={this.handleNumberEntry.bind(this)}>0</CalcButton>
        <CalcButton onClick={this.handleDecimalClick.bind(this)}>.</CalcButton>
        <CalcButton onClick={this.handleOperation.bind(this)}>=</CalcButton>
      </div>
      {/* sign, 0, ., equals */}
    </div>
  }
}
