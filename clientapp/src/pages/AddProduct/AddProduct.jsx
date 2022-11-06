import { useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Image } from "mui-image";
import InputField from "../../components/InputField";
import { FirebaseContext } from "../../utils/firebaseProvider";
import { withOnChangeHandler } from "../../components/hoc/withOnChangeHandler";
import { formSectionStyle, loginFormStyle, imageFormStyle, placeholderImage } from './styles';

const formState = {
  sku: "",
  title: "",
};

function AddProduct(props) {
  const { uploadImage } = useContext(FirebaseContext);
  const [image, setImage] = useState(null);

  const submitImage = async (e) => {
    const imageUrl = await uploadImage(e.target.files[0]);
    if (imageUrl) {
      setImage(imageUrl);
    }
  };

  return (
    <div>
      <Typography variant="h4">Add Product</Typography>
      <Box sx={formSectionStyle}>
        <Box sx={loginFormStyle}>
          <InputField
            fieldName="SKU"
            dataType="sku"
            value={props.formState.sku}
            onChangeHandler={props.onChangeHandler}
          />
          <InputField
            fieldName="Title"
            dataType="title"
            value={props.formState.title}
            onChangeHandler={props.onChangeHandler}
          />
          <Box sx={imageFormStyle}>
            <Typography variant="h5">Upload Image :</Typography>
            <Button variant="contained">
              <input type="file" onChange={(e) => submitImage(e)} />
            </Button>
          </Box>
          {!image && <Box sx={placeholderImage}>Image</Box>}
          {image && <Image fit="scale-down" height="20vh" src={image} />}
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>
    </div>
  );
}

export default withOnChangeHandler(AddProduct, formState);
