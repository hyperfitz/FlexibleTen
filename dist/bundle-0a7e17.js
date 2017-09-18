/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var numbertables_1 = __webpack_require__(3);
/**
 * Adds two digit sets together recursively
 *
 * The least significant digits are added,
 * then the next up, and so on with any overflow carrying to the
 * next order of magnitude.
 */
function addDigitSet(numberBase, num1, num2, index, carry, result) {
    if (index === void 0) { index = 0; }
    if (carry === void 0) { carry = 0; }
    // result is created on the first iteration
    if (result == null) {
        result = [];
    }
    // Once the index has advanced beyond the end of both numbers, the add operation is over
    if (index >= num1.length && index >= num2.length) {
        // if carry is set, make sure to append the last number
        // (so that 50 + 50 = 100 and not 00)
        if (carry > 0) {
            result.push(carry);
        }
        return result;
    }
    var digit1 = index < num1.length ? num1[index] : 0;
    var digit2 = index < num2.length ? num2[index] : 0;
    // First add the two numbers, then add the carry
    var sum = numbertables_1.lookupAddition(digit1, digit2, numberBase);
    var sum2 = numbertables_1.lookupAddition(sum.result, carry, numberBase);
    result.push(sum2.result);
    carry = sum.carry + sum2.carry;
    // carry = Math.floor(sum / numberBase);
    addDigitSet(numberBase, num1, num2, index + 1, carry, result);
    return result;
}
exports.addDigitSet = addDigitSet;
/**
 * Trims the padded zeros from a digit set.
 *
 * For whole number digit sets, trims the left padded zeros.
 *
 * `00987` -> `987`
 *
 * Since fractional digits are ordered in reverse, the same
 * logic will trim right padded zeros.
 *
 * `0.0098700` -> `0.00987`
 */
function trimZeroPadding(digitSet) {
    var i = digitSet.length;
    while (digitSet[i - 1] == 0) {
        i--;
    }
    digitSet.splice(i, digitSet.length - i);
}
exports.trimZeroPadding = trimZeroPadding;
/**
 * Adds any additional zero padding to make sure that both digit
 * sets are the same length.
 *
 * Whole digits example: If the numbers `12345` and `987` are aligned, the result will be
 * `12345` and `00987`
 *
 * Fractional digits example: If the numbers `0.12345` and `0.987` are aligned, the
 * result will be `0.12345` and `0.98700`
 */
function addZeroPadding(digitSet1, digitSet2) {
    while (digitSet1.length < digitSet2.length) {
        digitSet1.push(0);
    }
    while (digitSet2.length < digitSet1.length) {
        digitSet2.push(0);
    }
}
exports.addZeroPadding = addZeroPadding;
/** Creates a deep copy of the specified object */
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepCopy = deepCopy;
/**
 * Converts a `FlexibleNumber` object into a digit set
 *
 * The result will be ordered least significant digits
 * to most significant.
 */
function convertToDigitSet(num) {
    var fraction = deepCopy(num.fractionDigits);
    fraction.reverse();
    return fraction.concat(num.wholeDigits);
}
exports.convertToDigitSet = convertToDigitSet;
/**
 * Converts a digit set into a `FlexibleNumber` object
 *
 * @param digits Digit set to convert. This includes both whole and fractional digits.
 * @param decimalPlace This is the number of fractional digits.
 * @param numberBase Base of the flexible number.
 */
function convertFromDigitSet(digits, decimalPlace, numberBase, negative) {
    var wholeDigits = deepCopy(digits);
    var fractionDigits = wholeDigits.splice(0, decimalPlace);
    fractionDigits.reverse();
    trimZeroPadding(wholeDigits);
    trimZeroPadding(fractionDigits);
    return {
        wholeDigits: wholeDigits,
        fractionDigits: fractionDigits,
        numberBase: numberBase,
        negative: negative,
    };
}
exports.convertFromDigitSet = convertFromDigitSet;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convenience function for creating a new empty number
 * with the specified number base.
 */
