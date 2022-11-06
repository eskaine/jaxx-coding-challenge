import { useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Image } from "mui-image";
import InputField from "../components/InputField";
import { FirebaseContext } from "../utils/firebaseProvider";

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

const imageFormStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const placeholderImage = {
  width: "auto",
  height: '20vh',
  backgroundColor: "lightgray",
  color: "white",
  fontSize: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function AddProduct() {
  const { uploadImage} = useContext(FirebaseContext);
  const [image, setImage] = useState(null);

  const submitImage = async (e) => {
    const imageUrl = await uploadImage(e.target.files[0]);
    if(imageUrl) {
      setImage(imageUrl);
    }
  };

  return (
    <div>
      <Typography variant="h4">Add Product</Typography>
      <Box sx={formSectionStyle}>
        <Box sx={loginFormStyle}>
          <InputField fieldName="SKU" />
          <InputField fieldName="Title" />
          <Box sx={imageFormStyle}>
            <Typography variant="h5">Upload Image :</Typography>
            <Button variant="contained"><input type="file" onChange={(e) => submitImage(e)} /></Button>
          </Box>
          {!image && <Box sx={placeholderImage}>Image</Box>}
          {image && (
            <Image
              fit="scale-down"
              height="20vh"
              src={image}
            />
          )}
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>
    </div>
  );
}

export default AddProduct;
