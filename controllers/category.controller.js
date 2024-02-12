import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: "Name is required" });
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.json({ error: "Already exists" });
        }

        const category = await new Category({ name }).save();
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

export const listCategory = asyncHandler(async (req, res) => {
    try {
        const allCategory = await Category.find({});
        res.json(allCategory);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});

export const readCategory = asyncHandler(async (req, res) => {
    try {
        const readCategory = await Category.findOne({ _id: req.params.id });
        res.json(readCategory);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});