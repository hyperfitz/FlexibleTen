import {
  addDigitSet, deepCopy, addZeroPadding, convertToDigitSet, convertFromDigitSet, trimZeroPadding
} from "./util";
import {FlexibleNumber, newNumber} from "./number";

/**
 * Adds two numbers together
 * 
 * // TODO: support negative numbers
 */
export function addNumbers(num1: FlexibleNumber, num2: FlexibleNumber): FlexibleNumber {
  num1 = deepCopy(num1);
  num2 = deepCopy(num2);
  addZeroPadding(num1.wholeDigits, num2.wholeDigits);
  addZeroPadding(num1.fractionDigits, num2.fractionDigits);
  const digits1 = convertToDigitSet(num1);
  const digits2 = convertToDigitSet(num2);

  const digits3 = addDigitSet(num1.numberBase, digits1, digits2);


  // TODO: figure out how to calculate negative numbers
  const result = convertFromDigitSet(digits3, num1.fractionDigits.length, num1.numberBase);
  return result;
}

/** Subtracts `num1` from `num2` */
export function subtractNumbers(num1: FlexibleNumber, num2: FlexibleNumber): FlexibleNumber {
  return null;
}