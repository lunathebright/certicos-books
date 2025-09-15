import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Wish from "./pages/Wish";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-w-[950px]">
      <Header />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/wish" element={<Wish />} />
      </Routes>
    </div>
  );
}

export default App;
