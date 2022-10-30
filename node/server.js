require('dotenv').config();
const express = require('express');
const connectMongo = require('./configs/mongo.config');
const adminRouter = require('./routes/admin');
const port = process.env.PORT;

const app = express();
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(
    port, () => console.log(`Server running on port ${port}`)
);

module.exports = app;
