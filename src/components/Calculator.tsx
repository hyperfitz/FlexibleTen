import * as React from "react";

import {CalcButton} from "./CalcButton";

export class Calculator extends React.Component {
  render() {
    return <div className="block-flat calculator">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h4 className="text-center">
            Number System: <strong>10</strong>
          </h4>
          <textarea rows={3} className="form-control calc-display">

          </textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h4 className="text-center">
            Number System: <strong>12</strong>
          </h4>
          <textarea rows={3} className="form-control calc-display">

          </textarea>
        </div>
      </div>
      <div className="row">
        <CalcButton>C</CalcButton>
        <CalcButton>()</CalcButton>
        <CalcButton>%</CalcButton>
        <CalcButton>/</CalcButton>
      </div>
      <div className="row">
        <CalcButton>7</CalcButton>
        <CalcButton>8</CalcButton>
        <CalcButton>9</CalcButton>
        <CalcButton>*</CalcButton>
      </div>


        {/* 7,8,9, times */}
        <div className="row">
        <CalcButton>4</CalcButton>
        <CalcButton>5</CalcButton>
        <CalcButton>6</CalcButton>
        <CalcButton>-</CalcButton>
      </div>
        {/* 4,5,6, minus */}
        <div className="row">
        <CalcButton>1</CalcButton>
        <CalcButton>2</CalcButton>
        <CalcButton>3</CalcButton>
        <CalcButton>+</CalcButton>
      </div>
        {/* 1,2,3, plus */}
        <div className="row">
        <CalcButton>&plusmn;</CalcButton>
        <CalcButton>0</CalcButton>
        <CalcButton>.</CalcButton>
        <CalcButton>=</CalcButton>
      </div>
        {/* sign, 0, ., equals */}
    </div>
  }
}
