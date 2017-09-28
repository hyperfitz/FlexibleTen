import { FlexibleNumber, newNumber } from "./number";
import { trimZeroPadding } from "./util";

const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#!";

/**
 * Creates a reverse lookup from digit string to value
 */
function buildReverseDigits(): { [key: string]: number } {
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
  if (number.negative) {
    arr.push("-");
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

/**
 * Checks if each digit in an array is valid for the number base 
 */
function validateDigits(digits: Array<number>, numberBase: number) {
  for (let i = 0; i < digits.length; i++) {
    if (digits[i] < 0 || digits[i] >= numberBase) {
      throw new Error(`invalid digits for base ${numberBase}: ${digits}`);
    }
  }
}

/** Parses a number string representation into a `FlexibleNumber` */
export function parseNumber(numberStr: string, numberBase: number, trimZeros: boolean = true): FlexibleNumber {
  const negative = numberStr.indexOf("-") == 0;
  if (negative) {
    numberStr = numberStr.substring(1);
  }
  const num = newNumber(numberBase);
  const decimal = numberStr.indexOf(".");
  if (decimal == -1) {
    num.wholeDigits = parseDigits(numberStr);
  } else {
    const parts = numberStr.split(".");
    num.wholeDigits = parseDigits(parts[0]);
    num.fractionDigits = parseDigits(parts[1]);
  }
  if (decimal != -1 && num.fractionDigits.length == 0) {
    throw new Error("No fractional component after decimal");
  }
  validateDigits(num.wholeDigits, numberBase);
  validateDigits(num.fractionDigits, numberBase);
  // re-order so that least significant digit comes first
  num.wholeDigits.reverse();
  if (trimZeros) {
    trimZeroPadding(num.wholeDigits);
    trimZeroPadding(num.fractionDigits);
  }
  num.negative = negative;
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