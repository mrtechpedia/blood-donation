import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Admin from "./components/admin_page/admin_page.component";
import Emergency from "./components/emergency_page/emergency_page.component";
import Home from "./components/homepage/home.component";
import Register from "./components/register_page/register_page.component";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/emergency" element={<Emergency />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
