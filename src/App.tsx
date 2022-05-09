import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Homepage from "./components/Homepage";
import Layout from "./components/Layout";
import Rooms from "./components/Rooms";



function App() {
  return (
    <BrowserRouter>
    <Layout/>
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/rooms" element={<Rooms />} />
    <Route path="/chat" element={<Chat />} />     
    </Routes>
    </BrowserRouter>
  );
}

export default App;
