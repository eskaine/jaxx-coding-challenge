import React from "react";
import Container from "@mui/material/Container";
import Navbar from '../components/Navbar';
import { RouterProvider } from "react-router-dom";
import { router } from "../configs/router";

const mainContainerStyle = {
  paddingTop: 5,
};

function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Container fixed sx={mainContainerStyle}>
          <RouterProvider router={router} />
        </Container>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