function newNumber(numberBase) {
    return {
        fractionDigits: [],
        wholeDigits: [],
        numberBase: numberBase,
        negative: false,
    };
}
exports.newNumber = newNumber;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var maxBase = 64;
function generateNumberTables(operation) {
    // For each base, create a two-dimensional array
    // of left operand -> right operand -> result, carry
    //
    // Base
    // - left operand
    // - - right operand
    // - - - result, carry
    var tables = {};
    for (var base = 2; base <= maxBase; base++) {
        tables[base] = [];
        for (var num1 = 0; num1 <= base; num1++) {
            tables[base].push([]);
            for (var num2 = 0; num2 <= base; num2++) {
                tables[base][num1].push(operation(num1, num2, base));
            }
        }
    }
    return tables;
}
function generateAdditionTables() {
    return generateNumberTables(function (num1, num2, base) {
        var result = (num1 + num2) % base;
        var carry = Math.floor((num1 + num2) / base);
        return {
            result: result,
            carry: carry,
        };
    });
}
var AdditionTables = generateAdditionTables();
function generateSubtractionTables() {
    return generateNumberTables(function (num1, num2, base) {
        var result = num1 - num2;
        var carry = result < 0 ? 1 : 0;
        if (carry) {
            result = result + base;
        }
        return {
            result: result,
            carry: carry,
        };
    });
}
var SubtractionTables = generateSubtractionTables();
function lookupAddition(num1, num2, base) {
    return AdditionTables[base][num1][num2];
}
exports.lookupAddition = lookupAddition;
function lookupSubtraction(num1, num2, base) {
    return SubtractionTables[base][num1][num2];
}
exports.lookupSubtraction = lookupSubtraction;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(16);
module.exports = __webpack_require__(17);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(6);
var App_1 = __webpack_require__(7);
ReactDOM.render(React.createElement(App_1.App, null), document.getElementById("example"));


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var CalcPage_1 = __webpack_require__(8);
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.componentWillMount = function () {
    };
    App.prototype.render = function () {
        return React.createElement("div", { className: "cl-mcont" },
            React.createElement(CalcPage_1.CalcPage, null));
    };
    return App;
}(React.Component));
exports.App = App;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Calculator_1 = __webpack_require__(9);
var CalcPage = (function (_super) {
    __extends(CalcPage, _super);
    function CalcPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalcPage.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-3 col-md-3" }),
                React.createElement("div", { className: "col-lg-6 col-md-6" },
                    React.createElement("h1", { className: "text-center calc-header" }, "Flexible Ten Calculator")),
                React.createElement("div", { className: "col-lg-3 col-md-3" })),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-3 col-md-3" }),
                React.createElement("div", { className: "col-lg-6 col-md-6" },
                    React.createElement(Calculator_1.Calculator, null)),
                React.createElement("div", { className: "col-lg-3 col-md-3" })));
    };
    return CalcPage;
}(React.Component));
exports.CalcPage = CalcPage;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var CalcButton_1 = __webpack_require__(10);
var NumberDisplay_1 = __webpack_require__(11);
var convert = __webpack_require__(13);
var operations = __webpack_require__(14);
var Calculator = (function (_super) {
    __extends(Calculator, _super);
    function Calculator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Calculator.prototype.updateRegisterA = function (num) {
        var numb = convert.convertNumber(num, this.state.displayRegisterB.numberBase);
        this.setState({
            displayRegisterA: num,
            displayRegisterB: numb,
        });
    };
    Calculator.prototype.onClear = function () {
        this.setState({
            fraction: false,
            operationPending: false,
            operation: "",
        });
        var reg = this.state.displayRegisterA;
        reg.fractionDigits = [];
        reg.wholeDigits = [];
        reg.negative = false;
        this.updateRegisterA(reg);
    };
    Calculator.prototype.handleNumberEntry = function (id) {
        // console.log("calc click - " + id);
        if (this.state.operationPending) {
            var operationRegister = JSON.parse(JSON.stringify(this.state.displayRegisterA));
            this.state.displayRegisterA.fractionDigits = [];
            this.state.displayRegisterA.wholeDigits = [];
            this.state.displayRegisterA.negative = false;
            this.setState({
                operationRegister: operationRegister,
                operationPending: false,
            });
        }
        var num = parseInt(id);
        var reg = this.state.displayRegisterA;
        if (this.state.fraction) {
            reg.fractionDigits.push(num);
        }
        else {
            reg.wholeDigits.unshift(num);
        }
        this.updateRegisterA(reg);
    };
    Calculator.prototype.handleOperation = function () {
        if (!this.state.operation) {
            return;
        }
        var newNumber;
        if (this.state.operation == "+") {
            newNumber = operations.addNumbers(this.state.operationRegister, this.state.displayRegisterA);
        }
        if (this.state.operation == "-") {
            newNumber = operations.subtractNumbers(this.state.operationRegister, this.state.displayRegisterA);
        }
        if (this.state.operation == "*") {
            console.log("multiplication!");
            return;
        }
        if (this.state.operation == "/") {
            console.log("division!");
            return;
        }
        this.setState({
            operationRegister: null,
            operation: null,
        });
        this.updateRegisterA(newNumber);
    };
    Calculator.prototype.handleOperationClick = function (operation) {
        this.setState({
            operationPending: true,
            operation: operation,
            fraction: false,
        });
    };
    Calculator.prototype.handleDecimalClick = function () {
        this.setState({
            fraction: true
        });
    };
    Calculator.prototype.componentWillMount = function () {
        var displayRegisterA = {
            negative: false,
            fractionDigits: [],
            wholeDigits: [],
            numberBase: 10,
        };
        var displayRegisterB = {
            negative: false,
            fractionDigits: [],
            wholeDigits: [],
            numberBase: 16,
        };
        this.setState({
            displayRegisterA: displayRegisterA,
            displayRegisterB: displayRegisterB,
        });
    };
    Calculator.prototype.render = function () {
        console.log("rendering");
        return React.createElement("div", { className: "block-flat calculator" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12 col-md-12" },
                    React.createElement("h4", { className: "text-center" },
                        "Number System: ",
                        React.createElement("strong", null, this.state.displayRegisterA.numberBase)),
                    React.createElement(NumberDisplay_1.NumberDisplay, { num: this.state.displayRegisterA }))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12 col-md-12" },
                    React.createElement("h4", { className: "text-center" },
                        "Number System: ",
                        React.createElement("strong", null, this.state.displayRegisterB.numberBase)),
                    React.createElement(NumberDisplay_1.NumberDisplay, { num: this.state.displayRegisterB }))),
            React.createElement("div", { className: "row" },
                React.createElement(CalcButton_1.CalcButton, { onClick: this.onClear.bind(this) }, "C"),
                React.createElement(CalcButton_1.CalcButton, null, "()"),
                React.createElement(CalcButton_1.CalcButton, { id: "%", onClick: this.handleOperationClick.bind(this) }, "%"),
                React.createElement(CalcButton_1.CalcButton, { id: "/", onClick: this.handleOperationClick.bind(this) }, "/")),
            React.createElement("div", { className: "row" },
                React.createElement(CalcButton_1.CalcButton, { id: "7", onClick: this.handleNumberEntry.bind(this) }, "7"),
                React.createElement(CalcButton_1.CalcButton, { id: "8", onClick: this.handleNumberEntry.bind(this) }, "8"),
                React.createElement(CalcButton_1.CalcButton, { id: "9", onClick: this.handleNumberEntry.bind(this) }, "9"),
                React.createElement(CalcButton_1.CalcButton, { id: "*", onClick: this.handleOperationClick.bind(this) }, "*")),
            React.createElement("div", { className: "row" },
                React.createElement(CalcButton_1.CalcButton, { id: "4", onClick: this.handleNumberEntry.bind(this) }, "4"),
                React.createElement(CalcButton_1.CalcButton, { id: "5", onClick: this.handleNumberEntry.bind(this) }, "5"),
                React.createElement(CalcButton_1.CalcButton, { id: "6", onClick: this.handleNumberEntry.bind(this) }, "6"),
                React.createElement(CalcButton_1.CalcButton, { id: "-", onClick: this.handleOperationClick.bind(this) }, "-")),
            React.createElement("div", { className: "row" },
                React.createElement(CalcButton_1.CalcButton, { id: "1", onClick: this.handleNumberEntry.bind(this) }, "1"),
                React.createElement(CalcButton_1.CalcButton, { id: "2", onClick: this.handleNumberEntry.bind(this) }, "2"),
                React.createElement(CalcButton_1.CalcButton, { id: "3", onClick: this.handleNumberEntry.bind(this) }, "3"),
                React.createElement(CalcButton_1.CalcButton, { id: "+", onClick: this.handleOperationClick.bind(this) }, "+")),
            React.createElement("div", { className: "row" },
                React.createElement(CalcButton_1.CalcButton, null, "\u00B1"),
                React.createElement(CalcButton_1.CalcButton, { id: "0", onClick: this.handleNumberEntry.bind(this) }, "0"),
                React.createElement(CalcButton_1.CalcButton, { onClick: this.handleDecimalClick.bind(this) }, "."),
                React.createElement(CalcButton_1.CalcButton, { onClick: this.handleOperation.bind(this) }, "=")));
    };
    return Calculator;
}(React.Component));
exports.Calculator = Calculator;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var CalcButton = (function (_super) {
    __extends(CalcButton, _super);
    function CalcButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalcButton.prototype.handleClick = function () {
        // console.log("click! - " + this.props.id);
        if (this.props.onClick) {
            this.props.onClick(this.props.id);
        }
    };
    CalcButton.prototype.render = function () {
        return React.createElement("div", { className: "col-xs-3 col-sm-3 col-md-3 col-lg-3" },
            React.createElement("button", { className: "btn btn-default", onClick: this.handleClick.bind(this) }, this.props.children));
    };
    return CalcButton;
}(React.Component));
exports.CalcButton = CalcButton;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var render = __webpack_require__(12);
var NumberDisplay = (function (_super) {
    __extends(NumberDisplay, _super);
    function NumberDisplay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberDisplay.prototype.render = function () {
        var result = render.renderNumber(this.props.num);
        console.log("number display render - " + result);
        return React.createElement("div", { className: "form-control calc-display" }, result);
    };
    return NumberDisplay;
}(React.Component));
exports.NumberDisplay = NumberDisplay;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var number_1 = __webpack_require__(2);
var util_1 = __webpack_require__(1);
var digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#!";
function buildReverseDigits() {
    var result = {};
    for (var i = 0; i < digits.length; i++) {
        var c = digits[i];
        result[c] = i;
    }
    return result;
}
var reverseDigits = buildReverseDigits();
/** Converts a digit into its rendered form */
function renderDigit(digit) {
    return digits[digit];
}
exports.renderDigit = renderDigit;
/** Converts a number into a series of rendered digits with decimal place */
function renderNumber(number) {
    // build up an array of rendered digits,
    // then combine them into a single string
    var arr = [];
    if (number.wholeDigits.length) {
        number.wholeDigits.forEach(function (digit) {
            arr.push(renderDigit(digit));
        });
    }
    else {
        arr.push("0");
    }
    if (number.negative) {
        arr.push("-");
    }
    arr.reverse();
    if (number.fractionDigits.length) {
        arr.push(".");
        number.fractionDigits.forEach(function (digit) {
            arr.push(renderDigit(digit));
        });
    }
    return arr.join("");
}
exports.renderNumber = renderNumber;
/** Parses a number string representation into a `FlexibleNumber` */
function parseNumber(numberStr, numberBase) {
    var negative = numberStr.indexOf("-") == 0;
    if (negative) {
        numberStr = numberStr.substring(1);
    }
    var num = number_1.newNumber(numberBase);
    var decimal = numberStr.indexOf(".");
    if (decimal == -1) {
        num.wholeDigits = parseDigits(numberStr);
    }
    else {
        var parts = numberStr.split(".");
        num.wholeDigits = parseDigits(parts[0]);
        num.fractionDigits = parseDigits(parts[1]);
    }
    // re-order so that least significant digit comes first
    num.wholeDigits.reverse();
    util_1.trimZeroPadding(num.wholeDigits);
    util_1.trimZeroPadding(num.fractionDigits);
    num.negative = negative;
    return num;
}
exports.parseNumber = parseNumber;
/** Parses a series of digits from string form into array form */
function parseDigits(digitStr) {
    var digits = [];
    for (var i = 0; i < digitStr.length; i++) {
        var c = digitStr[i];
        digits.push(reverseDigits[c]);
    }
    return digits;
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(1);
var MaxDecimalPlaces = 30;
function convertNumber(num, toBase) {
    var result = {
        wholeDigits: [],
        fractionDigits: [],
        numberBase: toBase,
    };
    if (num.wholeDigits.length) {
        result.wholeDigits = convertDigitSet(num.wholeDigits, num.numberBase, toBase);
    }
    if (num.fractionDigits.length) {
        var fractionNumerator = getDigitSetValue(num.fractionDigits, num.numberBase);
        var fractionDenominator = Math.pow(num.numberBase, num.fractionDigits.length);
        // Multiply numerator by number base to skip the initial 0 to the left of the decimal point
        result.fractionDigits = longDivision(fractionNumerator * toBase, fractionDenominator, toBase);
        util_1.trimZeroPadding(result.fractionDigits);
    }
    return result;
}
exports.convertNumber = convertNumber;
function longDivision(numerator, denominator, numberBase, result) {
    if (result == null) {
        result = [];
    }
    if (result.length < MaxDecimalPlaces) {
        var quotient = Math.floor(numerator / denominator);
        result.push(quotient);
        var remainder = numerator % denominator;
        // console.log("num=" + numerator + ", den=" + denominator + ", quot=" + quotient + ", rem=" + remainder);
        if (remainder > 0) {
            numerator -= quotient * denominator;
            numerator *= numberBase;
            longDivision(numerator, denominator, numberBase, result);
        }
    }
    return result;
}
function getDigitSetValue(digits, numberBase) {
    var result = 0;
    digits.forEach(function (digit, index) {
        result += digit * Math.pow(numberBase, index);
    });
    return result;
}
function convertDigitSet(digits, srcBase, destBase) {
    var result = convertDigit(digits[0], destBase);
    for (var i = 1; i < digits.length; i++) {
        result = util_1.addDigitSet(destBase, result, convertDigit(digits[i] * Math.pow(srcBase, i), destBase));
    }
    return result;
}
function convertDigit(src, toBase, result) {
    if (result === void 0) { result = null; }
    // console.log("convert: num=" + src);
    if (result == null) {
        result = [];
    }
    var resultDigit = src % toBase;
    result.push(resultDigit);
    var carry = Math.floor(src / toBase);
    if (carry > 0) {
        convertDigit(carry, toBase, result);
    }
    return result;
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(1);
var number_1 = __webpack_require__(2);
var compare_1 = __webpack_require__(15);
var numbertables_1 = __webpack_require__(3);
/**
 * Adds two numbers together
 *
 * // TODO: support negative numbers
 */
function addNumbers(num1, num2) {
    // TODO: support negative numbers
    num1 = util_1.deepCopy(num1);
    num2 = util_1.deepCopy(num2);
    util_1.addZeroPadding(num1.wholeDigits, num2.wholeDigits);
    util_1.addZeroPadding(num1.fractionDigits, num2.fractionDigits);
    // Should result be negative?
    var negative = false;
    // Should we subtract instead of add? (for combining negative with positive numbers)
    var subtract = false;
    if (num1.negative && num2.negative) {
        negative = true;
    }
    if (num1.negative != num2.negative) {
        subtract = true;
    }
    // console.log("num1=" + num1.wholeDigits + ", num2=" + num2.wholeDigits + ", neg=" + negative + ", sub=" + subtract);
    var digits3;
    if (subtract) {
        // determine if the negative number is bigger in magnitude than the
        // positive number. Convert the negative to the positive and subtract
        // the smaller magnitude number from the larger magnitude number.
        var _a = num1.negative ? [num1, num2] : [num2, num1], nNum = _a[0], pNum = _a[1];
        nNum.negative = false;
        var nDigits = util_1.convertToDigitSet(nNum);
        var pDigits = util_1.convertToDigitSet(pNum);
        switch (compare_1.compareNumbers(nNum, pNum)) {
            case 0:
                // a positive number added to a negative number of the
                // same magnitude equals zero
                return number_1.newNumber(num1.numberBase);
            case 1:
                negative = true;
                digits3 = subtractDigitSet(num1.numberBase, nDigits, pDigits);
                break;
            default:
                digits3 = subtractDigitSet(num1.numberBase, pDigits, nDigits);
                break;
        }
    }
    else {
        var digits1 = util_1.convertToDigitSet(num1);
        var digits2 = util_1.convertToDigitSet(num2);
        digits3 = util_1.addDigitSet(num1.numberBase, digits1, digits2);
    }
    var result = util_1.convertFromDigitSet(digits3, num1.fractionDigits.length, num1.numberBase);
    result.negative = negative;
    return result;
}
exports.addNumbers = addNumbers;
/** Subtracts `num1` from `num2` */
function subtractNumbers(num1, num2) {
    num2 = util_1.deepCopy(num2);
    // subtracting a number is the same as adding a negative number
    num2.negative = !num2.negative;
    return addNumbers(num1, num2);
}
exports.subtractNumbers = subtractNumbers;
function subtractDigitSet(numberBase, num1, num2) {
    var diffs = [];
    num1.forEach(function (digit1, index) {
        var digit2 = num2[index];
        var diff = numbertables_1.lookupSubtraction(digit1, digit2, numberBase);
        // if (!diff) {
        //   console.error("missing: 1=" + digit1 + ", 2=" + digit2 + ", base=" + numberBase);
        //   console.log(num1);
        //   console.log(num2);
        // }
        diffs.push(diff);
    });
    // DEBUG
    // const diffArr = diffs.map(diff => diff.result + ":" + diff.carry);
    // console.log("diffs=" + diffArr.join(","));
    // END DEBUG
    var result = [];
    var carry = 0;
    diffs.forEach(function (diff) {
        // subtract carry
        var diff2 = numbertables_1.lookupSubtraction(diff.result, carry, numberBase);
        // console.log("digit=" + diff.result + ", carry=" + carry + ", resultDigit=" + diff2.result + ", resultCarry=" + diff2.carry);
        var resultDigit = diff2.result;
        result.push(resultDigit);
        carry = diff.carry + diff2.carry;
    });
    // restore original ordering of digits
    return result;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(1);
/**
 * Compares two numbers.
 *
 * - returns 0 if `num1` and `num2` are equal
 * - returns 1 if `num1` is greater than `num2`
 * - returns -1 if `num1` is less than `num2`
 */
function compareNumbers(num1, num2) {
    // shortcuts based on sign
    if (num1.negative != num2.negative) {
        // if num2 is negative and num1 is positive, num1 is greater
        if (num2.negative) {
            return 1;
        }
        // if num1 is negative and num2 is positive, num1 is less
        return -1;
    }
    // invert the result if both numbers are negative
    // a larger negative is less than a smaller negative
    var modifier = num1.negative ? -1 : 1;
    util_1.addZeroPadding(num1.fractionDigits, num2.fractionDigits);
    util_1.addZeroPadding(num1.wholeDigits, num2.wholeDigits);
    var digits1 = util_1.convertToDigitSet(num1);
    var digits2 = util_1.convertToDigitSet(num2);
    // reverse order of digits so that we can traverse
    // starting at index zero, beginning with the highest
    // order of magnitude and going downward.
    digits1.reverse();
    digits2.reverse();
    var cmp = 0;
    digits1.forEach(function (digit1, i) {
        if (cmp != 0) {
            return;
        }
        var digit2 = digits2[i];
        // console.log("digits: 1=" + digit1 + ", 2=" + digit2);
        if (digit1 > digit2) {
            // console.log("GT");
            cmp = 1 * modifier;
            return;
        }
        else if (digit2 > digit1) {
            // console.log("LT");
            cmp = -1 * modifier;
            return;
        }
    });
    return cmp;
}
exports.compareNumbers = compareNumbers;
// function compareDigitSets 


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo.png";

/***/ })
/******/ ]);
//# sourceMappingURL=bundle-0a7e17.js.map