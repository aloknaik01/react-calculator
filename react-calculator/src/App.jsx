import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");

  const inputNumber = (num) => {
    if (display === "0") {
      setDisplay(String(num));
    } else {
      setDisplay(display + num);
    }
  };

  const clear = () => {
    setDisplay("0");
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  return (
    <div className="app">
      <div className="calculator">
        {/* Display */}
        <div className="display">{display}</div>

        {/* Buttons */}
        <div className="buttons">
          <button onClick={() => inputNumber(1)}>1</button>
          <button onClick={() => inputNumber(2)}>2</button>
          <button onClick={() => inputNumber(3)}>3</button>
          <button>+</button>

          <button onClick={() => inputNumber(4)}>4</button>
          <button onClick={() => inputNumber(5)}>5</button>
          <button onClick={() => inputNumber(6)}>6</button>
          <button>-</button>

          <button onClick={() => inputNumber(7)}>7</button>
          <button onClick={() => inputNumber(8)}>8</button>
          <button onClick={() => inputNumber(9)}>9</button>
          <button>*</button>

          <button onClick={() => inputNumber(0)}>0</button>
          <button>.</button>
          <button>=</button>
          <button>/</button>

          {/* New row for Clear & Backspace */}
          <button onClick={clear} style={{ gridColumn: "span 2", background: "red", color: "white" }}>
            Clear
          </button>
          <button onClick={backspace} style={{ background: "orange", color: "white" }}>
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}
