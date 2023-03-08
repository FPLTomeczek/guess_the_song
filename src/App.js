import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PlayerPage from "./pages/PlayerPage";
import AlbumsPage from "./pages/AlbumsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/artist/:id" element={<AlbumsPage />}></Route>
        <Route path="/player/:id" element={<PlayerPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
