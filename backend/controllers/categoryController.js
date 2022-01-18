import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

// @desc    Create a new category
// @route   POST /api/category
// @access  Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
  });

  if (category) {
    res.status(201).json({
      _id: category._id,
      name: category.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid category data");
  }
});

// @desc    Get category
// @route   GET /api/category
// @access  Private
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({});
  res.json(category);
});

// @desc    Update a category
// @route   PUT /api/category/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete category
// @route   DELETE /api/category/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export { createCategory, getCategory, deleteCategory, updateCategory };
