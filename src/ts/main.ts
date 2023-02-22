// ------------------------------------------------------------------------
//                          GLOBAL DOM NODES
// ------------------------------------------------------------------------
const calculatorScreen = document.getElementById('js-screen');
const displayedNumber = calculatorScreen?.firstElementChild;
const calculatorButtons = document.querySelectorAll('.btn');
const themeRadios = document.querySelectorAll('input[type="radio"]');

// ------------------------------------------------------------------------
//                               GLOBAL STATE
// ------------------------------------------------------------------------
type Model = {
  displayedEquation: string[];
};

const init: Model = {
  displayedEquation: ['0'],
};

type Msg =
  | 'appendNumber'
  | 'appendDecimal'
  | 'appendOperation'
  | 'doCalculation'
  | 'popPreviousValue'
  | 'clear';

function update(msg: Msg, model: Model, value: any) {
  const lastValue = model.displayedEquation[model.displayedEquation.length - 1];

  switch (msg) {
    case 'appendNumber':
      // prevent more than one zero from being displayed at the start
      if (
        model.displayedEquation[0] === '0' &&
        model.displayedEquation[1] == null
      ) {
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
      if (
        lastValue === '+' ||
        lastValue === '/' ||
        lastValue === '-' ||
        lastValue === 'x'
      ) {
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
} else {
  throw new Error("The element in which to display a number doesn't exist");
}

// UPDATE MODEL ON BUTTON CLICK AND RENDER VALUES AND FINAL CALCULATION ON SCREEN
calculatorButtons.forEach((button) => {
  button.addEventListener('click', (e: Event) => {
    const target = e.target;

    if (target instanceof HTMLButtonElement) {
      const buttonType = target.dataset.btn;

      if (buttonType === 'number') {
        update('appendNumber', init, button.textContent?.trim());
        viewEquation();
      }

      if (buttonType === 'operation') {
        update('appendOperation', init, button.textContent?.trim());
        viewEquation();
      }

      if (buttonType === 'decimal') {
        update('appendDecimal', init, button.textContent?.trim());
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
        update('doCalculation', init, button.textContent?.trim());
        viewEquation();
      }
    }
  });
});

// SWITCH THEME AND SAVE THEME TO LOCAL STORAGE WHILE STILL RESPECTING USER-PREFERENCE
(() => {
  // load last saved theme
  window.addEventListener('load', () => {
    getTheme();
  });

  // check user preferences
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      getTheme();
    });

  themeRadios.forEach((radioInput) => {
    if (radioInput instanceof HTMLInputElement) {
      radioInput.addEventListener('click', (e: Event) => {
        setTheme(e);
        getTheme();
      });
    }
  });

  function getTheme() {
    // gets the current theme selected
    const localTheme = localStorage.theme;
    let selectedInput: string;

    if (localTheme === 'theme-dark') {
      // user has manually selected dark mode
      document.documentElement.classList.add('theme-dark');
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.remove('theme-default');

      selectedInput = 'dark';
    } else if (localTheme === 'theme-light') {
      // user has manually selected light mode
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('theme-default');

      selectedInput = 'light';
    } else if (localTheme === 'theme-default') {
      // user has manually selected light mode
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-default');

      selectedInput = 'default';
    } else {
      // user has not manually selected dark or light
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-light');
        document.documentElement.classList.remove('theme-default');

        selectedInput = 'dark';
      } else {
        document.documentElement.classList.add('theme-default');
        document.documentElement.classList.remove('theme-dark');
        document.documentElement.classList.remove('theme-light');

        selectedInput = 'default';
      }
    }

    setActive(selectedInput);
  }

  function setTheme(e) {
    // sets the theme
    let elem = e.target;

    if (elem.classList.contains('theme-switcher-dark')) {
      localStorage.theme = 'theme-dark';
    } else if (elem.classList.contains('theme-switcher-light')) {
      localStorage.theme = 'theme-light';
    } else if (elem.classList.contains('theme-switcher-default')) {
      localStorage.theme = 'theme-default';
    } else {
      localStorage.removeItem('theme');
    }
  }

  function setActive(selectedInput: string) {
    // adds active state to the buttons
    const themeSwitcherInputs = document.querySelectorAll(
      'input[name="theme"]'
    );

    themeSwitcherInputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        const isChecked = input.checked;

        if (isChecked === true) {
          input.checked = false;
        }
      }

      let activeInput = document.querySelector(
        `.theme-switcher-${selectedInput}`
      ) as HTMLInputElement;

      console.log(selectedInput);

      activeInput.checked = true;
    });
  }
})();

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
function parseEquation(str: string): number {
  const formattedString = str.replace(/x/g, '*');

  // note that there's a security risk with this method : https://stackoverflow.com/questions/2276021/evaluating-a-string-as-a-mathematical-expression-in-javascript
  // in a real app, best to use a dedicated and tested library
  return Function(`'use strict'; return (${formattedString})`)();
}
