import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Wish from "./pages/Wish";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/wish" element={<Wish />} />
      </Routes>
    </div>
  );
}

export default App;
