# Flexible Ten Calculator Architecture

The Flexible Ten Calculator architecture is divided into two distinct areas: user interface, and logic.

## User Interface
The user interface is built using react and bootstrap, and lives under the `src/components` folder. The main controlling
component in the user interface is the `<Calculator/>` component, which encapsulates 
the number displays, keyboard, and calculator state.

The `<Calculator/>` component keeps left and right operands, and the pending
arithmetic operation in a react state object. As numbers and operations are
entered into the calculator from the interface, the state is updated accordingly,
which triggers the rendering of the displays.

## Logic
This code lives under the `src/logic` folder. All necessary functionality for rendering
numbers, performing arithmetic operations on numbers, converting numbers between number
bases, lives here.

### Number Bases
Before the calculator can perform any arithmetic operations or conversions, all number
bases must be initialized. This happens on start up of the application. For each number
base, a set of addition and subtraction lookup tables are initialized using the standard
base 2 arithmetic provided by the local machine.

## Numbers
Numbers are represented by the `FlexibleNumber` class, which contains a list of digits,
a decimal place, negative flag, and the number base.

**Addition Tables:** Every number in the base is compared with every other number in 
the base, including itself, and the two numbers are added. The lowest digit of the result is stored, along with a carry that indicates if there was an overflow. For
example, in base 10, take the numbers 4 and 5:
```
4 + 5 = 9
```
In this case, in the lookup table for 4, the entry at index 5 is assigned a value of 9 and the carry flag is set to 0. For numbers 6 and 7:
```
6 + 7 = 13
```
The lookup table for 6 has a value of 3 in index 7, and a carry flag of 1.

**Subtraction Tables:** The subtraction tables work the same way as the addition tables,
but have a different set of results. Each number of a base is compared with every other
number, as in addition tables, and the result is stored along with a carry flag. The carry flag is set if the result is negative.

### Arithmetic Operations
Addition and subtraction are performed on numbers using lookup tables. This allows the
calculator to avoid using the math processor. The reason for this is that the math 
processor always performs arithemtic operations in base 2 - by using lookup tables, it
is possible to perform arithmetic operations in any arbitrary number base, with
arbitrary precision. The Flexible Ten Calculator only supports bases 2 through 16, but the underlying logic layer supports up to base 64 (we may extend the capabilities of the user interface some day).

In order to perform an arithmetic operation on any two numbers, they must be of the same
number base.

#### Addition
Addition between two numbers is performed by:
* zero padding both operands so that each has an equal number of digits to the left
  and to the right of the decimal place.
* Adding each digit from right (smallest value digit) to left (largest value digit) by
  using the addition lookup table for the current number base,
  and applying carry flags to each operation along the way as necessary.

#### Subtraction
Subtraction is performed in the same way as addition, but by using subtraction tables
instead of addition tables.

Depending on if one or both numbers are negative, or if one number is larger than the
other in the case of subtraction, addition may be used instead of subtraction, or vice
versa. For example, if you were to add the numbers 10 and -5, the calculator would
perform subtraction of 10 - 5. If you were to add the numbers -10 and -5, the calculator
would perform addition of 10 + 5, then apply a negative flag to the result.

#### Multiplication
Multiplication is implemented by repeatedly using the addition operation and
decrementing a counter.

#### Division
Division is implemented in the classic long-division method.
It repeatedly uses the subtraction operation and bit-shifting
the denominator to the left (making it bigger) until a zero-remainder result is found.
The operation will continue until it reaches the maximum precision, which is currently
set to 30 digits to the right of the decimal place. If there is still a remainder, the
lowest value digit is rounded.

### Number base conversion
Number base conversion is the key feature provided by the calculator. It works by
performing something similar to long-division to convert a set of digits from the
current number base into the target number base. If there is a fractional part, more
work is needed - basically, the sequence of numbers to the right of the decimal place is
converted into a fractional form (0.123 -> 123 / 1000), then the numerator is converted
to the target number base in the same way as the digits to the left, and long division
is used to convert the fraction back to a sequence of digits.

See `src/logic/convert.ts` for more detail on how this works.
