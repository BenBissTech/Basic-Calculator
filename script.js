class Calculator {
    constructor(prevOpTextElement, currOpTextElement) {
        this.prevOpTextElement = prevOpTextElement;
        this.currOpTextElement = currOpTextElement;
    }

    clear() {

    }

    delete() {

    }

    appendNumber(number) {

    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateChange() {
        
    }
}



// Retrieve all buttons and required text elements
const numButtons = document.querySelectorAll('[data-num]')
const opButtons = document.querySelectorAll('[data-op]')

const equalsButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-del]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOpTextElement = document.querySelector('[prev-op]')
const currOpTextElement = document.querySelector('[curr-op]')

