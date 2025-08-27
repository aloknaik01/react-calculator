import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // === Handle number input ===
  const inputNumber = (num) => {
    if (waitingForSecondOperand) {
      setDisplay(String(num));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  // === Handle decimal ===
  const inputDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // === Clear display ===
  const clearDisplay = () => {
    setDisplay("0");
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
  };

  // === Backspace ===
  const backspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  // === Operator handling ===
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand == null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      try {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplay(String(result));
        setFirstOperand(result);
      } catch (error) {
        setDisplay("Error");
        setFirstOperand(null);
        setOperator(null);
        return;
      }
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  // === Calculate ===
  const calculate = (first, second, operator) => {
    if (operator === "+") return first + second;
    if (operator === "-") return first - second;
    if (operator === "*") return first * second;
    if (operator === "/") {
      if (second === 0) throw new Error("Division by zero");
      return first / second;
    }
    return second;
  };

  // === Equals ===
  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (operator && firstOperand != null) {
      try {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplay(String(result));
        setFirstOperand(null);
        setOperator(null);
      } catch (error) {
        setDisplay("Error");
      }
    }
  };

  // === Keyboard support ===
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") inputNumber(e.key);
      if (e.key === ".") inputDecimal();
      if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
      if (e.key === "Enter" || e.key === "=") handleEquals();
      if (e.key === "Backspace") backspace();
      if (e.key.toLowerCase() === "c") clearDisplay();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="app">
      <div className="calculator">
        {/* Display */}
        <div className="display">{display}</div>

        {/* Buttons */}
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
          <button onClick={handleEquals} className="equals">
            =
          </button>

          <button onClick={() => inputNumber(0)} className="zero">
            0
          </button>
          <button onClick={inputDecimal}>.</button>
        </div>
      </div>
    </div>
  );
}
