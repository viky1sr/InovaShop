const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');

require = require("esm")(module)
module.exports = require("./server.js")

import products from './storage/products';
dotenv.config({path: './.env'});

const app = express();

app.get('/api/v1/products', (req, res) => {
   res.json(products)
});

app.get('/api/v1/product/:id', (req, res) => {
    const product = products.find((pr) => pr._id === req.params.id);
    res.json(product)
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close Server and Exite
    server.close(() => process.exit(1));
});

export function log(msg) {
    console.log(msg);
}


