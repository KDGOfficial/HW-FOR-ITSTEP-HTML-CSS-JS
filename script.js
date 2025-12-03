let currentInput = '0';
let calculation = '';
let lastResult = null;

function updateDisplay() {
    const display = document.getElementById('calc-display');
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    calculation = '';
    lastResult = null;
    updateDisplay();
}

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
                let expression = currentInput.replace(/×/g, '*');
        
                if (expression.includes('/0') && !expression.includes('/0.')) {
            throw new Error('Division by zero');
        }
        
                lastResult = eval(expression);
        
                if (Number.isInteger(lastResult)) {
            currentInput = lastResult.toString();
        } else {
                        currentInput = parseFloat(lastResult.toFixed(8)).toString();
        }
        
                calculation = currentInput;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1000);
    }
}

function splitNumber() {
    const numberInput = document.getElementById('number-input');
    const resultDiv = document.getElementById('split-result');
    
    const number = numberInput.value.trim();
    
    if (number === '') {
        resultDiv.textContent = 'Please enter a number';
        return;
    }
    
    if (number < 100 || number > 999) {
        resultDiv.textContent = 'Please enter a 3-digit number (100-999)';
        return;
    }
    
    const digits = number.split('');
    resultDiv.innerHTML = `
        <p>Hundreds: ${digits[0]}</p>
        <p>Tens: ${digits[1]}</p>
        <p>Ones: ${digits[2]}</p>
    `;
}

function convertTime() {
    const secondsInput = document.getElementById('seconds-input');
    const resultDiv = document.getElementById('time-result');
    
    const totalSeconds = parseInt(secondsInput.value);
    
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        resultDiv.textContent = 'Please enter a valid number of seconds';
        return;
    }
    
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    resultDiv.innerHTML = `
        <p>${totalSeconds} seconds is equal to:</p>
        <p>${days} day${days !== 1 ? 's' : ''}, 
           ${hours} hour${hours !== 1 ? 's' : ''}, 
           ${minutes} minute${minutes !== 1 ? 's' : ''}, 
           ${seconds} second${seconds !== 1 ? 's' : ''}</p>
    `;
}

document.addEventListener('keydown', (e) => {
    if (/[0-9+\-*/.()]/.test(e.key)) {
        appendToDisplay(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        backspace();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === '*') {
        appendToDisplay('×');
    }
});

document.getElementById('number-input').addEventListener('input', function(e) {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3);
    }
});

updateDisplay();
