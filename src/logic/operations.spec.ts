import { expect } from "chai";

import { addNumbers, subtractNumbers, multiplyNumbers} from "./operations";
import { parseNumber, renderNumber } from "./render";

function add10(num1String: string, num2String: string): string {
  const num1 = parseNumber(num1String, 10);
  const num2 = parseNumber(num2String, 10);
  const num3 = addNumbers(num1, num2);
  return renderNumber(num3);
}

describe("Add operation", () => {
  it("base10: 0 + 0 = 0", () => {
    expect(add10("0", "0")).to.equal("0");
  });

  it("base10: 1 + 0 = 0", () => {
    expect(add10("0", "1")).to.equal("1");
  });

  it("base10: 0 + 1 = 1", () => {
    expect(add10("1", "0")).to.equal("1");
  });

  it("base10: 2 + 2 = 4", () => {
    expect(add10("2", "2")).to.equal("4");
  });

  it("base10: 5 + 5 = 10", () => {
    expect(add10("5", "5")).to.equal("10");
  });

  it("base10: 500 + 500 = 1000", () => {
    expect(add10("500", "500")).to.equal("1000");
  });

  it("base10: 255 + 255 = 510", () => {
    expect(add10("255", "255")).to.equal("510");
  });
  
  it("base10: 1234 + 1234 = 2468", () => {
    expect(add10("1234", "1234")).to.equal("2468");
  });

  it("base10: 4096 + 4096 = 8192", () => {
    expect(add10("4096", "4096")).to.equal("8192");
  });

  it("base10: 0.01 + 0.01 = 0.02", () => {
    expect(add10("0.01", "0.01")).to.equal("0.02");
  });

  it("base10: 0.123456789 + 0.123456789 = 0.246913578", () => {
    expect(add10("0.123456789", "0.123456789")).to.equal("0.246913578");
  });

  it("base10: 0.987654321 + 0.987654321 = 1.975308642", () => {
    expect(add10("0.987654321", "0.987654321")).to.equal("1.975308642");
  });

  it("base10: 123456789.123456789 + 123456789.123456789 = 246913578.24691358", () => {
    expect(add10("123456789.123456789", "123456789.123456789")).to.equal("246913578.246913578");
  });

  it("base10: 1 + -1 = 0", () => {
    expect(add10("1", "-1")).to.equal("0");
  });

  it("base10: -1 + -1 = -2", () => {
    expect(add10("-1", "-1")).to.equal("-2");
  });

  it("base10: -9999 + 9999 = 0", () => {
    expect(add10("-9999", "9999")).to.equal("0");
  });

  it("base10: 0 + -1 = -1", () => {
    expect(add10("0", "-1")).to.equal("-1");
  });

  it("base10: -1 + 0 = -1", () => {
    expect(add10("-1", "0")).to.equal("-1");
  })

  it("base10: -5 + -5 = -10", () => {
    expect(add10("-5", "-5")).to.equal("-10");
  });

  it("base10: -1000 + 500 = -500", () => {
    expect(add10("-1000", "500")).to.equal("-500");
  });

  it("base10: 500 + -1000 = -500", () => {
    expect(add10("500", "-1000")).to.equal("-500");
  });

  it("base10: -500 + 1000 = 500", () => {
    expect(add10("-500", "1000")).to.equal("500");
  });

  it("base10: 1000 + -500 = 500", () => {
    expect(add10("1000", "-500")).to.equal("500");
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
  it("base10: 0 - 0 = 0", () => {
    expect(sub10("0", "0")).to.equal("0");
  });

  it("base10: 1 - 0 = 1", () => {
    expect(sub10("1", "0")).to.equal("1");
  });

  it("base10: 0 - 1 = -1", () => {
    expect(sub10("0", "1")).to.equal("-1");
  });

  it("base10: 5 - 5 = 0", () => {
    expect(sub10("5", "5")).to.equal("0");
  });

  it("base10: 5 - 10 = -5", () => {
    expect(sub10("5", "10")).to.equal("-5");
  });

  it("base10: 500 - 1000 = -500", () => {
    expect(sub10("500", "1000")).to.equal("-500");
  });

  it("base10: 1000 - 500 = 500", () => {
    expect(sub10("1000", "500")).to.equal("500");
  });

  it("base10: 9998 - 9999 = -1", () => {
    expect(sub10("9998", "9999")).to.equal("-1");
  });

  it("base10: 9999 - 2 = 9997", () => {
    expect(sub10("9999", "2")).to.equal("9997");
  });

  it("base10: 1234 - 34 = 1200", () => {
    expect(sub10("1234", "34")).to.equal("1200");
  });

  it("base10: 0.01 - 0.01 = 0", () => {
    expect(sub10("0.01", "0.01")).to.equal("0");
  });

  it("base10: 0.02 - 0.01 = 0.01", () => {
    expect(sub10("0.02", "0.01")).to.equal("0.01");
  });

  it("base10: 0.9998 - 0.9999 = -0.0001", () => {
    expect(sub10("0.9998", "0.9999")).to.equal("-0.0001");
  });

  it("base10: 1234567890.123456789 - 1234567890.123456789 = 0", () => {
    expect(sub10(
      "1234567890.123456789", "1234567890.123456789")).to.equal("0");
  });

  it("base10: 5 - -5 = 10", () => {
    expect(sub10("5", "-5")).to.equal("10");
  });

  it("base10: -5 - 5 = -10", () => {
    expect(sub10("-5", "5")).to.equal("-10");
  });

  it("base10: -5 - -5 = 0", () => {
    expect(sub10("-5", "-5")).to.equal("0");
  });
});



function mul(num1String: string, num2String: string, baseNum: number): string {
  const num1 = parseNumber(num1String, baseNum);
  const num2 = parseNumber(num2String, baseNum);
  const num3 = multiplyNumbers(num1, num2);
  return renderNumber(num3);
}

/** Multiply numbers in base 10 */
function mul10(num1String: string, num2String: string): string {
  return mul(num1String, num2String, 10);
}

function mul2(num1String: string, num2String: string): string {
  return mul(num1String, num2String, 2);
}

describe("Multiply operation", () => {
  it("base10: 0 * 0 = 0", () => {
    expect(mul10("0", "0")).to.equal("0");
  });

  it("base10: 0 * 1 = 0", () => {
    expect(mul10("0", "1")).to.equal("0");
  });

  it("base10: 1 * 1 = 1", () => {
    expect(mul10("1", "1")).to.equal("1");
  });

  it("base10: 2 * 2 = 4", () => {
    expect(mul10("2", "2")).to.equal("4");
  });

  it("base10: 10 * 10 = 100", () => {
    expect(mul10("10", "10")).to.equal("100");
  });

  it("base10: 90 * 90 = 8100", () => {
    expect(mul10("90", "90")).to.equal("8100");
  });

  it("base10: 0.1 * 1 = 0.1", () => {
    expect(mul10("0.1", "1")).to.equal("0.1");
  });

  it("base10: 0.1 * 0 = 0", () => {
    expect(mul10("0.1", "0")).to.equal("0");
  });

  it("base10: 0.1 * 0.1 = 0.01", () => {
    expect(mul10("0.1", "0.1")).to.equal("0.01");
  });

  it("base10: 1.2 * 1.2 = 1.44", () => {
    expect(mul10("1.2", "1.2")).to.equal("1.44");
  });

  it("base10: 1.1 * 1.004 = 1.10044", () => {
    expect(mul10("1.1", "1.004")).to.equal("1.1044");
  });

  it("base10: 1.004 * 1.1 = 1.10044", () => {
    expect(mul10("1.004", "1.1")).to.equal("1.1044");
  });

  it("base2: 1 * 10 = 10 (1 * 2 = 2)", () => {
    expect(mul2("1", "10")).to.equal("10");
  });

  it("base2: 10 * 10 = 100 (2 * 2 = 4)", () => {
    expect(mul2("10", "10")).to.equal("100");
  });

  it("base2: 11 * 11 = 1001 (3 * 3 = 9)", () => {
    expect(mul2("11", "11")).to.equal("1001");
  });

  it("base10: -1 * 1 = -1", () => {
    expect(mul10("-1", "1")).to.equal("-1");
  });

  it("base10: -1 * 0 = 0", () => {
    expect(mul10("-1", "0")).to.equal("0");
  });

  it("base10: -1 * -1 = 1", () => {
    expect(mul10("-1", "-1")).to.equal("1");
  });

  it("base10: -10 * -10 = 100", () => {
    expect(mul10("-10", "-10")).to.equal("100");
  });

  it("base10: -10 * 10 = -100", () => {
    expect(mul10("-10", "10")).to.equal("-100");
  });
});