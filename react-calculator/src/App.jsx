import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");

  const inputNumber = (num) => {
    if (display === "0") {
      setDisplay(String(num)); // replace initial 0
    } else {
      setDisplay(display + num); // append number
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
        </div>
      </div>
    </div>
  );
}
