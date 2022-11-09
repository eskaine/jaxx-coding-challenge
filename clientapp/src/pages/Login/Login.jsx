import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "../../components/hooks/withForm";
import { adminLoginAsync, adminRegisterAsync, login } from "../../reducers/adminSlice";
import { isAuthenticated } from "../../reducers/adminSlice";
import { formSectionStyle, loginFormStyle, registerTextStyle } from "./styles";
import { Link } from "react-router-dom";

export const loginformState = {
  email: "",
  password: "",
};

function Login({ pageLabel }) {
  const dispatch = useDispatch();
  const { formState, onChangeHandler } = useForm(loginformState);
  const isAuth = useSelector(isAuthenticated);

  const [showLoginError, setShowLoginError] = useState(false);

  const onSubmit = async () => {
    let res;
    
    if(pageLabel === "Login") {
      res = await dispatch(adminLoginAsync(formState));
    } else {
      res = await dispatch(adminRegisterAsync(formState));
    }

    if (res.payload && res.payload.status !== 200) {
      setShowLoginError(true);
    }
  };

  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  return isAuth ? (
    <Navigate to="/dashboard" />
  ) : (
    <div>
      <Box sx={formSectionStyle}>
        <Box sx={loginFormStyle}>
          <Typography variant="h5">{pageLabel}</Typography>
          <TextField
            id="email-field"
            label="Email"
            variant="outlined"
            value={formState.email}
            onChange={(e) => onChangeHandler(e)}
            inputProps={{ "data-type": "email" }}
          />
          <TextField
            id="password-field"
            label="Password"
            variant="outlined"
            value={formState.password}
            onChange={(e) => onChangeHandler(e)}
            inputProps={{ "data-type": "password" }}
            type="password"
          />
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
          {showLoginError && (
            <Alert severity="error">Incorrect Email or Password!</Alert>
          )}
          {pageLabel === "Login" && (
            <Box sx={registerTextStyle}>
              <Link to="/register">Register</Link>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Login;
