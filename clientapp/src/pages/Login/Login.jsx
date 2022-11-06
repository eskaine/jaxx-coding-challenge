import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { withOnChangeHandler } from "../../components/hoc/withOnChangeHandler";
import { adminLoginAsync } from "../../reducers/adminSlice";
import { isAuthenticated } from "../../reducers/adminSlice";
import { formSectionStyle, loginFormStyle } from "./styles";

export const formState = {
  email: "",
  password: "",
};

function Login(props) {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthenticated);

  const [showLoginError, setShowLoginError] = useState(false);

  const onSubmit = async () => {
    const res = await dispatch(adminLoginAsync(props.formState));

    if (res.meta.requestStatus !== "fulfilled") {
      setShowLoginError(true);
    }
  };

  return isAuth ? (
    <Navigate to="/dashboard" />
  ) : (
    <div>
      <Box sx={formSectionStyle}>
        <Box sx={loginFormStyle}>
          <Typography variant="h5">Login</Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => props.onChangeHandler(e)}
            inputProps={{ "data-type": "email" }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => props.onChangeHandler(e)}
            inputProps={{ "data-type": "password" }}
            type="password"
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

export default withOnChangeHandler(Login, formState);
