import { Box, Button, Typography } from "@mui/material";
import InputField from "../components/InputField";

const formSectionStyle = {
  mt: 10,
  display: "flex",
  justifyContent: "center",
};

const loginFormStyle = {
  display: "flex",
  flexDirection: "column",
  width: 450,
  gap: 2,
};

function AddProduct() {
  return (
    <div>
      <Typography variant="h4">Add Product</Typography>
      <Box sx={formSectionStyle}>
        <Box sx={loginFormStyle}>
          <InputField fieldName="SKU" />
          <InputField fieldName="Title" />
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>
    </div>
  );
}

export default AddProduct;
