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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(11);
module.exports = __webpack_require__(12);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(3);
var App_1 = __webpack_require__(4);
ReactDOM.render(React.createElement(App_1.App, null), document.getElementById("example"));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 4 */
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
var CalcPage_1 = __webpack_require__(5);
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
/* 5 */
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
var Calculator_1 = __webpack_require__(6);
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
/* 6 */
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
var CalcButton_1 = __webpack_require__(7);
var NumberDisplay_1 = __webpack_require__(8);
var convert = __webpack_require__(10);
var Calculator = (function (_super) {
    __extends(Calculator, _super);
    function Calculator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Calculator.prototype.handleNumberEntry = function (id) {
        console.log("calc click - " + id);
        var num = parseInt(id);
        var reg = this.state.displayRegisterA;
        reg.wholeDigits.unshift(num);
        var regb = convert.convertNumber(reg, this.state.displayRegisterB.numberBase);
        this.setState({
            displayRegisterA: reg,
            displayRegisterB: regb,
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
                React.createElement(CalcButton_1.CalcButton, null, "C"),
                React.createElement(CalcButton_1.CalcButton, null, "()"),
                React.createElement(CalcButton_1.CalcButton, null, "%"),
                React.createElement(CalcButton_1.CalcButton, null, "/")),
            React.createElement("div", { className: "row" },
                React.createElement(CalcButton_1.CalcButton, { id: "7", onClick: this.handleNumberEntry.bind(this) }, "7"),
                React.createElement(CalcButton_1.CalcButton, { id: "8", onClick: this.handleNumberEntry.bind(this) }, "8"),
                React.createElement(CalcButton_1.CalcButton, { id: "9", onClick: this.handleNumberEntry.bind(this) }, "9"),
                React.createElement(CalcButton_1.CalcButton, null, "*")),
            React.createElement("div", { className: "row" },
                React.createElement(CalcButton_1.CalcButton, { id: "4", onClick: this.handleNumberEntry.bind(this) }, "4"),
                React.createElement(CalcButton_1.CalcButton, { id: "5", onClick: this.handleNumberEntry.bind(this) }, "5"),
                React.createElement(CalcButton_1.CalcButton, { id: "6", onClick: this.handleNumberEntry.bind(this) }, "6"),
                React.createElement(CalcButton_1.CalcButton, null, "-")),
            React.createElement("div", { className: "row" },
                React.createElement(CalcButton_1.CalcButton, { id: "1", onClick: this.handleNumberEntry.bind(this) }, "1"),
                React.createElement(CalcButton_1.CalcButton, { id: "2", onClick: this.handleNumberEntry.bind(this) }, "2"),
                React.createElement(CalcButton_1.CalcButton, { id: "3", onClick: this.handleNumberEntry.bind(this) }, "3"),
                React.createElement(CalcButton_1.CalcButton, null, "+")),
            React.createElement("div", { className: "row" },
                React.createElement(CalcButton_1.CalcButton, null, "\u00B1"),
                React.createElement(CalcButton_1.CalcButton, { id: "0", onClick: this.handleNumberEntry.bind(this) }, "0"),
                React.createElement(CalcButton_1.CalcButton, null, "."),
                React.createElement(CalcButton_1.CalcButton, null, "=")));
    };
    return Calculator;
}(React.Component));
exports.Calculator = Calculator;


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
var CalcButton = (function (_super) {
    __extends(CalcButton, _super);
    function CalcButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalcButton.prototype.handleClick = function () {
        console.log("click! - " + this.props.id);
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
var render = __webpack_require__(9);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#!";
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MaxDecimalPlaces = 10;
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
        trimZeroPadding(result.fractionDigits);
    }
    return result;
}
exports.convertNumber = convertNumber;
function trimZeroPadding(digitSet) {
    var i = digitSet.length;
    while (digitSet[i - 1] == 0) {
        i--;
    }
    digitSet.splice(i, digitSet.length - i);
}
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
        result = addDigitSet(destBase, result, convertDigit(digits[i] * Math.pow(srcBase, i), destBase));
    }
    return result;
}
function addDigitSet(numberBase, num1, num2, index, carry, result) {
    if (index === void 0) { index = 0; }
    if (carry === void 0) { carry = 0; }
    if (result == null) {
        result = [];
    }
    if (index >= num1.length && index >= num2.length) {
        if (carry > 0) {
            result.push(carry);
        }
        return result;
    }
    var digit1 = index < num1.length ? num1[index] : 0;
    var digit2 = index < num2.length ? num2[index] : 0;
    // console.log("add: a=" + digit1 + ", b=" + digit2);
    var sum = digit1 + digit2 + carry;
    var resultDigit = sum % numberBase;
    result.push(resultDigit);
    carry = Math.floor(sum / numberBase);
    addDigitSet(numberBase, num1, num2, index + 1, carry, result);
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
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo.png";

/***/ })
/******/ ]);
//# sourceMappingURL=bundle-db436b.js.map