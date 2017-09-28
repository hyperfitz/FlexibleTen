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

/**
 * State of a `Calculator` component.
 */
export interface CalculatorState {
  /**
   * This is the number that is stored
   * for a pending operation.
   */
  operationRegister?: FlexibleNumber;
  /**
   * This is the number that is displayed in the top `NumberDisplay`
   */
  displayRegisterA: FlexibleNumber;
  /**
   * This is the number that is displayed in the bottom `NumberDisplay`
   */
  displayRegisterB: FlexibleNumber;
  /**
   * This is the operation that will be performed when the user
   * clicks on the `=` button.
   */
  operation?: string;
  /**
   * Indicates that the user has clicked on the `.` button,
   * and that further number entries from the keypad should
   * be appended to the fractional component of the displayed number.
   */
  fraction?: boolean;
  /**
   * This flag is set to true when an operation is pending.
   */
  operationPending?: boolean;
  /**
   * This affects how the lower number display calculates
   * its operation results. There are two possible values:
   * - mirror - The result in the top display is converted and copied to the bottom display.
   * - operation - The operands are converted and the operation is performed separately
   *   in the second number base, and the result is shown in the bottom display.
   */
  conversionMode: ConversionMode;
  /**
   * Setting this to true launches the number system selector for the top display.
   */
  showNumberSystemSelectorA: boolean;
  /**
   * Setting this to true launches the number system selector for the bottom display.
   */
  showNumberSystemSelectorB: boolean;
}

/**
 * BinaryOperation is a type alias for an operation that accepts
 * two `FlexibleNumber` instances and emits the result as a third `FlexibleNumber`
 */
type BinaryOperation = (num1: FlexibleNumber, num2: FlexibleNumber) => FlexibleNumber;

/**
 * Mapping of operator string to math function.
 */
const BinaryOperations: {[key: string]: BinaryOperation} = {
  "+": (num1, num2) => operations.addNumbers(num1, num2),
  "-": (num1, num2) => operations.subtractNumbers(num1, num2),
  "*": (num1, num2) => operations.multiplyNumbers(num1, num2),
  "/": (num1, num2) => operations.divideNumbers(num1, num2),
};

/**
 * The top-level user interface for the calculator.
 * 
 * Accepts no props and maintains its own state.
 */
export class Calculator extends React.Component<undefined, CalculatorState> {

  /**
   * Update the top display with a number and automatically
   * convert it to the bottom display.
   */
  private updateRegisterA(num: FlexibleNumber) {
    // console.log("updateRegisterA: " + JSON.stringify(num));
    const numb = convert.convertNumber(num, this.state.displayRegisterB.numberBase);
    // console.log("after conversion: " + JSON.stringify(numb));
    this.setState({
      fraction: num.fractionDigits.length > 0,
      displayRegisterA: num,
      displayRegisterB: numb,
    });
  }

  /**
   * Clears the state of the calculator.
   * 
   * Invoked when the user clicks on the `C` button
   */
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

  private setLeftOperand() {
    const operationRegister = JSON.parse(JSON.stringify(this.state.displayRegisterA));
    this.state.displayRegisterA.fractionDigits = [];
    this.state.displayRegisterA.wholeDigits = [];
    this.state.displayRegisterA.negative = false;
    this.setState({
      operationRegister: operationRegister,
      operationPending: false,
    });
  }

  /**
   * Enters new digits as would be expected from a normal calculator.
   * 
   * Invoked whenever a user clicks on a number button.
   * 
   * If an operation is pending, the current display value is stored
   * in `operationRegister` and a new number is created to store
   * further digit inputs.
   */
  handleNumberEntry(digit: string) {
    // console.log("calc click - " + id);
    if (this.state.operationPending) {
      this.setLeftOperand();
    }
    const num = parseInt(digit);
    const reg = this.state.displayRegisterA;
    // If the user has clicked on `.` start pushing
    // input to the fractional component of the number instead.
    if (this.state.fraction) {
      reg.fractionDigits.push(num);
    } else {
      reg.wholeDigits.unshift(num);
    }
    this.updateRegisterA(reg);
  }

