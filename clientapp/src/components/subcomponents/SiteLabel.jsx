import Typography from "@mui/material/Typography";

const labelStyle = {
  mr: 2,
  fontFamily: "ubuntu",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};

function SiteLabel({ size, href, sx }) {
  const setLabelStyle = (params) => {
    return {
      ...labelStyle,
      ...params,
    };
  };

  return (
    <Typography
      variant={size}
      noWrap
      component="a"
      href={href}
      sx={setLabelStyle(sx)}
    >
      Mighty Jaxx
    </Typography>
  );
}

export default SiteLabel;
