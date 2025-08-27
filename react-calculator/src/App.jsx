import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // Handle button clicks
  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "⌫") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      try {
        // Safe eval for basic calc
        const evalResult = eval(input.replace("×", "*").replace("÷", "/"));
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((/[0-9+\-*/.]/).test(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === "Enter") {
        try {
          const evalResult = eval(input.replace("×", "*").replace("÷", "/"));
          setResult(evalResult);
        } catch {
          setResult("Error");
        }
      } else if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key.toLowerCase() === "c") {
        setInput("");
        setResult("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C", "⌫"
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input || "0"}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn, i) => (
          <button
            key={i}
            className={btn === "=" ? "equal" : btn === "C" ? "clear" : btn === "⌫" ? "back" : ""}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
