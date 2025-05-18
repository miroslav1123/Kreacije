const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let lastInput = '';
let operator = null;
let resetNext = false;

function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return a + b;
        case '−': return a - b;
        case '×': return a * b;
        case '÷': return b === 0 ? 'Greška' : a / b;
        default: return b;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            if (resetNext) {
                currentInput = value;
                resetNext = false;
            } else {
                currentInput += value;
            }
            display.value = currentInput;
        }
        else if (button.classList.contains('decimal')) {
            if (resetNext) {
                currentInput = '0.';
                resetNext = false;
            } else if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            display.value = currentInput;
        }
        else if (button.classList.contains('operator')) {
            if (currentInput === '' && lastInput !== '') {
                operator = value;
                return;
            }
            if (lastInput !== '' && operator !== null && currentInput !== '') {
                const result = calculate(lastInput, currentInput, operator);
                display.value = result;
                lastInput = result.toString();
                currentInput = '';
            } else if (currentInput !== '') {
                lastInput = currentInput;
                currentInput = '';
            }
            operator = value;
            resetNext = false;
        }
        else if (button.classList.contains('equal')) {
            if (lastInput !== '' && operator !== null && currentInput !== '') {
                const result = calculate(lastInput, currentInput, operator);
                display.value = result;
                currentInput = result.toString();
                lastInput = '';
                operator = null;
                resetNext = true;
            }
        }
        else if (button.classList.contains('clear')) {
            currentInput = '';
            lastInput = '';
            operator = null;
            display.value = '';
            resetNext = false;
        }
    });
});
