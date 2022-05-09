import SocketsProvider from "../context/socket.context"
import Home from "./Home";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Rooms from "./Rooms";
import Chat from "./Chat";


function App() {
  return (
    <SocketsProvider>
    <BrowserRouter>
    <Layout/>
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/rooms" element={<Rooms />} />
    <Route path="/chat" element={<Chat />} />     
    </Routes>
    </BrowserRouter>
    
      
    </SocketsProvider>
  );
}

export default App;
