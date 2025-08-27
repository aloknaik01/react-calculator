import { useState, useCallback, useEffect } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const inputNumber = useCallback(
    (num) => {
      if (waitingForOperand) {
        setDisplay(String(num));
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? String(num) : display + num);
      }
    },
    [display, waitingForOperand]
  );

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay("0");
  }, []);

  const backspace = useCallback(() => {
    if (!waitingForOperand) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay === "" ? "0" : newDisplay);
    }
  }, [display, waitingForOperand]);

  const performOperation = useCallback(
    (nextOperation) => {
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(inputValue);
      } else if (operation) {
        const currentValue = previousValue || 0;
        const newValue = calculate(currentValue, inputValue, operation);

        if (newValue !== undefined) {
          const result = String(newValue);
          setDisplay(result);
          setPreviousValue(newValue);

          // Add to history
          setHistory((prev) => [
            ...prev.slice(-4),
            {
              calculation: `${currentValue} ${operation} ${inputValue}`,
              result: newValue,
            },
          ]);
        }
      }

      setWaitingForOperand(true);
      setOperation(nextOperation);
    },
    [display, previousValue, operation]
  );

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "−":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : undefined;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEqual = useCallback(() => {
    if (operation && previousValue !== null) {
      performOperation("=");
      setOperation(null);
      setPreviousValue(null);
      setWaitingForOperand(true);
    }
  }, [operation, previousValue, performOperation]);

  const toggleSign = useCallback(() => {
    if (display !== "0") {
      setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
    }
  }, [display]);

  const percentage = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  }, [display]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      const { key } = e;

      if (key >= "0" && key <= "9") {
        inputNumber(key);
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "+") {
        performOperation("+");
      } else if (key === "-") {
        performOperation("−");
      } else if (key === "*") {
        performOperation("×");
      } else if (key === "/") {
        e.preventDefault();
        performOperation("÷");
      } else if (key === "=" || key === "Enter") {
        e.preventDefault();
        handleEqual();
      } else if (key === "Escape") {
        clear();
      } else if (key === "Backspace") {
        backspace();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [
    inputNumber,
    inputDecimal,
    performOperation,
    handleEqual,
    clear,
    backspace,
  ]);

  const formatDisplay = (value) => {
    if (value.length > 12) {
      const num = parseFloat(value);
      if (num > 999999999999 || num < -999999999999) {
        return num.toExponential(5);
      }
    }
    return value;
  };

  return (
    <div className="min-h-screen min-[]:w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="w-80">
          {/* History Display */}
          <div className="mb-4 h-16 overflow-hidden">
            <div className="space-y-1">
              {history.slice(-2).map((entry, idx) => (
                <div key={idx} className="text-white/40 text-sm text-right">
                  {entry.calculation} = {entry.result}
                </div>
              ))}
            </div>
          </div>

          {/* Main Display */}
          <div className="bg-black/30 rounded-2xl p-6 mb-6 border border-white/5">
            <div className="text-right">
              <div className="text-white/60 text-sm mb-1">
                {operation &&
                  previousValue !== null &&
                  `${previousValue} ${operation}`}
              </div>
              <div className="text-white text-4xl font-light tracking-wider">
                {formatDisplay(display)}
              </div>
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <button
              onClick={clear}
              className="col-span-2 bg-red-500/80 hover:bg-red-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Clear
            </button>
            <button
              onClick={backspace}
              className="bg-orange-500/80 hover:bg-orange-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              ⌫
            </button>
            <button
              onClick={() => performOperation("÷")}
              className="bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => inputNumber("7")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              7
            </button>
            <button
              onClick={() => inputNumber("8")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              8
            </button>
            <button
              onClick={() => inputNumber("9")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              9
            </button>
            <button
              onClick={() => performOperation("×")}
              className="bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => inputNumber("4")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              4
            </button>
            <button
              onClick={() => inputNumber("5")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              5
            </button>
            <button
              onClick={() => inputNumber("6")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              6
            </button>
            <button
              onClick={() => performOperation("−")}
              className="bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={() => inputNumber("1")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              1
            </button>
            <button
              onClick={() => inputNumber("2")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              2
            </button>
            <button
              onClick={() => inputNumber("3")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              3
            </button>
            <button
              onClick={() => performOperation("+")}
              className="bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => inputNumber("0")}
              className="col-span-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              .
            </button>
            <button
              onClick={handleEqual}
              className="bg-green-500/80 hover:bg-green-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xl"
            >
              =
            </button>
          </div>

          {/* Additional Functions Row */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <button
              onClick={toggleSign}
              className="bg-gray-500/80 hover:bg-gray-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
            >
              +/−
            </button>
            <button
              onClick={percentage}
              className="bg-gray-500/80 hover:bg-gray-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
            >
              %
            </button>
          </div>

          {/* Keyboard hint */}
          <div className="text-center mt-4 text-white/40 text-xs">
            Keyboard supported • ESC to clear • Backspace to delete
          </div>
        </div>
      </div>
    </div>
  );
}
