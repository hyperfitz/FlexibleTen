import {FlexibleNumber, newNumber} from "./number";
import {addDigitSet, trimZeroPadding, addZeroPadding, MaxDecimalPlaces, deepCopy, convertFromDigitSet} from "./util";
import * as operations from "./operations";
import * as compare from "./compare";

// import * as render from "./render";

/**
 * Converts a `FlexibleNumber` from one number system to another.
 * 
 * @param num `FlexibleNumber` to convert
 * @param toBase The target number system the number should be converted to.
 */
export function convertNumber(num: FlexibleNumber, toBase: number): FlexibleNumber {
  num = deepCopy(num);
  const result: FlexibleNumber = {
    wholeDigits: [],
    fractionDigits: [],
    numberBase: toBase,
  };
  // Convert the whole digits first
  if (num.wholeDigits.length) {
    result.wholeDigits = convertDigitSet(num.wholeDigits, num.numberBase, toBase);
  }
  if (num.fractionDigits.length) {
    // turn fraction digits into a fraction with numerator and denominator
    // first change fraction digits to look like whole digits
    // by reversing them
    num.fractionDigits.reverse();
    // convert to target set
    const numeratorDigits = convertDigitSet(num.fractionDigits, num.numberBase, toBase);
    // denominator is fromBase to the power of the number of fraction digits
    // because 0.12 = 12 / 100
    let denominatorDigits = [1];
    for (let i = 0; i < num.fractionDigits.length; i++) {
      denominatorDigits.unshift(0);
    }
    denominatorDigits = convertDigitSet(denominatorDigits, num.numberBase, toBase);
    const denominator = convertFromDigitSet(denominatorDigits, 0, toBase, false);
    const numerator = convertFromDigitSet(numeratorDigits, 0, toBase, false);
    const quotient = operations.divideNumbers(numerator, denominator);
    result.fractionDigits = quotient.fractionDigits;
  }
  result.negative = num.negative;
  return result;
}

/**
 * Converts a set of digits from one number system to another.
 * 
 * @param digits Digits to convert
 * @param srcBase The number system of the digits
 * @param destBase The target number system
 */
function convertDigitSet(digits: Array<number>, srcBase: number, destBase: number): Array<number> {
  // get a representation of the destination base in the source number system
  const destBaseInSrc = getBaseRepresentation(destBase, srcBase);
  // find the largest multiple of destBase that is smaller than digits
  let multiple = [1];
  const multiples = [];
  while (compare.compareDigitSets(multiple, digits) != 1) {
    multiples.push(multiple);
    multiple = operations.multiplyDigitSets(srcBase, multiple, destBaseInSrc);
  }
  // Try to subtract each multiple starting at the largest, as many
  // times as possible for each digit. The number of times subtracted
  // is the output digit for that power of destination base.
  // Sort of like long division but across number bases.
  const destDigits = [];
  while (multiples.length > 0) {
    multiple = multiples.pop();
    let destDigit = 0;
    while (compare.compareDigitSets(multiple, digits) != 1) {
      addZeroPadding(digits, multiple);
      digits = operations.subtractDigitSet(srcBase, digits, multiple);
      destDigit++;
    }
    destDigits.unshift(destDigit);
  }
  return destDigits;
}

/**
 * Gets a representation of a number base in a different number system
 * 
 * Base `2` would be represented in base `[0,1]` ("10") as `2`, but
 * base `10` would be represented in base `2` as `[0,1,0,1]` ("1010").
 * 
 * In theory these could be pre-calculated but for now they are not.
 * 
 * @param src Number base to convert
 * @param toBase Target number system
 * @param result Optional parameter used by recursive call to keep track of the result.
 */
function getBaseRepresentation(src: number, toBase: number, result: Array<number>=null): Array<number> {
  // console.log("convert: num=" + src);
  if (result == null) {
    result = [];
  }
  const resultDigit = src % toBase;
  result.push(resultDigit);
  const carry = Math.floor(src / toBase);
  if (carry > 0) {
    getBaseRepresentation(carry, toBase, result);
  }
  return result;
}
