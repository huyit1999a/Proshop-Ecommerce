import express from "express";
const router = express.Router();

import {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, admin, createCategory).get(getCategory);
router
  .route("/:id")
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);
export default router;
