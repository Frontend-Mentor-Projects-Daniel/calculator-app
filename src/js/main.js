"use strict";
// What am I modelling?
// -> The value of the calculator screens display ✅
// When a number or operation button is clicked on
// -> Some conditions should be checked in order to prevent invalid things (such as two consecutive decimals) ❌
// -> The value of the button should be appended to the model ✅ ❌
// When the del button is clicked on
// -> The model should have its previous value removed ❌
// When the rest button is clicked on
// -> The model should be set to 0 ❌
// When the = button is clicked on
// -> The model should perform some mathematical calculations ❌
// -> Then it should replace its current value with the result of the calculations ❌
// ------------------------------------------------------------------------
//                          GLOBAL DOM NODES
// ------------------------------------------------------------------------
const calculatorScreen = document.getElementById('js-screen');
const displayedNumber = calculatorScreen === null || calculatorScreen === void 0 ? void 0 : calculatorScreen.firstElementChild;
const calculatorButtons = document.querySelectorAll('.btn');
const numberButtons = document.querySelectorAll('[data-btn-num]');
const operationButtons = document.querySelectorAll('[data-btn-operations]');
const resetButton = document.querySelector('[data-btn-reset]');
const deleteButton = document.querySelector('[data-btn-del]');
const equalButton = document.querySelector('[data-btn-equals]');
const decimalButton = document.querySelector('[data-btn-decimal]');
const init = {
    displayedEquation: ['0'],
};
function update(msg, model, value) {
    switch (msg) {
        case 'appendNumber':
            if (model.displayedEquation[0] === '0') {
                model.displayedEquation.pop();
            }
            model.displayedEquation.push(value);
            break;
        case 'appendDecimal':
            model.displayedEquation.push(value);
            break;
        case 'appendOperation':
            model.displayedEquation.push(value);
            break;
        case 'doCalculation':
            const parsedEquation = parseEquation(model.displayedEquation.join(''));
            model.displayedEquation = [parsedEquation.toString()];
            break;
        case 'popPreviousValue':
            model.displayedEquation.pop();
            break;
        case 'clear':
            model.displayedEquation = ['0'];
            viewEquation();
            break;
    }
}
// ------------------------------------------------------------------------
//                                  TYPES
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
//                                SCRIPT
// ------------------------------------------------------------------------
// CONNECT MODEL AND SCREEN
if (displayedNumber) {
    displayedNumber.textContent = init.displayedEquation.join('');
}
else {
    throw new Error("The element in which to display a number doesn't exist");
}
// UPDATE MODEL ON BUTTON CLICK AND RENDER VALUES AND FINAL CALCULATION ON SCREEN
calculatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        var _a, _b, _c, _d;
        const target = e.target;
        if (target instanceof HTMLButtonElement) {
            const buttonType = target.dataset.btn;
            if (buttonType === 'number') {
                update('appendNumber', init, (_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim());
                viewEquation();
            }
            if (buttonType === 'operation') {
                update('appendOperation', init, (_b = button.textContent) === null || _b === void 0 ? void 0 : _b.trim());
                viewEquation();
            }
            if (buttonType === 'decimal') {
                update('appendDecimal', init, (_c = button.textContent) === null || _c === void 0 ? void 0 : _c.trim());
                viewEquation();
            }
            if (buttonType === 'delete') {
                update('popPreviousValue', init, '');
                viewEquation();
            }
            if (buttonType === 'reset') {
                update('clear', init, '');
                viewEquation();
            }
            if (buttonType === 'equals') {
                update('doCalculation', init, (_d = button.textContent) === null || _d === void 0 ? void 0 : _d.trim());
                viewEquation();
            }
        }
    });
});
// ------------------------------------------------------------------------
//                               VIEW FUNCTIONS
// ------------------------------------------------------------------------
function viewEquation() {
    if (displayedNumber) {
        displayedNumber.textContent = init.displayedEquation.join('');
    }
}
// ------------------------------------------------------------------------
//                              STORAGE FUNCTIONS
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
//                               HELPER FUNCTIONS
// ------------------------------------------------------------------------
/**
 * Will return either a float or undefined if the passed in string isn't a number (NaN will also return undefined)
 * @param string - A string to turn into a number
 * @returns A floating point number or undefined
 */
function convertStringToFloat(string) {
    const convertedString = parseFloat(string);
    if (Number.isNaN(convertedString) === false) {
        return convertedString;
    }
    else {
        return;
    }
}
/**
 * Parses a string equation into a result
 * @param str - An equation
 * @returns The final calculation
 * @example parseEquation("2x3") -> 6
 *
 */
function parseEquation(str) {
    const formattedString = str.replace(/x/g, '*');
    // note that there's a security risk with this method : https://stackoverflow.com/questions/2276021/evaluating-a-string-as-a-mathematical-expression-in-javascript
    // in a real app, best to use a dedicated and tested library
    return Function(`'use strict'; return (${formattedString})`)();
}
//# sourceMappingURL=main.js.map