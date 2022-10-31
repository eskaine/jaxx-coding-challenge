require('dotenv').config();
const express = require('express');
const connectMongo = require('./configs/mongo.config');
const adminRouter = require('./routes/admin');
const port = process.env.PORT;

const app = express();
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/admin', adminRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(
    port, () => console.log(`Server running on port ${port}`)
);

module.exports = app;
