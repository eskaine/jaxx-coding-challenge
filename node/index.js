require('dotenv').config();
const express = require('express');
const limiter = require('./configs/limiter.config');
const connectMongo = require('./configs/mongo.config');
const adminRouter = require('./routes/admin');
const productsRouter = require('./routes/products');
// const cors = require('./middleware/cors');
const errorHandler = require('./middleware/error');

const port = process.env.PORT;

const app = express();
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors);
app.use(limiter);
app.get('/', (req, res) => res.send('API running...'));
app.use('/admin', adminRouter);
app.use('/products', productsRouter);
app.use(errorHandler);

app.listen(
    port, () => console.log(`Server running on port ${port}`)
);

module.exports = app;
