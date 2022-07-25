import "./App.css";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
