import { useState, useEffect } from "react";
import { processRule, processBot } from "../js/gameRules";

const Square = ({ id, value, onClick }) => {
  return <>
    <div className="square" id={id} onClick={() => onClick(id)}>
      <span className="piece">{value}</span>
    </div>
  </>
}

export default function TicTacToe() {

  const [scoreboard, setScoreboard] = useState({
    "square_1": "",
    "square_2": "",
    "square_3": "",
    "square_4": "",
    "square_5": "",
    "square_6": "",
    "square_7": "",
    "square_8": "",
    "square_9": ""
  });

  const [curRole, setCurRole] = useState("");
  const [curPieceId, setCurPieceId] = useState("");

  useEffect(() => {
    console.log("TicTacToe rendered!");
    initGame();
  }, [])

  useEffect(() => {

    const result = processRule({ scoreboard, curRole, curPieceId });
    if (result) {
      if (result.isEnd) {
        return alert(`${result.role} 贏了！`);
      } else {
        if (result.role == "BOT") {
          handleBot();
        }
      }
    }

  }, [scoreboard]); // scoreboard 更新後執行

  const initGame = () => {
    console.log("遊戲初始化");
    Object.keys(scoreboard).forEach(key => scoreboard[key] = ""); // 清空
  }

  const handlePlayer = (id) => {
    setScoreboard(prev => {
      if (!prev[id]) {
        setCurRole("PLAYER");
        setCurPieceId(id);
        return { ...prev, [id]: "O" };
      } else {
        setCurRole("");
        setCurPieceId("");
        return prev;
      }
    });
  }

  const handleBot = () => {
    setScoreboard(prev => {
      const id = processBot({ scoreboard: prev });
      if (id) {
        setCurRole("BOT");
        setCurPieceId(id);
        return { ...prev, [id]: "X" };
      } else {
        setCurPieceId("");
        return prev;
      }
    });
  }

  return (
    <div className="board">
      {Object.entries(scoreboard).map(([id, val], index) => (
        <Square key={index} id={id} value={val} onClick={handlePlayer} />
      ))}
    </div>
  );
}