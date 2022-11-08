export const dashboardHeaderContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: 2,
};

export const productsContainerStyle = [
  {
    display: "flex",
    flexWrap: "wrap",
    gap: 6.3,
  },
  (theme) => ({
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  })
];
