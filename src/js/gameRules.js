const X = 3;

const _getRow = (id) => {
  const [q, r] = [Math.floor(id / X), id % X];
  const row = q + (r > 0 ? 1 : 0)
  return row;
}

const _getCol = (id) => {
  const [q, r] = [Math.floor(id / X), id % X];
  return r;
}

const _is_end = (board, val, curId) => {
  const is_active_ids = Object.keys(board).filter(_id => board[_id] == val).map(x => x.split('square_')[1]);
  if (is_active_ids.length < X) {
    return false
  }

  const cur_row = _getRow(curId);
  if (is_active_ids.map(_id => _getRow(_id)).filter(id_row => id_row == cur_row).length >= X) {
    return true;
  }
  const cur_col = _getCol(curId);
  if (is_active_ids.map(_id => _getCol(_id)).filter(id_col => id_col == cur_col).length >= X) {
    return true;
  }

  const row_ary = Array(X).fill("").map((_, index) => index + 1);
  const lt_rb_ids = [];
  for (const r of row_ary) {
    const c = r;
    const val = X * (r - 1) + c;
    lt_rb_ids.push(val);
  }
  if (lt_rb_ids.every(id => board[`square_${id}`] == val)) {
    const _cols = lt_rb_ids.map(id => _getCol(id));
    if (new Set(_cols).size == _cols.length) {
      return true;
    }
  }

  const col_ary = Array(X).fill("").map((_, index) => index + 1);
  const lb_rt_ids = [];
  for (const c of col_ary) {
    const r = X + 1 - c;
    const val = X * (r - 1) + c;
    lb_rt_ids.push(val);
  }
  if (lb_rt_ids.every(id => board[`square_${id}`] == val)) {
    const _rows = lb_rt_ids.map(id => _getRow(id));
    if (new Set(_rows).size == _rows.length) {
      return true;
    }
  }

  return false;
}

export const processRule = ({ board, role, squareId }) => {
  const rtn = { "isEnd": false, "role": null };

  const curId = parseInt(squareId.split("square_")[1]);
  if (isNaN(curId)) {
    return null;
  }

  const is_O_end = _is_end(board, "O", curId);
  const is_X_end = _is_end(board, "X", curId);
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

  const no_active_ids = Object.keys(board).filter(_id => !board[_id]);
  if (!no_active_ids.length) {
    rtn.isEnd = true;
    rtn.role = null;
    return rtn;
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