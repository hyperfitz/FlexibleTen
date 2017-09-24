import * as React from "react";
import * as RB from "react-bootstrap";

/**
 * Indicates the mode of conversion between two different number displays.
 */
export enum ConversionMode {
  /**
   * The secondary display always mirrors the result of the primary display.
   */
  mirror,
  /**
   * The secondary display result is calculated independently of the primary display.
   */
  operation,
}

/**
 * Props configuration for `ConversionModeSelector`
 */
export interface ConversionModeSelectorProps {
  /**
   * Currently selected conversion mode
   */
  mode: ConversionMode;

  /**
   * Invoked when the conversion mode icon is clicked
   */
  onModeChange: (newMode: ConversionMode) => void;
}

/**
 * This component allows the user to switch between different conversion modes.
 */
export class ConversionModeSelector extends React.Component<ConversionModeSelectorProps> {

  /**
   * Toggles conversion mode
   */
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
