import { useGlobalStore } from "../store/useGlobalStore";
import TicTacToe from "../components/TicTacToe";
function V2() {
  const setPage = useGlobalStore((state) => state.setPage);
  return <>
    <button onClick={() => setPage(1)}>回首頁</button>
    <br />
    <div className="p-10">
      九宮格
      <TicTacToe />
    </div>
  </>
}

export default V2;