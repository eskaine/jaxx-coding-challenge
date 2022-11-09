import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
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
  loadingContainerStyle
} from "./styles";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const authToken = useSelector(token);
  const productsList = useSelector(products);

  const searchTimeout = () => {
    const searchInterval = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(searchInterval);
    }, 500);
  }

  const onSearchChangeHandler = async ({ target }) => {
    const value = target.value.trim();

    if (value === "") {
      loadAllProducts();
      return;
    }

    setIsLoading(true);
    const params = { 
      headers: createHeaders(authToken),
      searchTerm: value
    };
    const res = await dispatch(searchProductsAsync(params));
    
    if(res.payload.status === 200) {
      searchTimeout();
    }
  };

  const loadAllProducts = async () => {
    setIsLoading(true);
    const params = createHeaders(authToken);
    const res = await dispatch(getAllProductsAsync(params));

    if(res.payload.status === 200) {
      searchTimeout();
    }
  }

  useEffect(() => {
    loadAllProducts();
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
          <Box sx={!isLoading ? productsContainerStyle : loadingContainerStyle}>
            {!isLoading && productsList.length > 0 &&
              productsList.map((element, i) => {
                return <ProductCard key={i} value={element} />;
              })}
              {isLoading && <CircularProgress />}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
