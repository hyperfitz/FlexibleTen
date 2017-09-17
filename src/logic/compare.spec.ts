import {expect} from "chai";

import {newNumber} from "./number";
import * as render from "./render";
import * as compare from "./compare";

function compareNumbers(num1String: string, num2String: string): number {
  const num1 = render.parseNumber(num1String, 10);
  const num2 = render.parseNumber(num2String, 10);
  return compare.compareNumbers(num1, num2);
}

describe("Number comparison", () => {
  it("1234 = 1234", () => {
    expect(compareNumbers("1234", "1234")).to.equal(0);
  });

  it("0.1234 = 0.1234", () => {
    expect(compareNumbers("0.1234", "0.1234")).to.equal(0);
  });

  it("1234.1234 = 1234.1234", () => {
    expect(compareNumbers("1234.1234", "1234.1234")).to.equal(0);
  });

  it("0 = 0", () => {
    expect(compareNumbers("0", "0")).to.equal(0);
  });

  it("1000 > 999", () => {
    expect(compareNumbers("1000", "999")).to.equal(1);
  });

  it("123 > 122", () => {
    expect(compareNumbers("123", "122")).to.equal(1);
  });

  it("223 > 123", () => {
    expect(compareNumbers("223", "123")).to.equal(1);
  });

  it("0.123 > 0.122", () => {
    expect(compareNumbers("0.123", "0.122")).to.equal(1);
  });

  it("0.1231 > 0.123", () => {
    expect(compareNumbers("0.1231", "0.123")).to.equal(1);
  });

  it("0.223 > 0.123", () => {
    expect(compareNumbers("0.223", "0.123")).to.equal(1);
  });

  it("123 < 124", () => {
    expect(compareNumbers("123", "124")).to.equal(-1);
  });

  it("123 < 223", () => {
    expect(compareNumbers("123", "223")).to.equal(-1);
  });

  it("0.123 < 0.124", () => {
    expect(compareNumbers("0.123", "0.124")).to.equal(-1);
  });

  it("0.123 < 0.1234", () => {
    expect(compareNumbers("0.123", "0.1234")).to.equal(-1);
  });

  it("0.123 < 0.223", () => {
    expect(compareNumbers("0.123", "0.223")).to.equal(-1);
  });

  it("-123 = -123", () => {
    expect(compareNumbers("-123", "-123")).to.equal(0);
  });

  it("-0.123 = -0.123", () => {
    expect(compareNumbers("-0.123", "-0.123")).to.equal(0);
  });

  it("-123.123 = -123.123", () => {
    expect(compareNumbers("-123.123", "-123.123")).to.equal(0);
  });

  it("-123 < -122", () => {
    expect(compareNumbers("-123", "-122")).to.equal(-1);
  });

  it("-223 < -123", () => {
    expect(compareNumbers("-223", "-123")).to.equal(-1);
  });

  it("-0.123 < -0.122", () => {
    expect(compareNumbers("-0.123", "-0.122")).to.equal(-1);
  });

  it("-0.1234 < -0.123", () => {
    expect(compareNumbers("-0.1234", "-0.123")).to.equal(-1);
  });

  it("-0.123 > -0.124", () => {
    expect(compareNumbers("-0.123", "-0.124")).to.equal(1);
  });

  it("-0.123 > -0.223", () => {
    expect(compareNumbers("-0.123", "-0.223")).to.equal(1);
  });

  it("-0.123 > -0.1234", () => {
    expect(compareNumbers("-0.123", "-0.1234")).to.equal(1);
  });

  it("123 > -123", () => {
    expect(compareNumbers("123", "-123")).to.equal(1);
  });

  it("-123 < 123", () => {
    expect(compareNumbers("-123", "123")).to.equal(-1);
  });
});
