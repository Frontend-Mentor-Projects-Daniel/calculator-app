"use strict";
// ------------------------------------------------------------------------
//                          GLOBAL DOM NODES
// ------------------------------------------------------------------------
const calculatorScreen = document.getElementById('js-screen');
const displayedNumber = calculatorScreen === null || calculatorScreen === void 0 ? void 0 : calculatorScreen.firstElementChild;
const calculatorButtons = document.querySelectorAll('.btn');
const themeRadios = document.querySelectorAll('input[type="radio"]');
const init = {
    displayedEquation: ['0'],
};
function update(msg, model, value) {
    const lastValue = model.displayedEquation[model.displayedEquation.length - 1];
    switch (msg) {
        case 'appendNumber':
            // prevent more than one zero from being displayed at the start
            if (model.displayedEquation[0] === '0' &&
                model.displayedEquation[1] == null) {
                model.displayedEquation.pop();
            }
            model.displayedEquation.push(value);
            break;
        case 'appendDecimal':
            // prevent more than one decimal from appearing
            const getAllDots = model.displayedEquation.filter((x) => x === '.');
            if (getAllDots.length === 1) {
                return;
            }
            model.displayedEquation.push(value);
            break;
        case 'appendOperation':
            // prevent 2 operation symbols from being used in a row
            if (lastValue === '+' ||
                lastValue === '/' ||
                lastValue === '-' ||
                lastValue === 'x') {
                return;
            }
            model.displayedEquation.push(value);
            break;
        case 'doCalculation':
            const parsedEquation = parseEquation(model.displayedEquation.join(''));
            model.displayedEquation = [parsedEquation.toString()];
            break;
        case 'popPreviousValue':
            model.displayedEquation.pop();
            // if deleting the last value then set the screen back to 0
            if (model.displayedEquation.length === 0) {
                model.displayedEquation[0] = '0';
            }
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
// SWITCH THEME
window.addEventListener('load', () => {
    getTheme();
});
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
    getTheme();
});
themeRadios.forEach((radioInput) => {
    if (radioInput instanceof HTMLInputElement) {
        radioInput.addEventListener('click', (e) => {
            setTheme(e);
            getTheme();
        });
    }
});
function getTheme() {
    // gets the current theme selected
    const localTheme = localStorage.theme;
    if (localTheme === 'dark') {
        // user has manually selected dark mode
        document.documentElement.classList.add('dark');
    }
    else if (localTheme === 'light') {
        // user has manually selected light mode
        document.documentElement.classList.remove('dark');
    }
    else {
        // user has not manually selected dark or light
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }
}
function setTheme(e) {
    // sets the theme
    let elem = e.target;
    if (elem.classList.contains('theme-switcher-dark')) {
        console.log('theme-switcher-dark');
        localStorage.theme = 'dark';
    }
    else if (elem.classList.contains('theme-switcher-light')) {
        console.log('theme-switcher-light');
        localStorage.theme = 'light';
    }
    else {
        localStorage.removeItem('theme');
    }
}
function setActive() {
    // adds active state to the buttons
}
// ------------------------------------------------------------------------
//                               VIEW FUNCTIONS
// ------------------------------------------------------------------------
/**
 * Renders unto the screen a value based on the current global state
 */
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