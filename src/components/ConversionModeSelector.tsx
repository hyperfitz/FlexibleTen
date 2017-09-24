import * as React from "react";
import * as RB from "react-bootstrap";

export enum ConversionMode {
  mirror,
  operation,
}

export interface ConversionModeSelectorProps {
  mode: ConversionMode;
  onModeChange: (newMode: ConversionMode) => void;
}

export class ConversionModeSelector extends React.Component<ConversionModeSelectorProps> {

  handleClick() {
    // switch modes
    const newMode = this.props.mode == ConversionMode.mirror ? ConversionMode.operation : ConversionMode.mirror;
    this.props.onModeChange(newMode);
  }

  render() {
    let iconType: string;
    let tooltipText: string;
    if (this.props.mode == ConversionMode.mirror) {
      iconType = "exchange";
      tooltipText = "Result from first display is mirrored. Click to change.";
    } else {
      iconType = "wrench";
      tooltipText = "Operands from first display are converted and operation is performed independently. Click to change.";
    }
    const icon = <i className={`fa fa-${iconType}`}></i>
    const tooltip = <RB.Tooltip>{tooltipText}</RB.Tooltip>
    return <span style={{ cursor: "pointer" }} onClick={this.handleClick.bind(this)}>
      <RB.OverlayTrigger overlay={tooltip} placement="top">
        {icon}
      </RB.OverlayTrigger>
    </span>
  }
}
