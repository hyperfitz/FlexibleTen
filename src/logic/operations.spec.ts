import { expect } from "chai";

import { addNumbers, subtractNumbers } from "./operations";
import { parseNumber, renderNumber } from "./render";

function add10(num1String: string, num2String: string): string {
  const num1 = parseNumber(num1String, 10);
  const num2 = parseNumber(num2String, 10);
  const num3 = addNumbers(num1, num2);
  return renderNumber(num3);
}

describe("Add operation", () => {
  it("0 + 0 = 0", () => {
    expect(add10("0", "0")).to.equal("0");
  });

  it("1 + 0 = 0", () => {
    expect(add10("0", "1")).to.equal("1");
  });

  it("0 + 1 = 1", () => {
    expect(add10("1", "0")).to.equal("1");
  });

  it("2 + 2 = 4", () => {
    expect(add10("2", "2")).to.equal("4");
  });

  it("5 + 5 = 10", () => {
    expect(add10("5", "5")).to.equal("10");
  });

  it("500 + 500 = 1000", () => {
    expect(add10("500", "500")).to.equal("1000");
  });

  it("255 + 255 = 510", () => {
    expect(add10("255", "255")).to.equal("510");
  });
  
  it("1234 + 1234 = 2468", () => {
    expect(add10("1234", "1234")).to.equal("2468");
  });

  it("4096 + 4096 = 8192", () => {
    expect(add10("4096", "4096")).to.equal("8192");
  });

  it("0.01 + 0.01 = 0.02", () => {
    expect(add10("0.01", "0.01")).to.equal("0.02");
  });

  it("0.123456789 + 0.123456789 = 0.246913578", () => {
    expect(add10("0.123456789", "0.123456789")).to.equal("0.246913578");
  });

  it("0.987654321 + 0.987654321 = 1.975308642", () => {
    expect(add10("0.987654321", "0.987654321")).to.equal("1.975308642");
  });

  it("123456789.123456789 + 123456789.123456789 = 246913578.24691358", () => {
    expect(add10("123456789.123456789", "123456789.123456789")).to.equal("246913578.246913578");
  });
});

/** Subtract numbers in base 10 */
function sub10(num1String: string, num2String: string): string {
  const num1 = parseNumber(num1String, 10);
  const num2 = parseNumber(num2String, 10);
  const num3 = subtractNumbers(num1, num2);
  return renderNumber(num3);
}

describe("Subtract operation", () => {
  it("0 - 0 = 0", () => {
    expect(sub10("0", "0")).to.equal("0");
  });

  it("1 - 0 = 1", () => {
    expect(sub10("1", "0")).to.equal("1");
  });

  it("0 - 1 = -1", () => {
    expect(sub10("0", "1")).to.equal("-1");
  });

  it("5 - 5 = 0", () => {
    expect(sub10("5", "5")).to.equal("0");
  });

  it("5 - 10 = -5", () => {
    expect(sub10("5", "10")).to.equal("-5");
  });

  it("500 - 1000 = -500", () => {
    expect(sub10("500", "1000")).to.equal("-500");
  });

  it("1000 - 500 = 500", () => {
    expect(sub10("1000", "500")).to.equal("500");
  });

  it("9998 - 9999 = -1", () => {
    expect(sub10("9998", "9999")).to.equal("-1");
  });

  it("9999 - 2 = 9997", () => {
    expect(sub10("9999", "2")).to.equal("9997");
  });

  it("1234 - 34 = 1200", () => {
    expect(sub10("1234", "34")).to.equal("1200");
  });

  it("0.01 - 0.01 = 0", () => {
    expect(sub10("0.01", "0.01")).to.equal("0");
  });

  it("0.02 - 0.01 = 0.01", () => {
    expect(sub10("0.02", "0.01")).to.equal("0.01");
  });

  it("0.9998 - 0.9999 = -0.0001", () => {
    expect(sub10("0.9998", "0.9999")).to.equal("-0.0001");
  });

  it("1234567890.123456789 - 1234567890.123456789 = 0", () => {
    expect(sub10(
      "1234567890.123456789", "1234567890.123456789")).to.equal("0");
  });
});
