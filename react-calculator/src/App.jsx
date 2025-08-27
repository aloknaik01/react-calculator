import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForSecondOperand) {
      setDisplay(String(num));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand == null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setOperator(nextOperator);
    setWaitingForSecondOperand(true);
  };

  const calculate = (first, second, operator) => {
    switch (operator) {
      case "+": return first + second;
      case "-": return first - second;
      case "*": return first * second;
      case "/": return second !== 0 ? first / second : "Error";
      default: return second;
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const backspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  return (
    <div className="app">
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          <button onClick={clearDisplay}>C</button>
          <button onClick={backspace}>⌫</button>
          <button onClick={() => handleOperator("/")}>/</button>
          <button onClick={() => handleOperator("*")}>*</button>

          <button onClick={() => inputNumber(7)}>7</button>
          <button onClick={() => inputNumber(8)}>8</button>
          <button onClick={() => inputNumber(9)}>9</button>
          <button onClick={() => handleOperator("-")}>-</button>

          <button onClick={() => inputNumber(4)}>4</button>
          <button onClick={() => inputNumber(5)}>5</button>
          <button onClick={() => inputNumber(6)}>6</button>
          <button onClick={() => handleOperator("+")}>+</button>

          <button onClick={() => inputNumber(1)}>1</button>
          <button onClick={() => inputNumber(2)}>2</button>
          <button onClick={() => inputNumber(3)}>3</button>
          <button onClick={() => handleOperator("=")}>=</button>

          <button onClick={() => inputNumber(0)}>0</button>
          <button onClick={inputDecimal}>.</button>
        </div>
      </div>
    </div>
  );
}