  /**
   * Performs the pending operation.
   * 
   * Invoked when the user clicks on the `=` button.
   * 
   * Depending on the conversion mode, the operation
   * may or may not be performed separately for both displays.
   */
  handleOperation() {
    if (!this.state.operation) {
      return;
    }
    const newNumberA = BinaryOperations[this.state.operation](this.state.operationRegister, this.state.displayRegisterA);
    // Depending on the conversion mode, either copy the new number
    // to the second display, or perform the operation separately on converted operands.
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
  }

  /**
   * Invoked when the user clicks an operation button.
   * 
   * If `=` button is clicked, it causes any pending operation to execute.
   * If any other operation button is clicked, a pending operation
   * is set.
   * 
   * The `fraction` flag that is caused by clicking on `.` is also cleared.
   */
  handleOperationClick(operation: string) {
    if (operation == "=") {
      this.handleOperation();
    }
    this.setState({
      operationPending: true,
      operation: operation,
      fraction: false,
    });
  }

  /**
   * Sets the `fraction` flag.
   * 
   * Invoked when the user clicks on the `.` button.
   */
  handleDecimalClick() {
    this.setState({
      fraction: true
    });
  }

  /**
   * Set the initial state of the calculator.
   */
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

  /**
   * Invoked when a user cancels the number selection dialog
   * for either display.
   */
  cancelUpdateNumberSystem() {
    this.setState({
      showNumberSystemSelectorA: false,
      showNumberSystemSelectorB: false,
    });
  }

  /**
   * Launch the number system selection dialog for the top display.
   * 
   * Invoked when the user clicks on the top display number system.
   */
  editNumberSystemA() {
    this.setState({
      showNumberSystemSelectorA: true,
    });
  }

  /**
   * Launch the number system selection dialog for the bottom display.
   * 
   * Invoked when the user clicks on the bottom display number system.
   */
  editNumberSystemB() {
    this.setState({
      showNumberSystemSelectorB: true,
    });
  }

  /**
   * Update the number system for the top display.
   * 
   * Invoked when the user clicks on any number system in the
   * selection dialog for the top display.
   */
  updateNumberSystemA(numberSystem: number) {
    this.setState({
      displayRegisterA: convert.convertNumber(this.state.displayRegisterA, numberSystem),
      showNumberSystemSelectorA: false,
    });
  }

  /**
   * Update the number system for the bottom display.
   * 
   * Invoked when the user clicks on any number system in the
   * selection dialog for the bottom display.
   */
  updateNumberSystemB(numberSystem: number) {
    this.setState({
      displayRegisterB: convert.convertNumber(this.state.displayRegisterA, numberSystem),
      showNumberSystemSelectorB: false,
    });
  }

  /**
   * Inverts the sign of both displays.
   * 
   * Invoked when a user clicks on the `+/-` button.
   */
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

  /**
   * Updates both displays with the new number.
   * 
   * This is invoked when the user manually enters a valid
   * number into the top display with a keyboard.
   */
  handleNumberUpdate(newNumber: FlexibleNumber) {
    if (this.state.operationPending) {
      this.setLeftOperand();
    }
    this.updateRegisterA(newNumber);
  }

  /**
   * Changes the conversion mode.
   * 
   * Invoked when a user clicks on the conversion mode icon.
   */
  handleConversionModeChange(newMode: ConversionMode) {
    this.setState({
      conversionMode: newMode,
    });
  }

  render() {
    console.log("rendering calculator");
    return <div className="block-flat calculator">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h4 className="text-center">
            Number System: <strong style={{ cursor: "pointer" }}
              onClick={this.editNumberSystemA.bind(this)}>{this.state.displayRegisterA.numberBase}</strong>
          </h4>
          <NumberDisplay operationPending={this.state.operationPending} num={this.state.displayRegisterA} onChange={this.handleNumberUpdate.bind(this)} />
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
    </div>
  }
}
