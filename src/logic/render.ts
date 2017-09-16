import {FlexibleNumber} from "./number";

const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#!";

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