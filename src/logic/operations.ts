import {
  addDigitSet, deepCopy, addZeroPadding,
  convertToDigitSet, convertFromDigitSet, trimZeroPadding
} from "./util";
import {FlexibleNumber, newNumber} from "./number";
import {compareNumbers} from "./compare";
import {lookupSubtraction, lookupAddition, NumberTableEntry} from "./numbertables";

/**
 * Adds two numbers together
 * 
 * // TODO: support negative numbers
 */
export function addNumbers(num1: FlexibleNumber, num2: FlexibleNumber): FlexibleNumber {
  // TODO: support negative numbers
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
  // TODO: support negative numbers
  num1 = deepCopy(num1);
  num2 = deepCopy(num2);
  const cmp = compareNumbers(num1, num2);
  if (cmp == 0) {
    // if a num1 and num2 are equal, the result is zero
    return newNumber(num1.numberBase);
  }
  if (cmp == -1) {
    console.log("swap");
    // swap so that the smaller magnitude is
    // subtracted from the larger magnitude
    [num1, num2] = [num2, num1];
  }
  addZeroPadding(num1.wholeDigits, num2.wholeDigits);
  addZeroPadding(num1.fractionDigits, num2.fractionDigits);
  const digits1 = convertToDigitSet(num1);
  const digits2 = convertToDigitSet(num2);
  const digits3 = subtractDigitSet(num1.numberBase, digits1, digits2);
  const result = convertFromDigitSet(digits3, num1.fractionDigits.length, num1.numberBase);
  if (cmp == -1) {
    console.log("negative");
    result.negative = true;
  }
  return result;
}

function subtractDigitSet(numberBase: number, num1: Array<number>, num2: Array<number>): Array<number> {
  const diffs: Array<NumberTableEntry> = [];
  num1.forEach((digit1, index) => {
    const digit2 = num2[index];
    const diff = lookupSubtraction(digit1, digit2, numberBase);
    // if (!diff) {
    //   console.error("missing: 1=" + digit1 + ", 2=" + digit2 + ", base=" + numberBase);
    //   console.log(num1);
    //   console.log(num2);
    // }
    diffs.push(diff);
  });
  const result: Array<number> = [];
  diffs.reverse();
  let carry = 0;
  diffs.forEach(diff => {
    // subtract carry
    let diff2 = lookupSubtraction(diff.result, carry, numberBase);
    let resultDigit = diff2.result;
    result.push(resultDigit);
    carry = diff.carry + diff2.carry;
  });
  // restore original ordering of digits
  result.reverse();
  return result;
}