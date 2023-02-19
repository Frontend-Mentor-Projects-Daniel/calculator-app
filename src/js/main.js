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
// TODO: Look at notes on perhaps a better way to clean this up
// UPDATE MODEL WHEN A NUMBERED BUTTON IS CLICKED
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        var _a;
        const button = e.target;
        if (button instanceof HTMLButtonElement) {
            update('appendNumber', init, (_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim());
            viewEquation();
        }
    });
});
// UPDATE MODEL WHEN AN OPERATION BUTTON IS CLICKED
operationButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        var _a;
        const button = e.target;
        if (button instanceof HTMLButtonElement) {
            update('appendOperation', init, (_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim());
            viewEquation();
        }
    });
});
// UPDATE MODEL WHEN THE DECIMAL BUTTON IS CLICKED
decimalButton === null || decimalButton === void 0 ? void 0 : decimalButton.addEventListener('click', (e) => {
    var _a;
    const button = e.target;
    if (button instanceof HTMLButtonElement) {
        update('appendDecimal', init, (_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim());
        viewEquation();
    }
});
// UPDATE MODEL WHEN THE DELETE BUTTON IS CLICKED
deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', (_) => {
    update('popPreviousValue', init, '');
    viewEquation();
});
// UPDATE MODEL WHEN THE EQUAL BUTTON IS CLICKED
equalButton === null || equalButton === void 0 ? void 0 : equalButton.addEventListener('click', (e) => {
    var _a;
    const button = e.target;
    if (button instanceof HTMLButtonElement) {
        update('doCalculation', init, (_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim());
        viewEquation();
    }
});
// UPDATE MODEL WHEN THE RESET BUTTON IS CLICKED
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener('click', (_) => {
    update('clear', init, '');
    viewEquation();
});
// ------------------------------------------------------------------------
//                               EVENT HANDLERS
// ------------------------------------------------------------------------
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