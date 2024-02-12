import express from "express";
import { isAuth, isuthAdmin } from "../middleware/authMiddleware.js";
import { createCategory, listCategory, readCategory } from "../controllers/category.controller.js";
const router = express.Router();

router.post("/", isAuth, isuthAdmin, createCategory);
router.get("/categories", listCategory);
router.get("/:id", readCategory);

export default router;