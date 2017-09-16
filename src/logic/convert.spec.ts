import {expect} from "chai";

import {FlexibleNumber} from "./number";
import * as convert from "./convert";
import * as render from "./render";

function flex(wholeDigits: Array<number>, numberBase: number): FlexibleNumber {
  const result: FlexibleNumber = {
    numberBase: numberBase,
    wholeDigits: wholeDigits,
    fractionDigits: [],
  };
  return result;
}

describe("Number conversion", () => {
  
  it("should convert 9 (base 10) to 21 (base 4)", () => {
    const base10 = flex([9], 10);
    const base4 = convert.convertNumber(base10, 4);
    expect(render.renderNumber(base4)).to.equal("21");
  });

  it("should convert 9 (base 10) to 1001 (base 2)", () => {
    const base10 = flex([9], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("1001");
  });

  it("should convert 10 (base 10) to 22 (base 4)", () => {
    const base10 = flex([0, 1], 10);
    const base4 = convert.convertNumber(base10, 4);
    expect(render.renderNumber(base4)).to.equal("22");
  });

  it("should convert 10 (base 10) to 1010 (base 2)", () => {
    const base10 = flex([0, 1], 10);
    const base4 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base4)).to.equal("1010");
  });

  it("should convert 32 (base 10) to 100000 (base 2)", () => {
    const base10 = flex([2, 3], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("100000");
  });

  it("should convert 31 (base 10) to 11111 (base 2)", () => {
    const base10 = flex([1, 3], 10);
    const base2 = convert.convertNumber(base10, 2);
    expect(render.renderNumber(base2)).to.equal("11111");
  });

  it("should convert 11111 (base 2) to 31 (base 10)", () => {
    const base2 = flex([1, 1, 1, 1, 1], 2);
    const base10 = convert.convertNumber(base2, 10);
    expect(render.renderNumber(base10)).to.equal("31");
  });

  it("should convert 1001 (base 2) to 9 (base 10)", () => {
    const base2 = flex([1, 0, 0, 1], 2);
    const base10 = convert.convertNumber(base2, 10);
    expect(render.renderNumber(base10)).to.equal("9");
  });

  it("should convert 1010 (base 2) to 10 (base 10)", () => {
    const base2 = flex([0, 1, 0, 1], 2);
    const base10 = convert.convertNumber(base2, 10);
    expect(render.renderNumber(base10)).to.equal("10");
  });
});
