import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { token } from "../../reducers/adminSlice";
import { getAllProductAsync, products } from "../../reducers/productsSlice";
import LinkButton from "../../components/LinkButton";
import ProductCard from "../../components/ProductCard";
import { createHeaders } from '../../utils/helper';
import { dashboardHeaderContainerStyle, productsContainerStyle } from "./styles";

function Dashboard() {
  const dispatch = useDispatch();
  const authToken = useSelector(token);
  const productsList = useSelector(products);

  useEffect(() => {
    const params = createHeaders(authToken);
    dispatch(getAllProductAsync(params));
  }, []);

  return (
    <div>
      <Box sx={dashboardHeaderContainerStyle}>
        <Typography variant="h4">Dashboard</Typography>
        <LinkButton navlink="/add-product" name="Add New Product" />
      </Box>
      <Typography variant="h5">Products</Typography>
      <Box sx={productsContainerStyle}>
        {productsList.length > 0 && productsList.map((element, i) => {
          return <ProductCard key={i} value={element}/>
        })}
      </Box>
    </div>
  );
}

export default Dashboard;
