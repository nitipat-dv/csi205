import React, { useState, useEffect, useRef, useCallback } from "react";




import backgroundUrl from "../assets/img/background.jpg";
import basketballUrl from "../assets/img/basketball.png";
import footballUrl from "../assets/img/football.png";
import volleyballUrl from "../assets/img/volleyball.avif";
import humanUrl from "../assets/img/stdempimg.gif";
import cartoonUrl from "../assets/img/cartoon.png";
import logoUrl from "../assets/img/logo.png";

// --- ค่าคงที่ต่างๆ ---
const BOX_WIDTH = 700;
const BOX_HEIGHT = 350;
const CIRCLE_SIZE = 80;

const img = {
  basketball: basketballUrl,
  football: footballUrl,
  volleyball: volleyballUrl,
  human: humanUrl,
  cartoon: cartoonUrl,
  logo: logoUrl,
};

const buttonTypes = [
  "none",
  "basketball",
  "football",
  "volleyball",
  "human",
  "cartoon",
  "logo",
];

const Animation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeType, setActiveType] = useState("basketball");

  const animationId = useRef(null);
  const pngRef = useRef(null);

  const x = useRef((BOX_WIDTH - CIRCLE_SIZE) / 2);
  const y = useRef((BOX_HEIGHT - CIRCLE_SIZE) / 2);
  const xSpeed = useRef(5);
  const ySpeed = useRef(5);
  const rotation = useRef(0);
  const rotationSpeed = useRef(3);

  const upPosition = useCallback(() => {
    if (pngRef.current) {
      pngRef.current.style.left = `${x.current}px`;
      pngRef.current.style.bottom = `${y.current}px`;
      pngRef.current.style.transform = `rotate(${rotation.current}deg)`;
    }
  }, []);

  const animate = useCallback(() => {
    x.current += xSpeed.current;
    y.current += ySpeed.current;
    rotation.current = (rotation.current + rotationSpeed.current) % 360;

    const maxX = BOX_WIDTH - CIRCLE_SIZE;
    const maxY = BOX_HEIGHT - CIRCLE_SIZE;

    if (x.current <= 0 || x.current >= maxX) {
      xSpeed.current *= -1;
      x.current = x.current <= 0 ? 0 : maxX;
    }
    if (y.current <= 0 || y.current >= maxY) {
      ySpeed.current *= -1;
      y.current = y.current <= 0 ? 0 : maxY;
    }

    upPosition();
    animationId.current = requestAnimationFrame(animate);
  }, [upPosition]);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      pause();
    }
  };

  const pause = () => {
    setIsRunning(false);
    cancelAnimationFrame(animationId.current);
  };

  const stop = () => {
    pause();
    x.current = (BOX_WIDTH - CIRCLE_SIZE) / 2;
    y.current = (BOX_HEIGHT - CIRCLE_SIZE) / 2;
    rotation.current = 0;
    xSpeed.current = 5;
    ySpeed.current = 5;
    upPosition();
  };

  const changeType = (type) => {
    setActiveType(type);
    if (type === "none" && isRunning) {
      pause();
    }
  };

  useEffect(() => {
    if (isRunning) {
      animationId.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationId.current);
    }
    return () => cancelAnimationFrame(animationId.current);
  }, [isRunning, animate]);

  useEffect(() => {
    upPosition();
  }, [upPosition]);

  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.code === "Space") {
        ev.preventDefault();
        start();
      }
      if (ev.key === "s" || ev.key === "S") {
        stop();
      }
      if (ev.key >= "0" && ev.key <= "6") {
        changeType(buttonTypes[parseInt(ev.key)]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-[725px] p-1 border-2 border-black rounded-lg bg-white shadow-lg">
        <div
          className="w-[700px] h-[350px] border border-black rounded-lg relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
          <div
            ref={pngRef}
            className="w-[80px] h-[80px] rounded-full border border-black bg-cover bg-center absolute"
            style={{
              backgroundImage:
                activeType !== "none" ? `url(${img[activeType]})` : "none",
              backgroundColor: activeType === "none" ? "#bbb" : "transparent",
            }}
          ></div>
        </div>
        <div className="p-1 flex flex-wrap justify-center gap-2 mt-1">
          <button
            onClick={start}
            className={`font-bold py-1 px-3 rounded text-white ${
              isRunning
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isRunning ? "PAUSE" : "RUN"}
          </button>
          <button
            onClick={stop}
            className="font-bold py-1 px-3 rounded bg-gray-500 hover:bg-gray-600 text-white"
          >
            STOP
          </button>
          {buttonTypes.map((type) => (
            <button
              key={type}
              onClick={() => changeType(type)}
              className={`font-bold py-1 px-3 rounded capitalize ${
                activeType === type
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animation;
