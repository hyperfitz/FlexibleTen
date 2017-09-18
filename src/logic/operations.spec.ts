import {expect} from "chai";

import {addNumbers, subtractNumbers} from "./operations";
import {parseNumber, renderNumber} from "./render";

describe("Add operation", () => {
  
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
});
