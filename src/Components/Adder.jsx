import React, { useState } from "react";

function Adder() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <div
      className="border border-black rounded-lg p-3 bg-white text-center shadow-md mx-auto"
      style={{ width: "450px" }}
    >
      <h4 className="text-2xl font-bold text-blue-600 mb-3">ADD</h4>

      <div className="flex justify-between mb-4">
        <div className="px-2 py-1 bg-gray-500 text-white rounded text-sm font-bold">
          A = {a}
        </div>
        <div className="px-3 py-1 bg-blue-600 text-white rounded font-bold">
          A + B = {a + b}
        </div>
        <div className="px-2 py-1 bg-gray-500 text-white rounded text-sm font-bold">
          B = {b}
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <div className="bg-gray-100 border rounded-lg p-2 flex-1">
          <div className="font-bold text-blue-600 mb-2">A</div>
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg"
              onClick={() => setA((prev) => prev - 1)}
            >
              −
            </button>
            <span className="font-bold text-xl w-10 text-center">{a}</span>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg"
              onClick={() => setA((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-gray-100 border rounded-lg p-2 flex-1">
          <div className="font-bold text-blue-600 mb-2">B</div>
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg"
              onClick={() => setB((prev) => prev - 1)}
            >
              −
            </button>
            <span className="font-bold text-xl w-10 text-center">{b}</span>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg"
              onClick={() => setB((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adder;
