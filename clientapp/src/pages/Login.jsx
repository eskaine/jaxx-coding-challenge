import { useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { adminLoginAsync } from "../reducers/admin/adminSlice";

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

function Login() {
  const dispatch = useDispatch();

  const [showLoginError, setShowLoginError] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const onChange = ({ target }) => {
    const field = target.getAttribute("data-type");

    setFormState({
      ...formState,
      [field]: target.value,
    });
  };

  const onSubmit = async () => {
    const validEmail = validator.isEmail(formState.email);
    const validPassword = validator.isStrongPassword(formState.password);

    if(validEmail && validPassword) {
      const res = await dispatch(adminLoginAsync(formState));

      if(res.meta.requestStatus === "fulfilled") {
          return;
      }
    }

    setShowLoginError(true);
  };

  return (
    <div>
      <Box sx={formSectionStyle}>
        <Box sx={loginFormStyle}>
          <Typography variant="h5">Login</Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => onChange(e)}
            inputProps={{ "data-type": "email" }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => onChange(e)}
            inputProps={{ "data-type": "password" }}
          />
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
          {showLoginError && (
            <Alert severity="error">Incorrect Email or Password!</Alert>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Login;
