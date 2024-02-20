import { mongoose } from "mongoose";

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true, },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserModel",
    },
},
    { timestamps: true }
);

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true, },
    price: { type: Number, required: true, },
    discount: { type: Number, },
    discountedPrice: { type: Number },
    categories: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, },
    image: { type: String },
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },

},
    {
        timeStamps: true
    });



const Product = mongoose.model('Product', productSchema);
export default Product;