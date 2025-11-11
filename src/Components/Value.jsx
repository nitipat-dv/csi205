import React, { useState } from "react";

function Value({ label, type = "real", onChange }) {
  const [value, setValue] = useState(0);

  const formatValue = (v) => (type === "integer" ? v.toFixed(0) : v.toFixed(2));

  const update = (newVal) => {
    setValue(newVal);
    if (onChange) onChange(newVal);
  };

  return (
    <div
      className="border border-gray-300 rounded-xl bg-gray-100 shadow-sm p-3 text-center mx-auto"
      style={{ width: "250px" }}
    >
      {label && (
        <h5 className="font-bold text-blue-600 mb-2 text-lg">{label}</h5>
      )}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => update(value - 1)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded-md transition-colors"
        >
          −
        </button>
        <span className="border border-gray-400 bg-white rounded px-3 py-1 text-xl font-semibold">
          {formatValue(value)}
        </span>
        <button
          onClick={() => update(value + 1)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 rounded-md transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Value;
