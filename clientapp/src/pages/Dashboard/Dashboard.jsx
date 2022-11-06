import { Box, Typography } from "@mui/material";
import LinkButton from "../../components/LinkButton";
import {
  dashboardHeaderContainerStyle,
  productsContainerStyle,
  mockProductCard,
} from "./styles";

function Dashboard() {
  return (
    <div>
      <Box sx={dashboardHeaderContainerStyle}>
        <Typography variant="h4">Dashboard</Typography>
        <LinkButton navlink="/add-product" name="Add New Product" />
      </Box>

      <Typography variant="h5">Products</Typography>

      <Box sx={productsContainerStyle}>
        <Box sx={mockProductCard} />
        <Box sx={mockProductCard} />
        <Box sx={mockProductCard} />
        <Box sx={mockProductCard} />
        <Box sx={mockProductCard} />
        <Box sx={mockProductCard} />
        <Box sx={mockProductCard} />
        <Box sx={mockProductCard} />
      </Box>
    </div>
  );
}

export default Dashboard;
