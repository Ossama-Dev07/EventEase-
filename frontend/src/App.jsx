import React from "react";
import SideBar from "./components/SideBar";
import { ThemeProvider } from "./components/theme-provider";


function App({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App pt-[100px] ">
        <SideBar />
        {children}
      </div>
    </ThemeProvider>
  );
}

export default App;
