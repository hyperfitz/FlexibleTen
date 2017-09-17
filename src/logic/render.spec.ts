import {expect} from "chai";

import * as render from "./render";
import {newNumber} from "./number";

describe("Number parsing", () => {
  it("should parse a whole number in base 10", () => {
    const expected = newNumber(10);
    expected.wholeDigits = [4, 3, 2, 1];
    expect(render.parseNumber("1234", 10)).to.deep.equal(expected);
  });

  it("should parse a fractional number in base 10", () => {
    const expected = newNumber(10);
    expected.fractionDigits = [1, 2, 3, 4];
    expect(render.parseNumber("0.1234", 10)).to.deep.equal(expected);
  });

  it("should parse a number with both fractional and whole components in base 10", () => {
    const expected = newNumber(10);
    expected.wholeDigits = [4, 3, 2, 1];
    expected.fractionDigits = [1, 2, 3, 4];
    expect(render.parseNumber("1234.1234", 10)).to.deep.equal(expected);
  });

  it("should parse 0 as a number with no digits", () => {
    const expected = newNumber(10);
    expect(render.parseNumber("0", 10)).to.deep.equal(expected);
  });

  // TODO: test for negative number parsing
});

describe("Number rendering", () => {
  it("should format a whole number in base 10", () => {
    const num = newNumber(10);
    num.wholeDigits = [4, 3, 2, 1];
    expect(render.renderNumber(num)).to.equal("1234");
  });

  it("should format a whole number in base 16", () => {
    const num = newNumber(16);
    num.wholeDigits = [15, 14, 13, 12];
    expect(render.renderNumber(num)).to.equal("cdef");
  });

  it("should format a fractional number in base 10", () => {
    const num = newNumber(10);
    num.fractionDigits = [1, 2, 3, 4];
    expect(render.renderNumber(num)).to.equal("0.1234");
  });

  it("should format a fractional number in base 16", () => {
    const num = newNumber(16);
    num.fractionDigits = [12, 13, 14, 15];
    expect(render.renderNumber(num)).to.equal("0.cdef");
  });

  it("should format a mixed number in base 10", () => {
    const num = newNumber(10);
    num.wholeDigits = [4, 3, 2, 1];
    num.fractionDigits = [1, 2, 3, 4];
    expect(render.renderNumber(num)).to.equal("1234.1234");
  });

  it("should format 0 in base 10", () => {
    const num = newNumber(10);
    expect(render.renderNumber(num)).to.equal("0");
  });

  // TODO: test for negative number formatting
});
