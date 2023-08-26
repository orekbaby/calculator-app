 const themeIndicators = document.querySelectorAll("theme-indicator");
 const themeToggle = document.getElementById("theme-toggle");
 const display = document.getElementById("display");
const deleteButton = document.getElementById("delete");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

let currentTheme = localStorage.getItem("selectedTheme") || "blue";
let currentInput = "";
let currentOperator = "";
let firstOperand = null;
let shouldResetDisplay = false;

function inputDigit(digit) {
  if (shouldResetDisplay) {
    display.value = "";
    shouldResetDisplay = false;
  }
  display.value += digit;
  currentInput = display.value;
}

function inputOperator(operator) {
  if (currentOperator !== "") {
    calculate();
  }
  firstOperand = currentInput;
  currentOperator = operator;
  shouldResetDisplay = true;
}
function calculate() {
  const secondOperand = currentInput;
  if (currentOperator === "+") {
    currentInput = String(parseFloat(firstOperand) + parseFloat(secondOperand));
  } else if (currentOperator === "-") {
    currentInput = String(parseFloat(firstOperand) - parseFloat(secondOperand));
  } else if (currentOperator === "*") {
    currentInput = String(parseFloat(firstOperand) * parseFloat(secondOperand));
  } else if (currentOperator === "/") {
    currentInput = String(parseFloat(firstOperand) / parseFloat(secondOperand));
  }
  display.value = currentInput;
  currentOperator = "";
}
function clearDisplay() {
  display.value = "";
  currentInput = "";
  currentOperator = "";
  firstOperand = null;
  shouldResetDisplay = false;
}
// Button event listeners
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => inputDigit(button.textContent));
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => inputOperator(button.textContent));
});


document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearDisplay);

// Delete button functionality
deleteButton.addEventListener('click', () => {
    if (shouldResetDisplay) {
        return;
    }
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
});


// update theme function
function updateTheme() {
  document.body.classList.remove("blue-theme", "light-theme", "purple-theme");
  document.body.classList.add(`${currentTheme}-theme`);
}

// Function to switch active theme indicator
function switchActiveIndicator(index) {
    themeIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}
themeToggle.addEventListener("click", () => {
  if (currentTheme === "blue") {
    currentTheme = "light";
  } else if (currentTheme === "light") {
    currentTheme = "purple";
  } else {
    currentTheme = "blue";
  }
    localStorage.setItem("selectedTheme", currentTheme); // Store the selected theme in local storage
    updateTheme();
    switchActiveIndicator(["blue", "white", "purple"].indexOf(currentTheme));
});

// Initialize the theme and update initial theme
updateTheme();
switchActiveIndicator(0);