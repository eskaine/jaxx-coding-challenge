import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Typography } from "@mui/material";
import { token } from "../../reducers/adminSlice";
import {
  getAllProductsAsync,
  searchProductsAsync,
  products,
} from "../../reducers/productsSlice";
import LinkButton from "../../components/LinkButton";
import ProductCard from "../../components/ProductCard";
import { createHeaders } from "../../utils/helper";
import {
  dashboardContainerStyle,
  dashboardHeaderContainerStyle,
  productsHeaderStyle,
  productsContainerStyle,
  searchFieldStyle,
} from "./styles";

function Dashboard() {
  const dispatch = useDispatch();
  const authToken = useSelector(token);
  const productsList = useSelector(products);

  const onSearchChangeHandler = ({ target }) => {
    const value = target.value.trim();
    const headers = createHeaders(authToken);

    if (value === "") {
      return dispatch(getAllProductsAsync(headers));
    }

    const params = { 
      headers,
      searchTerm: value
    };
    dispatch(searchProductsAsync(params));
  };

  useEffect(() => {
    const params = createHeaders(authToken);
    dispatch(getAllProductsAsync(params));
  }, []);

  return (
    <div>
      <Box sx={dashboardContainerStyle}>
        <Box sx={dashboardHeaderContainerStyle}>
          <Typography variant="h4">Dashboard</Typography>
          <LinkButton navlink="/add-product" name="Add New Product" />
        </Box>
        <TextField
          sx={searchFieldStyle}
          id="outlined-search"
          label="Search by SKU or Title"
          type="search"
          onChange={(e) => onSearchChangeHandler(e)}
        />
        <Box>
          <Typography sx={productsHeaderStyle} variant="h5">
            Products
          </Typography>
          <Box sx={productsContainerStyle}>
            {productsList.length > 0 &&
              productsList.map((element, i) => {
                return <ProductCard key={i} value={element} />;
              })}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
