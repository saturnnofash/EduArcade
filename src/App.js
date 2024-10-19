import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Game from "./pages/Game";
import Login from "./pages/LoginSignup";
import Minemind from "./components/Game-canvas/test";
import TriviaMiningAdventure from "./components/Game-canvas/test1";

function App() {
  return (
    <Routes>
      <Route path="/MineMind.html" element={<Minemind/>} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default App;