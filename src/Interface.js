import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import useGame from "./stores/useGame";
import "./style.css";

function Interface() {
  const time = useRef();

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;
    });
    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      <div ref={time} className="time">
        0.00
      </div>
      {phase === "ended" ? (
        <div className="restart" onClick={restart}>
          RESTART
        </div>
      ) : null}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}>
            <span>W</span>
          </div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}>
            <span>A</span>
          </div>
          <div className={`key ${backward ? "active" : ""}`}>
            <span>S</span>
          </div>
          <div className={`key ${rightward ? "active" : ""}`}>
            <span>D</span>
          </div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}>
            <span>SPACE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interface;
