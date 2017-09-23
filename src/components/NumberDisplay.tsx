import * as React from "react";

import { FlexibleNumber } from "../logic/number";
import * as render from "../logic/render";

export interface NumberDisplayProps {
  num: FlexibleNumber;
  disabled?: boolean;
  onChange?: (newNumber: FlexibleNumber) => void;
}

export interface NumberDisplayState {
  // used to show invalid numbers
  displayText: string;
  focused?: boolean;
  valid: boolean;
}

export class NumberDisplay extends React.Component<NumberDisplayProps, NumberDisplayState> {

  updateNum(num: FlexibleNumber) {
    this.setState({
      displayText: render.renderNumber(num),
      valid: true,
    });
  }

  componentWillReceiveProps(newProps: NumberDisplayProps) {
    this.updateNum(newProps.num);
  }

  componentWillMount() {
    this.updateNum(this.props.num);
  }

  handleTextInput(evt: React.FormEvent<HTMLInputElement>) {
    // Little hack to parse empty string as zero
    let text = evt.currentTarget.value;
    console.log(text);
    let valid = true;
    let newNumber;
    try {
      newNumber = render.parseNumber(text, this.props.num.numberBase);
      if (this.props.onChange) {
        this.props.onChange(newNumber);
      }
    } catch (e) {
      valid = false;
    }
    this.setState({
      displayText: text,
      valid: valid,
    });
  }

  updateFocused(focused: boolean) {
    let text = this.state.displayText;
    if (!focused && text == "") {
      text = "0";
    } else if (focused && text == "0") {
      text = "";
    }
    this.setState({
      focused: focused,
      displayText: text,
    });
  }

  render() {
    let result = this.state.displayText;
    
    // console.log("number display render - " + result);
    let className = "form-control calc-display";
    if (!this.state.valid) {
      className = className + " parsley-error";
    }
    return <input
      onChange={this.handleTextInput.bind(this)}
      disabled={this.props.disabled}
      type="text"
      className={className}
      value={result}
      onFocus={() => this.updateFocused(true)}
      onBlur={() => this.updateFocused(false)}/>
  }
}
