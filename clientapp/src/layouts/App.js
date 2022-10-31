import React from "react";
import Container from "@mui/material/Container";
import Navbar from '../components/Navbar';
import { RouterProvider } from "react-router-dom";
import { router } from "../configs/router";

function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Container fixed>
          <RouterProvider router={router} />
        </Container>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
