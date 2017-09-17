/**
 * Numbers are represented as a series of digits
 * with a decimal place.
 */
export interface FlexibleNumber {

  /**
   * The base of the number system
   * to which this number belongs (like base 10).
   * Currently number systems from 2 to 64 are supported.
   */
  numberBase: number;

  /**
   * Each digit is an integer ranging from 0
   * to the base of the number system - 1.
   * Digits are ordered from left to right in order
   * of decreasing value.
   * So in base 10, the number 1234
   * would be represented in the array of digits
   * as [1,2,3,4]
   */
  wholeDigits: Array<number>;

  /**
   * Just like `wholeDigits`, but to the right of the decimal place.
   */
  fractionDigits: Array<number>;

  /**
   * If true, this is a negative number
   */
  negative?: boolean;
}

/**
 * Convenience function for creating a new empty number
 * with the specified number base.
 */
export function newNumber(numberBase: number): FlexibleNumber {
  return {
    fractionDigits: [],
    wholeDigits: [],
    numberBase: numberBase,
  };
}
