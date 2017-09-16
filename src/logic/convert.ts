import {FlexibleNumber} from "./number";

const MaxDecimalPlaces = 10;

export function convertNumber(num: FlexibleNumber, toBase: number): FlexibleNumber {
  const result: FlexibleNumber = {
    wholeDigits: [],
    fractionDigits: [],
    numberBase: toBase,
  };
  if (num.wholeDigits.length) {
    result.wholeDigits = convertDigitSet(num.wholeDigits, num.numberBase, toBase);
  }
  if (num.fractionDigits.length) {
    let fractionNumerator = getDigitSetValue(num.fractionDigits, num.numberBase);
    let fractionDenominator = Math.pow(num.numberBase, num.fractionDigits.length);
    // Multiply numerator by number base to skip the initial 0 to the left of the decimal point
    result.fractionDigits = longDivision(fractionNumerator * toBase, fractionDenominator, toBase);
    trimZeroPadding(result.fractionDigits);
  }
  return result;
}

function trimZeroPadding(digitSet: Array<number>) {
  let i = digitSet.length;
  while (digitSet[i - 1] == 0) {
    i--;
  }
  digitSet.splice(i, digitSet.length - i);
}

function longDivision(numerator: number, denominator: number, numberBase: number, result?: Array<number>): Array<number> {
  if (result == null) {
    result = [];
  }
  if (result.length < MaxDecimalPlaces) {
    const quotient = Math.floor(numerator / denominator);
    result.push(quotient);
    const remainder = numerator % denominator;
    // console.log("num=" + numerator + ", den=" + denominator + ", quot=" + quotient + ", rem=" + remainder);
    if (remainder > 0) {
      numerator -= quotient * denominator;
      numerator *= numberBase;
      longDivision(numerator, denominator, numberBase, result);
    }
  }
  return result;
}

function getDigitSetValue(digits: Array<number>, numberBase: number): number {
  let result = 0;
  digits.forEach((digit, index) => {
    result += digit * Math.pow(numberBase, index);
  });
  return result;
}

function convertDigitSet(digits: Array<number>, srcBase: number, destBase: number): Array<number> {
  let result = convertDigit(digits[0], destBase);
  for (let i = 1; i < digits.length; i++) {
    result = addDigitSet(destBase, result, convertDigit(digits[i] * Math.pow(srcBase, i), destBase));
  }
  return result;
}

function addDigitSet(numberBase: number, num1: Array<number>, num2: Array<number>, index: number=0, carry: number=0, result?: Array<number>): Array<number> {
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

function convertDigit(src: number, toBase: number, result: Array<number>=null): Array<number> {
  // console.log("convert: num=" + src);
  if (result == null) {
    result = [];
  }
  const resultDigit = src % toBase;
  result.push(resultDigit);
  const carry = Math.floor(src / toBase);
  if (carry > 0) {
    convertDigit(carry, toBase, result);
  }
  return result;
}