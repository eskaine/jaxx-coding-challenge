import { Box, TextField, Typography } from "@mui/material";

const inputFieldStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 5
};

const inputStyle = {
    width: 300
}

function InputField({fieldName, dataType, onChangeHandler}) {
  return (
    <Box sx={inputFieldStyle}>
      <Typography variant="h5">{`${fieldName} :`}</Typography>
      <TextField
        id="outlined-basic"
        label={fieldName}
        variant="outlined"
        sx={inputStyle}
        onChange={(e) => onChangeHandler(e)}
        inputProps={{ "data-type": dataType }}
      />
    </Box>
  );
}

export default InputField;
