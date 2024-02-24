import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductSearch,
  getSpecificProduct,
  productReview,
  updateProduct,
} from "../controllers/product.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, addProduct);
router.get("/", getAllProduct);
router.get("/:id", getSpecificProduct);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);
router.post("/:id/review", authenticate, productReview);
router.get("/search/:key", getProductSearch);

console.log();

export default router;
