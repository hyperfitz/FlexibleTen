import * as React from "react";

import {CalcButton} from "./CalcButton";

export interface CalculatorButtonsProps {
  onClear: () => void;
  onOperation: (operator: string) => void;
  onDigitEntry: (digit: string) => void;
  onSignInvert: () => void;
  onDecimalClick: () => void;
  numberBase: number;
}

export class CalculatorButtons extends React.Component<CalculatorButtonsProps> {

  isValidDigit(digit: number): boolean {
    const result = digit < this.props.numberBase;
    // console.log(digit + ", " + this.state.displayRegisterA.numberBase + ", " + result);
    return result;
  }

  render() {
    return <div>
      <div className="row">
        <CalcButton onClick={this.props.onClear}>C</CalcButton>
        <CalcButton disabled={true}>()</CalcButton>
        <CalcButton disabled={true} id="%" onClick={this.props.onOperation}>%</CalcButton>
        <CalcButton id="/" onClick={this.props.onOperation}>/</CalcButton>
      </div>
      <div className="row">

        <CalcButton disabled={!this.isValidDigit(7)} id="7" onClick={this.props.onDigitEntry}>7</CalcButton>
        <CalcButton disabled={!this.isValidDigit(8)} id="8" onClick={this.props.onDigitEntry}>8</CalcButton>
        <CalcButton disabled={!this.isValidDigit(9)} id="9" onClick={this.props.onDigitEntry}>9</CalcButton>
        <CalcButton id="*" onClick={this.props.onOperation}>*</CalcButton>
      </div>
      {/* 7,8,9, times */}
      <div className="row">
        <CalcButton disabled={!this.isValidDigit(4)} id="4" onClick={this.props.onDigitEntry}>4</CalcButton>
        <CalcButton disabled={!this.isValidDigit(5)} id="5" onClick={this.props.onDigitEntry}>5</CalcButton>
        <CalcButton disabled={!this.isValidDigit(6)} id="6" onClick={this.props.onDigitEntry}>6</CalcButton>
        <CalcButton id="-" onClick={this.props.onOperation}>-</CalcButton>
      </div>
      {/* 4,5,6, minus */}
      <div className="row">
        <CalcButton disabled={!this.isValidDigit(1)} id="1" onClick={this.props.onDigitEntry}>1</CalcButton>
        <CalcButton disabled={!this.isValidDigit(2)} id="2" onClick={this.props.onDigitEntry}>2</CalcButton>
        <CalcButton disabled={!this.isValidDigit(3)} id="3" onClick={this.props.onDigitEntry}>3</CalcButton>
        <CalcButton id="+" onClick={this.props.onOperation}>+</CalcButton>
      </div>
      {/* 1,2,3, plus */}
      <div className="row">
        <CalcButton onClick={this.props.onSignInvert}>&plusmn;</CalcButton>
        <CalcButton disabled={!this.isValidDigit(0)} id="0" onClick={this.props.onDigitEntry}>0</CalcButton>
        <CalcButton onClick={this.props.onDecimalClick}>.</CalcButton>
        <CalcButton id="=" onClick={this.props.onOperation}>=</CalcButton>
      </div>
      {/* sign, 0, ., equals */}
    </div>
  }
}