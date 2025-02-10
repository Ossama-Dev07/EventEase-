// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signcard } from "./components/sign/Signcard";
import Home from "./components/Home/Home";
import Event from "./components/Events/Event";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Profile from "./components/Profile/Profile";
import App from "./App";
import VerifyEmail from "./components/sign/passowordRecovery/VerifyEmail";

export const RecoveryContext = createContext();

function RecoveryProvider({ children }) {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      {children}
    </RecoveryContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/signcard"
            element={
              <RecoveryProvider>
                <Signcard />
              </RecoveryProvider>
            }
          />
          <Route
            path="/*"
            element={
              <App>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/event" element={<Event />} />
                  <Route path="/about" element={<About />} />
                  {/* <Route path="/recoveryPassword" element={<VerifyEmail />} /> */}
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </App>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
