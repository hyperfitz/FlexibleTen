import * as React from "react";

import { CalcButton } from "./CalcButton";
import { NumberDisplay } from "./NumberDisplay";
import { NumberSystemSelector } from "./NumberSystemSelector";
import { CalculatorDetails } from "./CalculatorDetails";
import { CalculatorButtons } from "./CalculatorButtons";
import { ConversionModeSelector, ConversionMode } from "./ConversionModeSelector";

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
  conversionMode: ConversionMode;
  showNumberSystemSelectorA: boolean;
  showNumberSystemSelectorB: boolean;
}

// TODO: maybe move this out
type BinaryOperation = (num1: FlexibleNumber, num2: FlexibleNumber) => FlexibleNumber;

const BinaryOperations: {[key: string]: BinaryOperation} = {
  "+": (num1, num2) => operations.addNumbers(num1, num2),
  "-": (num1, num2) => operations.subtractNumbers(num1, num2),
  "*": (num1, num2) => operations.multiplyNumbers(num1, num2),
  "/": (num1, num2) => operations.divideNumbers(num1, num2),
};

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
    const newNumberA = BinaryOperations[this.state.operation](this.state.operationRegister, this.state.displayRegisterA);
    let newNumberB: FlexibleNumber;
    switch (this.state.conversionMode) {
      case ConversionMode.operation:
        const leftOperand = convert.convertNumber(this.state.operationRegister, this.state.displayRegisterB.numberBase);
        newNumberB = BinaryOperations[this.state.operation](leftOperand, this.state.displayRegisterB);
        break;
      case ConversionMode.mirror:
        newNumberB = convert.convertNumber(newNumberA, this.state.displayRegisterB.numberBase);
        break;
      default:
        throw new Error(`Unsupported conversion mode: ${this.state.conversionMode}`);
    }
    this.setState({
      operationRegister: null,
      operation: null,
      displayRegisterA: newNumberA,
      displayRegisterB: newNumberB,
    });
    // this.updateRegisterA(newNumber);
  }

  handleOperationClick(operation: string) {
    // TODO: fix this
    if (operation == "=") {
      this.handleOperation();
    }
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
      conversionMode: ConversionMode.operation,
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

  handleNumberUpdate(newNumber: FlexibleNumber) {
    this.updateRegisterA(newNumber);
  }

  handleConversionModeChange(newMode: ConversionMode) {
    this.setState({
      conversionMode: newMode,
    });
  }

  render() {
    console.log("rendering");
    return <div className="block-flat calculator">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h4 className="text-center">
            Number System: <strong style={{ cursor: "pointer" }}
              onClick={this.editNumberSystemA.bind(this)}>{this.state.displayRegisterA.numberBase}</strong>
          </h4>
          <NumberDisplay num={this.state.displayRegisterA} onChange={this.handleNumberUpdate.bind(this)} />
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
            Number System: <strong style={{ cursor: "pointer" }}
              onClick={this.editNumberSystemB.bind(this)}>{this.state.displayRegisterB.numberBase}</strong>
            &nbsp;
              <ConversionModeSelector mode={this.state.conversionMode} onModeChange={this.handleConversionModeChange.bind(this)} />
          </h4>
          <NumberDisplay num={this.state.displayRegisterB} disabled={true} />
        </div>
      </div>
      <NumberSystemSelector
        visible={this.state.showNumberSystemSelectorB}
        numberSystem={this.state.displayRegisterB.numberBase}
        onSelectNumberSystem={this.updateNumberSystemB.bind(this)}
        onCancel={this.cancelUpdateNumberSystem.bind(this)}></NumberSystemSelector>
      <CalculatorDetails operationRegister={this.state.operationRegister}
        operator={this.state.operation}
        registerA={this.state.displayRegisterA}
        registerB={this.state.displayRegisterB} />
      <CalculatorButtons
        numberBase={this.state.displayRegisterA.numberBase}
        onClear={this.onClear.bind(this)}
        onDecimalClick={this.handleDecimalClick.bind(this)}
        onDigitEntry={this.handleNumberEntry.bind(this)}
        onOperation={this.handleOperationClick.bind(this)}
        onSignInvert={this.invertSign.bind(this)} />
      {/* TODO: buttons */}
    </div>
  }
}
