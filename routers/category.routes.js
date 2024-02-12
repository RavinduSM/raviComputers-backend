import express from "express";
import { isAuth, isuthAdmin } from "../middleware/authMiddleware.js";
import { createCategory, listCategory, readCategory } from "../controllers/category.controller.js";
const router = express.Router();

router.route("/", isAuth, isuthAdmin).post(createCategory);
router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;