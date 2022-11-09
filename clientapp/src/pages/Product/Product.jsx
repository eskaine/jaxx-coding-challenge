import { useState, useContext, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Image } from "mui-image";
import InputField from "../../components/InputField";
import { useForm } from "../../components/hooks/withForm";
import { token } from "../../reducers/adminSlice";
import { addProductAsync, editProductAsync } from "../../reducers/productsSlice";
import { FirebaseContext } from "../../utils/firebaseProvider";
import { formSectionStyle, loginFormStyle, imageFormStyle, placeholderImage } from './styles';

const productFormState = {
  sku: "",
  title: "",
  imageUrl: ""
};

function Product({ pageLabel }) {
  const { formState, updateFormState, onChangeHandler } = useForm(productFormState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = useSelector(token);
  const { state } = useLocation();
  const { uploadImage } = useContext(FirebaseContext);
  const [showError, setShowError] = useState(false);

  const submitImage = async (e) => {
    const imageUrl = await uploadImage(e.target.files[0]);
    if (imageUrl) {
      updateFormState({
        ...formState,
        imageUrl
      })
    }
  };

  const onSubmit = async () => {
    const dispatchState = {
      data: formState,
      headers: {
        headers: {
          'Authorization': authToken,
        },
      }
    };

    const res = await dispatch(
      pageLabel === 'Add Product' ? 
        await addProductAsync(dispatchState) : await editProductAsync({id: state._id, ...dispatchState})
    );

    if(res.error) {
      setShowError(true);
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if(pageLabel === 'Edit Product') {
      updateFormState({
        sku: state.sku,
        title: state.title,
        imageUrl: state.imageUrl
      });
    }
  }, []);

  return (
    <div>
      <Typography variant="h4">{pageLabel}</Typography>
      <Box sx={formSectionStyle}>
        <Box sx={loginFormStyle}>
          <InputField
            fieldName="SKU"
            dataType="sku"
            value={formState.sku}
            onChangeHandler={onChangeHandler}
          />
          <InputField
            fieldName="Title"
            dataType="title"
            value={formState.title}
            onChangeHandler={onChangeHandler}
          />
          <Box sx={imageFormStyle}>
            <Typography variant="h5">Upload Image :</Typography>
            <Button variant="contained">
              <input type="file" onChange={(e) => submitImage(e)} />
            </Button>
          </Box>
          {formState.imageUrl === "" && <Box sx={placeholderImage}>Image</Box>}
          {formState.imageUrl !== "" && <Image fit="scale-down" height="20vh" src={formState.imageUrl} />}
          <Button variant="contained" disabled={formState.sku === "" || formState.title === "" || formState.imageUrl === ""} onClick={onSubmit}>Submit</Button>
          {showError && (
            <Alert severity="error">Invalid product information!</Alert>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Product;
