import express from "express"
import { validationSchemas } from "../middlewares/validation-middleware.js";
import productController from "../controllers/product_controller.js";
const productRouter = express.Router();

productRouter.route("/create-product").post(validationSchemas.validateProduct,productController.createProduct)

productRouter.route('/list').get(productController.listAllProducts);
productRouter.route("/check-sku").post(productController.checkSKUUnique);

productRouter.route("/:id?")
    .get(productController.getProductById)                                           //returns a single product item along with its variants
    .put(validationSchemas.validateUpdateProduct,productController.updateProduct)          // edits a product item
    .delete(productController.deleteProduct);                                       // deletes a product item    

    // lists all products along with their variants 



export default productRouter