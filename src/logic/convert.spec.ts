import {expect} from "chai";

import {FlexibleNumber, newNumber} from "./number";
import * as convert from "./convert";
import * as render from "./render";

/**
 * short-hand for number creation.
 * 
 * TODO: replace this with a string-based version and update conversion tests.
 */
function flex(wholeDigits: Array<number>, fractionDigits: Array<number>, numberBase: number): FlexibleNumber {
  const result: FlexibleNumber = {
    numberBase: numberBase,
    wholeDigits: wholeDigits,
    fractionDigits: fractionDigits,
  };
  return result;
}

describe("Number conversion", () => {

  it("should convert 9 (base 10) to 21 (base 4)", () => {
    const base10 = flex([9], [], 10);
    const base4 = convert.convertNumber(base10, 4);
    expect(render.renderNumber(base4)).to.equal("21");
  });

  it("should convert 9 (base 10) to 1001 (base 2)", () => {
    const base10 = flex([9], [], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("1001");
  });

  it("should convert 10 (base 10) to 22 (base 4)", () => {
    const base10 = flex([0, 1], [], 10);
    const base4 = convert.convertNumber(base10, 4);
    expect(render.renderNumber(base4)).to.equal("22");
  });

  it("should convert 10 (base 10) to 1010 (base 2)", () => {
    const base10 = flex([0, 1], [], 10);
    const base4 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base4)).to.equal("1010");
  });

  it("should convert 32 (base 10) to 100000 (base 2)", () => {
    const base10 = flex([2, 3], [], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("100000");
  });

  it("should convert 31 (base 10) to 11111 (base 2)", () => {
    const base10 = flex([1, 3], [], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("11111");
  });

  it("should convert 11111 (base 2) to 31 (base 10)", () => {
    const base2 = flex([1, 1, 1, 1, 1], [], 2);
    const base10 = convert.convertNumber(base2, 10);
    expect(render.renderNumber(base10)).to.equal("31");
  });

  it("should convert 1001 (base 2) to 9 (base 10)", () => {
    const base2 = flex([1, 0, 0, 1], [], 2);
    const base10 = convert.convertNumber(base2, 10);
    expect(render.renderNumber(base10)).to.equal("9");
  });

  it("should convert 1010 (base 2) to 10 (base 10)", () => {
    const base2 = flex([0, 1, 0, 1], [], 2);
    const base10 = convert.convertNumber(base2, 10);
    expect(render.renderNumber(base10)).to.equal("10");
  });

  it("should convert 0.5 (base 10) to 0.1 (base 2)", () => {
    const base10 = flex([], [5], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("0.1");
  });

  it("should convert 0.25 (base 10) to 0.01 (base 2)", () => {
    const base10 = flex([], [2, 5], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("0.01");
  });

  it("should convert f (base 16) to 15 (base 10)", () => {
    const base16 = flex([15], [], 16);
    const base10 = convert.convertNumber(base16, 10);
    expect(render.renderNumber(base10)).to.equal("15");
  });

  it("should convert 0.8 (base 16) to 0.5 (base 10)", () => {
    const base16 = flex([], [8], 16);
    const base10 = convert.convertNumber(base16, 10);
    expect(render.renderNumber(base10)).to.equal("0.5");
  });

  it("should convert 0.2 (base 10) to 0.0011001100 (base 2)", () => {
    const base10 = flex([], [2], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("0.0011001100110011001100110011");
  });

  it("should convert 2.5 (base 10) to 10.1 (base 2)", () => {
    const base10 = flex([2], [5], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("10.1");
  });

  it("-2.5 (base 10) -> -10.1 (base 2)", () => {
    const base10 = flex([2], [5], 10);
    base10.negative = true;
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("-10.1");
  });

  it("0.333... (base 10) -> 0.333... (base 10)", () => {
    // early conversion inaccuracy caused this test to fail
    const longNumber = "0.333333333333333333333333333333";
    const result = convert.convertNumber(render.parseNumber(longNumber, 10), 10);
    expect(render.renderNumber(result)).to.equal(longNumber);
  });

  it("Imprecision error: 3.111... (base 4) -> 3.3333...044212... (base 10)", () => {
    // This is the result of 10 / 3 in base 4.
    const longNumber = "3.111111111111111111111111111111";
    const result = convert.convertNumber(render.parseNumber(longNumber, 4), 10);
    expect(render.renderNumber(result)).to.equal("3.333333333333333333044212754003");
  });
});
