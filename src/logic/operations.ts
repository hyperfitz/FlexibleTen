import {addDigitSet} from "./util";
import {FlexibleNumber} from "./number";

/**
 * Adds two numbers together
 * 
 * // TODO: support negative numbers
 */
export function addNumbers(num1: FlexibleNumber, num2: FlexibleNumber): FlexibleNumber {
  // temporarily remove the decimal place to make addition easier
  let digits1 = num1.wholeDigits;
  let fraction1: Array<number> = JSON.parse(JSON.stringify(num1.fractionDigits));
  
  
  let digits2 = num2.wholeDigits;
  let fraction2: Array<number> = JSON.parse(JSON.stringify(num2.fractionDigits));
  
  while (fraction1.length > fraction2.length) {
    fraction2.push(0);
  }
  while (fraction2.length > fraction1.length) {
    fraction1.push(0);
  }

  fraction1.reverse();
  fraction2.reverse();
  
  digits1 = fraction1.concat(digits1);
  digits2 = fraction2.concat(digits2);

  const digits3 = addDigitSet(num1.numberBase, digits1, digits2);
  const fraction3 = digits3.splice(0, fraction1.length);
  return {
    wholeDigits: digits3,
    fractionDigits: fraction3,
    numberBase: num1.numberBase,
    negative: false // TODO: figure this out...
  };
}