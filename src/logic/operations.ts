import {
  addDigitSet, deepCopy, addZeroPadding,
  convertToDigitSet, convertFromDigitSet, trimZeroPadding,
  isZero,
} from "./util";
import { FlexibleNumber, newNumber } from "./number";
import { compareNumbers } from "./compare";
import { lookupSubtraction, lookupAddition, NumberTableEntry } from "./numbertables";

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

  // Should result be negative?
  let negative = false;
  // Should we subtract instead of add? (for combining negative with positive numbers)
  let subtract = false;
  if (num1.negative && num2.negative) {
    negative = true;
  }
  if (num1.negative != num2.negative) {
    subtract = true;
  }
  // console.log("num1=" + num1.wholeDigits + ", num2=" + num2.wholeDigits + ", neg=" + negative + ", sub=" + subtract);
  let digits3: Array<number>;
  if (subtract) {
    // determine if the negative number is bigger in magnitude than the
    // positive number. Convert the negative to the positive and subtract
    // the smaller magnitude number from the larger magnitude number.
    const [nNum, pNum] = num1.negative ? [num1, num2] : [num2, num1];
    nNum.negative = false;
    const nDigits = convertToDigitSet(nNum);
    const pDigits = convertToDigitSet(pNum);
    switch (compareNumbers(nNum, pNum)) {
      case 0:
        // a positive number added to a negative number of the
        // same magnitude equals zero
        return newNumber(num1.numberBase);
      case 1:
        negative = true;
        digits3 = subtractDigitSet(num1.numberBase, nDigits, pDigits);
        break;
      default:
        digits3 = subtractDigitSet(num1.numberBase, pDigits, nDigits);
        break;
    }
  } else {
    const digits1 = convertToDigitSet(num1);
    const digits2 = convertToDigitSet(num2);
    digits3 = addDigitSet(num1.numberBase, digits1, digits2);
  }

  const result = convertFromDigitSet(digits3, num1.fractionDigits.length, num1.numberBase);
  result.negative = negative;
  return result;
}

/** Subtracts `num1` from `num2` */
export function subtractNumbers(num1: FlexibleNumber, num2: FlexibleNumber): FlexibleNumber {
  num2 = deepCopy(num2);
  // subtracting a number is the same as adding a negative number
  num2.negative = !num2.negative;
  return addNumbers(num1, num2);
}

function subtractDigitSet(numberBase: number, num1: Array<number>, num2: Array<number>): Array<number> {
  const diffs: Array<NumberTableEntry> = [];
  num1.forEach((digit1, index) => {
    const digit2 = num2[index];
    const diff = lookupSubtraction(digit1, digit2, numberBase);
    diffs.push(diff);
  });

  const result: Array<number> = [];
  let carry = 0;
  diffs.forEach(diff => {
    // subtract carry
    let diff2 = lookupSubtraction(diff.result, carry, numberBase);
    let resultDigit = diff2.result;
    result.push(resultDigit);
    carry = diff.carry + diff2.carry;
  });
  return result;
}

/**
 * Multiplies two numbers and returns the product
 */
export function multiplyNumbers(num1: FlexibleNumber, num2: FlexibleNumber): FlexibleNumber {
  num1 = deepCopy(num1);
  num2 = deepCopy(num2);
  addZeroPadding(num1.wholeDigits, num2.wholeDigits);
  addZeroPadding(num1.fractionDigits, num2.fractionDigits);
  const digits1 = convertToDigitSet(num1);
  const digits2 = convertToDigitSet(num2);
  const product = multiplyDigitSets(num1.numberBase, digits1, digits2);

  // console.log("product=" + product);
  const result = convertFromDigitSet(product, num1.fractionDigits.length + num2.fractionDigits.length, num1.numberBase);
  // special case: zero shouldn't be negative
  result.negative = num1.negative != num2.negative && !isZero(result);
  return result;
}

function multiplyDigitSets(numberBase: number, num1: Array<number>, num2: Array<number>): Array<number> {
  const resultDigitSets: Array<Array<number>> = [];
  // console.log("mply: num1=" + num1 + ", num2=" + num2);
  num1.forEach((digit1, index1) => {
    num2.forEach((digit2, index2) => {
      const shift = index1 + index2;
      const addValue = shiftDigitSet([digit1], shift);
      let sum = [];
      for (let i = 0; i < digit2; i++) {
        sum = addDigitSet(numberBase, sum, addValue);
      }
      // console.log("mul: d1=" + digit1 + ", d2=" + digit2 + ", idx1=" + index1 + ", idx2=" + index2 +
      //   ", shift=" + shift + ", addValue=" + addValue + ", sum=" + sum);
      resultDigitSets.push(sum);
    });
  });
  let product: Array<number> = resultDigitSets[0];
  for (let i = 1; i < resultDigitSets.length; i++) {
    product = addDigitSet(numberBase, product, resultDigitSets[i]);
  }
  return product;
}

/**
 * Increases the magnitude of the digit set
 */
function shiftDigitSet(digits: Array<number>, by: number): Array<number> {
  const result = deepCopy(digits);
  for (let i = 0; i < by; i++) {
    result.unshift(0);
  }
  return result;
}
