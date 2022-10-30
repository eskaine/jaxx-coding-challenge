import { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

const formSectionStyle = {
  mt: 10,
  display: "flex",
  justifyContent: "center",
};

const loginFormStyle = {
  display: "flex",
  flexDirection: "column",
  width: 400,
  gap: 2,
};

export default function Login() {
  const [showLoginError, setShowLoginError] = useState(false);
  
  return (
    <div>
      <Box sx={formSectionStyle}>
        <Box sx={loginFormStyle}>
          <Typography variant="h5">Login</Typography>
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <Button variant="contained">Submit</Button>
          {showLoginError && (
            <Alert severity="error">Incorrect Email or Password!</Alert>
          )}
        </Box>
      </Box>
    </div>
  );
}
