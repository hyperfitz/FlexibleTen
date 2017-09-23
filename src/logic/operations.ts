import {
  addDigitSet, deepCopy, addZeroPadding,
  convertToDigitSet, convertFromDigitSet, trimZeroPadding,
  isZero, MaxDecimalPlaces,
} from "./util";
import { FlexibleNumber, newNumber } from "./number";
import { compareNumbers, compareDigitSets } from "./compare";
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
  // multiply each single digit in a number
  // by every single digit in the other number
  // by repeatedly adding, along with the added magnitudes,
  // and add the result.

  // magnitude for each number is calculated as (number * (base ^ index)),
  // and the added magnitudes is referred to below as "shift", because
  // it causes a shift of that many digits to the left, an increase in
  // orders of magnitude.
  num1.forEach((digit1, index1) => {
    num2.forEach((digit2, index2) => {
      // How many digits to the left the result number
      // should be shifted
      const shift = index1 + index2;
      const addValue = shiftDigitSetLeft([digit1], shift);
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

export function divideNumbers(num1: FlexibleNumber, num2: FlexibleNumber): FlexibleNumber {
  num1 = deepCopy(num1);
  num2 = deepCopy(num2);
  // Copy the signs, because they get temporarily removed for this operation
  const sign1 = num1.negative;
  const sign2 = num2.negative;
  num1.negative = false;
  num2.negative = false;
  // line the two numbers up so that the divisor is just small enough to be less
  // and record the amount shifted to the left (positive) or to the right (negative)
  let shift = 0;
  // shifting to the left first, until second number is greater than or equal to the first number
  while (compareNumbers(num2, num1) == -1) {
    // console.log("shift left");
    num2 = shiftNumberLeft(num2, 1);
    shift++;
  }
  // now shift to the right, until the second number is less than or equal to the first number
  while (compareNumbers(num2, num1) == 1) {
    // console.log("shift right");
    num2 = shiftNumberRight(num2, 1);
    shift--;
  }

  const resultDigits = [];
  // Keep track of the number of shifts during division
  let resultShift = 0;
  // Add shift to the result length to enforce the effective
  // numebr of max digits
// OuterLoop:
  while (resultDigits.length + shift < MaxDecimalPlaces) {
    let resultDigit = 0;
    // subtract num2 from num1 repeatedly until
    // num1 is smaller
    while (compareNumbers(num1, num2) != -1) {
      num1 = subtractNumbers(num1, num2);
      resultDigit++;
    }
    // console.log("resultDigit: " + resultDigit);
    resultDigits.unshift(resultDigit);
    // This means that there is no remainder, and we're done.
    if (isZero(num1)) {
      break;
    }
    // only shift left if max decimal places haven't been reached
    // in order to avoid an offset by 1 error
    if (resultDigits.length + shift < MaxDecimalPlaces) {
      // Shift num1 left
      num1 = shiftNumberLeft(num1, 1);
      resultShift++;
    }
    
  }

  // addZeroPadding(num1.wholeDigits, num2.wholeDigits);
  // addZeroPadding(num1.fractionDigits, num2.fractionDigits);
  // const digits1 = convertToDigitSet(num1);
  // const digits2 = convertToDigitSet(num2);
  let result = newNumber(num1.numberBase);
  // Assign digits and shift the result appropriately
  result.wholeDigits = resultDigits;
  // combine initial shift with shift during division
  resultShift = shift - resultShift;
  if (resultShift > 0) {
    result = shiftNumberLeft(result, resultShift);
  } else if (resultShift < 0) {
    result = shiftNumberRight(result, -resultShift);
  }
  // result is only negative if signs of two
  // input numbers weren't equal
  result.negative = sign1 != sign2;
  return result;
}

/**
 * Increases the magnitude of a number
 */
export function shiftNumberLeft(num: FlexibleNumber, by: number): FlexibleNumber {
  num = deepCopy(num);
  for (let i = 0; i < by; i++) {
    const digit = num.fractionDigits.length > 0 ? num.fractionDigits.shift() : 0;
    num.wholeDigits.unshift(digit);
  }
  return num;
}

/**
 * Decreases the magnitude of a number
 */
export function shiftNumberRight(num: FlexibleNumber, by: number): FlexibleNumber {
  num = deepCopy(num);
  for (let i = 0; i < by; i++) {
    const digit = num.wholeDigits.length > 0 ? num.wholeDigits.shift() : 0;
    num.fractionDigits.unshift(digit);
  }
  
  return num;
}

/**
 * Increases the magnitude of the digit set
 */
function shiftDigitSetLeft(digits: Array<number>, by: number): Array<number> {
  const result = deepCopy(digits);
  for (let i = 0; i < by; i++) {
    result.unshift(0);
  }
  return result;
}

/**
 * Decreases the magnitude of a digit set
 */
function shiftDigitSetRight(digits: Array<number>, by: number): Array<number> {
  const result = deepCopy(digits);
  for (let i = 0; i < by; i++) {
    result.push(0);
  }
  return result;
}
