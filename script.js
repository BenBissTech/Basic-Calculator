
class Calculator {
    constructor(prevOpTextElement, currOpTextElement) {
        this.prevOpTextElement = prevOpTextElement;
        this.currOpTextElement = currOpTextElement;
        this.clear();
    }

    // method used to clear calculator inputs and display
    clear() {
        this.currOp = "";
        this.prevOp = "";
        this.op = undefined;
    }

    // method used to delete last input on calcultor
    delete() {
        this.currOp = this.currOp.toString().slice(0,-1);
    }

    // method used to add pressed number to current current operand
    appendNumber(number) {
        if (number === '.' && this.currOp.includes('.')) return;
        this.currOp = this.currOp.toString() + number.toString();
    }

    // method used to handle current operation (last selected operation)
    chooseOperation(operation) {
        if (this.currOp === '') return;
        if (this.prevOp !== '') this.compute(); 

        this.op = operation;
        this.prevOp = this.currOp;
        this.currOp = '';
    }

    // method used to perform calculation
    compute() {
        let computation;
        const prev = parseFloat(this.prevOp);
        const curr = parseFloat(this.currOp);

        if (isNaN(prev) || isNaN(curr)) return
        
        // switch case statement for handling 4 different operations
        switch (this.op) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currOp = computation;
        this.op = undefined;
        this.prevOp = '';
    }

    // method to handel general exponentation
    exponentation(expo) {
        let computation;
        let exponent = expo;
        let curr = parseFloat(this.currOp);

        if (isNaN(curr)) return;

        switch (exponent) {
            case 'x^2':
                computation = curr * curr;
                break;
            case 'x^3':
                computation = curr * curr * curr;
                break;
            case '√':
                computation = Math.sqrt(curr);
                break;
            case '3√':
                computation = Math.cbrt(curr);
                break;
            default:
                return;
        }

        this.currOp = computation;
    }

    getDisplayNumber(num) {
        const stringNum = num.toString();

        // seperates digits before and after decimal point
        const intDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];

        let intDisplay;
        // if not a number
        if (isNaN(intDigits)) {
            intDisplay = '';
        }
        else {
            // delimits number by seperating each 3 digit sequence with a comma
            intDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        // if there are digits beyond a decimal point
        if (decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`;
        }
        else {
            return intDisplay;
        }
    }

    // method used to update the display on the calculator
    handleChange() {
        this.currOpTextElement.innerText = this.getDisplayNumber(this.currOp);

        // appends operation to previous operand
        if (this.op == 'x^2' || this.op == 'x^3' || this.op == '√' || this.op == '3√') {
            this.currOpTextElement.innerText = this.currOp;
        }
        else if (this.op != null) {
            this.prevOpTextElement.innerText = `${this.getDisplayNumber(this.prevOp)} ${this.op}`;
        }
        else {
            this.prevOpTextElement.innerText = '';
        }
    }
}



// Retrieve all buttons and required text elements
const numButtons = document.querySelectorAll('[data-num]')
const opButtons = document.querySelectorAll('[data-op]')
const opExpoButtons = document.querySelectorAll('[data-op-expo')

const equalsButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-del]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOpTextElement = document.querySelector('[data-prev-op]')
const currOpTextElement = document.querySelector('[data-curr-op]')

const calculator = new Calculator(prevOpTextElement,currOpTextElement);

// handles number button presses
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.handleChange();
        console.log("num pressed: " +button.innerText);
    })
})

// handles operation button presses
opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.handleChange();
    })
})

opExpoButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.exponentation(button.innerText);
        calculator.handleChange();
    })
})

// handles equal button presses
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.handleChange();
})

// handles AC button presses
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.handleChange();
})

// handles DEL button presses
delButton.addEventListener('click', button => {
    calculator.delete();
    calculator.handleChange();
})