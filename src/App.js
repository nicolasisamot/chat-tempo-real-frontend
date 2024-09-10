import { io } from "socket.io-client";

function App() {
  async function handleSubmitMsg() {
    const socket = await io.connect("http://localhost:3001");
  }
  return (
    <div className="App">
      <button onClick={() => handleSubmitMsg()}>test</button>
    </div>
  );
}

export default App;
