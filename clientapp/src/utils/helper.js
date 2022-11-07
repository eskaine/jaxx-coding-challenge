export const createHeaders = (token) => {
  return {
    headers: {
      Authorization: token,
    },
  };
};
