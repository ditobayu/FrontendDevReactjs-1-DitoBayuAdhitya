import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
