import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

export const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);
  const boxRefs = useRef(Array.from({ length: 9 }, () => React.createRef()));

  const toggle = (e, index) => {
    if (lock) {
      return;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}'>`;
      data[index] = "x";
      setCount(count + 1);
    } else {
      e.target.innerHTML = `<img src='${circle_icon}'>`;
      data[index] = "o";
      setCount(count + 1);
    }
    checkWin();
  };

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon}> wins`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon}> wins`;
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span>";
    boxRefs.current.forEach((box) => {
      if (box.current) {
        box.current.innerHTML = "";
      }
    });
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className={`row${row + 1}`}>
            {boxRefs.current
              .slice(row * 3, row * 3 + 3)
              .map((boxRef, index) => (
                <div
                  key={index}
                  className="boxes"
                  ref={boxRef}
                  onClick={(e) => {
                    toggle(e, row * 3 + index);
                  }}
                ></div>
              ))}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};
