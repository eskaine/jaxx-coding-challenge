require('dotenv').config();
const express = require('express');
const app = express();

const adminRouter = require('./routes/admin');
const port = process.env.PORT;

require('./configs/mongo.config');

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
