import * as React from "react";

import { FlexibleNumber } from "../logic/number";
import * as render from "../logic/render";

export interface NumberDisplayProps {
  num: FlexibleNumber;
}

export class NumberDisplay extends React.Component<NumberDisplayProps> {
  render() {
    const result = render.renderNumber(this.props.num);
    console.log("number display render - " + result);
    return <div className="form-control calc-display">
      {result}
    </div>
  }
}
