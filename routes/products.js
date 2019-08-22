// where we will define how the server should handle the data when it receives a GET, POST or PATCH request
const express = require("express");
const router = express.Router();
const Product = require('../models/product')

// Route for getting all products
router.get('/', async (req, res) => {
    //wrap the code into try/catch blocks
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

// Route for getting one products
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
})

// Route for creating one products
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        img: req.body.img
    })

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// Route for updating one products
router.patch('/:id', getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    if (req.body.rating != null) {
        res.product.rating = req.body.rating;
    }
    if (req.body.img != null) {
        res.product.img = req.body.img;
    }

    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    } catch {
        res.status(400).json({ message: err.message })
    }
})


// Route for deleting one products
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Deleted this product' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// middleware
async function getProduct(req, res, next) {
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({ message: "Can't find product" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.product = product
    next()
}

module.exports = router;