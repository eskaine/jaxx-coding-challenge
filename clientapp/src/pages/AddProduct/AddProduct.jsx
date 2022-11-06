import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Image } from "mui-image";
import InputField from "../../components/InputField";
import { withOnChangeHandler } from "../../components/hoc/withOnChangeHandler";
import { token } from "../../reducers/adminSlice";
import { addProductAsync } from "../../reducers/productsSlice";
import { FirebaseContext } from "../../utils/firebaseProvider";
import { formSectionStyle, loginFormStyle, imageFormStyle, placeholderImage } from './styles';

const formState = {
  sku: "",
  title: "",
};

function AddProduct(props) {
  const dispatch = useDispatch();
  const authToken = useSelector(token);
  const { uploadImage } = useContext(FirebaseContext);
  const [imageUrl, setImageUrl] = useState(null);

  const submitImage = async (e) => {
    const url = await uploadImage(e.target.files[0]);
    if (url) {
      setImageUrl(url);
    }
  };

  const onSubmit = async () => {
    const data = {
      ...props.formState,
      imageUrl
    }

    const headers = {
      headers: {
        'Authorization': authToken,
      },
    };

    const res = await dispatch(addProductAsync({data, headers}));
    // redirect
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
          {!imageUrl && <Box sx={placeholderImage}>Image</Box>}
          {imageUrl && <Image fit="scale-down" height="20vh" src={imageUrl} />}
          <Button variant="contained" onClick={onSubmit}>Submit</Button>
        </Box>
      </Box>
    </div>
  );
}

export default withOnChangeHandler(AddProduct, formState);
