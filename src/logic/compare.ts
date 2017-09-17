import {FlexibleNumber} from "./number";
import {
  addZeroPadding, convertToDigitSet
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
  // invert the result if both numbers are negative
  // a larger negative is less than a smaller negative
  const modifier = num1.negative ? -1 : 1;
  addZeroPadding(num1.fractionDigits, num2.fractionDigits);
  addZeroPadding(num1.wholeDigits, num2.wholeDigits);
  const digits1 = convertToDigitSet(num1);
  const digits2 = convertToDigitSet(num2);
  // reverse order of digits so that we can traverse
  // starting at index zero, beginning with the highest
  // order of magnitude and going downward.
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
      cmp = 1 * modifier;
      return;
    } else if (digit2 > digit1) {
      // console.log("LT");
      cmp =  -1 * modifier;
      return;
    }
  });
  return cmp;
}

// function compareDigitSets