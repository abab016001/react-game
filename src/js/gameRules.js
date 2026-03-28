const _getLayer = (id) => {
  const [q, r] = [Math.floor(id / 3), id % 3];
  const layer = q + (r > 0 ? 1 : 0)
  return layer;
}

export const processRule = ({ scoreboard, curRole, curPieceId }) => {
  const rtn = { "isEnd": false, "role": null };

  const curId = parseInt(curPieceId.split("square_")[1]);
  if (isNaN(curId)) {
    return null;
  }

  const layer = _getLayer(curId);
  const [row, col] = [
    [curId - 2, curId - 1, curId, curId + 1, curId + 2].filter(x => x > 0 && _getLayer(x) == layer),
    [curId - 6, curId - 3, curId, curId + 3, curId + 6].filter(x => x > 0 && _getLayer(x) <= 3)
  ];
  console.log("handleScoring", curRole, { layer, row, col })

  const row_ids = row.map(x => `square_${x}`);
  const col_ids = col.map(x => `square_${x}`);
  const is_end = row_ids.every(x => scoreboard[x] == "O") || col_ids.every(x => scoreboard[x] == "O");
  switch (curRole) {
    case "PLAYER":
      if (is_end) {
        rtn.isEnd = true;
        rtn.role = "PLAYER";
        return rtn;
      }
      break;
    case "BOT":
      if (is_end) {
        rtn.isEnd = true;
        rtn.role = "BOT";
        return rtn;
      }
      break;
  }

  if (curRole == "PLAYER") {
    rtn.isEnd = false;
    rtn.role = "BOT";
  }

  return rtn;
}

export const processBot = ({ scoreboard: prev }) => {
  const no_active_ids = Object.keys(prev).filter(_id => !prev[_id]);
  const randomIndex = Math.floor(Math.random() * no_active_ids.length);
  const id = no_active_ids[randomIndex];

  return id;
}