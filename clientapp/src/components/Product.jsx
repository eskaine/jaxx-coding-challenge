import { useDispatch, useSelector } from "react-redux";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { token } from "../reducers/adminSlice";
import { deleteProductAsync } from "../reducers/productsSlice";
import { createHeaders } from '../utils/helper';

function Product({ value }) {
  const dispatch = useDispatch();
  const authToken = useSelector(token);
  const { _id, sku, title, imageUrl } = value;

  const onDelete = async () => {
    const params = {
      id: _id,
      headers: createHeaders(authToken)
    };

    const res = await dispatch(deleteProductAsync(params));
    if(res.payload.status === 200) {
      window.location.reload(false);
    }
  }

  return (
    <Card sx={{ width: 250 }}>
      <CardMedia component="img" height="140" image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sku}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Product;

