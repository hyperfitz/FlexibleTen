const maxBase = 64;

/** Represents the result of an addition or subtraction result of two digits */
export interface NumberTableEntry {
  /** Result number from an operation */
  result: number;
  /** Indicates a carry results from the operation */
  carry: number;
}

/** Represents a table of all addition results for digits of each base */
type NumberTable = {[key: number]: Array<Array<NumberTableEntry>>};

function generateNumberTables(operation: (num1: number, num2: number, base: number) => NumberTableEntry): NumberTable {
  // For each base, create a two-dimensional array
  // of left operand -> right operand -> result, carry
  //
  // Base
  // - left operand
  // - - right operand
  // - - - result, carry
  const tables: NumberTable = {};
  for (let base = 2; base <= maxBase; base++) {
    tables[base] = [];
    for (let num1 = 0; num1 <= base; num1++) {
      tables[base].push([]);
      for (let num2 = 0; num2 <= base; num2++) {
        tables[base][num1].push(operation(num1, num2, base));
      }
    }
  }
  return tables;
}

function generateAdditionTables(): NumberTable {
  return generateNumberTables((num1: number, num2: number, base: number) => {
    const result = (num1 + num2) % base;
    const carry = Math.floor((num1 + num2) / base);
    return {
      result: result,
      carry: carry,
    };
  });
}

const AdditionTables: NumberTable = generateAdditionTables();

function generateSubtractionTables(): NumberTable {
  return generateNumberTables((num1: number, num2: number, base: number) => {
    let result = num1 - num2;
    const carry = result < 0 ? 1 : 0;
    if (carry) {
      result = result + base;
    }
    return {
      result: result,
      carry: carry,
    }
  });
}

const SubtractionTables: NumberTable = generateSubtractionTables();

export function lookupAddition(num1: number, num2: number, base: number): NumberTableEntry {
  return AdditionTables[base][num1][num2];
}

export function lookupSubtraction(num1: number, num2: number, base: number): NumberTableEntry {
  return SubtractionTables[base][num1][num2];
}
