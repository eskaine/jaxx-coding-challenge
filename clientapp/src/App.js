import React from "react";
import Container from "@mui/material/Container";
import Navbar from './components/Navbar';
import AppRoutes from "./configs/router";

const mainContainerStyle = {
  paddingTop: 5,
};

function App(props) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Container fixed sx={mainContainerStyle}>
          <AppRoutes />
        </Container>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
