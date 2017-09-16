import * as React from "react";

import { CalcButton } from "./CalcButton";
import { NumberDisplay } from "./NumberDisplay";

import { FlexibleNumber } from "../logic/number";
import * as convert from "../logic/convert";

export interface CalculatorState {
  displayRegisterA: FlexibleNumber;
  displayRegisterB: FlexibleNumber;
}

export class Calculator extends React.Component<undefined, CalculatorState> {

  handleNumberEntry(id: string) {
    console.log("calc click - " + id);
    const num = parseInt(id);
    const reg = this.state.displayRegisterA;
    reg.wholeDigits.unshift(num);
    const regb = convert.convertNumber(reg, this.state.displayRegisterB.numberBase);
    this.setState({
      displayRegisterA: reg,
      displayRegisterB: regb,
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
        <CalcButton>C</CalcButton>
        <CalcButton>()</CalcButton>
        <CalcButton>%</CalcButton>
        <CalcButton>/</CalcButton>
      </div>
      <div className="row">

        <CalcButton id="7" onClick={this.handleNumberEntry.bind(this)}>7</CalcButton>
        <CalcButton id="8" onClick={this.handleNumberEntry.bind(this)}>8</CalcButton>
        <CalcButton id="9" onClick={this.handleNumberEntry.bind(this)}>9</CalcButton>
        <CalcButton>*</CalcButton>
      </div>
      {/* 7,8,9, times */}
      <div className="row">
        <CalcButton id="4" onClick={this.handleNumberEntry.bind(this)}>4</CalcButton>
        <CalcButton id="5" onClick={this.handleNumberEntry.bind(this)}>5</CalcButton>
        <CalcButton id="6" onClick={this.handleNumberEntry.bind(this)}>6</CalcButton>
        <CalcButton>-</CalcButton>
      </div>
      {/* 4,5,6, minus */}
      <div className="row">
        <CalcButton id="1" onClick={this.handleNumberEntry.bind(this)}>1</CalcButton>
        <CalcButton id="2" onClick={this.handleNumberEntry.bind(this)}>2</CalcButton>
        <CalcButton id="3" onClick={this.handleNumberEntry.bind(this)}>3</CalcButton>
        <CalcButton>+</CalcButton>
      </div>
      {/* 1,2,3, plus */}
      <div className="row">
        <CalcButton>&plusmn;</CalcButton>
        <CalcButton id="0" onClick={this.handleNumberEntry.bind(this)}>0</CalcButton>
        <CalcButton>.</CalcButton>
        <CalcButton>=</CalcButton>
      </div>
      {/* sign, 0, ., equals */}
    </div>
  }
}
