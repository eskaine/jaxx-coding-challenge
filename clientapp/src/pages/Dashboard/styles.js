export const dashboardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 5
};

export const dashboardHeaderContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

export const productsHeaderStyle = {
  marginBottom: 2
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

export const searchFieldStyle = [
  {
    display: "flex",
  },
];
