import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function LinkButton({navlink, name}) {
  return (
    <Link to={navlink} style={{ textDecoration: 'none' }}>
      <Button variant="contained">{name}</Button>
    </Link>
  );
}

export default LinkButton;
