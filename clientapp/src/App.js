import React from "react";
import Container from "@mui/material/Container";
import Navbar from './features/Header/Navbar';
import "./App.css";

function App({children}) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Container fixed>{ children }</Container>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
