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