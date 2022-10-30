const axios = require('axios').default;

export async function adminLogin(params) {
  const res = await axios({
    method: 'post',
    url: '/admin',
    data: params
  });

  return res;
}
