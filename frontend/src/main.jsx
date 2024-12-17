import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signcard } from "./components/sign/Signcard";
import Home from "./components/Home/Home";
import Event from "./components/Events/Event";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

import Profile from './components/Profile/Profile.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/signcard" element={<Signcard />} />

          <Route
            path="/*"
            element={
              <App>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/event" element={<Event />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </App>
              //<App/>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
