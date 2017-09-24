import * as React from "react";

import { FlexibleNumber } from "../logic/number";
import * as render from "../logic/render";

/**
 * Props configuration for `NumberDisplay`
 */
export interface NumberDisplayProps {
  /**
   * This number is displayed
   */
  num: FlexibleNumber;

  /**
   * If set to true, this display does not
   * accept user input.
   */
  disabled?: boolean;

  /**
   * Invoked when the user updates the display
   * with a valid number.
   */
  onChange?: (newNumber: FlexibleNumber) => void;
}

/**
 * Current state of the number display
 */
export interface NumberDisplayState {
  /**
   * The current text shown in the number display.
   */
  displayText: string;

  /**
   * True if the text input has focus
   */
  focused?: boolean;

  /**
   * True if the current text shown does not represent a valid number.
   */
  valid: boolean;
}

/**
 * This component displays a number, and can accept user input to update the number.
 */
export class NumberDisplay extends React.Component<NumberDisplayProps, NumberDisplayState> {

  /**
   * Update the display text with a new number
   * 
   * This is called whenever props are passed
   * in from the calculator.
   */
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

  /**
   * Handle text input from the user.
   * 
   * If the new value of the text input is a valid number,
   * the `onChange` event is fired with the value of the new number.
   * Otherwise the text input has an invalid styling applied.
   */
  handleTextInput(evt: React.FormEvent<HTMLInputElement>) {
    let text = evt.currentTarget.value;
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

  /**
   * Keep track of whether or not the input has focus.
   * 
   * This is so that when the user clicks on an input with a single "0",
   * it will change to being blank, and restore the "0" if the user exits
   * focus without changing the value.
   */
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
