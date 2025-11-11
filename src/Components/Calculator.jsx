import React, { useState, useEffect, useCallback } from "react";

const Calculator = () => {

  const [currentInput, setCurrentInput] = useState("0");
  const [previousInput, setPreviousInput] = useState(null);
  const [operation, setOperation] = useState(null);
  const [memory, setMemory] = useState(0);
  const [RS, setRS] = useState(true);


  const appendNumber = (numStr) => {
    if (RS) {
      setCurrentInput(numStr);
      setRS(false);
    } else {
      if (numStr === "." && currentInput.includes(".")) return;
      setCurrentInput((prev) =>
        prev === "0" && numStr !== "." ? numStr : prev + numStr
      );
    }
  };

  const chooseOperation = (op) => {
    if (previousInput !== null && operation && !RS) {
      compute();
      setPreviousInput(currentInput);
    } else {
      setPreviousInput(currentInput);
    }
    setOperation(op);
    setRS(true);
  };

  const compute = useCallback(() => {
    if (operation === null || previousInput === null) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let computation;

    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "−":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    setCurrentInput(String(computation));
    setPreviousInput(null);
    setOperation(null);
    setRS(true);
  }, [currentInput, operation, previousInput]);

  const clear = () => {
    setCurrentInput("0");
    setPreviousInput(null);
    setOperation(null);
    setRS(true);
  };

  const handleSpecialOperator = (op) => {
    const current = parseFloat(currentInput);
    let result;

    switch (op) {
      case "√":
        result = Math.sqrt(current);
        break;
      case "%":
        result = current / 100;
        break;
      case "1/x":
        result = 1 / current;
        break;
      case "+/−":
        result = current * -1;
        break;
      default:
        return;
    }
    setCurrentInput(String(result));
    setRS(true);
  };

  const handleMemory = (memOp) => {
    const current = parseFloat(currentInput);
    switch (memOp) {
      case "M+":
        setMemory((m) => m + current);
        setRS(true);
        break;
      case "M-":
        setMemory((m) => m - current);
        setRS(true);
        break;
      case "MR":
        setCurrentInput(String(memory));
        setRS(true);
        break;
      case "MC":
        setMemory(0);
        break;
      default:
        return;
    }
  };

  // --- Keyboard ---
  const handleKeyDown = useCallback(
    (e) => {
      const key = e.key;
      if ((key >= "0" && key <= "9") || key === ".") appendNumber(key);
      else if (key === "+" || key === "-" || key === "*" || key === "/") {
        e.preventDefault();
        const opMap = { "-": "−", "*": "×", "/": "÷" };
        chooseOperation(opMap[key] || key);
      } else if (key === "Enter" || key === "=") compute();
      else if (key === "Escape" || key.toLowerCase() === "c") clear();
    },
    [compute, clear, appendNumber, chooseOperation]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // --- Button ---
  const CalcButton = ({ onClick, label, className = "" }) => (
    <button
      onClick={onClick}
      className={`h-14 text-xl rounded-lg border-none cursor-pointer shadow-inner transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${className}`}
    >
      {label}
    </button>
  );

  const buttonLayout = [
    {
      label: "MC",
      action: () => handleMemory("MC"),
      style: "bg-green-300 hover:bg-green-400",
    },
    {
      label: "MR",
      action: () => handleMemory("MR"),
      style: "bg-green-300 hover:bg-green-400",
    },
    {
      label: "M+",
      action: () => handleMemory("M+"),
      style: "bg-green-300 hover:bg-green-400",
    },
    {
      label: "M-",
      action: () => handleMemory("M-"),
      style: "bg-green-300 hover:bg-green-400",
    },
    { label: "C", action: clear, style: "bg-red-400 hover:bg-red-500" },
    "7",
    "8",
    "9",
    {
      label: "÷",
      action: () => chooseOperation("÷"),
      style: "bg-green-300 hover:bg-green-400",
    },
    {
      label: "√",
      action: () => handleSpecialOperator("√"),
      style: "bg-green-300 hover:bg-green-400",
    },
    "4",
    "5",
    "6",
    {
      label: "×",
      action: () => chooseOperation("×"),
      style: "bg-green-300 hover:bg-green-400",
    },
    {
      label: "%",
      action: () => handleSpecialOperator("%"),
      style: "bg-green-300 hover:bg-green-400",
    },
    "1",
    "2",
    "3",
    {
      label: "−",
      action: () => chooseOperation("−"),
      style: "bg-green-300 hover:bg-green-400",
    },
    {
      label: "1/x",
      action: () => handleSpecialOperator("1/x"),
      style: "bg-green-300 hover:bg-green-400",
    },
    "0",
    ".",
    {
      label: "+/−",
      action: () => handleSpecialOperator("+/−"),
      style: "bg-gray-200 hover:bg-yellow-400",
    },
    {
      label: "+",
      action: () => chooseOperation("+"),
      style: "bg-green-300 hover:bg-green-400",
    },
    { label: "=", action: compute, style: "bg-green-300 hover:bg-green-400" },
  ];

  // --- Render ---
  return (
    <div className="flex justify-center items-center p-4">
      <div className="border-4 border-gray-700 rounded-xl p-3 bg-gray-300 shadow-lg">
        <input
          type="text"
          className="w-full h-14 text-4xl text-right p-2 mb-3 rounded-lg bg-blue-100 border-none focus:outline-none font-mono"
          value={parseFloat(currentInput).toLocaleString("en", {
            maximumFractionDigits: 8,
          })}
          disabled
        />
        <div className="grid grid-cols-5 gap-2">
          {buttonLayout.map((btn, i) =>
            typeof btn === "string" ? (
              <CalcButton
                key={i}
                onClick={() => appendNumber(btn)}
                label={btn}
                className="bg-gray-200 hover:bg-yellow-400"
              />
            ) : (
              <CalcButton
                key={i}
                onClick={btn.action}
                label={btn.label}
                className={btn.style}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
