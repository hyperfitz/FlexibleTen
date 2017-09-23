import {FlexibleNumber} from "./number";
import {
  addZeroPadding, convertToDigitSet, deepCopy
} from "./util";

/**
 * Compares two numbers.
 * 
 * - returns 0 if `num1` and `num2` are equal
 * - returns 1 if `num1` is greater than `num2`
 * - returns -1 if `num1` is less than `num2`
 */
export function compareNumbers(num1: FlexibleNumber, num2: FlexibleNumber): number {
  // shortcuts based on sign
  if (num1.negative != num2.negative) {
    // if num2 is negative and num1 is positive, num1 is greater
    if (num2.negative) {
      return 1;
    }
    // if num1 is negative and num2 is positive, num1 is less
    return -1;
  }
  // make a deep copy of the numbers
  num1 = deepCopy(num1);
  num2 = deepCopy(num2);
  // invert the result if both numbers are negative
  // a larger negative is less than a smaller negative
  const modifier = num1.negative ? -1 : 1;
  addZeroPadding(num1.fractionDigits, num2.fractionDigits);
  addZeroPadding(num1.wholeDigits, num2.wholeDigits);
  const digits1 = convertToDigitSet(num1);
  const digits2 = convertToDigitSet(num2);
  return compareDigitSets(digits1, digits2) * modifier;
}

/**
 * Compares two digit sets.
 * 
 * Number base, sign, and magnitude of source numbers are not considered.
 * If digits1 = digits2, 0 is returned.
 * if digits1 > digits2, 1 is returned.
 * Otherwise, -1 is returned.
 */
export function compareDigitSets(digits1: Array<number>, digits2: Array<number>): number {
  digits1 = deepCopy(digits1);
  digits2 = deepCopy(digits2);
  addZeroPadding(digits1, digits2);
  digits1.reverse();
  digits2.reverse();
  let cmp = 0;
  digits1.forEach((digit1, i) => {
    if (cmp != 0) {
      return;
    }
    const digit2 = digits2[i];
    // console.log("digits: 1=" + digit1 + ", 2=" + digit2);
    if (digit1 > digit2) {
      // console.log("GT");
      cmp = 1;
      return;
    } else if (digit2 > digit1) {
      // console.log("LT");
      cmp =  -1;
      return;
    }
  });
  return cmp;
}