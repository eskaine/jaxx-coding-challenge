import { Box, Typography } from "@mui/material";
import LinkButton from "../components/LinkButton";

const dashboardHeaderContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: 2
};

const productsContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 5,
};

const mockProductCard = {
  width: 250,
  height: 350,
  backgroundColor: "gray",
};

function Dashboard() {
  return (
    <div>
      <Box sx={dashboardHeaderContainerStyle}>
        <Typography variant="h4">Dashboard</Typography>
        <LinkButton navlink="/add-product" name="Add New Product"/>
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
