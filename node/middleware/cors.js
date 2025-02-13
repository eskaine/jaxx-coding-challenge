function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://jaxx-coding-challenge.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
}

module.exports = cors;
