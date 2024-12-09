import express from "express"
import categoryController from "../controllers/categoryController.js";
const categoryRouter = express.Router();


categoryRouter.route("/")
    .get(categoryController.getCategories)                                      // gets all categories
    .post(categoryController.createCategory);                                   // add a new category

categoryRouter.route("/sub-category/:parentId")
    .get(categoryController.getSubCategories)                                     // get all sub categories of a parent category
    .post(categoryController.createSubCategory);                                    // add sub category          

categoryRouter.route("/taxonomy-category")
    .get(categoryController.getTaxonomyCategories);                               // get all taxonomy categories

export default categoryRouter;