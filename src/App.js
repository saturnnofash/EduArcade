import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Subjects from "./pages/Subjects";
import Game from "./pages/Game";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/game" element={<Game />} />
      <Route path="/subjects" element={<Subjects />} />
    </Routes>
  );
}

export default App;
