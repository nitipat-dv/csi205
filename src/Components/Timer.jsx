import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    let result = "";
    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m `;
    result += `${secs}s`;
    return result.trim();
  };

  return (
    <div
      className="border border-gray-300 bg-gray-100 rounded-2xl shadow-md p-4 text-center mx-auto"
      style={{ width: "250px" }}
    >
      <h4 className="text-blue-600 font-bold text-xl mb-3">TIMER</h4>

      <div className="text-2xl font-mono bg-white border border-gray-300 rounded py-2 mb-3">
        {formatTime(seconds)}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Reset
        </button>

        <button
          onClick={() => setRunning((r) => !r)}
          className={`font-bold text-white py-2 px-4 rounded-md transition-colors ${
            running
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {running ? "Pause" : "Run"}
        </button>
      </div>
    </div>
  );
}

export default Timer;
