import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const createProduct = await product.save();
        res.json(createProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find(req.query); //req.quey to get filter options
        res.status(200).json({ product, nbHits: product.length })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSpecificProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404)
                .message({ message: "Product not found" });
        }
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).send({ message: "Product deleted successfully" })
        } else {
            return next(errorHandler(404, 'Product not found!'));
        }
    } catch (error) {
        return next(error);
    }
}