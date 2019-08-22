const Product = require('../models/product');

module.exports = async function getProduct(req, res, next) {
    try {
        const id = req.params.id;
        product = await Product.findById(id);
        if (product === null) {
            return res.status(404).json({ message: `Product with id ${id} was not found.` });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}
