import express from "express";

import { createCategory, listCategory, readCategory } from "../controllers/category.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/",authenticate,  createCategory);
router.get("/categories", listCategory);
router.get("/:id", readCategory);

export default router;