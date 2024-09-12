import React from "react";
import SideBar from "./components/SideBar";

function App({ children }) {
  return (
    <div className="App">
      <SideBar />
      {children}
    </div>
  );
}

export default App;
