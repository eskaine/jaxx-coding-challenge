import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { withOnChangeHandler } from "../../components/hoc/withOnChangeHandler";
import { ServiceContext } from "../../utils/serviceProvider";
import { formSectionStyle, loginFormStyle, } from "./styles";

export const formState = {
  email: "",
  password: "",
};

function Login(props) {
  const dispatch = useDispatch();
  const services = useContext(ServiceContext);

  const [showLoginError, setShowLoginError] = useState(false);

  const onSubmit = async () => {
    const isSuccessful = await services.accountService.login(props.formState, dispatch);

    if(!isSuccessful) {
      setShowLoginError(true);
    }
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
            onChange={(e) => props.onChangeHandler(e)}
            inputProps={{ "data-type": "email" }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => props.onChangeHandler(e)}
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

export default withOnChangeHandler(Login, formState);
