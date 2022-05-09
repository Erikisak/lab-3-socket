import SocketsProvider from "../context/socket.context"
import Home from "./Home";

function App() {
  return (
    <SocketsProvider>
      <Home />
    </SocketsProvider>
  );
}

export default App;
