import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Game from "./pages/Game-Home";
import Login from "./pages/LoginSignup";
import Game1 from "./pages/Game-1";
import Game2 from "./pages/Game-2"; //i need to change this to actual path

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<Login />} />
      <Route path="/game1" element={<Game1/>} />
      <Route path="/game2" element={<Game2 />} />
    </Routes>
  );
}

export default App;