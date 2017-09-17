import {FlexibleNumber} from "./number";

/**
 * Adds two digit sets together recursively
 * 
 * The least significant digits are added,
 * then the next up, and so on with any overflow carrying to the
 * next order of magnitude.
 */
export function addDigitSet(numberBase: number, num1: Array<number>, num2: Array<number>, index: number=0, carry: number=0, result?: Array<number>): Array<number> {
  if (result == null) {
    result = [];
  }
  if (index >= num1.length && index >= num2.length) {
    if (carry > 0) {
      result.push(carry);
    }
    return result;
  }
  const digit1 = index < num1.length ? num1[index] : 0;
  const digit2 = index < num2.length ? num2[index] : 0;
  // console.log("add: a=" + digit1 + ", b=" + digit2);
  const sum = digit1 + digit2 + carry;
  const resultDigit = sum % numberBase;
  result.push(resultDigit);

  carry = Math.floor(sum / numberBase);
  addDigitSet(numberBase, num1, num2, index + 1, carry, result);
  return result;
}

/** 
 * Trims the padded zeros from a digit set.
 * 
 * For whole number digit sets, trims the left padded zeros.
 * 
 * `00987` -> `987`
 * 
 * Since fractional digits are ordered in reverse, the same
 * logic will trim right padded zeros.
 * 
 * `0.0098700` -> `0.00987`
 */
export function trimZeroPadding(digitSet: Array<number>) {
  let i = digitSet.length;
  while (digitSet[i - 1] == 0) {
    i--;
  }
  digitSet.splice(i, digitSet.length - i);
}

/**
 * Adds any additional zero padding to make sure that both digit
 * sets are the same length.
 * 
 * Whole digits example: If the numbers `12345` and `987` are aligned, the result will be
 * `12345` and `00987`
 * 
 * Fractional digits example: If the numbers `0.12345` and `0.987` are aligned, the
 * result will be `0.12345` and `0.98700`
 */
export function addZeroPadding(digitSet1: Array<number>, digitSet2: Array<number>) {
  while (digitSet1.length < digitSet2.length) {
    digitSet1.push(0);
  }
  while (digitSet2.length < digitSet1.length) {
    digitSet2.push(0);
  }
}

/** Creates a deep copy of the specified object */
export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Converts a `FlexibleNumber` object into a digit set
 * 
 * The result will be ordered least significant digits
 * to most significant.
 */
export function convertToDigitSet(num: FlexibleNumber): Array<number> {
  const fraction = deepCopy(num.fractionDigits);
  fraction.reverse();
  return fraction.concat(num.wholeDigits);
}

/**
 * Converts a digit set into a `FlexibleNumber` object
 * 
 * @param digits Digit set to convert. This includes both whole and fractional digits.
 * @param decimalPlace This is the number of fractional digits.
 * @param numberBase Base of the flexible number.
 */
export function convertFromDigitSet(digits: Array<number>, decimalPlace: number, numberBase: number, negative?: boolean): FlexibleNumber {
  const wholeDigits = deepCopy(digits);
  const fractionDigits = wholeDigits.splice(0, decimalPlace);
  fractionDigits.reverse();
  trimZeroPadding(wholeDigits);
  trimZeroPadding(fractionDigits);
  return {
    wholeDigits: wholeDigits,
    fractionDigits: fractionDigits,
    numberBase: numberBase,
    negative: negative,
  }
}
