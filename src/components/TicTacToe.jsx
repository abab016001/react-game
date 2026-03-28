import { useState, useEffect } from "react";
import { processInit, processRule, processBot } from "../js/gameRules";

const Square = ({ id, value, onClick }) => {
  return <>
    <div className="square" id={id} onClick={() => onClick(id)}>
      <span className="piece">{value}</span>
    </div>
  </>
}

export default function TicTacToe() {

  const [board, setBoard] = useState({});
  const [role, setRole] = useState("");
  const [squareId, setSquareId] = useState("");

  useEffect(() => {
    initGame();
  }, [])

  useEffect(() => {

    const result = processRule({ board, role, squareId });
    if (result) {
      if (result.isEnd) {
        return alert(`${result.role} 贏了！`);
      } else {
        if (result.role == "BOT") {
          handleBot();
        }
      }
    }

  }, [board]); // board 更新後執行

  const initGame = () => {
    processInit({ setBoard });
  }

  const handlePlayer = (id) => {
    setBoard(prev => {
      if (!prev[id]) {
        setRole("PLAYER");
        setSquareId(id);
        return { ...prev, [id]: "O" };
      } else {
        setRole("");
        setSquareId("");
        return prev;
      }
    });
  }

  const handleBot = () => {
    setBoard(prev => {
      const id = processBot({ board: prev });
      if (id) {
        setRole("BOT");
        setSquareId(id);
        return { ...prev, [id]: "X" };
      } else {
        setSquareId("");
        return prev;
      }
    });
  }

  return (
    <div className="board">
      {Object.entries(board).map(([id, val], index) => (
        <Square key={index} id={id} value={val} onClick={handlePlayer} />
      ))}
    </div>
  );
}