import { useGlobalStore } from "../store/useGlobalStore";

function V1() {
  const setPage = useGlobalStore((state) => state.setPage);
  return <>
    <button onClick={() => setPage(2)}>開始遊戲</button>
    <br />
    <button onClick={() => alert('離開遊戲')}>離開遊戲</button>
  </>
}

export default V1;