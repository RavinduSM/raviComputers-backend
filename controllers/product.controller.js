// import { isLogin } from "../middleware/authMiddleware.js";
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


export const productReview = async (req, res) => {

    try {
        // var islogin = await isLogin();
        console.log(req.cookies);
        const { rating, comment, name, user } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Product already reviewed");
            }

            const review = {

                name,
                rating: Number(rating),
                comment,
                user
                //  : req.user._id,
            };
            console.log(review)

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: "Review Added" });
        } else {
            res.status(404);
            throw new Error("product not found");
        }
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
};

export const getProductSearch = async (req, res) => {
    const searchProduct = await Product.find(
        {
            "$or": [
                { productName: { $regex: req.params.key } },
            ]
        }
    );
    res.send(searchProduct);
}