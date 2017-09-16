import {FlexibleNumber} from "./number";

export function convertNumber(num: FlexibleNumber, toBase: number): FlexibleNumber {
  const result: FlexibleNumber = {
    wholeDigits: [],
    fractionDigits: [],
    numberBase: toBase,
  };
  let wholeDigits = recursiveConvert(num.wholeDigits[0], toBase);
  for (let i = 1; i < num.wholeDigits.length; i++) {
    wholeDigits = addFlexibleNumbers(toBase, wholeDigits, recursiveConvert(num.wholeDigits[i] * Math.pow(num.numberBase, i), toBase));
  }
  result.wholeDigits = wholeDigits;
  return result;
}

function addFlexibleNumbers(numberBase: number, num1: Array<number>, num2: Array<number>, index: number=0, carry: number=0, result?: Array<number>): Array<number> {
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
  addFlexibleNumbers(numberBase, num1, num2, index + 1, carry, result);
  return result;
}

function recursiveConvert(src: number, toBase: number, result: Array<number>=null): Array<number> {
  // console.log("convert: num=" + src);
  if (result == null) {
    result = [];
  }
  const resultDigit = src % toBase;
  result.push(resultDigit);
  const carry = Math.floor(src / toBase);
  if (carry > 0) {
    recursiveConvert(carry, toBase, result);
  }
  return result;
}