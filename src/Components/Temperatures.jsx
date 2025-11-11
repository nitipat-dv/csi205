// 
import React, { useState } from "react";

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState(25);
  const [fahrenheit, setFahrenheit] = useState((25 * 9) / 5 + 32);
  const [kelvin, setKelvin] = useState(25 + 273.15);

  const updateFromCelsius = (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setCelsius(numValue);
      setFahrenheit((numValue * 9) / 5 + 32);
      setKelvin(numValue + 273.15);
    }
  };

  return (
    <div
      className="border border-gray-300 rounded-xl shadow-lg bg-white p-4 text-center mx-auto"
      style={{ maxWidth: "1050px" }}
    >
      <h1 className="font-bold text-blue-600 text-3xl mb-4">TEMPERATURES</h1>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <div className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md text-lg">
          {celsius.toFixed(2)} °C
        </div>
        <div className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md text-lg">
          {fahrenheit.toFixed(2)} °F
        </div>
        <div className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md text-lg">
          {kelvin.toFixed(2)} °K
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-3">
        <div className="border border-gray-900 rounded-lg bg-gray-100 p-3 flex-1">
          <h5 className="font-bold text-blue-600 mb-3 text-xl">CELSIUS</h5>
          <div className="flex justify-between items-center">
            <button
              onClick={() => updateFromCelsius(celsius - 1)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl transition-transform transform hover:scale-110"
            >
              −
            </button>
            <span className="font-bold text-2xl mx-2">
              {celsius.toFixed(2)}
            </span>
            <button
              onClick={() => updateFromCelsius(celsius + 1)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl transition-transform transform hover:scale-110"
            >
              +
            </button>
          </div>
        </div>

        <div className="border border-gray-900 rounded-lg bg-gray-100 p-3 flex-1">
          <h5 className="font-bold text-blue-600 mb-3 text-xl">FAHRENHEIT</h5>
          <div className="flex justify-between items-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl transition-transform transform hover:scale-110"
              onClick={() => updateFromCelsius((fahrenheit - 1 - 32) * (5 / 9))}
            >
              −
            </button>
            <span className="font-bold text-2xl mx-2">
              {fahrenheit.toFixed(2)}
            </span>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl transition-transform transform hover:scale-110"
              onClick={() => updateFromCelsius((fahrenheit + 1 - 32) * (5 / 9))}
            >
              +
            </button>
          </div>
        </div>

        <div className="border border-gray-900 rounded-lg bg-gray-100 p-3 flex-1">
          <h5 className="font-bold text-blue-600 mb-3 text-xl">KELVIN</h5>
          <div className="flex justify-between items-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl transition-transform transform hover:scale-110"
              onClick={() => updateFromCelsius(kelvin - 1 - 273.15)}
            >
              −
            </button>
            <span className="font-bold text-2xl mx-2">{kelvin.toFixed(2)}</span>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl transition-transform transform hover:scale-110"
              onClick={() => updateFromCelsius(kelvin + 1 - 273.15)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
