const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");
const equalsBtn = document.querySelector(".equals");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const previousOperandEl = document.querySelector(".previous-operand");
const currentOperandEl = document.querySelector(".current-operand");

//clears calculator at the beginning
clear();

//hooking up each button
numberBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		appendNumber(btn.innerText);
		updateDisplay();
	});
});

operationBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		chooseOperation(btn.innerText);
		updateDisplay();
	});
});

equalsBtn.addEventListener("click", () => {
	operate();
	updateDisplay();
});

clearBtn.addEventListener("click", () => {
	clear();
	updateDisplay();
});

deleteBtn.addEventListener("click", () => {
	del();
	updateDisplay();
});

//functions for the buttons
function clear() {
	this.currentOperand = "";
	this.previousOperand = "";
	this.operation = undefined;
}

function del() {
	this.currentOperand = this.currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
	if (number === "." && this.currentOperand.includes(".")) return;
	this.currentOperand = this.currentOperand.toString() + number.toString();
}

function chooseOperation(operation) {
	if (this.currentOperand == "") return;
	if (this.previousOperand !== "") {
		this.operate();
	}
	this.operation = operation;
	this.previousOperand = this.currentOperand;
	this.currentOperand = "";
}

//the computation
function operate() {
	let computation;
	const prev = parseFloat(this.previousOperand);
	const curr = parseFloat(this.currentOperand);

	if (this.operation === "/" && this.currentOperand === "0") {
		clear();
		alert("bruh");
		return;
	}

	if (isNaN(prev) || isNaN(curr)) return;
	switch (this.operation) {
		case "+":
			computation = prev + curr;
			break;
		case "-":
			computation = prev - curr;
			break;
		case "*":
			computation = prev * curr;
			break;
		case "/":
			computation = prev / curr;
			break;
		default:
			return;
	}

	this.currentOperand = computation;
	this.previousOperand = "";
	this.operation = undefined;
}

//the display
function updateDisplay() {
	currentOperandEl.innerText = this.currentOperand;
	if (this.operation != null) {
		previousOperandEl.innerText = `${this.previousOperand} ${this.operation}`;
	} else {
		previousOperandEl.innerText = "";
	}
}
