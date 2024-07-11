import "./App.css";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import images from "./themes/appImage"
import { Link, useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./components/Home/Landing";
import Home from "./components/Home/Home.jsx";
import AboutUs from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing title="The PassengerHub" />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/contactUs" element={<Contact />} />
          <Route path="/login" element={<Login title="The PassengerHub" />}/>
          <Route path="/register" element={<Register />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
