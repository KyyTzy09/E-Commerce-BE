import express from "express";
import { ProductController } from "../controllers/product.controller.js";
import { upload } from "../../common/middlewares/multer.middleware.js";
import { ValidateMiddleware } from "../../common/middlewares/validate.middleware.js";
import { productSchema } from "../validators/product.validator.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/" , productController.getAllProducts);
productRouter.get("/", productController.getAllProductsByStoreId);  
productRouter.post("/", authMiddleware, upload.single("image"),ValidateMiddleware(productSchema), productController.createProduct);

productRouter.get("/search", productController.getAllProductsByName);
productRouter.get("/top" , productController.getTopProducts);


productRouter.get("/:productId", productController.getProductById);
productRouter.patch("/:productId", authMiddleware, upload.single("image"), ValidateMiddleware(productSchema), productController.updateProduct); // req storeId
productRouter.delete("/:productId", productController.deleteProduct);
productRouter.get("/:productId/store", productController.getProductsByStoreIdAndProductId); // req body
export default productRouter;