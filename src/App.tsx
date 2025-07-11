import React from "react";

import "./App.css";
import ToDoList from "./pages/ToDoList";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import PomodoroTimer from "./pages/PomodoroTimer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/to-do-list" element={<ToDoList />} />
            <Route path="/pomodoro" element={<PomodoroTimer />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
