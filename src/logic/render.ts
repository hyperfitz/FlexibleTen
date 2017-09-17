import {FlexibleNumber, newNumber} from "./number";
import {trimZeroPadding} from "./util";

const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#!";

function buildReverseDigits(): {[key: string]: number} {
  const result = {};
  for (let i = 0; i < digits.length; i++) {
    const c = digits[i];
    result[c] = i;
  }
  return result;
}

const reverseDigits = buildReverseDigits();

/** Converts a digit into its rendered form */
export function renderDigit(digit: number): string {
  return digits[digit];
}

/** Converts a number into a series of rendered digits with decimal place */
export function renderNumber(number: FlexibleNumber): string {
  // build up an array of rendered digits,
  // then combine them into a single string
  const arr = [];
  if (number.wholeDigits.length) {
    number.wholeDigits.forEach(digit => {
      arr.push(renderDigit(digit));
    });
  } else {
    arr.push("0");
  }
  arr.reverse();
  
  if (number.fractionDigits.length) {
    arr.push(".");
    number.fractionDigits.forEach(digit => {
      arr.push(renderDigit(digit));
    });
  }
  return arr.join("");
}

/** Parses a number string representation into a `FlexibleNumber` */
export function parseNumber(numberStr: string, numberBase: number): FlexibleNumber {
  const num = newNumber(numberBase);
  const decimal = numberStr.indexOf(".");
  if (decimal == -1) {
    num.wholeDigits = parseDigits(numberStr);
  } else {
    const parts = numberStr.split(".");
    num.wholeDigits = parseDigits(parts[0]);
    num.fractionDigits = parseDigits(parts[1]);
  }
  // re-order so that least significant digit comes first
  num.wholeDigits.reverse();
  trimZeroPadding(num.wholeDigits);
  trimZeroPadding(num.fractionDigits);
  return num;
}

/** Parses a series of digits from string form into array form */
function parseDigits(digitStr: string): Array<number> {
  const digits: Array<number> = [];
  for (let i = 0; i < digitStr.length; i++) {
    const c = digitStr[i];
    digits.push(reverseDigits[c]);
  }
  return digits;
}