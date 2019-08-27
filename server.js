require('dotenv').config();

const productsRouter = require("./routes/products");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// .use is a middleware
app.use(express.json());
app.use('/products', productsRouter);

app.listen(port, () => console.log(`Server started on port: ${port}`));




