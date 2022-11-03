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

function InputField({fieldName}) {
  return (
    <Box sx={inputFieldStyle}>
      <Typography variant="h5">{`${fieldName} :`}</Typography>
      <TextField
        id="outlined-basic"
        label={fieldName}
        variant="outlined"
        sx={inputStyle}
      />
    </Box>
  );
}

export default InputField;
