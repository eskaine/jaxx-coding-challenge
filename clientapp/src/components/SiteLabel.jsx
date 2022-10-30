import Typography from "@mui/material/Typography";

function SiteLabel({size, href, sx}) {
  return (
    <Typography
      variant={size}
      noWrap
      component="a"
      href={href}
      sx={{
        mr: 2,
        fontFamily: "ubuntu",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
        ...sx,
      }}
    >
      Mighty Jaxx
    </Typography>
  );
}

export default SiteLabel;
