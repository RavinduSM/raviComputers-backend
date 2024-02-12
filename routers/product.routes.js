import express from 'express';
import { addProduct, deleteProduct, getAllProduct, getSpecificProduct, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProduct);
router.get("/:id", getSpecificProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;