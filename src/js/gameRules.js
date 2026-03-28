const _getLayer = (id) => {
  const [q, r] = [Math.floor(id / 3), id % 3];
  const layer = q + (r > 0 ? 1 : 0)
  return layer;
}

export const processRule = ({ board, role, squareId }) => {
  const rtn = { "isEnd": false, "role": null };

  const curId = parseInt(squareId.split("square_")[1]);
  if (isNaN(curId)) {
    return null;
  }

  const layer = _getLayer(curId);
  const [row, col] = [
    [curId - 2, curId - 1, curId, curId + 1, curId + 2].filter(x => x > 0 && _getLayer(x) == layer),
    [curId - 6, curId - 3, curId, curId + 3, curId + 6].filter(x => x > 0 && _getLayer(x) <= 3)
  ];

  const row_ids = row.map(x => `square_${x}`);
  const col_ids = col.map(x => `square_${x}`);
  const is_O_end = row_ids.every(x => board[x] == "O") || col_ids.every(x => board[x] == "O");
  const is_X_end = row_ids.every(x => board[x] == "X") || col_ids.every(x => board[x] == "X");
  switch (role) {
    case "PLAYER":
      if (is_O_end) {
        rtn.isEnd = true;
        rtn.role = "玩家";
        return rtn;
      }
      break;
    case "BOT":
      if (is_X_end) {
        rtn.isEnd = true;
        rtn.role = "電腦";
        return rtn;
      }
      break;
  }

  if (role == "PLAYER") {
    rtn.isEnd = false;
    rtn.role = "BOT";
  }

  return rtn;
}

export const processBot = ({ board: prev }) => {
  const no_active_ids = Object.keys(prev).filter(_id => !prev[_id]);
  const randomIndex = Math.floor(Math.random() * no_active_ids.length);
  const id = no_active_ids[randomIndex];

  return id;
}

export const processInit = ({ setBoard }) => {
  const board = Object.fromEntries(
    Array.from({ length: 9 }, (_, index) => [`square_${index + 1}`, '']),
  )

  setBoard(board)
};