import React from "react";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <h1>Calculator</h1>
      <div className="calculator">
        <div className="display">0</div>
        <div className="buttons">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>+</button>
        </div>
      </div>
    </div>
  );
}
